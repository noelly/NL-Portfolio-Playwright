import { test, expect } from '@playwright/test';
import * as fs from 'fs/promises';

test('Verify Network calls is triggered for Motortrend', async ({ page }) => {
  const requestUrls: string[] = [];

  await page.route(/.*\/*\/.*/, async (route, request) => {
    const url = request.url();
    requestUrls.push(url);
    console.log('Request URL:', url);
    
    await route.continue();
    await page.waitForTimeout(1000);
    await page.unrouteAll({ behavior: 'ignoreErrors' });
  });

  await page.goto('https://www.motortrend.com/');

  // Export the list of request URLs to a data file
  const data = JSON.stringify(requestUrls, null, 2);
  await fs.writeFile('data/requestUrls.json', data);
});