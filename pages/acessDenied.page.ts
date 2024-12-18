import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./helperBase.page";

export class AccessDenied extends HelperBase {

    readonly header: Locator;
    readonly reference: Locator;
    readonly errorLink: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator('h1');
        this.reference = page.locator('body p:nth-child(2)');
        this.errorLink= page.locator('body p:nth-child(3)');
    }

    async goto() {
        await this.page.goto('https://www.motortrend.com');
    }

    async isAccessDenied(pageTitle) {
        await this.header.scrollIntoViewIfNeeded();
        await expect(this.header).toBeVisible();

        const header = await (this.header).textContent();
        const refereceId = await (this.reference).allTextContents();
        const link = await (this.errorLink).allTextContents();

        if (await header === "Access Denied") {

            const timestamp = new Date().getTime();
            const myDate = new Date(timestamp);
            const pstDate = myDate.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

            await this.page.screenshot({ path: 'screenshots/error-' + await pstDate + '.png' });
            console.log(`Page did not load properly :  ${header}`);
            console.log(`Timestamp :  ${pstDate}`);
            console.log(`${refereceId} `);
            console.log(`${link} `);

            await expect(this.page).toHaveTitle("Access Denied");
        } else {
            console.log(`Page loaded properly :  ${header} `);
            await expect(this.page).not.toHaveTitle('Access Denied');
        }
    }
}
