var fs = require('fs')


module.exports = { migrate: migrate };

function migrate(db, migrationRoot) {
    
    db.get('SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'properties\'')
    .then(res => {
        var curSchema;
        if (res === undefined) {
            curSchema = 0;
        } else {
            curSchema = res;
        }
        
        var versions = loadSchemaVers(migrationRoot);

        for (var i = curSchema; i < versions.length; i++) {
            var data = fs.readFileSync(migrationRoot + '\\' + versions[i].fileName, {encoding: 'utf-8'});
            console.log(data);
            db.run(data)
            .catch(err => {
                console.log(err);
            });
        }
    })
    .catch(err => {
        console.log("error: " + err);
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