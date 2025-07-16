import base from '@lib/BaseTest';
import { HomePage } from '@pages/HomePage';
import { SamplePage } from '@unanetpages/SamplePage';

const test = base.extend<{
  homePage: HomePage;
  samplePage: SamplePage;
}>({
  homePage: async ({ page, context }, use) => {
    await use(new HomePage(page, context));
  },
  samplePage: async ({}, use) => {
    await use(new SamplePage());
  },
});

export default test;