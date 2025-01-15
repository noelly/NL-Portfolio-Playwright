import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

// Class always starts with capital letter

export class NavigationPage extends HelperBase {
    // field

    // constructor - KISS
    constructor(page: Page) {
        super(page);
    }

    // methods with locatos (KISS)
    async formmLayoutsPage() {
        await this.selectGrouMenuItem('Forms');
        await this.page.getByText('Form Layouts').click();
        await this.waitForNumberofSeconds(2);
    }

    async datepickerPage() {
        await this.selectGrouMenuItem('Forms');
        await this.page.getByText('Datepicker').click();
    }

    async toasterPage() {
        await this.selectGrouMenuItem('Modal & Overlays');
        await this.page.getByText('Toastr').click();
    }

    async tooltipPage() {
        await this.selectGrouMenuItem('Modal & Overlays');
        await this.page.getByText('Tooltip').click();
    }

    async SmartTablePage() {
        await this.selectGrouMenuItem('Tables & data');
        await this.page.getByText('Smart Table').click();
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
