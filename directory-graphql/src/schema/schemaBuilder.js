var fs = require ('fs');
var { makeExecutableSchema } = require('graphql-tools')
var resolvers = require('../resolvers/resolvers')

function loadSchema() {
    var filename = 'src/schema/schema.txt';
    
    var typeDefs = fs.readFileSync(filename, 'utf8');
    return makeExecutableSchema({typeDefs, resolvers});
}

module.exports = {
    loadSchema: loadSchema
}