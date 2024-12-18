import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./helperBase.page";

export class Homepage extends HelperBase {
    readonly heroImage: Locator;
    readonly heroText: Locator;

    constructor(page: Page) {
        super(page);
        this.heroImage = page.locator('[data-package="Hero3Up"] > div > a[data-id="hero-card"] div div:nth-child(2)');
        this.heroText = page.locator('[data-package="Hero3Up"] > div > a[data-id="hero-card"] div div:nth-child(2) h2');
    }

    async navigateTo() {
        await this.page.goto('https://www.motortrend.com');
        await this.waitForNumberofSeconds(2);
    }

    async verifyHeroSection() {
        await this.heroImage.scrollIntoViewIfNeeded();
        await expect(this.heroImage).toBeVisible();
    }

    async verifyHeroArticle() {
        await this.heroText.scrollIntoViewIfNeeded();
        await expect(this.heroText).toBeVisible();
    }

    async verifyPageTitle(pageTitle) {
        await expect(this.page).toHaveTitle(pageTitle);
    }
}
