import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./helperBase.page";
import fs from 'fs';
import path from 'path';
import { stringify } from 'csv-stringify/sync';
import { parse } from 'csv-parse/sync';

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

    async verifyAllheaders(options) {
        console.log(await this.allHeaders.allTextContents());
        await expect(this.allHeaders).toHaveCount(4);
        await expect(this.allHeaders).toHaveText(options);

        for (let i = 0; i < options.length; i++) {
            await this.allHeaders.nth(i).scrollIntoViewIfNeeded();
            await expect(this.allHeaders.nth(i)).toBeVisible();
        }
    }

    async verifyAllarticles() {
        const allTitles = await this.allArticles.allTextContents();
        console.log(allTitles);
        expect(allTitles).toBeTruthy();
        expect(allTitles.length).toBeGreaterThanOrEqual(30);

        for (let i = 0; i < allTitles.length; i++) {
            await expect(this.allHeaders.nth(i)).toBeTruthy();
        }
    }

    async getRiverArticles(count) {
        const riverArticles = this.page.locator('[data-ids="CardMedia"]');
        await expect(riverArticles).toHaveCount(count);

    }
}
