
import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./helperBase.page";


export class SEO extends HelperBase {

    readonly metaDescription: Locator;
    readonly heroText: Locator;

    constructor(page: Page) {
        super(page);
        this.metaDescription = page.locator('meta[name="description"]');
        this.heroText = page.locator('css=[data-package="Hero3Up"] > div > a[data-id="hero-card"] div div:nth-child(2) h2');
    }

    async ValidateMetaDescription(value) {
        const contentAttribute = await this.metaDescription.getAttribute('content');
        console.log(contentAttribute);

        await expect(contentAttribute).toEqual(value);
    }
}
