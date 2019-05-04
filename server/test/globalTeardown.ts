import db from '../src/db';

const globalTearDown = async () => {
  await db.close();
};

export default globalTearDown;
