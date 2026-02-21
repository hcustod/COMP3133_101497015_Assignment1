const resolvers = {
  Query: {
    health: () => 'API is running',
  },
  Mutation: {
    _empty: () => 'Mutation root ready',
  },
};

module.exports = resolvers;
