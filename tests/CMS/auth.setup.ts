import test, { test as setup } from '@playwright/test';
import { PageManager } from '../../pages/webenyPageManager.Page';
import { testUser } from '../../data/userInfo.data';

const authFile = '.auth/user.json'

setup('Verifying Login to Webeny', async ({ page }) => {
    let pm: PageManager;
    pm = new PageManager(page);
    await test.step('Navigate to the CMS login screen', async () => {
        await pm.webenyMain().navigateToCMS();
    });

    await test.step(`Login with user ${testUser.email}`, async () => {
        await pm.webenyMain().loginWithUser(testUser.email, testUser.Password);
    });

    await test.step(`Store access token`, async () => {
        await page.context().storageState({ path: authFile });
    });
});
