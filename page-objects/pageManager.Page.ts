import { expect, Page } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoursPage } from '../page-objects/formsLayoutsPage';
import { DatePickerPage } from '../page-objects/datePickerPage';

//page manager class is used to managed all the instences of pages

export class PageManager {
    // field
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoursPage: FormLayoursPage
    private readonly datePickerPage: DatePickerPage

    // constructor 
    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoursPage = new FormLayoursPage(this.page);
        this.datePickerPage = new DatePickerPage(this.page);
    }
    
    // methods
    navigateTo() {
        return this.navigationPage
    }

    onFormLayoursPage() {
        return this.formLayoursPage
    }   

    onDatePickerPage() {
        return this.datePickerPage
    }
}
