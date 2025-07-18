import baseConfig, { ENV } from '../../playwright.config';
import { testConfig } from './testConfig';
import { PlaywrightTestConfig } from '@playwright/test';

const isCI = !!process.env.CI;

const config: PlaywrightTestConfig = {
  ...baseConfig,
  reporter: [
    ['allure-playwright'],
    ['junit', { outputFile: 'results.xml' }],
  ],
  projects: [
    {
      name: 'burns-chrome',
      testDir: './tests/functional',
      use: {
        ...baseConfig.use,
        headless: isCI,
        browserName: 'chromium',
        baseURL: testConfig[ENV],
      },
    },
    {
      name: 'burns-firefox',
      testDir: './tests/functional',
      use: {
        ...baseConfig.use,
        browserName: 'firefox',
        baseURL: testConfig[ENV],
      },
    },
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
    ...(baseConfig.projects || []),
  ],
};

export default config;