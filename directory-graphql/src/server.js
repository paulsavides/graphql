var express = require('express');
var db = require('sqlite');
var { migrate } = require('./migrator/migrator');
var process = require('process');

db.open('data/directory.db');

console.log(process.cwd());

migrate(db, 'migrations');

var PORT = process.env.PORT || 3000;

const app = express();
app.get('/', (req, res) => res.send("Hey"));
app.listen(PORT, () => console.log("happily running your server on port: " + PORT));