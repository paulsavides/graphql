var fs = require ('fs');
var { buildSchema } = require('graphql');

function loadSchema() {
    var filename = 'src/schema/schema.txt';
    
    var data = fs.readFileSync(filename, 'utf8');
    return buildSchema(data);
}


module.exports = {
    loadSchema: loadSchema
}
