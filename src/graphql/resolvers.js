const queryResolvers = require('./resolvers/queryResolvers');
const mutationResolvers = require('./resolvers/mutationResolvers');

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

module.exports = resolvers;
