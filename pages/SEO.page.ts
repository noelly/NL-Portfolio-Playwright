import { expect, test, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./helperBase.page";

export class SEO extends HelperBase {
    readonly canonicalUrl: Locator;
    readonly genre: Locator;
    readonly metaDescription: Locator;
    readonly heroText: Locator;
    readonly webpageScript: Locator;

    constructor(page: Page) {
        super(page);
        this.canonicalUrl = page.locator('link[rel="canonical"]');
        this.genre = page.locator('meta[name="genre"]');
        this.metaDescription = page.locator('meta[name="description"]');
        this.webpageScript = page.locator('script[type="application/ld+json"]');
    }

    async VerifyGlobalSEOValues(
        canonicalUrl: string,
        url: string, 
        metaDescription: string, 
        pageTitle: string,
        genre: string
    ) {
        await this.navigateTo(url);
        await this.ValidateMetaDescription(metaDescription);
        await this.verifyPageTitle(pageTitle);
        await this.verifyCanonicalURL(canonicalUrl);
        await this.verifyGenre(genre);
    }

    private async navigateTo(URL: string) {
        await test.step(`Navigate to ${URL}`, async () => {
            await this.page.goto(URL);
            await this.waitForNumberofSeconds(2);
        });
    }

    private async ValidateMetaDescription(value: string) {
        await test.step(`Validate Meta Description`, async () => {
            const contentAttribute = await this.metaDescription.getAttribute('content');
            await expect(contentAttribute).toEqual(value);
        });
    }

    private async verifyPageTitle(value: string) {
        await test.step(`Validate Page Title`, async () => {
            await expect(this.page).toHaveTitle(value);
        });
    }

    private async verifyCanonicalURL(value: string) {
        await test.step(`Verify Canonical URL`, async () => {
            await expect(this.canonicalUrl).not.toBeNull();
            const canonicalUrl = await this.canonicalUrl.getAttribute('href');
            await expect(canonicalUrl).toEqual(value);
        });
    }

    private async verifyGenre(value: string) {
        await test.step(`Verify Genre`, async () => {
            await expect(this.webpageScript).not.toBeNull();
            const script = await this.webpageScript.first().allTextContents();
            console.log(script);
            await expect(script).toContain('{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"logo\":{\"@type\":\"ImageObject\",\"height\":\"400\",\"url\":\"https://www.motortrend.com/logo/motortrend-og.png\",\"width\":\"2000\"},\"name\":\"MotorTrend\",\"sameAs\":[\"https://www.motortrend.com\",\"https://www.facebook.com/motortrend\",\"https://www.twitter.com/motortrend\",\"https://www.tiktok.com/@motortrend\",\"https://www.pinterest.com/motortrend/\",\"https://news.google.com/publications/CAAiECWMoBt4reCJiRm9DCctzXoqFAgKIhAljKAbeK3giYkZvQwnLc16?hl=en-US&gl=US&ceid=US%3Aen\",\"https://www.instagram.com/motortrend\",\"https://www.youtube.com/user/MotorTrend/\"],\"url\":\"https://www.motortrend.com\"}');
        });
    }
}
