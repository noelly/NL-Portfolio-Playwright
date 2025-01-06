/* eslint-disable no-console */
import { expect, test, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./helperBase.page";

export class Ads extends HelperBase {
    readonly allAds: Locator;
    readonly allAdsIDs: Locator;
    adsonPage: any;

    constructor(page: Page) {
        super(page);
        this.allAds = page.locator('div[data-ad="true"] div');
        this.allAdsIDs = page.locator('div[data-ad="true"][data-google-query-id]');
    }

    async verifyAllAds(adCount: number, timeset?: number) {
        await test.step(`Verify ${adCount} ads are populating on the page`, async () => {
            const adsCount = await this.allAds.count();
            expect(adsCount).toBeGreaterThanOrEqual(adCount);
        });
    }

    async scrollThroughAllAds() {
        await test.step(`Scroll through all ads`, async () => {
            await this.page.waitForSelector('div[data-ad="true"][data-google-query-id]');
            const adsonPage = await this.allAds.all()
            await this.scrollToBottom();
            await this.waitForNumberofSeconds(1);
            await this.scrollToTop();
            await this.waitForNumberofSeconds(1);
            for (const ad of adsonPage) {
                await this.page.waitForTimeout(1000);
                expect(ad).not.toBeUndefined();
            }
        });
    }

    async VerifyAdsIDs(adCount: number) {
        await test.step(`Verify the ads ID for all ${adCount} ads`, async () => {
            const tmpArray = [];
            const adList = await this.page.$$('div[data-ad="true"][data-google-query-id]');
            for (let i = 0; i < adList.length; i++) {
                const listID = await adList[i].getAttribute('id');

                if (listID !== null) {
                    console.log(`-Ad ID: ${listID}`);
                }
            }
            const adsCount = await this.allAds.count();
            expect(adsCount).toBeGreaterThanOrEqual(adCount);
        });
    }
}
