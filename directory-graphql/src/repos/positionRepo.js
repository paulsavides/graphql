var db = require('../data/dbFactory').db()

module.exports = {
    getPosition: getPosition,
    getPositions: getPositions,
    createPosition: createPosition
}

function getPosition(positionId) {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT id, description FROM position WHERE id = (?)';
        var stmt = db.prepare(sql);

        stmt.get(positionId, (err, row) => {
            if (err !== null) {
                reject(err);
                return;
            }

            if (row !== undefined) {
                resolve(mapRow(row));
                return;
            }

            reject(new Error("An undefined event occured"));
        });
    });
}

function getPositions() {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT id, description FROM position';

        db.all(sql, (err, rows) => {
            if (err !== null) {
                reject(err);
                return;
            }

            if (rows !== undefined) {
                resolve(rows.map(mapRow));
                return;
            }

            reject(new Error("An undefined event occured"));
        });
    });
}

function createPosition(description) {
    return new Promise((resolve, reject) => {
        var sql = 'INSERT INTO position (description) VALUES (?)';
        var stmt = db.prepare(sql);

        stmt.run(description, (err, _) => {
            if (err !== null) {
                reject(err);
                return;
            }

            resolve(stmt.lastID);
            return;
        });

        stmt.finalize();
    });
}

function mapRow(row) {
    return {
        id: row.id,
        description: row.description
    }
}