import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";

@Resolver()
export class TaskResolver {
  // Read
  @Query(() => [Task])
  tasks(): Promise<Task[]> {
    return Task.find();
  }

  @Query(() => Task, { nullable: true })
  searchTask(@Arg("id", () => Int) id: number): Promise<Task | null> {
    return Task.findOne({ where: { id: id } });
  }

  // Create
  @Mutation(() => Task)
  createTask(
    @Arg("title", () => String) title: string,
    @Arg("description", () => String) description: string
  ): Promise<Task> {
    return Task.create({ title, description }).save();
  }

  // Delete
  @Mutation(() => Boolean)
  async deleteTask(@Arg("id", () => Int) id: number): Promise<boolean> {
    if (await Task.findOne({ where: { id: id } })) {
      // need to review this one
      await Task.delete(id);
      return true;
    } else {
      return false;
    }
  }

  //Update
  @Mutation(() => Boolean, { nullable: true })
  updateTask(
    @Arg("id", () => Int)
    id: number,

    @Arg("description", () => String)
    description: string
  ) {
    const task = Task.findOne({ where: { id: id } });
    if (!task) {
      return null;
    }

    try {
      Task.update({ id }, { description });
      return true;
    } catch {
      return false;
    }
  }
}
