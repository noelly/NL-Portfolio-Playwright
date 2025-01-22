import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./webinyhelperBase.page";
import { get } from 'http';
import { console } from 'inspector';

export class CreateArticle extends HelperBase {
    readonly bodyField: Locator;
    readonly boldButton: Locator;
    readonly bulletListButton: Locator;
    readonly canonicalUrl: Locator;
    readonly canonicalUrlButton: Locator;
    readonly clearDateTimeButton: Locator;
    readonly closeButton: Locator;
    readonly confirmButton: Locator;
    readonly contentList: Locator;
    readonly contentTab: Locator;
    readonly contributorField: Locator;
    readonly contributorRole: Locator;
    readonly dialogCloseButton: Locator;
    readonly editDateTimeButton: Locator;
    readonly entryAuditDialog: Locator;
    readonly entryAuditDialogCloseButton: Locator;
    readonly entryTypeButton: Locator;
    readonly entryTypeDescription: Locator;
    readonly entryTypeDialog: Locator;
    readonly entryTypeField: Locator;
    readonly entryTypeFieldOptions: Locator;
    readonly italicButton: Locator;
    readonly mediaTab: Locator;
    readonly orderedListButton: Locator;
    readonly permalink: Locator;
    readonly previewButton: Locator;
    readonly publishButton: Locator;
    readonly publishOnButton: Locator;
    readonly publishOnTitle: Locator;
    readonly publishOnValue: Locator;
    readonly relationalTab: Locator;
    readonly saveButton: Locator;
    readonly selectImageBtn: Locator;
    readonly seoTab: Locator;
    readonly setDateTimeButton: Locator;
    readonly strikeButton: Locator;
    readonly subtitleField: Locator;
    readonly taxonomieField: Locator;
    readonly threeDotMenuArticle: Locator;
    readonly titleField: Locator;
    readonly underlineButton: Locator;

    constructor(page: Page) {
        super(page);
        this.bodyField = page.locator('[class*="ql-editor"] p');
        this.boldButton = page.locator('[class*="ql-bold"]');
        this.bulletListButton = page.locator('[value*="bullet"]');
        this.canonicalUrl = page.locator('[class="article-canonical-url-container"]').locator('input');
        this.canonicalUrlButton = page.locator('[class="article-canonical-url-container"] button');
        this.clearDateTimeButton = page.getByRole('button', { name: 'Clear date/time' });
        this.closeButton = page.getByRole('button', { name: 'Close' });
        this.confirmButton = page.locator('button', { hasText: 'Yes, publish!' });
        this.contentList = page.locator('[class="mdc-data-table__content"]');
        this.contentTab = page.getByText('Content');
        this.contributorField = page.locator('input[aria-labelledby="textfield-Contributor-label"]').first();
        this.contributorRole = page.locator('[data-testid="fr.input.select.Contributor Role"]');
        this.dialogCloseButton = page.locator('[class*="mdc-dialog--open"] [data-testid="dialog-accept"]');
        this.editDateTimeButton = page.getByRole('button', { name: 'Edit date/time' });
        this.entryAuditDialog = page.locator('[class="mdc-dialog__surface"]').locator('h2', { hasText: 'Entry Audit' });
        this.entryAuditDialogCloseButton = page.locator('[class="entry-audit-dialog webiny-ui-dialog mdc-dialog mdc-dialog--open"]').locator('button', { hasText: 'Close' });
        this.entryTypeButton = page.getByRole('button', { name: 'Entry Type' });
        this.entryTypeDescription = page.locator('[class="settings-button-value"]').first();
        this.entryTypeDialog = page.locator('[class="mdc-dialog__surface"]').locator('h2', { hasText: 'Entry Settings' });
        this.entryTypeField = page.locator('[class*="mdc-dialog--open"] [data-testid="fr.input.select.Type"]');
        this.entryTypeFieldOptions = page.locator('[class*="mdc-dialog mdc-dialog--open"] [data-testid="fr.input.select.Type"] option');
        this.italicButton = page.locator('[class*="ql-italic"]');
        this.mediaTab = page.locator('[class="mdc-tab"]', { hasText: 'Media' });;
        this.orderedListButton = page.locator('[value*="ordered"]');
        this.permalink = page.locator('.settings-permalink');
        this.previewButton = page.getByRole('button', { name: 'Preview' });
        this.publishButton = page.getByRole('button', { name: 'Publish' });
        this.publishOnButton = page.getByRole('button', { name: 'Publish on' });
        this.publishOnTitle = page.locator('[class="settings-button future-date"]').locator('span[class="settings-button-title"]');
        this.publishOnValue = page.locator('[class="settings-button future-date"]').locator('span[class="settings-button-value"]');
        this.relationalTab = page.locator('[class="mdc-tab"]', { hasText: 'Relational' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.selectImageBtn = page.locator('[data-role="select-image"]');
        this.seoTab = page.locator('[class="mdc-tab"]', { hasText: 'SEO' });;
        this.setDateTimeButton = page.getByRole('button', { name: 'SET DATE & TIME' });
        this.strikeButton = page.locator('[class*="ql-strike"]');
        this.subtitleField = page.locator('[data-testid="fr.input.text.Subtitle"]');
        this.taxonomieField = page.locator('[class*="taxonomy-select"] input');
        this.threeDotMenuArticle = page.getByRole('menuitem', { name: 'Delete Entry' });
        this.titleField = page.locator('[data-testid="fr.input.text.Title"]');
        this.underlineButton = page.locator('[class*="ql-underline"]');
    }

    async createFormattedArticle(type: string, title: string, subtitle: string, body: string, bold: string, italic: string, taxonomies: string, contributor: string, role: string) {
        await this.selectArticleType(type);
        await this.addContent(title, subtitle, body);
        await this.addBoldContent(bold);
        await this.addItalicContent(italic);
        await this.addRelational(taxonomies, contributor, role);
        await this.verifyPermalink(type);
        await this.addMedia();
        await this.saveAndVerify('Entry saved successfully!');
    }

    async createNewArticle(type: string, title: string, subtitle: string, body: string, taxonomies: string, contributor: string, role: string) {
        await this.selectArticleType(type);
        await this.addContent(title, subtitle, body);
        await this.addRelational(taxonomies, contributor, role);
        await this.verifyPermalink(type);
        await this.addMedia();
        await this.saveAndVerify('Entry saved successfully!');
    }

    async saveAndVerify(message: string) {
        await this.saveButton.click();
        await this.page.waitForLoadState('networkidle');
        const successMessage = this.page.locator('[class="mdc-snackbar__label"]', { hasText: message });
        const text = await successMessage.allTextContents();
        await expect(successMessage).toBeVisible({ timeout: 20000 });
    }

    async publishArticle() {
        await this.seoTab.click();
        await this.updateCanonicalUrl();
        await this.publishButton.click();
        await this.confirmButton.click();
        const successMessage = this.page.locator('[class="mdc-snackbar__label"]', { hasText: 'was published successfully!' });
        await expect(successMessage).toBeVisible({ timeout: 10000 });
        const publishedOn = await this.publishOnValue.allTextContents();
        console.log('Published on: ' + publishedOn);
    }

    async schedulePublish() {
        await this.setDateTimeButton.click();
        await this.editDateTimeButton.click();
        await this.closeButton.click();
    }

    async schedulePublishInFuture(year: string, month: string, day: string, hour: string, minute: string, second: string) {
        await this.setDateTimeButton.click();
        await this.editDateTimeButton.click();

        const yearField = this.page.getByLabel('Year').locator('input');
        const monthField = this.page.getByLabel('Month').locator('input');
        const dayField = this.page.getByLabel('Day').locator('input');
        const hourField = this.page.getByLabel('Hour').locator('input');
        const minuteField = this.page.getByLabel('Minute').locator('input');
        const secondField = this.page.getByLabel('second').locator('input');

        const monthlist = await this.page.locator('[id*="downshift-23"]').locator('li');
        // or 

        await expect(monthlist).toHaveCount(12);
        await expect(monthlist).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);

        await monthlist.filter({ hasText: month }).click();

        await yearField.fill(year);
        await hourField.fill(hour);
        await minuteField.fill(minute);
        await secondField.fill(second);


        // await this.page.addLocatorHandler(this.page.getByText('Entry Settings'), async () => {
        //     await this.closeButton.click();
        // });

        await this.closeButton.click();

        const puplishedTimeStamp = await this.publishOnValue.allTextContents();
        const formattedPublishedTimeStamp = puplishedTimeStamp[0]
            .replace("PT", "")
            .replace(/(\d+)\/(\d+)\/(\d+)/, "$1/$2/20$3")
            .replace(' 0', ' ');

        const currentDate = new Date();
        const enteredDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${hour}:${minute}:${second}`;

        await expect(this.publishOnTitle).toContainText('Scheduled for');

        await expect(formattedPublishedTimeStamp).toContain(`${month}/${day}/${year} ${hour}:${minute}`);
        console.log(formattedPublishedTimeStamp)
    }

    async previewArticle() {
        await this.seoTab.click();
        await this.page.waitForTimeout(1000);
        await this.updateCanonicalUrl();
        await this.previewButton.click();
        await this.page.waitForTimeout(1000);

        const newtab = await this.page.context().waitForEvent('page');
        await newtab.waitForLoadState('networkidle');

        const url = newtab.url();
        console.log('Tab preview URL: ' + url);
        expect(url).toContain('https://www.motortrend.com/draft/');
        await newtab.close();
        await this.saveAndVerify('Entry saved successfully!');
    }

    async verifyNewArticleInArticleList(title: string, author: string, status?: string) {
        const authorRow = this.page.locator('[class="rmwc-data-table__row mdc-data-table__row"]', { hasText: title }).first();
        await this.page.waitForLoadState('networkidle');
        while (await authorRow.count() < 1) {
            await this.page.reload();
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(1000);
        }
        expect(await authorRow.count()).toBeGreaterThan(0);
        await authorRow.isVisible({ timeout: 10000 });
        await expect(authorRow).toContainText(title, { timeout: 10000 });
        // await expect(authorRow).toContainText('seconds ago', { timeout: 10000 });
    }


    private async updateCanonicalUrl() {
        const currentCanonicalUrl = await this.canonicalUrl.getAttribute('value');
        const newCanonicalUrl = currentCanonicalUrl?.toLocaleLowerCase().replaceAll('beta', 'preprod');
        await this.canonicalUrlButton.isVisible({ timeout: 10000 });
        await this.canonicalUrlButton.click();
        await this.page.waitForTimeout(1000);
        await this.canonicalUrl.click();
        await this.page.waitForTimeout(1000);
        await this.canonicalUrl.clear();
        await this.canonicalUrl.fill(`${newCanonicalUrl}`);
        console.log('New canonical URL: ' + newCanonicalUrl);
        await this.page.waitForTimeout(1000);
    }

    private async selectArticleType(type: string) {
        await this.page.waitForTimeout(1000);
        await this.entryTypeButton.click();
        await this.page.waitForTimeout(1000);
        await this.entryTypeField.click();
        await this.page.waitForTimeout(1000);

        await expect(this.entryTypeFieldOptions).toHaveCount(4);
        await expect(this.entryTypeFieldOptions).toHaveText(['Regular Article', 'Listicle', 'Buying Guide', 'YMM Review'], { timeout: 10000 });
        await this.entryTypeField.click();
        await this.entryTypeField.selectOption(type);

        await this.page.waitForTimeout(1000);
        await this.dialogCloseButton.click();
        await this.entryTypeDescription.waitFor({ timeout: 10000 });
        expect(await this.entryTypeDescription.allTextContents()).toContain(type), { timeout: 10000 };
    }

    private async addContent(title: string, subtitle: string, body: string) {
        await this.titleField.click();
        await this.titleField.fill(title);
        await this.subtitleField.click();
        await this.subtitleField.fill(subtitle);
        await this.bodyField.click();
        await this.bodyField.fill(body);
    }

    private async addBoldContent(content: string) {
        await this.boldButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(1).click();
        await this.page.waitForTimeout(1000);
        await this.boldButton.click();
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(1).pressSequentially(content);
        await this.boldButton.click();
        await this.page.waitForTimeout(1000);
    }

    private async addItalicContent(content: string) {
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(2).click();
        await this.page.waitForTimeout(1000);
        await this.italicButton.click();
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(2).pressSequentially(content);
        await this.italicButton.click();
        await this.page.waitForTimeout(1000);
    }

    private async addUnderlineContent(content: string) {
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(5).click();
        await this.page.waitForTimeout(1000);
        await this.underlineButton.click();
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(5).pressSequentially(content);
        await this.underlineButton.click();
        await this.page.waitForTimeout(1000);
    }

    private async addStrikeContent(content: string) {
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(7).click();
        await this.page.waitForTimeout(1000);
        await this.strikeButton.click();
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(7).pressSequentially(content);
        await this.strikeButton.click();
        await this.page.waitForTimeout(1000);
    }

    private async addOrderedListContent(content: string) {
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(9).click();
        await this.page.waitForTimeout(1000);
        await this.orderedListButton.click();
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(9).pressSequentially(content);
        await this.orderedListButton.click();
        await this.page.waitForTimeout(1000);
    }

    private async addBulletListContent(content: string) {
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(11).click();
        await this.page.waitForTimeout(1000);
        await this.bulletListButton.click();
        await this.page.waitForTimeout(1000);
        await this.bodyField.nth(11).pressSequentially(content);
        await this.bulletListButton.click();
        await this.page.waitForTimeout(10000);
    }

    private async addRelational(taxonomies: string, contributor: string, role: string) {
        await this.relationalTab.click();
        await this.taxonomieField.click();
        await this.taxonomieField.pressSequentially(taxonomies, { delay: 100 });
        const sugestedOption = await this.page.locator('[class="mdc-elevation--z1"] ul');
        await expect(sugestedOption).toHaveText(taxonomies, { timeout: 20000 });
        await expect(sugestedOption).toHaveCount(1);
        await sugestedOption.click();
        const taxonomiesPill = await this.page.locator('[class*="taxonomy-select"] [class="mdc-chip__text"]');
        await expect(taxonomiesPill).toHaveText(taxonomies);

        const contributorRoles = await this.page.locator('[data-testid="fr.input.select.Contributor Role"] option');
        await expect(contributorRoles).toHaveCount(5);
        await expect(contributorRoles).toHaveText(['', 'Writer', 'Photographer', 'Videographer', 'Illustrator'], { timeout: 10000 });
        await this.contributorRole.click();
        await this.contributorRole.selectOption(role);

        await this.contributorField.click();
        await this.contributorField.pressSequentially(contributor, { delay: 100 });
        const sugestedContributor = await this.page.locator('[class="mdc-elevation--z1"] ul');
        const sugestedContributor1 = await this.page.locator('[class="mdc-elevation--z1"] ul li a', { hasText: contributor });
        await expect(sugestedContributor).toHaveCount(1);
        await expect(sugestedContributor1).toBeVisible({ timeout: 10000 });
        await sugestedContributor.click();
    }

    private async addMedia() {
        await this.mediaTab.click();
        await this.selectImageBtn.click();
        const mediaImages = await this.page.locator('[class="css-1fcz16t e1ahl7xf6"]');
        await expect(mediaImages).toHaveCount(50);
        await mediaImages.first().click();
        await this.page.waitForTimeout(2000);
    }

    private async selecTab(tabname: string) {
        const tab = this.page.locator('[class="mdc-tab"]', { hasText: tabname });
        await tab.click();
    }

    private async verifyPermalink(type: string) {
        await this.permalink.isVisible({ timeout: 10000 });
        console.log(`For ${type}: ` + await this.permalink.textContent());
    }
}
