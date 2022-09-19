import { Tag } from "../entities/Tag";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../db/data-source";
// import { Task } from "../entities/Task";

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  tag(): Promise<Tag[]> {
    return Tag.find();
  }

  @Query(() => Tag)
  testQueryBuilder(): Promise<Tag | null> {
    return AppDataSource.getRepository(Tag)
      .createQueryBuilder("tag")
      .where("tag.id = :id", { id: 1 })
      .getOne();
  }

  @Mutation(() => Tag)
  createTag(@Arg("tag_name", () => String) tag_name: string): Promise<Tag> {
    return Tag.create({ tag_name }).save();
  }

  @Mutation(() => Boolean)
  async deleteTag(@Arg("id", () => Int) id: number): Promise<boolean> {
    if (await Tag.findOneBy({ id: id })) {
      // need to review this one
      await Tag.delete(id);
      return true;
    } else {
      return false;
    }
  }

  // @Mutation(() => Tag)
  // async addTagToTask(
  //   @Arg("id", () => Int) id: number,
  //   @Arg("task", () => Int) task: number
  // ): Promise<Tag> {
  //   const tag = await Tag.findOneBy({ id: id });
  //   if (!tag) {
  //     throw new Error("Tag not found");
  //   }
  //   const existingTask = await Task.findOneBy({ id: task });
  //   if (!existingTask) {
  //     throw new Error("Task not found");
  //   }
  //   tag.tasks = [existingTask];
  //   await tag.save();
  //   return tag;
  // }
  //   // createTag(@Arg("tag_name", () => String) tag_name: string): Promise<Tag> {
  //   //   return Tag.create({ tag_name }).save();
}
