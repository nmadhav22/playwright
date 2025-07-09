import base from '@lib/BaseTest';
import { SamplePage } from '@app2pages/SamplePage';

export const fixtures = {
  samplePage: async (
    {},
    use: (r: SamplePage) => Promise<void>
  ) => {
    await use(new SamplePage());
  },
};

const test = base.extend<{
  samplePage: SamplePage;
}>(fixtures);

export default test;
