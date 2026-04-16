import { AbstractEntity } from '../database';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from './role.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User extends AbstractEntity<User> {
  @Column()
  @Field()
  email!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  @Field(() => [Role])
  roles?: Role[];
}
