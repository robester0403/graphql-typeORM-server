import express, { Express } from "express";
// import { ApolloServer } from 'apollo-server-express';
// import { typeDefs } from './schema';
// import { resolvers } from './resolvers';

const main = async () => {
  const app: Express = express();
  app.get("/", (_req, res) => res.send("hello world"));
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

//change later
main().catch((err) => console.error(err));
