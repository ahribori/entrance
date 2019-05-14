import {
  AllowNull,
  BelongsToMany,
  Column,
  Comment,
  Default,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import Application from './Application';
import Link from './Link';
import Role from './Role';

@Table({
  tableName: 'account',
  paranoid: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['email'],
    },
  ],
})
class Account extends Model<Account> {
  @Comment('계정 타입')
  @AllowNull(false)
  @Column
  accountType!: string;

  @Comment('이메일')
  @AllowNull(false)
  @Unique
  @Column
  email!: string;

  @Comment('닉네임')
  @AllowNull(false)
  @Column
  nickname!: string;

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

  @Comment('활성화 여부')
  @AllowNull(false)
  @Default(1)
  @Column
  active!: boolean;

  @Comment('프로필 이미지')
  @Column
  profileImage!: string;

  @Comment('썸네일 이미지')
  @Column
  thumbnailImage!: string;

  @Comment('비밀번호')
  @Column
  password!: string;

  @Comment('비밀번호에 뿌리는 소금')
  @AllowNull(false)
  @Column
  salt!: string;

  @HasMany(() => Role)
  roles!: Role[];

  @HasMany(() => Application)
  ownedApplications!: Application[];

  @BelongsToMany(() => Application, () => Link)
  linkedApplications!: Application[];
}

export default Account;
