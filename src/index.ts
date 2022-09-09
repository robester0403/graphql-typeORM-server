import "reflect-metadata";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/task";
// import { typeDefs } from './schema';
// import { resolvers } from './resolvers';

const main = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
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
