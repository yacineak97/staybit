import { AbstractEntity } from '../database';
import { Column, Entity } from 'typeorm';
import { Directive, Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
@Directive('@shareable')
export class Role extends AbstractEntity<Role> {
  @Column()
  @Field()
  name!: string;
}
