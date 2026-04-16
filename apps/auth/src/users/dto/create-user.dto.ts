import {
  IsArray,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { RoleDto } from './role.dto';
import { Type } from 'class-transformer';

@InputType()
export class CreateUserDto {
  @IsEmail()
  @Field()
  email!: string;

  @IsStrongPassword()
  @Field()
  password!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => RoleDto)
  @Field(() => [RoleDto], { nullable: true })
  roles?: RoleDto[];
}
