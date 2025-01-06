import { expect, Locator, Page } from "@playwright/test";

export class HelperBase {

    readonly page: Page
    readonly vignetteAds: Locator;
    readonly vignetteAdClose: Locator;

    constructor(page: Page) {
        this.page = page;
        this.vignetteAds = page.locator('[id="ad_position_box"]');
        this, this.vignetteAdClose = page.locator('[class="btn skip"]');
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

    async closeVignetteAd() {
        console.log('Vignette ad found  - dismissing...');
        // switch iframe
        const frame = this.page.frameLocator('iframe[id="google_ads_iframe_/3833/motortrend.primedia.com/homepage/null/interstitial_0"]');
        const closeAd = frame.locator('[class="btn skip"]');
        await closeAd.click();
    }

    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
    }

    async scrollToMiddle() {
        await this.page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
    }

    async scrollToTop() {
        await this. page.keyboard.down("PageUp");
    }
}
