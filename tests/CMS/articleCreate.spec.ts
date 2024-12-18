import { test } from '@playwright/test';
import { PageManager } from '../../pages/webenyPageManager.Page';
import { testData, randomData } from '../../data/createArticle.data';

test.describe('Article', () => {
  let pm: PageManager;
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.webenyMain().navigateToCMS();
  });

  test('Creating a formatted article', async () => {
    await test.step('Pre-requisite: clean up any existing test pages', async () => {
      await pm.webenyMain().navigateToViewArticles();
      await pm.articleList().cleanupPagesByTitle(testData.title);
    });

    await test.step('Navigate to the create article page', async () => {
      await pm.webenyMain().navigateToCreateArticle();
    });

    await test.step('Proceed with the article creation', async () => {
      await pm.createArticle().createFormattedArticle(
        randomData.type,
        testData.title,
        testData.subtitle,
        testData.body,
        testData.bold,
        testData.italic,
        testData.taxonomies,
        testData.contributor,
        randomData.role,
      );
    });

    await test.step('Verify the article created is listed within the article list', async () => {
      await pm.webenyMain().navigateToViewArticles();
      await pm.createArticle().verifyNewArticleInArticleList(testData.title, testData.author);
    });

    await test.step('End of test: Remove any created test pages', async () => {
      await pm.articleList().cleanupPagesByTitle(testData.title);
    });
  });
});
