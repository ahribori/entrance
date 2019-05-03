import {
  Comment,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Account from './Account';
import Application from './Application';

@Table({ tableName: 'link' })
class Link extends Model<Link> {
  @Comment('계정 ID')
  @ForeignKey(() => Account)
  @Column
  accountId!: number;

  @Comment('어플리케이션 ID')
  @ForeignKey(() => Application)
  @Column
  applicationId!: number;
}

export default Link;
