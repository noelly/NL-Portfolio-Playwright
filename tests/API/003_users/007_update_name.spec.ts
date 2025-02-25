
import { test, expect , APIRequestContext } from '@playwright/test';
import exp from 'constants';
type TestContext = { request: APIRequestContext };

test('Update name', async ({ request }: TestContext) => {

  const startTime = Date.now();
  const response = await request.patch('https://goal-tracker-api.onrender.com/api/v1/auth/updateprofile', {
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmFuZ28gYmFieSIsInVzZXJJZCI6IjY3YWU1ZDEwNzk4NmNmZjFkMTBhYWJlYiIsImVtYWlsIjoicmFuZ29iYWJ5QHRlc3QuY29tIiwiaWF0IjoxNzQwMDg3OTY1LCJleHAiOjE3NDI2Nzk5NjV9.jcYhvzxJJdkaAK9KDnp5oM-aMcmR6U9awlETEyEhmfA"
  },
  "data": {
    "name": "charazon baby",
    "email": "rangobaby@test.com"
  }
});
  const responseTime = Date.now() - startTime;
  const responseBody = await response.body();
  console.log(await `Response Body:  ${responseBody}`);
  console.log(await `Response Time:  ${responseTime}`);
  console.log(await `Status Code:  ${response.status()}`);

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  expect(response.url()).toBe('https://goal-tracker-api.onrender.com/api/v1/auth/updateprofile');
  expect(responseTime).toBeLessThan(1000);
  expect(responseBody).toContain('charazon baby');
  expect(responseBody).toContain('rangobaby@test.com');
  
});
  