import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
});

test.describe.only('Form Layout page', () => {
    test.describe.configure({ retries: 2 })

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Inpout field', async ({ page }, testInfo) => {

        if (testInfo.retry) {
            console.log('this is a retry');
        }


        const usingTheFridEmailInput = await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' });

        // Enter text in an inout field
        await usingTheFridEmailInput.fill('QA_auto@test.com');

        //clear the inut field
        await usingTheFridEmailInput.clear();

        // enter text using the keyboard
        await usingTheFridEmailInput.pressSequentially('QA_auto2@test.com');

        //clear the inut field
        await usingTheFridEmailInput.clear();

        // enter text using the keyboard with delay 
        await usingTheFridEmailInput.pressSequentially('QA_auto3@test.com', { delay: 200 });

        //generic assertion
        const inputValue = await usingTheFridEmailInput.inputValue();
        expect(inputValue).toEqual('QA_auto3@test.com');

        //locator assertion
        await expect(usingTheFridEmailInput).toHaveValue('QA_auto3@test.com');
    });

    test('Radio buttons', async ({ page }) => {

        const usingTheFridForm = await page.locator('nb-card', { hasText: "Using the Grid" });

        // click on a radio button 1
        await usingTheFridForm.getByLabel('option 1').check({ force: true }); // using force true because the radio button is set to visually-hidden
        await page.waitForTimeout(3000);

        const radioStatus1 = await usingTheFridForm.getByRole('radio', { name: 'option 1' }).isChecked(); // return true
        // click on a radio button 2
        await usingTheFridForm.getByRole('radio', { name: 'option 2' }).check({ force: true });

        // first way to assert using boolean true or false
        const radioStatus2 = await usingTheFridForm.getByRole('radio', { name: 'option 2' }).isChecked(); // return true
        const radioStatus1b = await usingTheFridForm.getByRole('radio', { name: 'option 1' }).isChecked(); // return false

        expect(radioStatus1).toBeTruthy();
        expect(radioStatus2).toBeTruthy();
        expect(radioStatus1b).toBeFalsy();

        // second way to assert using Playwright assertions
        await expect(usingTheFridForm.getByRole('radio', { name: 'option 2' })).toBeChecked();
    })
});

test('Checkbox', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    // with click
    await page.getByRole('checkbox', { name: 'Hide on click' }).click({ force: true });

    // with check
    await page.getByRole('checkbox', { name: 'Hide on click' }).check({ force: true });

    // with ischecked , it will verify if it is che ked or not
    await page.getByRole('checkbox', { name: 'Hide on click' }).isChecked();

    // with uncheck, it will make sure to just be unchecked
    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });

    // with click
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).click({ force: true });

    const allBoxes = await page.getByRole('checkbox');

    // create an arraw in plauywright by using .all()
    for (const box of await allBoxes.all()) {
        await box.check({ force: true });
        expect(await box.isChecked()).toBeTruthy();
    }

    for (const box of await allBoxes.all()) {
        await box.uncheck({ force: true });
        expect(await box.isChecked()).toBeFalsy();
    }
});

test('Liss and dropdowns', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    const dropDownMenu = await page.locator('ngx-header nb-select');
    await dropDownMenu.click();

    page.getByRole('list') // when the list has a UL tag
    page.getByRole('listitem') // when the list has a iL tag


    const optionlist = await page.getByRole('list').locator('nb-option');

    // or 

    const optionlist2 = await page.locator('nb-option-list nb-option');

    await expect(optionlist).toHaveCount(4);
    await expect(optionlist2).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);

    await optionlist.filter({ hasText: 'Cosmic' }).click();

    // validate the change of color 
    const header = await page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    // validate the change of color

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropDownMenu.click();
    for (const color in colors) {
        await optionlist.filter({ hasText: color }).click();
        await expect(header).toHaveCSS('background-color', colors[color]);
        if (color !== 'Corporate') {
            await dropDownMenu.click();
        }
    }
});

// on mac, in the inspector too, swtich to the source tab, then press command + \ ( back slash ) to freeze the screen , then go back to the element tab

test('Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    const tooltipCard = await page.locator('nb-card', { hasText: 'Tooltip Placements' });
    await tooltipCard.getByRole('button', { name: 'Top' }).hover();

    page.getByRole('tooltip'); // if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent();
    expect(tooltip).toEqual('This is a tooltip');

});

// Dialog boxes aka popup
test('Dialog boxes ', async ({ page }) => {
    await page.getByText('Tables & data').click();
    await page.getByText('Smart Table').click();

    // you need to create a listener
    page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        dialog.accept();
    })

    // click on the treash icon
    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click();
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
});

// Web table
test('Wabe table ', async ({ page }) => {
    await page.getByText('Tables & data').click();
    await page.getByText('Smart Table').click();

    //1 get the row by any test in this row
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' });
    await targetRow.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('35');
    await page.locator('.nb-checkmark').click();

    //2 update user with ID 11 with filter method
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    const targetRowByID = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') });
    await targetRowByID.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('noel.ly@motortrend.com');
    await page.locator('.nb-checkmark').click();

    await expect(targetRowByID.locator('td').nth(5)).toHaveText('noel.ly@motortrend.com');

    // 3 filter of the table
    const ages = ['20', '30', '40', '200'];

    for (const age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear();
        await page.locator('input-filter').getByPlaceholder('Age').fill(age);
        await page.waitForTimeout(500);

        const ageRows = page.locator('tbody tr')

        for (const row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent();

            if (age === '200') {
                expect(await page.getByRole('table').textContent()).toContain(' No data found');
            } else {
                expect(cellValue).toEqual(age);
            }
        }
    }
});


// date picker

test('Date picker', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();


    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();

    // exact match to be 1
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', { exact: true }).click();

    await expect(calendarInputField).toHaveValue('Nov 1, 2024');

});

// date picker
// choose date dynamically with javascript date object
// js date in google
test('Date picker Dynamic', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();


    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();

    let date = new Date();
    date.setDate(date.getDate() + 200);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });

    const expectedYear = date.getFullYear().toString();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
    console.log(dateToAssert);

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMponthAndyear = `${expectedMonthLong} ${expectedYear}`;


    while (!calendarMonthAndYear.includes(expectedMponthAndyear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    console.log(date);
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click();
    await expect(calendarInputField).toHaveValue(dateToAssert);

    console.log(dateToAssert);
});

// sliders
test('sliders', async ({ page }) => {

    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');

    // update  attribute for slider values ( x and y)
    await tempGauge.evaluate(node => {
        node.setAttribute('cx', '32');
        node.setAttribute('cy', '32');
    })
    await tempGauge.click();
    await expect(tempBox).toContainText('18');
    await page.waitForTimeout(2000);

    // mouse movement ( define bounding box)
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y + 100);
    await page.mouse.up();

    await expect(tempBox).toContainText('30');
});

