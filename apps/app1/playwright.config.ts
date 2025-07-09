import baseConfig, { ENV } from '../../playwright.config';
import { testConfig } from './testConfig';
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  reporter: [
    ['allure-playwright'],
    ['junit', { outputFile: 'apps/app1/results.xml' }]
  ],
  projects: [
    {
      name: 'app1-chrome',
      testDir: './tests/functional',
      use: {
        ...baseConfig.use,
        browserName: 'chromium',
        baseURL: testConfig[ENV],
      },
    },
    {
      name: 'app1-firefox',
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