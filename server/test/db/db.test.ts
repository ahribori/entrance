import db from 'db';

describe('Database connection tests', () => {
  test('test connection', async () => {
    await db.authenticate();
  });
});
