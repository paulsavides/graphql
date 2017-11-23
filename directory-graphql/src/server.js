var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var { migrate } = require('./migrator/migrator');
var process = require('process');

var db = new sqlite3.Database('data/directory.db');
migrate(db, 'migrations');

// sqlite.open('data/directory.db').then(db => {
//     migrate(db, 'migrations');

//     // db.get('SELECT value FROM properties WHERE name = \'schema_verion\'').then(res => {
//     //     console.log(res);
//     // })
//     // .catch(err => {
//     //     console.log(err);
//     // });
// });
//console.log(db.get('SELECT value FROM properties WHERE name = \'schema_verion\''));

console.log(process.cwd());

//migrate(db, 'migrations');

var PORT = process.env.PORT || 3000;

const app = express();
app.get('/', (req, res) => res.send("Hey"));
app.listen(PORT, () => console.log("happily running your server on port: " + PORT));