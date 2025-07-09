import { DBActions } from '@lib/DBActions';
import test from '@app1Base'
import { expect } from '@playwright/test'

test('SQLite DB demo', async () => {
    const db = new DBActions();

    await db.createTable();
    await db.insertRow(1, 'Playwright');

    const row = await db.queryRow();

    expect(row.id).toBe(1);
    expect(row.name).toBe('Playwright');

    await db.close();});