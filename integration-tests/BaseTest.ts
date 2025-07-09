import app1Base from '@app1Base';
import { fixtures as app2Fixtures } from '@app2Base';
import type { SamplePage } from '@app2pages/SamplePage';

const test = app1Base.extend<{
  samplePage: SamplePage;
}>(app2Fixtures);

export default test;
