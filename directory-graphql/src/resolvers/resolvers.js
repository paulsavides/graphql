var Building = require('../types/building');
var Position = require('../types/position');
var Person = require('../types/person');

var buildingRepo = require('../repos/buildingRepo');
var positionRepo = require('../repos/positionRepo');
var personRepo = require('../repos/personRepo');

function building(args) {
    var map = function (input) {
        return new Building(input.id, input);
    }

    return runQuery(args, buildingRepo.getBuilding, buildingRepo.getBuildings, map);
}

function createBuilding({input}) {
    return buildingRepo.createBuilding(input).then(newId => {
        return new Building(newId, input);
    })
}

function position(args) {
    var map = function (input) {
        return new Position(input.id, input.description);
    }

    return runQuery(args, positionRepo.getPosition, positionRepo.getPositions, map);
}

function createPosition({input}) {
    return positionRepo.createPosition(input.description).then(newId => {
        return new Position(newId, input.description);
    })
}

function person(parent, args) {
    var map = function (input) {
        return new Person(input.id, input);
    }

    return runQuery(args, personRepo.getPerson, personRepo.getPersons, map);
}

function createPerson({input}) {
    return personRepo.createPerson(input).then(newId => {
        return new Person(newId, input);
    });
}

function runQuery(args, getOne, getAll, toType) {
    return (args !== undefined && args.id !== undefined) ? getOne(args.id).then(
        res => {
            var arr = [];
            if (res !== undefined) {
                arr.push(toType(res));
            }
            return arr;
        }
    ) : getAll().then(
        res => {
            return res.map(toType);
        }
    );
}

module.exports = {
    Query: {
        building: building,
        position: position,
        person: person
    },
    Mutation: {
        createBuilding: createBuilding,
        createPosition: createPosition,
        createPerson: createPerson        
    }
}