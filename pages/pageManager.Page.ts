import { Page } from "@playwright/test";
import { Ads } from "./ads.page";
import { Homepage } from './homepage.page';
import { AccessDenied } from './acessDenied.page';
import { WebenyLoginAndMain } from './webenyLoginAndMain.page';
import { CreateArticle } from './webenyCreateArticle.page';
import { Newsletters } from "./newsletters.page";
import { SEO } from "./SEO.page";
import { WebenyArticles } from "./webenyArticles.page";
import { WebenyHamburgerMenu } from "./webenyHamburgerMenu.page";

export class PageManager {

    private readonly ads: Ads;
    private readonly page: Page;
    private readonly homePage: Homepage;
    private readonly accessDenied: AccessDenied;
    private readonly CreateArticle: CreateArticle;
    private readonly newsletters: Newsletters;
    private readonly SEOpage: SEO;
    private readonly webenyLoginAndMain: WebenyLoginAndMain;
    private readonly webenyArticles: WebenyArticles;
    private readonly webenyHamburgerMenu: WebenyHamburgerMenu;

    constructor(page: Page) {
        this.page = page
        this.ads = new Ads(this.page);
        this.homePage = new Homepage(this.page);
        this.accessDenied = new AccessDenied(this.page);
        this.newsletters = new Newsletters(this.page);
        this.SEOpage = new SEO(this.page);
        this.webenyLoginAndMain = new WebenyLoginAndMain(this.page);
        this.webenyArticles = new WebenyArticles(this.page);
        this.webenyHamburgerMenu = new WebenyHamburgerMenu(this.page);
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

    webenyMain() {
        return this.webenyLoginAndMain
    }

    webenyArticle() {
        return this.webenyArticles
    }

    webenyHamburger() {
        return this.webenyHamburgerMenu
    }

    createArticle() {
        return this.CreateArticle
    }   
}
