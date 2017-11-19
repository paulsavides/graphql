var express = require('express');
var graphqlHTTP = require('express-graphql');
var { loadSchema } = require('./schema/schemaBuilder');
var { root } = require('./resolvers/resolvers');

// Construct a schema, using GraphQL schema language
var schema = loadSchema();
var PORT = 3000;

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(PORT);
console.log('Running a GraphQL API server at localhost:' + PORT + '/graphql');