import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { contactSchema, getContactFieldErrors } from '../src/lib/contactValidation.ts';
import { saveInquiry, getInquiries } from '../src/lib/storage.ts';

const valid = { name: 'Test Visitor', email: 'visitor@example.test', company: '', services: ['Design'], message: 'A website for a small business.', honeypot: '' };

test('contact validation', async (t) => {
  await t.test('trims input and normalizes repeated service selections', () => {
    const result = contactSchema.parse({ ...valid, name: '  Test Visitor  ', email: ' visitor@example.test ', services: ['Design', 'Design'], message: '  A website for a small business.  ' });
    assert.equal(result.name, 'Test Visitor');
    assert.equal(result.email, 'visitor@example.test');
    assert.equal(result.message, valid.message);
    assert.deepEqual(result.services, ['Design']);
  });
  await t.test('rejects blank input, bad email and unsupported services', () => {
    const result = contactSchema.safeParse({ ...valid, name: '   ', email: 'not-an-email', services: ['Unknown'], message: '            ' });
    assert.equal(result.success, false);
    assert.deepEqual(Object.keys(getContactFieldErrors(result.error)).sort(), ['email', 'message', 'name', 'services']);
  });
  await t.test('requires a service and accepts the not-sure option', () => {
    assert.equal(contactSchema.safeParse({ ...valid, services: [] }).success, false);
    assert.equal(contactSchema.safeParse({ ...valid, services: ['Not sure yet'] }).success, true);
  });
  await t.test('rejects bots, oversized messages and malformed objects', () => {
    for (const value of [null, [], 'bad', { ...valid, honeypot: 'spam' }, { ...valid, message: 'x'.repeat(3001) }, { ...valid, company: 'x'.repeat(101) }]) {
      assert.equal(contactSchema.safeParse(value).success, false);
    }
  });
});

test('private inquiry storage', async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'rtj-contact-test-'));
  const previous = process.env.CONTACT_DATA_DIR;
  process.env.CONTACT_DATA_DIR = directory;
  t.after(async () => {
    if (previous === undefined) delete process.env.CONTACT_DATA_DIR;
    else process.env.CONTACT_DATA_DIR = previous;
    await fs.rm(directory, { recursive: true, force: true });
  });
  await t.test('starts empty without writing an empty archive', async () => {
    assert.deepEqual(await getInquiries(), []);
    assert.deepEqual(await fs.readdir(directory), []);
  });
  await t.test('keeps every simultaneous submission and preserves the legacy archive', async () => {
    const legacy = [{ ...valid, id: 'legacy_1', createdAt: '2026-01-01T00:00:00.000Z', status: 'new' }];
    const legacyText = JSON.stringify(legacy);
    await fs.writeFile(path.join(directory, 'inquiries.json'), legacyText);
    const submitted = await Promise.all(Array.from({ length: 40 }, (_, index) => saveInquiry({ ...valid, name: `Visitor ${index}` })));
    assert.equal(new Set(submitted.map(item => item.id)).size, 40);
    const loaded = await getInquiries();
    assert.equal(loaded.length, 41);
    for (const inquiry of submitted) assert.ok(loaded.some(item => item.id === inquiry.id && item.name === inquiry.name));
    assert.equal(await fs.readFile(path.join(directory, 'inquiries.json'), 'utf8'), legacyText);
    assert.equal((await fs.readdir(path.join(directory, 'inquiries'))).filter(file => file.endsWith('.tmp')).length, 0);
  });
  await t.test('surfaces corrupt data instead of silently replacing it', async () => {
    await fs.writeFile(path.join(directory, 'inquiries.json'), 'broken JSON');
    await assert.rejects(getInquiries());
    assert.equal(await fs.readFile(path.join(directory, 'inquiries.json'), 'utf8'), 'broken JSON');
  });
  await t.test('fails when storage cannot be written', async () => {
    const blocked = path.join(directory, 'not-a-directory');
    await fs.writeFile(blocked, 'file');
    process.env.CONTACT_DATA_DIR = blocked;
    await assert.rejects(saveInquiry(valid));
  });
});
