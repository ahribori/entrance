import {
  Comment,
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table, Default,
} from 'sequelize-typescript';
import Account from './Account';
import Link from './Link';

@Table({ tableName: 'application' })
class Application extends Model<Application> {
  @Comment('어플리케이션 이름')
  @AllowNull(false)
  @Column
  name!: string;

  @Comment('REST API Key')
  @AllowNull(false)
  @Column
  apiKey!: string;

  @Comment('Javascript SDK Key')
  @AllowNull(false)
  @Column
  sdkKey!: string;

  @Comment('Origins')
  @Column
  origins!: string;

  @Comment('활성화 여부')
  @AllowNull(false)
  @Default(1)
  @Column
  active!: boolean;

  @ForeignKey(() => Account)
  @Column
  accountId!: number;

  @BelongsTo(() => Account)
  account!: Account;

  @BelongsToMany(() => Account, () => Link)
  linkedAccounts!: Account[];
}

export default Application;
