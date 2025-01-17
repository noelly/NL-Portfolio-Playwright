import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60000,
  globalTimeout: 600000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Emulates `'prefers-colors-scheme'` media feature.
    colorScheme: 'light',

    // Context geolocation.
    //geolocation: { longitude: 12.492507, latitude: 41.889938 },

    // Emulates the user locale. [https://saimana.com/list-of-country-locale-code/]
    locale: 'en-US',

    // Grants specified permissions to the browser context.
    //permissions: ['geolocation'],

    // Emulates the user timezone.[https://en.wikipedia.org/wiki/List_of_tz_database_time_zones]
    timezoneId: 'US/Pacific',

    //Videos
    video: 'off', // on test failure

    // Viewport used for all pages in the context.{ width: 1200, height: 800 }
    // viewport: { width: 1600, height: 1000 },
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: 'auth.setup.ts' },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'], userAgent: 'QA',
        viewport: { width: 1600, height: 1000 },
      },

    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], userAgent: 'QA' },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], userAgent: 'QA' },
    },
    {
      name: 'Examples',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Motortrend',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
        userAgent: 'QA', // required to bypass akamai Access Denied outside of VPN
        colorScheme: 'dark',
      },
    },
    {
      name: 'CMS',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
        userAgent: 'QA',
      },
      dependencies: ['setup'], retries: 1, fullyParallel: true,
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
