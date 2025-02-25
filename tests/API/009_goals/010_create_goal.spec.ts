
import { test, expect , APIRequestContext } from '@playwright/test';
type TestContext = { request: APIRequestContext };

test('Create Goal', async ({ request }: TestContext) => {

  const startTime = Date.now();
  const response = await request.post('https://goal-tracker-api.onrender.com/api/v1/goals', {
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2F5bGllIEJlcmduYXVtIiwidXNlcklkIjoiNjdhZTVkMTA3OTg2Y2ZmMWQxMGFhYmViIiwiZW1haWwiOiJyYW5nb2JhYnlAdGVzdC5jb20iLCJpYXQiOjE3NDAwOTEwMDMsImV4cCI6MTc0MjY4MzAwM30.5cZqW1KxW1iIlx4OrAjDedPi-WKlcwFO4PTtIgrNbpU"
  },
  "data": {
    "title": "Enroll on 'Udemy API Course'",
    "description": "Enroll on 'Udemy API Course' and create a 'Progress Chart' to track progress.",
    "priority": "high",
    "status": "to-do"
  }
});
  const responseTime = Date.now() - startTime;
  const responseBody = await response.body();
  console.log(await `Response Body:  ${responseBody}`);
  console.log(await `Response Time:  ${responseTime}`);
  console.log(await `Status Code:  ${response.status()}`);
});
  