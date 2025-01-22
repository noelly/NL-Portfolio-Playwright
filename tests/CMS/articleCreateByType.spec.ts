import { test } from '@playwright/test';
import { PageManager } from '../../pages/webenyPageManager.Page';
import {
  testData,
  Types,
  Roles,
  regularArticle,
  listicleArticle,
  buyingGuideArticle,
  ymmArticle
} from '../../data/createArticle.data';

test.describe('Article by type', () => {
  let pm: PageManager;
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.webenyMain().navigateToCMS();
  });

  test(`Checking for any existing test pages`, async () => {
    await test.step('Removing any existing test pages', async () => {
      await pm.webenyMain().navigateToViewArticles();
      await pm.articleList().cleanupPagesByAuthor(testData.author);
    });
  });

  for (let type of Types) {
    const randomType = type;
    let pageDetails;
    switch (type) {
      case 'Regular Article':
        pageDetails = regularArticle;
        break;
      case 'Listicle':
        pageDetails = listicleArticle;
        break;
      case 'Buying Guide':
        pageDetails = buyingGuideArticle;
        break;
      case 'YMM Review':
        pageDetails = ymmArticle;
        break;
      default:
        pageDetails = testData;
        break;
    }
    test(`Validate creating a "${randomType}" article`, async () => {

      await test.step('Navigate to the create article page', async () => {
        await pm.webenyMain().navigateToCreateArticle();
      });

      await test.step('Proceed with the article creation', async () => {
        const randomRole = Roles[Math.floor(Math.random() * Roles.length)];
        await pm.createArticle().createNewArticle(
          randomType,
          pageDetails.title,
          pageDetails.subtitle,
          pageDetails.body,
          pageDetails.taxonomies,
          pageDetails.contributor,
          randomRole
        );
      });
    });
  }

  test(`Cleanup any existing test pages`, async () => {
    await pm.webenyMain().navigateToViewArticles();
    await pm.articleList().cleanupPagesByAuthor(testData.author);
  });
});
