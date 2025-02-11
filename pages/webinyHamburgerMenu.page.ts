import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./webinyhelperBase.page";

export class WebinyHamburgerMenu extends HelperBase {

    readonly hamburgerMenuButton: Locator;
    readonly menuDrawer: Locator
    readonly sidebarContainerHeader: Locator

    constructor(page: Page) {
        super(page);
        this.hamburgerMenuButton = page.locator('button[data-testid="apps-menu"]');
        this.menuDrawer = page.locator('aside[class*=" mdc-drawer--open"]');
        this.sidebarContainerHeader = page.locator('[class="css-8yntog efbsdge1"]');
    }

    async openTheHamburgerMenu() {
        await this.hamburgerMenuButton.isVisible({ timeout: 10000 });
        await this.hamburgerMenuButton.click();
        await this.menuDrawer.isVisible({ timeout: 10000 });
        await expect(this.menuDrawer).toBeTruthy();
    }

    async openTheHamburgerSubMenu() {
        const optionslist = await this.page.locator('[class*="mdc-deprecated-list-item__meta"] button [class="mdc-icon-button__ripple"]');
        for (const row of await optionslist.all()) {
            await row.scrollIntoViewIfNeeded();
            await row.click();
            await this.waitForNumberofSeconds(1);
        }
    }

    async validateDrawerOptions(options: string[]) {
        const optionslist = await this.page.locator('[class="css-87lb9q mdc-drawer__content"] li');
        await expect(optionslist).toHaveCount(6);
        console.log(await optionslist.allTextContents());
        await expect(optionslist).toHaveText(options);
    }

    async validateDrawerSubMenus(options: string[]) {
        const subMenulist = await this.page.locator('a[class="css-1po6wm7"]');
        if (await this.menuDrawer.isHidden({ timeout: 10000 })) {
            await this.openTheHamburgerMenu();
            await this.waitForNumberofSeconds(1);

            if (await subMenulist.isHidden({ timeout: 10000 })) {
                await this.openTheHamburgerSubMenu();
                await this.waitForNumberofSeconds(1);
            }
        }
        await expect(subMenulist).toHaveCount(40);
        console.log(await subMenulist.allTextContents());
        await expect(subMenulist).toHaveText(options);
    }

    async navigateToSubMenu(name: string) {
        const subMenulist = await this.page.locator('a[class="css-1po6wm7"]');
        if (await this.menuDrawer.isHidden({ timeout: 10000 })) {
            await this.openTheHamburgerMenu();
            await this.waitForNumberofSeconds(0.5);

            if (await subMenulist.filter({ hasText: `${name}` }).isHidden({ timeout: 10000 })) {
                await this.openTheHamburgerSubMenu();
                await this.waitForNumberofSeconds(0.5);
            }
        }

        await subMenulist.filter({ hasText: `${name}` }).scrollIntoViewIfNeeded();
        await subMenulist.filter({ hasText: `${name}` }).click();
        await this.waitForNumberofSeconds(2);
        await this.sidebarContainerHeader.isVisible({ timeout: 10000 });
        console.log(await this.sidebarContainerHeader.allTextContents());
        await expect(this.sidebarContainerHeader).toContainText(name);
    }
}
