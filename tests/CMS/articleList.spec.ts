import { test } from '@playwright/test';
import { PageManager } from '../../pages/webinyPageManager.Page';
import { status, types, authors } from '../../data/articleList.data';

const author = 'QA Automation'; //Don't use generic words like test

test.describe('Article list', () => {
  let pm: PageManager;
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.webinyMain().navigateToCMS();
    await pm.webinyMain().navigateToViewArticles();
  });

  test('Verify the article list', async () => {
    await test.step(`Verify the list displays 51 created articles`, async () => {
      await pm.articleList().validateAllArticlesOnList(51);
    });
  });

  test('Verify sorting by status', async () => {
    for (let selectedStatus of status) {
      await test.step(`Sort the article list by status ${selectedStatus}`, async () => {
        await pm.articleList().verifyFilterByStatus(selectedStatus);
      });
    }
  });

  test('Verify sorting by types', async () => {
    for (let selectedTypes of types) {
      await test.step(`Sort the article list by type ${selectedTypes}`, async () => {
        await pm.articleList().verifyFilterByType(selectedTypes);
      });
    }
  });

  test('Verify filtering by author', async () => {
    for (let author of authors) {
      await test.step(`Sort the article list by user ${author}`, async () => {
        await pm.articleList().verifyFilterByAuthor(author);
      });
    }
  });
});
