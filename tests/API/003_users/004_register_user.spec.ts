
import { test, expect , APIRequestContext } from '@playwright/test';
type TestContext = { request: APIRequestContext };

test('Register User', async ({ request }: TestContext) => {

  const startTime = Date.now();
  const response = await request.post('https://goal-tracker-api.onrender.com/api/v1/auth/register', {
  "data": {
    "name": "Rango baby",
    "email": "rangobaby@test.com",
    "password": "abcd1234"
  }
});
  const responseTime = Date.now() - startTime;
  const responseBody = await response.body();
  console.log(await `Response Body:  ${responseBody}`);
  console.log(await `Response Time:  ${responseTime}`);
  console.log(await `Status Code:  ${response.status()}`);
});
