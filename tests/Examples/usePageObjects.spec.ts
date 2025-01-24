import { test, expect } from '@playwright/test'
import { NavigationPage } from '../../page-objects/navigationPage';
import { FormLayoursPage } from '../../page-objects/formsLayoutsPage';
import { DatePickerPage } from '../../page-objects/datePickerPage';
import { on } from 'events';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('navigate to form page', async ({ page }) => {

    // create instance of the pages
    const navigateTo = new NavigationPage(page);
    await navigateTo.formmLayoutsPage();
    await navigateTo.datepickerPage();
    await navigateTo.toasterPage();
    await navigateTo.tooltipPage();
    await navigateTo.SmartTablePage();
});

test('Parameterized method', async ({ page }) => {

    // create instance of the pages
    const navigateTo = new NavigationPage(page);
    const onFormLayoursPage = new FormLayoursPage(page);
    const onDatePickersPage = new DatePickerPage(page);

    await navigateTo.formmLayoutsPage();
    await onFormLayoursPage.submitUsingTheGridFormWithCredentialsAndSelectOptions(process.env.USERNAME!, process.env.PASSWORD!, 'Option 1');
    await onFormLayoursPage.submitInLineformWithNameEmailAndChckbox('Jone smaith', 'John@test.com', true);
    await navigateTo.datepickerPage()
    await onDatePickersPage.selectCommonDatePickerDateFromToday(5);
    await onDatePickersPage.selectDatePickWithRageFromToday(5, 10);
});
