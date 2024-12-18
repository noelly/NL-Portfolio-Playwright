import { test } from '@playwright/test';
import { PageManager } from '../../pages/webenyPageManager.Page';

test.describe('Main menu', () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.webenyMain().navigateToCMS();
  });

  test('Navigate to the articles list', async () => {
    await pm.webenyMain().navigateToViewArticles();
  });

  test('Navigate to the article creation page', async () => {
    await pm.webenyMain().navigateToCreateArticle();
  });
});
