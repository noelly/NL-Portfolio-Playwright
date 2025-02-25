
import { test, expect, APIRequestContext } from '@playwright/test';
type TestContext = { request: APIRequestContext };

const API_request_URL='https://www.motortrend.com/';

test('Check homepage', async ({ request }: TestContext) => {

  const startTime = Date.now();
  const response = await request.get(API_request_URL);
  const responseTime = Date.now() - startTime;
  const responseBody = await response.body();

  console.log(await `Response Body:  ${responseBody}`);
  console.log(await `Response Time:  ${responseTime}`);
  console.log(await `Status Code:  ${response.status()}`);

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();;
  expect(responseTime).toBeLessThan(5000);
});
