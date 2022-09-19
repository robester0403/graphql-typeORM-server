import "reflect-metadata";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { TagResolver } from "./resolvers/tag";
import { AppDataSource } from "./db/data-source";
// import { typeDefs } from './schema';
// import { resolvers } from './resolvers';

const main = async () => {
  try {
    AppDataSource.initialize();
  } catch (err) {
    console.log(err);
    throw new Error("Error connecting to database");
  }

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver, TagResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

//change later
main().catch((err) => console.error(err));
