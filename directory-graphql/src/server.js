var express = require('express');
var process = require('process');
var graphqlHTTP = require('express-graphql');

var { migrate } = require('./migrator/migrator');
var { loadSchema } = require('./schema/schemaBuilder');

var PORT = process.env.PORT || 3000;

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: loadSchema(),
    graphiql: true
}));

var db = require('./data/dbFactory').db();

// make sure the db is ready to go and then run the thing
migrate(db, 'migrations')
.then(() => {
    app.listen(PORT, () => console.log("happily running your server on port: " + PORT));
})
.catch(err => {
    console.log(err);
});
