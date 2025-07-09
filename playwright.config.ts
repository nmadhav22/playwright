import { PlaywrightTestConfig } from '@playwright/test';
import { testConfig } from './testConfig';
import * as process from 'node:process';

export const ENV = process.env.npm_config_ENV || 'qa';

if (!ENV || !['qa', 'dev', 'qaApi', 'devApi'].includes(ENV)) {
  console.log('Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"');
  process.exit();
}

const baseConfig: PlaywrightTestConfig = {
  globalSetup: './global-setup',
  timeout: 120000,
  retries: 0,
  reporter: [['allure-playwright'], ['junit', { outputFile: 'results.xml' }]],
  use: {
    headless: true,
    viewport: { width: 1680, height: 938 },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      slowMo: 0,
    },
  },
  projects: [
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://reqres.in',
      },
    },
    {
      name: 'db',
      testDir: './tests/db',
    },
  ],
};
export default baseConfig;
export { testConfig };
