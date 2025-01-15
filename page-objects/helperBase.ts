import { Page } from "@playwright/test";


//Helper Base Class is used to keep common methods

export class HelperBase {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberofSeconds(numberOfSeconds: number) {
        await this.page.waitForTimeout(numberOfSeconds * 1000);
    }
}
