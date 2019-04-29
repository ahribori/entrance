import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'account' })
class Account extends Model<Account> {
  @AllowNull(false)
  @Column
  username!: string;

  @Column
  password!: string;

  @AllowNull(false)
  @Column
  provider!: string;
}

export default Account;
