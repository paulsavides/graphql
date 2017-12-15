var dbHelper = require('../data/dbHelper');

module.exports = {
    getPosition: getPosition,
    getPositions: getPositions,
    createPosition: createPosition
}

function getPosition(positionId) {
    var sql = 'SELECT id, description FROM position WHERE id = (?)';
    return dbHelper.getById(positionId, sql, mapRow);   
}

function getPositions() {
    var sql = 'SELECT id, description FROM position';
    return dbHelper.getAll(sql, mapRow);
}

function createPosition(description) {
    var sql = 'INSERT INTO position (description) VALUES (?)';
    return dbHelper.create(sql, [description]);
}

function mapRow(row) {
    return {
        id: row.id,
        description: row.description
    }
}