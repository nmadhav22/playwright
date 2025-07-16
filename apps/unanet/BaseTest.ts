import base from '@lib/BaseTest';
import { SamplePage } from '@unanetpages/SamplePage';

const test = base.extend<{
  samplePage: SamplePage;
}>({
  samplePage: async ({}, use) => {
    await use(new SamplePage());
  },
});

export default test;
