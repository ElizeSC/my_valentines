// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',

    /* Shared settings for all the projects below. */
    use: {
        /* Use your Vercel URL if available, otherwise default to local port 8080 */
        baseURL: process.env.BASE_URL || 'http://127.0.0.1:8080',

        /* Collect trace when retrying the failed test. */
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // You can keep Firefox/Webkit if you want to be extra thorough!
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        /* We use npx http-server because we removed the heavy webpack/scripts */
        command: 'npx http-server . -p 8080',
        url: 'http://127.0.0.1:8080',
        /* On CI (GitHub), start fresh. Locally, reuse if it's already running. */
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        stdout: 'ignore',
        stderr: 'pipe',
    },
});