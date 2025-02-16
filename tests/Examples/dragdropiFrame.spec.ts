import { expect } from '@playwright/test';
import { test } from '../../test-options';


test('Drag and drop with iframe', async ({ page, globalsQaUrl }) => {
    //await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    await page.goto(globalsQaUrl);

    // switch iframe
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

    // drag to the target
    await frame.locator('li', { hasText: 'High Tatras 2' }).dragTo(frame.locator('#trash'));

    // more precised control
    await frame.locator('li', { hasText: 'High Tatras 4' }).hover();
    await page.mouse.down();
    await frame.locator('#trash').hover();
    await page.mouse.up();


    //assertion
    await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4']);
})
