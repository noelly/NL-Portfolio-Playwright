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

  test('Publishing an article', async () => {
    await test.step('Pre-requisite: clean up any existing test pages', async () => {
      await pm.webenyMain().navigateToViewArticles();
      await pm.articleList().cleanupPagesByTitle(testData.publishTitle);
    });

    await test.step('Navigate to the create article page', async () => {
      await pm.webenyMain().navigateToCreateArticle();
    });

    await test.step('Proceed with the article creation', async () => {
      await pm.createArticle().createNewArticle(
        randomData.type,
        testData.publishTitle,
        testData.subtitle,
        testData.body,
        testData.taxonomies,
        testData.contributor,
        randomData.role,
      );
    });

    await test.step('Publish the created articles', async () => {
      await pm.createArticle().publishArticle();
    });

    // await test.step('Verify the created article has a published status', async () => {
    //   await pm.webenyMain().navigateToViewArticles();
    //   await pm.createArticle().verifyNewArticleInArticleList(testData.publishTitle, testData.author, `Published (v1)`);
    // });

    // await test.step('End of test: Remove any created test pages', async () => {
    //   await pm.articleList().cleanupPagesByTitle(testData.publishTitle);
    // });
  });
});
