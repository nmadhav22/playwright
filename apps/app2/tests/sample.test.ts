import test from '@playwright/test';
import { SamplePage } from '@app2pages/SamplePage';

// Sample placeholder test for app2

test('sample app2 test', async ({}) => {
  const page = new SamplePage();
  await page.placeholder();
});
