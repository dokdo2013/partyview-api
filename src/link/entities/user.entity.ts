/*
-- auto-generated definition
create table user
(
    user_id           int                                  not null,
    name              varchar(64)                          not null,
    display_name      varchar(64)                          null,
    type              varchar(64)                          null,
    broadcaster_type  varchar(16)                          null,
    description       varchar(256)                         null,
    profile_image_url varchar(256)                         null,
    offline_image_url varchar(256)                         null,
    view_count        int                                  null,
    user_created_at   datetime                             null,
    created_at        datetime default current_timestamp() null,
    updated_at        datetime default current_timestamp() null,
    constraint user_name_uindex
        unique (name),
    constraint user_user_id_uindex
        unique (user_id)
);
*/

import {
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';

interface UserAttributes {
  userId: number;
  name: string;
  displayName: string;
  type: string;
  broadcasterType: string;
  description: string;
  profileImageUrl: string;
  offlineImageUrl: string;
  viewCount: number;
  userCreatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateAttibutes {
  userId: number;
  name: string;
  displayName: string;
  type: string;
  broadcasterType: string;
  description: string;
  profileImageUrl: string;
  offlineImageUrl: string;
  viewCount: number;
  userCreatedAt: Date;
}

@Table({
  tableName: 'user',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model<UserAttributes, UserCreateAttibutes> {
  @Column({
    field: 'user_id',
    primaryKey: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @Column({
    field: 'name',
    allowNull: false,
    type: DataType.STRING(64),
  })
  name: string;

  @Column({
    field: 'display_name',
    allowNull: true,
    type: DataType.STRING(64),
  })
  displayName: string;

  @Column({
    field: 'type',
    allowNull: true,
    type: DataType.STRING(64),
  })
  type: string;

  @Column({
    field: 'broadcaster_type',
    allowNull: true,
    type: DataType.STRING(16),
  })
  broadcasterType: string;

  @Column({
    field: 'description',
    allowNull: true,
    type: DataType.STRING(256),
  })
  description: string;

  @Column({
    field: 'profile_image_url',
    allowNull: true,
    type: DataType.STRING(256),
  })
  profileImageUrl: string;

  @Column({
    field: 'offline_image_url',
    allowNull: true,
    type: DataType.STRING(256),
  })
  offlineImageUrl: string;

  @Column({
    field: 'view_count',
    allowNull: true,
    type: DataType.INTEGER,
  })
  viewCount: number;

  @Column({
    field: 'user_created_at',
    allowNull: true,
    type: DataType.DATE,
  })
  userCreatedAt: Date;

  @Column({
    field: 'created_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updatedAt: Date;
}
