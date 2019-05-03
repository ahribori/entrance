import {
  Comment,
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Account from './Account';
import Link from './Link';

@Table({ tableName: 'application' })
class Application extends Model<Application> {
  @Comment('어플리케이션 이름')
  @AllowNull(false)
  @Column
  name!: string;

  @Comment('계정 ID')
  @ForeignKey(() => Account)
  accountId!: number;

  @Comment('어플리케이션 OWNER 계정')
  @BelongsTo(() => Account)
  account!: Account;

  @Comment('어플리케이션에 가입된 계정들')
  @BelongsToMany(() => Account, () => Link)
  linkedAccounts!: Account[];
}

export default Application;
