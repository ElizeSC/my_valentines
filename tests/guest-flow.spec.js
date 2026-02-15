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

// Test 2: Handling wrong credentials
test('Should show error on wrong password', async ({ page }) => {
    await page.goto('/');

    // 1. Crucial: Apply your animation fix to this test case too!
    await page.addStyleTag({
        content: `*, *::before, *::after { transition: none !important; animation: none !important; }`,
    });

    // 2. Step through the sequence
    await page.getByRole('button', { name: 'click me!' }).click();

    // 3. ADD THIS: This reveals the "who are you?" input
    await page.getByRole('button', { name: 'what is it?' }).click();

    // 4. Now the inputs are visible and can be filled
    await page.getByPlaceholder('who are you?').fill('hacker');
    await page.getByPlaceholder('secret password').fill('wrong123');
    await page.getByRole('button', { name: 'open gift 🎁' }).click();

    // 5. Assert the result
    await expect(page.getByRole('button', { name: 'open gift 🎁' })).toBeVisible();
});

// Test 3: Mobile Layout Check
test('Mobile view should load landing page', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone size
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'click me!' })).toBeVisible();
});
