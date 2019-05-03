import {
  AllowNull,
  BelongsToMany,
  Column,
  Comment,
  Default, HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import Application from './Application';
import Link from './Link';

@Table({ tableName: 'account' })
class Account extends Model<Account> {
  @Comment('계정 타입')
  @AllowNull(false)
  @Column
  accountType!: string;

  @Comment('아이디')
  @AllowNull(false)
  @Unique
  @Column
  username!: string;

  @Comment('비밀번호')
  @Column
  password!: string;

  @Comment('이메일')
  @AllowNull(false)
  @Unique
  @Column
  email!: string;

  @Comment('이메일 인증여부')
  @AllowNull(false)
  @Default(false)
  @Column
  emailVerified!: boolean;

  @Comment('경험치')
  @AllowNull(false)
  @Default(0)
  @Column
  exp!: number;

  @Comment('포인트')
  @AllowNull(false)
  @Default(0)
  @Column
  point!: number;

  @Comment('비밀번호에 뿌리는 소금')
  @AllowNull(false)
  @Column
  salt!: string;

  @HasMany(() => Application)
  ownApplications!: Application[];

  @BelongsToMany(() => Application, () => Link)
  linkedApplications!: Application[];
}

export default Account;
