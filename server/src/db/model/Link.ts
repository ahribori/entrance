import {
  Comment,
  Column,
  ForeignKey,
  Model,
  Table,
  PrimaryKey, AllowNull,
} from 'sequelize-typescript';
import Account from './Account';
import Application from './Application';

@Table({ tableName: 'link', underscored: true })
class Link extends Model<Link> {
  @Comment('ApplicationAccount ID')
  @PrimaryKey
  @Column
  id!: string;

  @Comment('계정 ID')
  @AllowNull(false)
  @ForeignKey(() => Account)
  @Column
  accountId!: number;

  @Comment('어플리케이션 ID')
  @AllowNull(false)
  @ForeignKey(() => Application)
  @Column
  applicationId!: number;
}

export default Link;
