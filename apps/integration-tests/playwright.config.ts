import baseConfig, { ENV } from '../../playwright.config';
import { testConfig } from './testConfig';
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  projects: [
    {
      name: 'integration-chrome',
      testDir: './tests',
      use: {
        ...baseConfig.use,
        browserName: 'chromium',
        baseURL: testConfig[ENV],
      },
    },
    ...(baseConfig.projects || []),
  ],
};

export default config;