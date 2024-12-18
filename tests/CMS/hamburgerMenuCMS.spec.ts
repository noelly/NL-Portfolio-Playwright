import { test } from '@playwright/test';
import { PageManager } from '../../pages/webenyPageManager.Page';
import { drawerOptions, subMenuOptions } from '../../data/drawerMenuOptions.data';

test.describe('Hamburger Menu', () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.webenyMain().navigateToCMS();
  });

  test('Verify all menus within the hamburger drawer', async () => {
    await pm.webenyHamburger().validateDrawerOptions(drawerOptions);
  });

  test('Verify all submenus of the hamburger drawer', async () => {
    await pm.webenyHamburger().validateDrawerSubMenus(subMenuOptions);
  });

  test('Verify navigating to the image collection', async () => {
    await pm.webenyHamburger().navigateToSubMenu('Image Collections');
  });

  test('Verify navigating to the articles list section', async () => {
    await pm.webenyHamburger().navigateToSubMenu('Articles');
  });

  test('Verify navigating to the video playlists section', async () => {
    await pm.webenyHamburger().navigateToSubMenu('Video Playlists');
  });
});
