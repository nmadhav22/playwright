import { PlaywrightTestConfig, devices } from '@playwright/test';
import { testConfig } from './testConfig';
import * as process from "node:process";

const ENV = process.env.npm_config_ENV || 'qa';

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
  console.log(`Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`);
  process.exit();
}

const config: PlaywrightTestConfig = {

  globalSetup: `./global-setup`,
  timeout: 120000,
  retries: 0,
  reporter: [[`allure-playwright`], ['junit', { outputFile: 'results.xml' }]],
    projects: [
      {
        name: `Chrome`,
        use: {
          browserName: `chromium`,
          baseURL: testConfig[ENV],
          headless: true,
          viewport: { width: 1680, height: 938 },
          ignoreHTTPSErrors: true,
          acceptDownloads: true,
          screenshot: `only-on-failure`,
          video: `retain-on-failure`,
          trace: `retain-on-failure`,
          launchOptions: {
            slowMo: 0,
          },
        },
      },
      {
        name: `Firefox`,
        use: {
          browserName: `firefox`,
          baseURL: testConfig[ENV],
          headless: true,
          viewport: { width: 1680, height: 938 },
          ignoreHTTPSErrors: true,
          acceptDownloads: true,
          screenshot: `only-on-failure`,
          video: `retain-on-failure`,
          trace: `retain-on-failure`,
          launchOptions: {
            slowMo: 0,
          },
        },
      },
      {
        name: `Pixel 4a`,
        use: {
          ...devices['Pixel 4a (5G)'],
          baseURL: testConfig[ENV],
          headless: true,
          ignoreHTTPSErrors: true,
          acceptDownloads: true,
          screenshot: 'only-on-failure',
          video: 'retain-on-failure',
          trace: 'retain-on-failure',
          launchOptions: {
            slowMo: 0,
          },
        },
      },
    ],
};
export default config;