import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

// @Field(type => [Rate]) (recommended, explicit [ ] syntax for Array types)
// @Field(itemType => Rate) (array is inferred from reflection - also works but is prone to errors)
@Entity()
@ObjectType()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @CreateDateColumn()
  @Field(() => String)
  created: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updated: Date;

  @Column()
  @Field(() => String, { nullable: false })
  title: string;

  @Column()
  @Field(() => String, { nullable: false })
  description: string;
}
