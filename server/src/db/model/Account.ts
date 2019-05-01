import {
  AllowNull,
  Column,
  Comment,
  Default,
  Model,
  Table,
  Unique,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'account' })
class Account extends Model<Account> {
  @Comment('아이디')
  @AllowNull(false)
  @Unique
  @Column
  username!: string;

  @Comment('비밀번호')
  @Column
  password!: string;

  @Comment('비밀번호에 뿌리는 소금')
  @Column
  salt!: string;

  @Comment('이메일')
  @AllowNull(false)
  @Unique
  @Column
  email!: string;

  @Comment('이메일 인증여부')
  @Default(false)
  @Column
  emailVerified!: boolean;

  @Comment('계정 타입')
  @AllowNull(false)
  @Column
  accountType!: string;
}

export default Account;
