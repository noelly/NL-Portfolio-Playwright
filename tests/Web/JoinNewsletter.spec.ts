import { test, devices } from '@playwright/test'
import { PageManager } from '../../pages/pageManager.Page';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  const pm = new PageManager(page);
  await pm.homepage().navigateTo();
  await pm.accessDeniedPage().isAccessDenied("Motortrend");
});

test('Homepage - Join Newsletter', async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullname = faker.person.fullName();
  const randomEmail = `${randomFullname.replace(' ', '')}${faker.number.int({ min: 1, max: 1000 })}@gmail.com`;

  await test.step(`Select join newsletter`, async () => {
    await pm.homepage().selectJoinNewsletter();
  });

  await test.step(`Verify the newsletter page is presented`, async () => {
    await pm.newslettersPage().verifyNewsletterPage();
  });

  await test.step(`Select MortorTrend and sign up`, async () => {
    await pm.newslettersPage().newslettersSignup('MotorTrend', randomEmail);
  });
});