/*
-- auto-generated definition
create table link_match
(
    id         int auto_increment
        primary key,
    `key`      varchar(20)                          null,
    user_id    int                                  null,
    weight     int                                  null,
    created_at datetime default current_timestamp() null,
    constraint link_match_link_key_fk
        foreign key (`key`) references link (`key`),
    constraint link_match_user_user_id_fk
        foreign key (user_id) references user (user_id)
);

create index link_match_key_index
    on link_match (`key`);

create index link_match_user_id_index
    on link_match (user_id);
*/

import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Link } from './link.entity';
import { User } from './user.entity';

interface LinkMatchAttributes {
  id: number;
  key: string;
  userId: number;
  weight: number;
  createdAt: Date;
}

export interface LinkMatchCreateAttibutes {
  key: string;
  userId: number;
  weight: number;
}

@Table({
  tableName: 'link_match',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
})
export class LinkMatch extends Model<
  LinkMatchAttributes,
  LinkMatchCreateAttibutes
> {
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    field: 'key',
    allowNull: true,
    type: DataType.STRING(20),
  })
  key: string;

  @Column({
    field: 'user_id',
    allowNull: true,
    type: DataType.INTEGER,
  })
  userId: number;

  @Column({
    field: 'weight',
    allowNull: true,
    type: DataType.INTEGER,
  })
  weight: number;

  @Column({
    field: 'created_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdAt: Date;

  @BelongsTo(() => Link, 'key')
  link: Link;

  @BelongsTo(() => User, 'user_id')
  user: User;
}
