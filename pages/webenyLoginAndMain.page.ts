import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./webenyhelperBase.page";
import { WebenyArticles } from "./webenyArticles.page";
import assert from 'assert';

export class WebenyLoginAndMain extends HelperBase {
    readonly createArticleButton: Locator
    readonly createCurationButton: Locator
    readonly createVideoButton: Locator
    readonly emailField: Locator
    readonly hamburgerMenu: Locator
    readonly heroImage: Locator;
    readonly heroText: Locator;
    readonly loginFormContainer: Locator
    readonly motortrendLogo: Locator
    readonly passwordField: Locator
    readonly signInHeader: Locator
    readonly submitButton: Locator
    readonly userLoggedinIcon: Locator
    readonly viewArticlesButton: Locator
    readonly viewCurationButton: Locator
    readonly viewVideosButton: Locator

    constructor(page: Page) {
        super(page);
        this.createArticleButton = page.getByRole('link', { name: 'New Article' });
        this.createCurationButton = page.getByRole('link', { name: 'New Curation' });
        this.createVideoButton = page.getByRole('link', { name: 'New Video' });
        this.emailField = page.getByRole('textbox', { name: 'your e-mail' });
        this.hamburgerMenu = page.locator('button[data-testid="apps-menu"]');
        this.loginFormContainer = page.getByRole('form');
        this.motortrendLogo = page.locator('[class="mdc-top-app-bar__row"] a[href="/"] svg');
        this.passwordField = page.getByRole('textbox', { name: 'password' });;
        this.signInHeader = page.getByRole('heading', { name: 'Sign In' });
        this.submitButton = page.getByRole('button');
        this.userLoggedinIcon = page.locator('[data-testid="logged-in-user-menu-avatar"]');
        this.viewArticlesButton = page.getByRole('link', { name: 'View Articles' });
        this.viewCurationButton = page.getByRole('link', { name: 'View Curation' });
        this.viewVideosButton = page.getByRole('link', { name: 'View Videos' });
    }

    async navigateToCMS() {
        await this.page.goto('https://cms.dev.motortrend.com/');
        // await this.waitForPageLoad();
        await this.motortrendLogo.isVisible({ timeout: 15000 });
    }

    async loginWithUser(email: string, password: string) {
        await this.emailField.waitFor({ timeout: 10000 });
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.submitButton.click();
        await expect(this.userLoggedinIcon).toBeVisible({ timeout: 10000 });
    }

    async navigateToViewArticles() {
        await this.motortrendLogo.click();

        this.page.on('dialog', async dialog => {
            assert(dialog.type() === 'beforeunload');
            await dialog.accept();
        });

        await this.createArticleButton.isVisible({ timeout: 10000 });
        const webenyArticles = new WebenyArticles(this.page);
        await this.viewArticlesButton.click();
        await webenyArticles.isArticlesPageDisplayed();
    }

    async navbigateToViewVideos() {
        await this.viewVideosButton.click();
    }

    async navigateToViewCuration() {
        await this.viewCurationButton.click();
    }

    async navigateToCreateArticle() {
        await this.motortrendLogo.click();
        const webenyArticles = new WebenyArticles(this.page);
        await this.createArticleButton.isVisible({ timeout: 10000 });
        await this.createArticleButton.click();
        await webenyArticles.isArticlesPageDisplayed();
    }

    async navigateToCreateVideo() {
        await this.createVideoButton.click();
    }

    async navigateToCreateCuration() {
        await this.createCurationButton.click();
    }

    async returnToMainPage() {
        await this.motortrendLogo.click();
    }
}
