import { PlaywrightTestConfig, devices } from '@playwright/test';
import { testConfig } from './testConfig';

const ENV = process.env.npm_config_ENV;

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
  console.log(`Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`);
  process.exit();
}

const config: PlaywrightTestConfig = {

  globalSetup: `./global-setup`,
  timeout: 120000,
  retries: 0,
  reporter: [[`./CustomReporterConfig.ts`], [`allure-playwright`], [`html`, { outputFolder: 'html-report', open: 'never' }]],
  projects: [
    {
      name: `Chrome`,
      use: {
        browserName: `chromium`,
        baseURL: testConfig[ENV],
        headless: true,
        viewport: { width: 1280, height: 638 },
        ignoreHTTPSErrors: true,

        //Enable File Downloads in Chrome
        acceptDownloads: true,

        //Artifacts
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,

        //Slows down execution by ms
        launchOptions: {
          slowMo: 0
        }
      },
    },
    // {
    //   name: `Chromium`,
    //   use: {
    //     browserName: `chromium`,
    //     baseURL: testConfig[ENV],
    //     headless: false,
    //     viewport: { width: 1280, height: 638 },
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    // },
    //
    // {
    //   name: `Firefox`,
    //   use: {
    //     browserName: `firefox`,
    //     baseURL: testConfig[ENV],
    //     headless: false,
    //     viewport: { width: 1280, height: 638 },
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    // },
    //
    // {
    //   name: `Edge`,
    //   use: {
    //     browserName: `chromium`,
    //     channel: `msedge`,
    //     baseURL: testConfig[ENV],
    //     headless: false,
    //     viewport: { width: 1280, height: 638 },
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    // },
    // {
    //   name: `WebKit`,
    //   use: {
    //     browserName: `webkit`,
    //     baseURL: testConfig[ENV],
    //     headless: true,
    //     viewport: { width: 1280, height: 638 },
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    // },
    // {
    //   name: `Device`,
    //   use: {
    //     ...devices[`Pixel 4a (5G)`],
    //     browserName: `chromium`,
    //     channel: `chrome`,
    //     baseURL: testConfig[ENV],
    //     headless: true,
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    // },
    // {
    //   name: `DB`
    // },
    // {
    //   name: `API`,
    //   use: {
    //     baseURL: testConfig[ENV]
    //   }
    // }
  ],
};
export default config;