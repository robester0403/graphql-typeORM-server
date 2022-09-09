import { Query, Resolver } from "type-graphql";

@Resolver()
export class TaskResolver {
  @Query(() => String) // Capital String is the graphql type
  hello(): string {
    // lowercase string is the typescript type
    // this is the method that will be called when the query is executed
    return "hello world";
  }
}

// export class TaskResolver {
//   @Query(() => [Task])
//   async tasks(): Promise<Task[]> {
//     return await Task.find();
//   }

//   @Query(() => Task)
//   async task(@Arg("id") id: string): Promise<Task | undefined> {
//     return await Task.findOne(id);
//   }

//   @Mutation(() => Task)
//   async createTask(@Arg("input") input: TaskInput): Promise<Task> {
//     return await Task.create(input).save();
//   }

//   @Mutation(() => Task)
//   async updateTask(
//     @Arg("id") id: string,
//     @Arg("input") input: TaskInput
//   ): Promise<Task | undefined> {
//     await Task.update({ id }, input);
//     return await Task.findOne(id);
//   }

//   @Mutation(() => Boolean)
//   async deleteTask(@Arg("id") id: string): Promise<boolean> {
//     await Task.delete(id);
//     return true;
//   }
// }
