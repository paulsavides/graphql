var dbHelper = require('../data/dbHelper');

module.exports = {
    getPerson: getPerson,
    getPersons: getPersons,
    createPerson: createPerson
}

function getPerson(personId) {
    var sql = 'SELECT id, first_name, last_name, building_id, position_id FROM person WHERE id = ?';
    return dbHelper.getById(personId, sql, mapRow);
}

function getPersons() {
    var sql = 'SELECT id, first_name, last_name, building_id, position_id FROM person';
    return dbHelper.getAll(sql, mapRow);
}

function createPerson(person) {
    var sql = 'INSERT INTO person (first_name, last_name, building_id, position_id) VALUES (?,?,?,?)';
    var params = [
        person.firstName,
        person.lastName,
        person.buildingId,
        person.positionId
    ];

    return dbHelper.create(sql, params);
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