import { Page } from "@playwright/test";
import { Ads } from "./ads.page";
import { Homepage } from './homepage.page';
import { AccessDenied } from './acessDenied.page';
import { WebinyLoginAndMain } from './webinyLoginAndMain.page';
import { CreateArticle } from './webinyCreateArticle.page';
import { Newsletters } from "./newsletters.page";
import { SEO } from "./SEO.page";
import { WebinyArticles } from "./webinyArticles.page";
import { WebinyHamburgerMenu } from "./webinyHamburgerMenu.page";

export class PageManager {

    private readonly ads: Ads;
    private readonly page: Page;
    private readonly homePage: Homepage;
    private readonly accessDenied: AccessDenied;
    private readonly CreateArticle: CreateArticle;
    private readonly newsletters: Newsletters;
    private readonly SEOpage: SEO;
    private readonly webinyLoginAndMain: WebinyLoginAndMain;
    private readonly webinyArticles: WebinyArticles;
    private readonly webinyHamburgerMenu: WebinyHamburgerMenu;

    constructor(page: Page) {
        this.page = page
        this.ads = new Ads(this.page);
        this.homePage = new Homepage(this.page);
        this.accessDenied = new AccessDenied(this.page);
        this.newsletters = new Newsletters(this.page);
        this.SEOpage = new SEO(this.page);
        this.webinyLoginAndMain = new WebinyLoginAndMain(this.page);
        this.webinyArticles = new WebinyArticles(this.page);
        this.webinyHamburgerMenu = new WebinyHamburgerMenu(this.page);
        this.CreateArticle = new CreateArticle(this.page);
    }

    homepage() {
        return this.homePage
    }

    adsPage() {
        return this.ads
    }

    accessDeniedPage() {
        return this.accessDenied
    }

    newslettersPage() {
        return this.newsletters
    }

    SEOPage() {
        return this.SEOpage
    }

    webinyMain() {
        return this.webinyLoginAndMain
    }

    webinyArticle() {
        return this.webinyArticles
    }

    webinyHamburger() {
        return this.webinyHamburgerMenu
    }

    createArticle() {
        return this.CreateArticle
    }
}
