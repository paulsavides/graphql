var fs = require('fs');

module.exports = { migrate: migrate };

function migrate(db, migrationRoot) {
    fs.readdir(migrationRoot, function(err, files) {
        // not sure what to check against
        if (err !== undefined && err !== null) {
            console.log(err);
            return;
        }

        

        for (var i = 0; i < files.length; i++) {
            console.log(files[i]);
        }

        files.forEach((file) => {
            console.log(file);
        })
    })
}

