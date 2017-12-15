var db = require('../data/dbFactory').db();

module.exports = {
    getPerson: getPerson,
    getPersons: getPersons,
    createPerson: createPerson
}

function getPerson(personId) {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT id, first_name, last_name, building_id, position_id FROM person WHERE id = ?';
        var stmt = db.prepare(sql);

        stmt.get(personId, (err, row) => {
            if (err !== null) {
                reject(err);
                return;
            }

            if (row !== undefined) {
                resolve(mapRow(row))
                return;
            }

            reject(new Error('An undefined event occured'));
        });
    });
}

function getPersons() {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT id, first_name, last_name, building_id, position_id FROM person';

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
    })
}

function createPerson(person) {
    return new Promise((resolve, reject) => {
        var sql = 'INSERT INTO person (first_name, last_name, building_id, position_id) VALUES (?,?,?,?)';
        var stmt = db.prepare(sql);

        stmt.run(person.firstName, person.lastName, person.buildingId, person.positionId, (err, _) => {
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
        firstName: row.first_name,
        lastName: row.last_name,
        buildingId: row.building_id,
        positionId: row.position_id
    }
}