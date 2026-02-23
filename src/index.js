require('dotenv').config();
require('./config/cloudinary');

const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const connectDB = require('./config/db');
const upload = require('./config/multer');
const parseGraphQLMultipart = require('./middleware/graphqlMultipart');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const startServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  await connectDB();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await apolloServer.start();
  app.use('/graphql', upload.any(), parseGraphQLMultipart);
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}${apolloServer.graphqlPath}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
