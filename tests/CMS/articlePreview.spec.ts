import { test } from '@playwright/test';
import { PageManager } from '../../pages/webinyPageManager.Page';
import { testData, randomData } from '../../data/createArticle.data';

test.describe('Article', () => {
  let pm: PageManager;
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.webinyMain().navigateToCMS();
  });

  test('Previewing an article', async () => {
    await test.step('Pre-requisite: clean up any existing test pages', async () => {
      await pm.webinyMain().navigateToViewArticles();
      await pm.articleList().cleanupPagesByTitle(testData.previewTitle);
    });

    await test.step('Navigate to the create article page', async () => {
      await pm.webinyMain().navigateToCreateArticle();
    });

    await test.step('Proceed with the article creation', async () => {
      await pm.createArticle().createFormattedArticle(
        randomData.type,
        testData.previewTitle,
        testData.subtitle,
        testData.body,
        testData.bold,
        testData.italic,
        testData.taxonomies,
        testData.contributor,
        randomData.role,
      );
    });

    await test.step('Preview the created article', async () => {
      await pm.createArticle().previewArticle();
    });

    await test.step('Delete any created test pages', async () => {
      await pm.webinyMain().navigateToViewArticles();
      await pm.articleList().cleanupPagesByTitle(testData.publishTitle);
    });
  });
});
