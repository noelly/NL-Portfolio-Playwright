import { test } from '@playwright/test';
import { PageManager } from '../../pages/webinyPageManager.Page';
import { drawerOptions, subMenuOptions } from '../../data/drawerMenuOptions.data';

test.describe('Hamburger Menu', () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.webinyMain().navigateToCMS();
  });

  test('Verify all menus within the hamburger drawer', async () => {
    await pm.webinyHamburger().validateDrawerOptions(drawerOptions);
  });

  test('Verify all submenus of the hamburger drawer', async () => {
    await pm.webinyHamburger().validateDrawerSubMenus(subMenuOptions);
  });

  test('Verify navigating to the image collection', async () => {
    await pm.webinyHamburger().navigateToSubMenu('Image Collections');
  });

  test('Verify navigating to the articles list section', async () => {
    await pm.webinyHamburger().navigateToSubMenu('Articles');
  });

  test('Verify navigating to the video playlists section', async () => {
    await pm.webinyHamburger().navigateToSubMenu('Video Playlists');
  });
});
