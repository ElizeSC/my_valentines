import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('/');

    await page.addStyleTag({
        content: `
      *, *::before, *::after {
        transition: none !important;
        animation: none !important;
      }
    `,
    });

    await page.getByRole('button', { name: 'click me!' }).click();
    await page.getByRole('button', { name: 'what is it?' }).click();
    await page.getByPlaceholder('who are you?').fill('guest');
    await page.getByPlaceholder('secret password').fill('guest123');
    await page.getByRole('button', { name: 'open gift 🎁' }).click();
});
