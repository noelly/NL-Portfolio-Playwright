import { expect, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

// Class always starts with capital letter

export class DatePickerPage extends HelperBase {
    // field

    // constructor 
    constructor(page: Page) {
        super(page);
    }

    // methods
    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
        const dateToAssert = await this.selectDateInTeCalendar(numberOfDaysFromToday);
        await expect(calendarInputField).toHaveValue(dateToAssert);

        console.log(dateToAssert);
    }


    async selectDatePickWithRageFromToday(StartDayFormToday: number, EndDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();
        const dateToAssertStart = await this.selectDateInTeCalendar(StartDayFormToday);
        const dateToAssertEnd = await this.selectDateInTeCalendar(StartDayFormToday);
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
        await expect(calendarInputField).toHaveValue(dateToAssert);
        console.log(dateToAssert);


    }

    private async selectDateInTeCalendar(numberOfDaysFromToday: number) {

        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });

        const expectedYear = date.getFullYear().toString();
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
        console.log(dateToAssert);

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMponthAndyear = `${expectedMonthLong} ${expectedYear}`;


        while (!calendarMonthAndYear.includes(expectedMponthAndyear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        console.log(date);
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click();
        return dateToAssert
    }

}
