import { Page } from "@playwright/test";
import { Homepage } from './homepage.page';
import { AccessDenied } from './acessDenied.page';
import { WebinyLoginAndMain } from './webinyLoginAndMain.page';
import { CreateArticle } from './webinyCreateArticle.page';
import { WebinyArticles } from "./webinyArticles.page";
import { WebinyHamburgerMenu } from "./webinyHamburgerMenu.page";

export class PageManager {

    private readonly page: Page
    private readonly homePage: Homepage
    private readonly accessDenied: AccessDenied
    private readonly webinyCreateArticle: CreateArticle
    private readonly webinyLoginAndMain: WebinyLoginAndMain
    private readonly webinyArticles: WebinyArticles
    private readonly webinyHamburgerMenu: WebinyHamburgerMenu

    constructor(page: Page) {
        this.page = page
        this.homePage = new Homepage(this.page);
        this.accessDenied = new AccessDenied(this.page);
        this.webinyLoginAndMain = new WebinyLoginAndMain(this.page);
        this.webinyArticles = new WebinyArticles(this.page);
        this.webinyHamburgerMenu = new WebinyHamburgerMenu(this.page);
        this.webinyCreateArticle = new CreateArticle(this.page);
    }

    homepage() {
        return this.homePage
    }

    accessDeniedPage() {
        return this.accessDenied
    }

    webinyMain() {
        return this.webinyLoginAndMain
    }

    articleList() {
        return this.webinyArticles
    }

    webinyHamburger() {
        return this.webinyHamburgerMenu
    }

    createArticle() {
        return this.webinyCreateArticle
    }
}
