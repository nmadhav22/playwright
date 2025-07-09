import baseConfig, { ENV, testConfig } from '../../playwright.config';
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  projects: [
    {
      name: 'app1-chrome',
      testDir: './tests',
      use: {
        ...baseConfig.use,
        browserName: 'chromium',
        baseURL: testConfig[ENV],
      },
    },
    {
      name: 'app1-firefox',
      testDir: './tests',
      use: {
        ...baseConfig.use,
        browserName: 'firefox',
        baseURL: testConfig[ENV],
      },
    },
    ...(baseConfig.projects || []),
  ],
};

export default config;