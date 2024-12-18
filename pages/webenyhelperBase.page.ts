import { Page } from "@playwright/test";

export class HelperBase {
    
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberofSeconds(numberOfSeconds: number) {
        await this.page.waitForTimeout(numberOfSeconds * 1000);
    }

    async waitForPageLoad() {
    //__wait for particular response to be complete
    await this.page.waitForResponse('https://t.webiny.com/capture/')

    //__wait for all netwarks calls to be completed (not recommended) / if calls dont complete , test qill stall
    await this.page.waitForLoadState('networkidle');  
    }
}
