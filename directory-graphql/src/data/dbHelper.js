var db = require('./dbFactory').db();

/**
 * Will run the given SELECT query as a prepared statement using the given
 * numeric id as a parameter. Will return a promise of an object that has been
 * mapped according to the given mapRow function.
 * 
 * @param {number} id id of the item you wish to retrieve
 * @param {string} sql sql to run
 * @param {Function} mapRow function to map returned row from db to an anonymous object
 * @returns {Promise<any>} returns promise of the mapped object
 */
function getById(id, sql, mapRow) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            var stmt = db.prepare(sql);
            
            stmt.get(id, (err, row) => {
                if (err !== null) {
                    reject(err);
                    return;
                }

                if (row !== undefined) {
                    resolve(mapRow(row))
                    return;
                }

                resolve();
            });

            stmt.finalize();
        });
    });
}

/**
 * Will run the given sql query and map all returned rows using the given
 * mapRow function and returns a promise for an array of mapped objects.
 * 
 * @param {string} sql 
 * @param {function} mapRow function that maps returned sql row to an anonymous object of your choosing
 * @returns {Promise<Array<any>>} promise returns an array of mapped objects
 */
function getAll(sql, mapRow) {
    return new Promise((resolve, reject) => {        
        db.all(sql, (err, rows) => {
            if (err !== null) {
                reject(err);
                return;
            }

            if (rows !== undefined) {
                resolve(rows.map(mapRow));
                return;
            }

            return [];
        });
    });
}

/**
 * Will run the given SELECT query as a prepared statement using the given
 * numeric id as a parameter. Will return an array of mapped objects
 * 
 * @param {number} id id of a related entity
 * @param {string} sql sql to run
 * @param {Function} mapRow function to map returned row from db to an anonymous object
 * @returns {Promise<Array<any>>} promise returns an array of mapped objects
 */
function getAllById(id, sql, mapRow) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            var stmt = db.prepare(sql);
            
            stmt.all(id, (err, rows) => {
                if (err !== null) {
                    reject(err);
                    return;
                }
    
                if (rows !== undefined) {
                    resolve(rows.map(mapRow));
                    return;
                }
    
                resolve([]);
            });

            stmt.finalize();
        });
    });
}

/**
 * Runs given sql as a prepared statement with the given params and returns
 * a promise with the newly inserted id.
 * 
 * @param {string} sql Some INSERT sql to be run
 * @param {[]} params an ordered array of parameters
 * @returns {Promise<number>} promise returns id of the newly created item
 */
function create(sql, params) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            var stmt = db.prepare(sql);
            
            stmt.run(params, (err, _) => {
                if (err !== null) {
                    reject(err);
                    return;
                }
                
                resolve(stmt.lastID);
                return;
            });

            stmt.finalize();
        });
    });
}

module.exports = {
    getById: getById,
    getAll: getAll,
    getAllById: getAllById,
    create: create
}