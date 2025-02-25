
import { test, expect , APIRequestContext } from '@playwright/test';
type TestContext = { request: APIRequestContext };

test('Show Progress - Challenge 7', async ({ request }: TestContext) => {

  const startTime = Date.now();
  const response = await request.get('https://goal-tracker-api.onrender.com/api/v1/goals/showprogress', {
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hhcmF6b24gYmFieSIsInVzZXJJZCI6IjY3YWU1ZDEwNzk4NmNmZjFkMTBhYWJlYiIsImVtYWlsIjoicmFuZ29iYWJ5QHRlc3QuY29tIiwiaWF0IjoxNzQwNDMzMTQxLCJleHAiOjE3NDMwMjUxNDF9.4A_ihEEBhyozEf7iDvE4AxmDQ0MyByxgorYZKVnd8gE"
  }
});
  const responseTime = Date.now() - startTime;
  const responseBody = await response.body();
  console.log(await `Response Body:  ${responseBody}`);
  console.log(await `Response Time:  ${responseTime}`);
  console.log(await `Status Code:  ${response.status()}`);
});
