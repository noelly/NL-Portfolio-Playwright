import { test, expect, request } from '@playwright/test';
const tags = require('../data/tags.json');

test.beforeEach(async ({ page }) => {
  // 1st:  mock . this as to be done before each test
  // add url to intercept and update URl with wild cards
  await page.route('*/**/api/tags', async route => {
    await route.fulfill({
      body: JSON.stringify(tags)
    })
  });

  await page.goto('https://conduit.bondaracademy.com/');
});

test('Mock and interceopt API', async ({ page }) => {
  // 2md intercept - In postman , copy full URl to get full response https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0
  await page.route('*/**/api/articles*', async route => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "This is a Mock test title";
    responseBody.articles[0].description = "This is Mock test description";

    await route.fulfill({
      body: JSON.stringify(responseBody)
    })
  });

  // add something that would trigger a Ui refresh
  await page.getByText('Global Feed').click();

  // add an assertion for the page to see if it loaded
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');

  // add an assertion for the tags that have been loaded from the mock
  await expect(page.locator('.sidebar')).toContainText('Automation');

  // add an assertion for the article has been updated
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a Mock test title');
  await expect(page.locator('app-article-list p').first()).toContainText('This is Mock test description');
  await page.waitForTimeout(1000);
});

test('Create an article using API and delete with UI', async ({ page, request }) => {
  // get access token
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: { email: "rangobaby@icloud.com", password: "babyRango1" }
    }
  })

  const responmseBody = await response.json();
  const accessToken = responmseBody.user.token;

  // create an article using the API endpoint + payload + access token
  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
      article: {
        title: "This is a Mock test title Create with API",
        description: "This is Mock test description",
        body: "This is Mock test body",
        tagList: ["Automation", "Noel", "Playwright"]
      }
    },
    headers: {
      'Authorization': `Token ${accessToken}`
    }
  })
  expect(articleResponse.status()).toEqual(201);

  // delete article with UI
  await page.getByText('Global Feed').click();
  await page.getByText('This is a Mock test title Create with API').click();
  await page.getByRole('button', { name: 'Delete Article' }).first().click();
  await page.getByText('Global Feed').click();

  await expect(page.locator('app-article-list h1').first()).not.toContainText('This is a Mock test title Create with API');
});

test('Create an article using API and delete with API', async ({ page, request }) => {
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: { email: "rangobaby@icloud.com", password: "babyRango1" }
    }
  })

  const responmseBody = await response.json();
  const accessToken = responmseBody.user.token;
  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
      article: {
        title: "This is a Mock test 2 - Created with API",
        description: "This is Mock test description",
        body: "This is Mock test body",
        tagList: ["Automation", "Noel", "Playwright"]
      }
    },
    headers: {
      'Authorization': `Token ${accessToken}`
    }
  });
  expect(articleResponse.status()).toEqual(201);
  await page.getByText('Global Feed').click();
  await expect(page.locator('app-article-list h1').first()).toContainText("This is a Mock test 2 - Created with API");

  // delete article with API
  const deleteArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/This-is-a-Mock-test-2-Created-with-API-13107`, {
    headers: {
      'Authorization': `Token ${accessToken}`
    }
  });
  expect(deleteArticle.status()).toEqual(204);
  await page.getByText('Global Feed').click();
  await expect(page.locator('app-article-list h1').first()).not.toContainText("This is a Mock test 2 - Created with API");
});


test('Create an article using UI and delete with API', async ({ page, request }) => {

  await page.getByText('New Article').click();
  await page.getByRole('textbox', { name: 'Article Title' }).fill('This is a Mock test 3 - Created manually');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('Abouth the playwright');
  await page.getByRole('textbox', { name: 'Write your article (in markdown)' }).fill('We like to use playwtight for automation');
  await page.getByRole('button', { name: 'Publish Article' }).click();

  // intersept the repomse
  const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/');
  const articleResponseBody = await articleResponse.json();
  const slugID = articleResponseBody.article.slug;

  // validate that the article has been created
  await expect(page.locator('.article-page h1').first()).toContainText('This is a Mock test 3 - Created manually');
  await page.getByText('Home').click();
  await page.getByText('Global Feed').click();
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a Mock test 3 - Created manually');


  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: { email: "rangobaby@icloud.com", password: "babyRango1" }
    }
  })

  const responmseBody = await response.json();
  const accessToken = responmseBody.user.token;

  // delete article with API
  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugID}`, {
    headers: {
      'Authorization': `Token ${accessToken}`
    }
  });
  expect(deleteArticleResponse.status()).toEqual(204);
});
