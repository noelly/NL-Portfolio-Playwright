import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./helperBase.page";
import * as fs from 'fs/promises';

export class Homepage extends HelperBase {
    readonly heroImage: Locator;
    readonly heroText: Locator;
    readonly allHeaders: Locator;
    readonly allArticles: Locator;

    constructor(page: Page) {
        super(page);
        this.heroImage = page.locator('[data-package="Hero3Up"] > div > a[data-id="hero-card"] div div:nth-child(2)');
        this.heroText = page.locator('[data-package="Hero3Up"] > div > a[data-id="hero-card"] div div:nth-child(2) h2');
        this.allHeaders = page.locator('h2[id*=":"]');
        this.allArticles = page.locator('h2[data-card-title="true"]');
    }

    async navigateTo() {
        await this.page.goto(process.env.URL!);
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

    async verifyAllheaders(options) {
        console.log(await this.allHeaders.allTextContents());
        await expect(this.allHeaders).toHaveCount(3);
        await expect(this.allHeaders).toHaveText(options);

        for (let i = 0; i < options.length; i++) {
            await this.allHeaders.nth(i).scrollIntoViewIfNeeded();
            await expect(this.allHeaders.nth(i)).toBeVisible();
        }
    }

    async verifyAllarticles() {
        const allTitles = await this.allArticles.allTextContents();
 
        expect(allTitles).toBeTruthy();
        expect(allTitles.length).toBeGreaterThanOrEqual(30);

        for (let i = 0; i < allTitles.length; i++) {
            await expect(this.allHeaders.nth(i)).toBeTruthy();
        }
        console.log(allTitles);
        const data = JSON.stringify(allTitles, null, 2);
        await fs.writeFile('data/allHPTitles.json', data);
    }

    async getRiverArticles(count) {
        const riverArticles = await this.page.locator('[data-ids="CardMedia"]');
        const riverArticlesCount = await riverArticles.count();
        await expect(riverArticlesCount).toBeGreaterThanOrEqual(count);

    }

    async selectJoinNewsletter() {
        await this.scrollToBottom();
        await this.page.locator('[data-id="join-newsletter"]').click();
        await this.closeVignetteAd();
    }

    async verifyPrivacyPolicy() {
        const DoNotSell = await this.page.getByText('Do Not Sell or Share My Personal Information').first();
        const CookieSettings = await this.page.getByText('Cookie Settings').first();

        if (await DoNotSell.isVisible()) {
            await DoNotSell.click();
            console.log('Do Not Sell or Share My Personal Information selected');
            await this.closeVignetteAd();
            await this.page.waitForTimeout(2000);
            await this.page.screenshot({ path: 'GeolocationA.png' });
        } else {
            await CookieSettings.click();
            console.log('Cookie settings selected');
            await this.closeVignetteAd();
            await this.page.waitForTimeout(2000);
            await this.page.screenshot({ path: 'GeolocationB.png' });
        }
    }
}
