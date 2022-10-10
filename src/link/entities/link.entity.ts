/**
 -- auto-generated definition
create table link
(
    `key`      varchar(20)                          not null
        primary key,
    user_ip    varchar(50)                          null,
    user_agent varchar(100)                         null,
    created_at datetime default current_timestamp() null
);
 */

import {
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { LinkCreateDto, LinkDto } from '../dto/link.dto';

@Table({
  tableName: 'link',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
})
export class Link extends Model<LinkDto, LinkCreateDto> {
  @Column({
    field: 'key',
    primaryKey: true,
    allowNull: false,
    type: DataType.STRING(20),
  })
  key: string;

  @Column({
    field: 'user_ip',
    allowNull: true,
    type: DataType.STRING(64),
  })
  userIp: string;

  @Column({
    field: 'user_agent',
    allowNull: true,
    type: DataType.STRING(256),
  })
  userAgent: string;

  @Column({
    field: 'created_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdAt: Date;
}
