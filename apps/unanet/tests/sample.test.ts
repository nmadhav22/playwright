import test from '@unanetBase';
import { SamplePage } from '@unanetpages/SamplePage';

// Sample placeholder test for unanet

test('sample unanet test', async ({}) => {
  const page = new SamplePage();
  await page.placeholder();
});
