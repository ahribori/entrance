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

  @ForeignKey(() => Account)
  @Column
  accountId!: number;

  @BelongsTo(() => Account)
  account!: Account;

  @BelongsToMany(() => Account, () => Link)
  linkedAccounts!: Account[];
}

export default Application;
