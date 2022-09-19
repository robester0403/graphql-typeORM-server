import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";

@Entity("tag")
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Index({ unique: true })
  @Column("varchar", { length: 100 })
  @Field(() => String, { nullable: false })
  tag_name: string;

  @ManyToMany(() => Task, { nullable: true })
  @Field(() => [Task])
  tasks: Promise<Task[]> | null;
}
