import test, { test as setup } from '@playwright/test';
import { PageManager } from '../../pages/webinyPageManager.Page';
import { testUser } from '../../data/userInfo.data';

const authFile = '.auth/user.json'

setup('Verifying Login to Webiny', async ({ page }) => {
    let pm: PageManager;
    pm = new PageManager(page);
    await test.step('Navigate to the CMS login screen', async () => {
        await pm.webinyMain().navigateToCMS();
    });

    await test.step(`Login with user ${testUser.email}`, async () => {
        await pm.webinyMain().loginWithUser(testUser.email!, testUser.Password!);
    });

    await test.step(`Store access token`, async () => {
        await page.context().storageState({ path: authFile });
    });
});
