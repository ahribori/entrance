import { Sequelize } from 'sequelize-typescript';
import config from '../config';

const db = new Sequelize(config.dataSource.url, {
  username: config.dataSource.username,
  password: config.dataSource.password,
  modelPaths: [__dirname + '/model'],
  timezone: '+09:00',
});

export default db;
