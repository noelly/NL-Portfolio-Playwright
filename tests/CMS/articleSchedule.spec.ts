import { test } from '@playwright/test';
import { PageManager } from '../../pages/webinyPageManager.Page';
import { testData, randomData } from '../../data/createArticle.data';


const year = '2025';
const month = 'Feb';
const day = '15';
const hour = '10';
const minute = '45';
const second = '00';


test.describe('Article', () => {
  let pm: PageManager;
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.webinyMain().navigateToCMS();
  });

  test('Schedule an article to be published', async () => {
    await test.step('Pre-requisite: clean up any existing test pages', async () => {
      await pm.webinyMain().navigateToViewArticles();
      await pm.articleList().cleanupPagesByTitle(testData.scheduleTitle);
    });

    await test.step('Navigate to the create article page', async () => {
      await pm.webinyMain().navigateToCreateArticle();
    });

    await test.step('Proceed with the article creation', async () => {
      await pm.createArticle().createNewArticle(
        randomData.type,
        testData.scheduleTitle,
        testData.subtitle,
        testData.body,
        testData.taxonomies,
        testData.contributor,
        randomData.role,
      );
    });

    await test.step('Proceed with Schedule the article', async () => {
      // await pm.createArticle().schedulePublishInFuture(year, month, day, hour, minute, second);
    });
  });
});
