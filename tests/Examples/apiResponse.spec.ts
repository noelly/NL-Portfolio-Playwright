import {expect, test} from "@playwright/test"; // ^1.31.2

test("retrieves a comment", async ({request}) => {
  const url = "https://jsonplaceholder.typicode.com/comments/1";
  const response = await request.get(url);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");
  const body = await response.json();
  expect(body.postId).toBe(1);
  expect(body.id).toBe(1);
  expect(body.name).toBe("id labore ex et quam laborum");
  expect(body.email).toBe("Eliseo@gardner.biz");
  console.log(body);
});
