import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import Account from './Account';

export enum RoleType {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
}

@Table({ tableName: 'role', underscored: true })
export default class Role extends Model<Role> {
  @Unique('role_accountId_unique')
  @Column(DataType.ENUM('ADMIN', 'DEVELOPER', 'USER'))
  role!: RoleType;

  @ForeignKey(() => Account)
  @Unique('role_accountId_unique')
  @Column
  accountId!: number;

  @BelongsTo(() => Account)
  account!: Account;
}
