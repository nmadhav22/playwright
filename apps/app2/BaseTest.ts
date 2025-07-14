import base from '@lib/BaseTest';
import { SamplePage } from '@app2pages/SamplePage';

const test = base.extend<{
  samplePage: SamplePage;
}>({
  samplePage: async ({}, use) => {
    await use(new SamplePage());
  },
});

export default test;
