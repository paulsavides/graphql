var sqlite3 = require('sqlite3').verbose();

var db = null;
exports.db = function() {
    if (db === null) {
        db = new sqlite3.Database('data/directory.db');
    }
    return db;
}