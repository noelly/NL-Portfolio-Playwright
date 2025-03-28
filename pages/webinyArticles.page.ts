import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./webinyhelperBase.page";

export class WebinyArticles extends HelperBase {
    readonly articlesHeader: Locator;
    readonly authorColumn: Locator;
    readonly closeButton: Locator;
    readonly confirmButton: Locator;
    readonly contentList: Locator;
    readonly deleteButton: Locator;
    readonly filterButton: Locator;
    readonly filterByAuthor: Locator;
    readonly filterByStatus: Locator;
    readonly filterByType: Locator;
    readonly listOfArticles: Locator;
    readonly statusColumn: Locator;
    readonly successMessage: Locator;
    readonly userDropDown: Locator;

    constructor(page: Page) {
        super(page);
        this.articlesHeader = page.locator('[class="css-8yntog efbsdge1"]');
        this.authorColumn = page.locator('[class*="cms-aco-list-createdBy"]');
        this.closeButton = page.getByRole('button', { name: 'Close' });
        this.confirmButton = page.getByRole('button', { name: 'Confirm' });
        this.contentList = page.locator('[class="mdc-data-table__content"]');
        this.deleteButton = page.locator('[class="webiny-ui-tooltip tooltip-content-wrapper"] button');
        this.filterButton = page.locator('[data-testid="cms.list-entries.toggle-filters"]');
        this.filterByAuthor = page.locator('[placeholder="Filter by user"]');
        this.filterByStatus = page.locator('select[tabindex="0"]', { hasText: 'Filter by Status' });
        this.filterByType = page.locator('select[tabindex="0"]', { hasText: 'Filter by Type' });
        this.listOfArticles = page.locator('[class="css-l8l8b8 eqame0c0 mdc-typography--subtitle2"]');
        this.statusColumn = page.locator('[class*="cms-aco-list-status"]');
        this.successMessage = page.locator('[class="webiny-ui-dialog__title mdc-dialog__title"]', { hasText: 'Trash entries' });
        this.userDropDown = page.locator('ul li');
    }

    async isArticlesPageDisplayed() {
        await this.articlesHeader.waitFor({ timeout: 10000 });
        await expect(this.articlesHeader).toBeVisible();
        await expect(this.articlesHeader).toContainText('Articles');
        await this.contentList.isVisible({ timeout: 10000 });
    }

    async isArticleListDisplayed() {
        await this.articlesHeader.waitFor({ timeout: 10000 });
        await expect(this.articlesHeader).toBeVisible();
        await expect(this.articlesHeader).toContainText('Articles');
    }

    async cleanupPagesByAuthor(author: string) {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        const authorRow = this.page.locator('[class="rmwc-data-table__row mdc-data-table__row"]', { hasText: author }).first();
        if (await authorRow.isVisible({ timeout: 2000 })) {
            console.log('Test page found from author ' + author + ' - Deleting...');
            await this.selectAndDeleteByAuthor(author);
        } else {
            console.log('There are no test page listed from author ' + author);
        }
    }

    async selectAndDeleteByAuthor(author: string) {
        const targetRow = this.page.getByRole('row', { name: author });
        for (const box of await targetRow.all()) {
            await box.getByRole('checkbox').click();
        }
        await expect(this.deleteButton).toHaveCount(4);
        await this.deleteButton.nth(3).click();
        await this.confirmButton.click();
        await this.successMessage.isVisible({ timeout: 20000 });
        await expect(this.successMessage).toHaveText('Trash entries', { timeout: 10000 });
        await this.closeButton.click();
    }

    async cleanupPagesByTitle(title: string) {
        await this.page.waitForTimeout(2000);
        const titleRow = this.page.locator('[class="rmwc-data-table__row mdc-data-table__row"]', { hasText: title }).first();
        if (await titleRow.isVisible({ timeout: 2000 })) {
            console.log('Test page found with title ' + title + ' - Deleting...');
            await this.selectAndDeleteByTitle(title);
        } else {
            console.log('There are no test page listed with title ' + title);
        }
    }

    async selectAndDeleteByTitle(title: string) {
        const targetRow = this.page.getByRole('row', { name: title });
        for (const box of await targetRow.all()) {
            await box.getByRole('checkbox').click();
        }
        await expect(this.deleteButton).toHaveCount(4);
        await this.deleteButton.nth(3).click();
        await this.confirmButton.click();
        await this.successMessage.isVisible({ timeout: 20000 });
        await expect(this.successMessage).toHaveText('Trash entries', { timeout: 10000 });
        await this.closeButton.click();
    }

    async validateAllArticlesOnList(count = 50) {
        await expect(this.listOfArticles).toHaveCount(51);
        console.log(await this.listOfArticles.allTextContents());
    }

    async verifyFilterByStatus(status: string) {
        await this.filterButton.click({ timeout: 5000 });
        await expect(this.filterByStatus).toBeVisible();
        await this.filterByStatus.click();
        await this.filterByStatus.selectOption({ label: status });
        await this.page.waitForLoadState('networkidle');
        console.log('List of articles filtered by status ' + status);
        const statusColumn = await this.page.locator('[class*="cms-aco-list-status"]');
        await this.page.waitForTimeout(3000);
        await statusColumn.nth(1).waitFor({ timeout: 10000 });
        await statusColumn.locator('[class*="cms-aco-list-status"]', { hasText: status }).isVisible({ timeout: 10000 });
        await this.page.waitForTimeout(3000);
        expect(await statusColumn.nth(1).textContent()).toContain(status), ({ timeout: 10000 });
        console.log(await this.listOfArticles.allTextContents());
        await this.filterButton.click({ timeout: 5000 });
        await this.page.waitForTimeout(1000);
        await expect(this.filterByStatus).not.toBeVisible();
    }

    async verifyFilterByType(type: string) {
        await this.filterButton.click({ timeout: 5000 });
        await expect(this.filterByStatus).toBeVisible();
        await this.filterByType.click();
        await this.filterByType.selectOption({ label: type });
        await this.page.waitForTimeout(2000);
        console.log('List of articles filtered by type ' + type);
        console.log(await this.listOfArticles.allTextContents());

        expect(await this.listOfArticles.allTextContents()).toBeTruthy();
        await this.filterButton.click({ timeout: 5000 });
        await this.page.waitForTimeout(1000);
        await expect(this.filterByType).not.toBeVisible();
    }

    async verifyFilterByAuthor(author: string) {
        await this.filterButton.click({ timeout: 5000 });
        await expect(this.filterByStatus).toBeVisible();
        console.log('List of articles filtered by type ' + author);
        await this.filterByAuthor.click();
        await this.filterByAuthor.pressSequentially(author, { delay: 100 });

        const selectUser = this.page.locator('ul li', { hasText: author });
        await selectUser.first().click();
        await this.page.waitForTimeout(2000);
        const numbersOfArticles = await this.listOfArticles.count();
        console.log(`${numbersOfArticles} articles filtered by type ${author}`);
        expect(await this.listOfArticles.allTextContents()).toBeTruthy();
        console.log(await this.listOfArticles.allTextContents());

        await this.filterButton.click({ timeout: 5000 });
        await this.page.waitForTimeout(1000);
        await expect(this.filterByType).not.toBeVisible();
    }
}
