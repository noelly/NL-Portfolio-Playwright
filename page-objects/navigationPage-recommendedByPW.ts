import { Locator, Page } from "@playwright/test";

// Class always starts with capital letter

export class NavigationPage {
    // field
    readonly page: Page
    readonly formLayoutsmmenuItem: Locator
    readonly datepickermmenuItem: Locator
    readonly toastermmenuItem: Locator
    readonly tooltipmmenuItem: Locator
    readonly SmartTablemmenuItem: Locator

    // constructor - separated from methods ( PW recommanded)
    constructor(page: Page) {
        this.page = page
        this.formLayoutsmmenuItem = page.getByText('Form Layouts');
        this.datepickermmenuItem = page.getByText('Datepicker');
        this.toastermmenuItem = page.getByText('Toastr');
        this.tooltipmmenuItem = page.getByText('Tooltip');
        this.SmartTablemmenuItem = page.getByText('Smart Table');
    }

    // methods
    async formmLayoutsPage() {
        await this.selectGrouMenuItem('Forms');
        await this.formLayoutsmmenuItem.click();
    }

    async datepickerPage() {
        await this.selectGrouMenuItem('Forms');
        await this.datepickermmenuItem.click();
    }

    async toasterPage() {
        await this.selectGrouMenuItem('Modal & Overlays');
        await this.toastermmenuItem.click();
    }

    async tooltipPage() {
        await this.selectGrouMenuItem('Modal & Overlays');
        await this.tooltipmmenuItem.click();
    }

    async SmartTablePage() {
        await this.selectGrouMenuItem('Tables & data');
        await this.SmartTablemmenuItem.click();
    }

    // healper method : make a private method that is not usable or visible outside of this class or file
    private async selectGrouMenuItem(groupItemTitle: string) {
        const groupMenutIteam = await this.page.getByTitle(groupItemTitle);
        const expendedState = await groupMenutIteam.getAttribute('aria-expanded');
        if (expendedState === 'false') {
            await groupMenutIteam.click();
        }
        await this.page.waitForTimeout(1000);
    }
}