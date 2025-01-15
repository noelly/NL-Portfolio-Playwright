import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";
export class FormLayoursPage extends HelperBase {
    // field


    // constructor 
    constructor(page: Page) {
        super(page);
    }

    // method wirth parameter + annotation

    /**
     * This method fill out the Inline form with user details
     * @param email - should ne an email
     * @param password - enter a password
     * @param optionText - select option 1 or 2
     */
    async submitUsingTheGridFormWithCredentialsAndSelectOptions(email: string, password: string, optionText: string) {
        const usingTheFridForm = await this.page.locator('nb-card', { hasText: "Using the Grid" });
        await usingTheFridForm.getByRole('textbox', { name: 'Email' }).fill(email);
        await usingTheFridForm.getByRole('textbox', { name: 'Password' }).fill(password);
        await usingTheFridForm.getByRole('radio', { name: optionText }).check({ force: true });
        await usingTheFridForm.getByRole('button').click();
    }

    /**
     * This method fill out the Inline form with user details
     * @param email  - should be first and last name
     * @param password - valid email for the test user
     * @param rememberMe - true or false
     */
    async submitInLineformWithNameEmailAndChckbox(email: string, password: string, rememberMe: boolean) {
        const innlineForm = await this.page.locator('nb-card', { hasText: "Inline Form" });
        await innlineForm.getByRole('textbox', { name: 'jane Doe' }).fill(email);
        await innlineForm.getByRole('textbox', { name: 'Email' }).fill(password);
        if (rememberMe) {
            await innlineForm.getByRole('checkbox').check({ force: true });
        }
        await innlineForm.getByRole('button').click();
    }
}