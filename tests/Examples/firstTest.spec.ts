import { test, expect } from '@playwright/test'

test.beforeAll(async () => {
  console.log('beforeAll - Pre - condition')
})


test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
});


test('Navigate to the date picker', async ({ page }) => {
  await page.getByText('Datepicker').click();
});



test.describe('Test suite demo', () => {
  test('Locators syntax rules', async ({ page }) => {
    //  by tag name - This example will select the 1st element with "input" tag name
    await page.locator('input').first().click();

    // find locator by id
    await page.locator('#inputEmail1').click();

    // find locator by class value
    await page.locator('.shape-rectangle')

    // find locator by attribute
    await page.locator('[placeholder="Email"]')

    // find by class value (full)
    await page.locator('class="input-full-width size-medium status-basic shape-rectangle nb-transition"')

    // combine different selectors
    await page.locator('input[placeholder="Email"]')

    // combine different selectors ( match all 3 attributes)
    await page.locator('input[placeholder="Email"][nbinput]')

    // find locator by xpath ( Not recommended )
    await page.locator('//*[@id="inputEmail"]')

    // by partial text matching
    await page.locator('.text("Using")')

    // by exact text matching
    await page.locator('.text-is("Using the Grid")')

  });
});

// using User Facing locators
test('User Facing Locators', async ({ page }) => {
  // getByRole
  await page.getByRole('textbox', { name: 'Email' }).first().click();
  await page.getByRole('button', { name: 'Sign in' }).first().click();

  // getByLabel
  await page.getByLabel('Email').first().click();
  await page.getByPlaceholder('Jane Doe').click();


  // using <button data-testid="SignIn" /> element from the dom
  await page.getByTestId('SignIn').click();


  // getByText
  await page.getByText('Using the Grid').click();
  await page.getByTitle('IoT Dashboard').click();

});

test('Locating Child Elements', async ({ page }) => {

  // chaining parent and child elements
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();

  // chaining parent and child elements
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();


  // chaining locator method and getByRole method
  await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click();

  // chaining by index ( not the best way )
  await page.locator('nb-card').nth(3).getByRole('button').click();
});

test('Locating Parent Elements', async ({ page }) => {
  await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' }).click();

  //provide second argument to get the parent element
  await page.locator('nb-card', { has: page.locator("#inputEmail") }).getByRole('textbox', { name: 'Email' }).click();

  // provide filter
  await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: 'Email' }).click();
  await page.locator('nb-card').filter({ has: page.locator(".status-danger") }).getByRole('textbox', { name: 'Password' }).click();


  await page.locator('nb-card').filter({ has: page.locator("nb-checkbox") }).filter({ hasText: "Sign in" })
    .getByRole('textbox', { name: 'Password' }).click();

  // going one level up wihth xpath
  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: 'Email' }).click();
});

// Reuse locators
test('Reuse Locators', async ({ page }) => {
  //before
  await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: 'Email' }).fill('test@test.com');
  await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: 'Password' }).fill('Welcome123');
  await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('button').click();

  //afer
  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })

  await basicForm.getByRole('textbox', { name: 'Email' }).fill('test2@test.com');
  await basicForm.getByRole('textbox', { name: 'Password' }).fill('Welcome1234');
  await basicForm.getByRole('button').click();


  //afer with 2nd const
  const basicForm1 = page.locator('nb-card').filter({ hasText: "Basic form" })
  const emaiField = basicForm1.getByRole('textbox', { name: 'Email' })

  await emaiField.fill('test3@test.com');
  await basicForm.getByRole('textbox', { name: 'Password' }).fill('WelcomeABC');
  await basicForm.locator('nb-checkbox').click();
  await basicForm.getByRole('button').click();

  //add first assertion
  await expect(emaiField).toHaveValue('test3@test.com');
});


// extract values
test('Extract values', async ({ page }) => {
  //single test value
  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
  const buttonText = await basicForm.locator('button').textContent();

  expect(buttonText).toEqual('Submit');

  // all test values
  const allNewRadioBtnLabels = await page.locator('nb-radio').allTextContents();
  expect(allNewRadioBtnLabels).toContain('Option 1');


  // input value
  const emailField = basicForm.getByRole('textbox', { name: 'Email' });
  await emailField.fill('test@test.com');
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual('test@test.com');


  const plaveholderValue = await emailField.getAttribute('placeholder');
  expect(plaveholderValue).toEqual('Email');
});

//assertions

test('assertions', async ({ page }) => {
  const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button');

  //general assertions // generic assertions are very simple
  const value = 5
  expect(value).toBe(5);
  expect(value).toEqual(5);

  const text = await basicFormButton.textContent();
  expect(text).toEqual('Submit');

  // locator assertions
  await expect(basicFormButton).toHaveText('Submit');


  // soft assertions // assertions that do not stop the test if they fail

  await expect.soft(basicFormButton).toHaveText('Submit');
  await basicFormButton.click();
});
