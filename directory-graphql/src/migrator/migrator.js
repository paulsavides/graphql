var fs = require('fs')


module.exports = { migrate: migrate };

function migrate(db, migrationRoot) {
    
    getCurSchema(db, migrateToVer);
}

function migrateToVer(db, ver) {
    console.log("version: " + ver);
    var versions = loadSchemaVers("migrations");

    db.serialize(() => {
        for (var i = ver; i < versions.length; i++) {
            var data = fs.readFileSync("migrations" + '\\' + versions[i].fileName, {encoding: 'utf-8'});

            // is this good design? No, but it will suffice for this little dude.
            data.split(';').forEach(stmt => {
                // don't want to execute an empty string, sqlite does not like that
                if (stmt.trim().length == 0) {
                    return;
                }

                db.run(stmt, (err) => {
                    if (err !== null) {
                        console.log('Error doing stuff: ', err);
                    }
                });                    
            });
        }
    });
}

function getCurSchema(db, next) {
    db.get('SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'properties\'', function(err, res) {
        if (!(err === undefined || err === null)) {
            console.log(err);
            throw err;
        }
        
        if (res === undefined || res === null) {
            next(db, 0); // initial schema
            return;
        }

        db.get('SELECT value FROM properties WHERE name=\'schema_version\'', (err, res) => {
            if (!(err === undefined || err === null)) {
                console.log(err);
                throw err;
            }
            
            if (res === undefined || res === null) {
                throw new Error("Something has happened that I don't fully understand.");
            }

            next(db, res.value);
        });
    });
}

function loadSchemaVers(migrationRoot) {
    var files = fs.readdirSync(migrationRoot);

    var versions = [];

    files.forEach(file => {
        var parts = file.split('-');
        var ver = parts[0];
        versions.push({version: +ver, fileName: file});
    });
    versions = versions.sort((verOne, verTwo) => {
        return verOne.version > verTwo.version;
    });

    return versions;
}