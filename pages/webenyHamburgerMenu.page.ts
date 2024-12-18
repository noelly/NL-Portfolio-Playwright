import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./webenyhelperBase.page";

export class WebenyHamburgerMenu extends HelperBase {

    readonly hamburgerMenuButton: Locator;
    readonly menuDrawer: Locator
    readonly sidebarContainerHeader: Locator

    constructor(page: Page) {
        super(page);
        this.hamburgerMenuButton = page.locator('button[data-testid="apps-menu"]');
        this.menuDrawer = page.locator('aside[class*=" mdc-drawer--open"]');
        this.sidebarContainerHeader = page.locator('[class="css-11i8xqn-ModelName efbsdge0"]');
    }

    async openTheHamburgerMenu() {
        await this.hamburgerMenuButton.isVisible({ timeout: 10000 });
        await this.hamburgerMenuButton.click();
        await this.menuDrawer.isVisible({ timeout: 10000 });
        await expect(this.menuDrawer).toBeTruthy();
    }

    async openTheHamburgerSubMenu() {
        const optionslist = await this.page.locator('[class*="mdc-drawer__content"] [class="mdc-list-item"]');
        for (const row of await optionslist.all()) {
            await row.scrollIntoViewIfNeeded();
            await row.click();
            await this.waitForNumberofSeconds(0.5);
        }
    }

    async validateDrawerOptions(options: string[]) {
        const optionslist = await this.page.locator('[class*="mdc-drawer__content"] [class="mdc-list-item"]');
        await expect(optionslist).toHaveCount(6);
        console.log(await optionslist.allTextContents());
        await expect(optionslist).toHaveText(options);
    }

    async validateDrawerSubMenus(options: string[]) {
        const subMenulist = await this.page.locator('[class="css-1anqzvt-submenuItems mdc-list-item"] a');
        if (await this.menuDrawer.isHidden({ timeout: 10000 })) {
            await this.openTheHamburgerMenu();
            await this.waitForNumberofSeconds(0.5);

            if (await subMenulist.isHidden({ timeout: 10000 })) {
                await this.openTheHamburgerSubMenu();
                await this.waitForNumberofSeconds(0.5);
            }
        }
        await expect(subMenulist).toHaveCount(38);
        console.log(await subMenulist.allTextContents());
        await expect(subMenulist).toHaveText(options);
    }

    async navigateToSubMenu(name: string) {
        const subMenulist = await this.page.locator('[class="css-1anqzvt-submenuItems mdc-list-item"] a');
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
