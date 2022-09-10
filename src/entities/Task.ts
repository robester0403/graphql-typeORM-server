import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn() // primary key and autogenerated ID by typeORM;
  id: number;

  @CreateDateColumn() // automatically insert date when created
  created: Date;

  @UpdateDateColumn() // automatically insert and replace date when created
  uodated: Date;

  @Column()
  title: string;

  @Column()
  isComplete: boolean;
}
