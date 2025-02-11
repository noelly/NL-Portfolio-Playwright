import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

let browser;
let context;
let page;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();

  // Set timeout for this hook.
  test.setTimeout(60000);
});

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.motortrend.com');
  await page.waitForLoadState('domcontentloaded');
});

test.afterAll(async () => {
  await browser.close();
});

test('Homepage - Verify main elements', async ({ page }) => {

  await test.step('SEO - Validate page title to be "MotorTrend: New Cars - Car News and Expert Reviews"', async () => {
    // Expect a title "to contain" a substring.
    const title = await page.title();
    expect(title).toBe('MotorTrend: New Cars - Car News and Expert Reviews');
  });


  await test.step('UI - Verify that Hero image is displayed', async () => {
    // validate hero image is visible
    const Hero = await page.locator('[data-c="hero-3-up"]');
    await Hero.isVisible();
  });

  await test.step('UI - Verify that nav bar is in the viewport', async () => {
    // validate hero image is visible
    const navBar = await page.locator('[class="idQ1P navbar"]');
    await navBar.isVisible();
  });


  await test.step('UI - Check URL', async () => {
    // validate hero image is visible
    await expect(page).toHaveURL(/motortrend/);
  });

});

