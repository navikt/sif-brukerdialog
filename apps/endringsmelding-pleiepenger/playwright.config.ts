import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './playwright/tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        launchOptions: {
            slowMo: 100,
        },
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        /**
         * Kjører alle tester i San Francisco-tidssone (UTC-8) for å avdekke datofeil
         * der ISO-datoer uten Z tolkes som lokal tid og gir feil dag ved visning.
         * Eksempel: new Date('2023-01-01') i UTC+1 = 1. jan, men i UTC-8 = 31. des.
         */
        {
            name: 'chromium-los-angeles',
            use: {
                ...devices['Desktop Chrome'],
                timezoneId: 'America/Los_Angeles',
            },
        },
        /**
         * Kjører alle tester i Sydney-tidssone (UTC+10/+11) for å avdekke datofeil
         * der datoer som er korrekte i Norge skyves til neste dag.
         * Eksempel: new Date('2023-01-01T23:00:00Z') i UTC+11 = 2. jan.
         */
    ],
    webServer: {
        command: 'pnpm pw:build && pnpm pw:start',
        url: 'http://localhost:8080',
        reuseExistingServer: true,
    },
});
