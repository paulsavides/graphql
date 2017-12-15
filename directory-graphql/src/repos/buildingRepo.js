var db = require('../data/dbFactory').db();

module.exports = {
    getBuildings : getBuildings,
    getBuilding: getBuilding,
    createBuilding: createBuilding
}

function getBuilding(buildingId) {
    return new Promise((resolve, reject) => {
        console.log("got here with id: " + buildingId);
        var sql = 'SELECT id, name, address_number, street FROM building WHERE id = (?)';
        var stmt = db.prepare(sql);
        
        stmt.get(buildingId, (err, row) => {
            if (!(err === null || err === undefined)) {
                reject(err);
                return;
            }

            if (row !== null || row !== undefined) {
                resolve(mapRow(row));
                return;
            }

            reject(new Error("An undefined event occured"));
        });

        stmt.finalize();
    });
}

function getBuildings() {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT id, name, address_number, street FROM building';
        
        db.all(sql, (err, rows) => {
            if (!(err !== null || err !== undefined)) {
                reject(err);
                return;
            }

            if (rows !== null || rows !== undefined) {
                resolve(rows.map(mapRow));
                return;
            }

            reject(new Error("An undefined event occured"));
        });

    });
}

function createBuilding(building) {
    return new Promise((resolve, reject) => {
        var sql = 'INSERT INTO building (name, address_number, street) VALUES (?,?,?)';
        var stmt = db.prepare(sql);
        
        stmt.run(building.name, building.addressNumber, building.street, (err, _) => {
            if (err !== null || err !== undefined) {
                reject(err);
                return;
            }
            resolve();
            return;
        });

        stmt.finalize();
    });
}

function mapRow(row) {
    return {
        id: row.id,
        name: row.name,
        addressNumber: row.address_number,
        street: row.street
    }
}