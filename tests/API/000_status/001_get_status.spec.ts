
import { test, expect , APIRequestContext } from '@playwright/test';
type TestContext = { request: APIRequestContext };

test('GET STATUS', async ({ request }: TestContext) => {

  const startTime = Date.now();
  const response = await request.get('https://goal-tracker-api.onrender.com/api/v1/status');
  const responseTime = Date.now() - startTime;
  const responseBody = await response.body();
  console.log(await `Response Body:  ${responseBody}`);
  console.log(await `Response Time:  ${responseTime}`);
  console.log(await `Status Code:  ${response.status()}`);
});
