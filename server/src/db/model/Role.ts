import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Account from './Account';

@Table({ tableName: 'role', underscored: true })
export default class Role extends Model<Role> {
  @Column(DataType.ENUM('ADMIN', 'DEVELOPER', 'USER'))
  role!: string;

  @ForeignKey(() => Account)
  @Column
  accountId!: number;
}
