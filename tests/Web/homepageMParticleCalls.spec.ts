import { test, expect } from '@playwright/test';
import { PageManager } from '../../pages/pageManager.Page';
import * as fs from 'fs';

test('Verify MParticle calls are triggered for MT homepage', async ({ page }) => {
  const requestUrls: string[] = [];

  await page.route(/mparticle.com\/*\/.*/, async (route, request) => {
    const url = request.url();
    requestUrls.push(url);
    console.log('Request URL:', url);

    await route.continue();
    await page.waitForTimeout(1000);
    await page.unrouteAll({ behavior: 'ignoreErrors' });
  });

  const pm = new PageManager(page);
  await pm.homepage().navigateTo();


  // Export the list of request URLs to a data file
  const data = JSON.stringify(requestUrls, null, 2);
  fs.writeFileSync('data/requestMparticleUrls.json', data);


  page.on('response', async (response) => {
    if (response.url() === 'https://jssdks.mparticle.com/v3/JS/*/events') {
      const data = await response.json();
      expect(await data).toBeDefined();
      // Add more assertions as needed
    }
  });
});
