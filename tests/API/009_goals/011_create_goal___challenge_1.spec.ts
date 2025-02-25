
import { test, expect , APIRequestContext } from '@playwright/test';
type TestContext = { request: APIRequestContext };

test('Create Goal - Challenge 1', async ({ request }: TestContext) => {

  const startTime = Date.now();
  const response = await request.post('https://goal-tracker-api.onrender.com/api/v1/goals', {
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hhcmF6b24gYmFieSIsInVzZXJJZCI6IjY3YWU1ZDEwNzk4NmNmZjFkMTBhYWJlYiIsImVtYWlsIjoicmFuZ29iYWJ5QHRlc3QuY29tIiwiaWF0IjoxNzQwNDMzMTQxLCJleHAiOjE3NDMwMjUxNDF9.4A_ihEEBhyozEf7iDvE4AxmDQ0MyByxgorYZKVnd8gE"
  },
  "data": {
    "title": "Enroll on 'Udemy API Course'",
    "description": "Enroll on 'Udemy API Course' and create a 'Progress Chart' to track progress.",
    "priority": "medium",
    "status": "cancelled"
  }
});
  const responseTime = Date.now() - startTime;
  const responseBody = await response.body();
  console.log(await `Response Body:  ${responseBody}`);
  console.log(await `Response Time:  ${responseTime}`);
  console.log(await `Status Code:  ${response.status()}`);
});
