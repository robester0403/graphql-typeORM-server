import "reflect-metadata";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { DataSource } from "typeorm";
import { Task } from "./entities/Task";
import { Tag } from "./entities/Tag";
// import { typeDefs } from './schema';
// import { resolvers } from './resolvers';

const main = async () => {
  try {
    const AppDataSource = await new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123456",
      database: "cope-db",
      entities: [Task, Tag],
      synchronize: true,
    });
    AppDataSource.initialize();
  } catch (err) {
    console.log(err);
    throw new Error("Error connecting to database");
  }

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => res.send("hello world"));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

//change later
main().catch((err) => console.error(err));
