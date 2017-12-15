var dbHelper = require('../data/dbHelper');

module.exports = {
    getBuildings : getBuildings,
    getBuilding: getBuilding,
    createBuilding: createBuilding
}

function getBuilding(buildingId) {
    var sql = 'SELECT id, name, address_number, street FROM building WHERE id = (?)';
    return dbHelper.getById(buildingId, sql, mapRow);
}

function getBuildings() {
    var sql = 'SELECT id, name, address_number, street FROM building';
    return dbHelper.getAll(sql, mapRow);
}

function createBuilding(building) {
    var sql = 'INSERT INTO building (name, address_number, street) VALUES (?,?,?)';
    var params = [
        building.name,
        building.addressNumber,
        building.street
    ];

    return dbHelper.create(sql, params);
}

function mapRow(row) {
    return {
        id: row.id,
        name: row.name,
        addressNumber: row.address_number,
        street: row.street
    }
}