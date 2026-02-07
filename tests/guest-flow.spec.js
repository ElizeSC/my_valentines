const { test, expect } = require('@playwright/test');

test.describe('Guest Access Flow', () => {

    test('TC-01: Should login and reveal the envelope', async ({ page }) => {
        // 1. Go to the local version of your site
        await page.goto('http://127.0.0.1:5500/index.html');

        // 2. Fill in guest credentials (based on your AC)
        await page.fill('#username', 'guest');
        await page.fill('#password', 'guest123');
        await page.click('#login-button');

        // 3. Verify AC 2: Envelope becomes visible
        const envelope = page.locator('#envelope-container');
        await expect(envelope).toBeVisible();
    });

    test('TC-02: Should show alert on wrong password', async ({ page }) => {
        await page.goto('http://127.0.0.1:5500/index.html');

        // Listen for the browser alert (dialog)
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Access Denied');
            await dialog.dismiss();
        });

        await page.fill('#username', 'guest');
        await page.fill('#password', 'wrong_pass');
        await page.click('#login-button');
    });
});