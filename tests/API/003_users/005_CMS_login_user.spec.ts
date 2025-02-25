
import { test, expect , APIRequestContext } from '@playwright/test';
type TestContext = { request: APIRequestContext };

test('Login User', async ({ request }: TestContext) => {

  const startTime = Date.now();
  const response = await request.post('https://divsbw7kvj55l.cloudfront.net/graphql', {
  "data": {
    "email": "qatestauto@motortrend.com",
    "password": "Hallloween2024"
  }
});
  const responseTime = Date.now() - startTime;
  const responseBody = await response.body();
  console.log(await `Response Body:  ${responseBody}`);
  console.log(await `Response Time:  ${responseTime}`);
  console.log(await `Status Code:  ${response.status()}`);
});
