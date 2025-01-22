import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./webinyhelperBase.page";

export class Newsletters extends HelperBase {
    readonly pageHeader: Locator;
    readonly subheader: Locator;
    readonly addedMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.pageHeader = page.locator('[class="mb-6 text-center"] h1');
        this.subheader = page.locator('[class="mb-6 text-center"] h2');
        this.addedMessage = page.getByText('Added');
    }

    async verifyNewsletterPage() {
        await this.pageHeader.isVisible();
        await expect(this.page).toHaveURL(/.*newsletters/);
        await expect(this.page.url()).toContain('/newsletters/');
        await expect(this.pageHeader).toHaveText('Newsletters');
        await expect(this.subheader).toHaveText('All your favorites in your inbox.');
    }

    async newslettersSignup(Brand, email) {
        await this.page.waitForTimeout(2000);
        await this.selectnewslettersbrand(Brand);
        await this.page.waitForTimeout(2000);
        await this.enterEmail(email);
        await this.selectTOSCheckbox();
        await this.clickSignUp();;
        await this.verifySignupConfirmation();
    }

    private async selectnewslettersbrand(Brand) {
        const AddButtonHR = await this.page.locator('[data-id="newsletters-add-hot-rod"]');
        const AddButtonMT = await this.page.locator('[data-id="newsletters-add-motortrend"]');

        if (Brand === 'HOT ROD') {
            await AddButtonHR.click({ force: true });
        } else if (Brand === 'MotorTrend') {
            const addButton = AddButtonMT;
            await AddButtonMT.click({ force: true });
        } else {
            throw new Error('Invalid Brand');
        }
        await this.page.waitForTimeout(2000);
        expect(this.addedMessage).toBeVisible();
    }

    private async enterEmail(email) {
        await this.page.getByPlaceholder('Email').click();
        await this.page.getByPlaceholder('Email').fill(email);
        console.log(`Signup with email: ${email}`);
    }

    private async clickSignUp() {
        await this.page.getByRole('button', { name: 'Sign Up' }).click();
    }

    private async selectTOSCheckbox() {
        const checkbox = await this.page.getByRole('checkbox');
        await checkbox.click();
        expect(checkbox).toBeChecked();
    }

    private async verifySignupConfirmation() {
        const signupConfirmation = await this.page.locator('h4', { hasText: 'Success' });
        await expect(signupConfirmation).toBeVisible({ timeout: 35000 });
    }
}
