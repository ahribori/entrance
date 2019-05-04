import db from '../src/db';

const globalSetup = async () => {
  await db.sync({ force: true });
};

export default globalSetup;
