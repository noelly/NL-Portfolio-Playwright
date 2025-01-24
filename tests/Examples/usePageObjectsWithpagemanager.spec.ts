import { test, expect } from '@playwright/test'
import { PageManager } from '../../page-objects/pageManager.Page';
import { faker } from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
    await page.goto('/'); // with baseURL
});

test('navigate to form page', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formmLayoutsPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().toasterPage();
    await pm.navigateTo().tooltipPage();
    await pm.navigateTo().SmartTablePage();
});

test.only('Parameterized method', async ({ page }) => {
    const pm = new PageManager(page);
    const randomFullname = faker.person.fullName();
    const randomEmail = `${randomFullname.replace(' ', '')}${faker.number.int({ min: 1, max: 1000 })}@test.com`;


    await pm.navigateTo().formmLayoutsPage();
    await pm.onFormLayoursPage().submitUsingTheGridFormWithCredentialsAndSelectOptions('QA_auto@test.com', '1234abcd', 'Option 1');
    await pm.onFormLayoursPage().submitInLineformWithNameEmailAndChckbox(randomFullname, randomEmail, true);
    await pm.navigateTo().datepickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5);
    await pm.onDatePickerPage().selectDatePickWithRageFromToday(5, 10);
});
