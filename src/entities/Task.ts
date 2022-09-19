import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Tag } from "./Tag";

// @Field(type => [Rate]) (recommended, explicit [ ] syntax for Array types)
// @Field(itemType => Rate) (array is inferred from reflection - also works but is prone to errors)
@Entity("task")
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

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag)
  @JoinTable({
    name: "tasks_tags",
    joinColumn: {
      name: "task",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_tasks_tags_task",
    },
    inverseJoinColumn: {
      name: "tag",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_tasks_tags_tag",
    },
  })
  tags: Tag[] | null;
}
