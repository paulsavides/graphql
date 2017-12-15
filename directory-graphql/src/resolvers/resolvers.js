var Building = require('../types/building');
var Position = require('../types/position');

var buildingRepo = require('../repos/buildingRepo');
var positionRepo = require('../repos/positionRepo');

function building(args) {
    return args.id !== undefined ? buildingRepo.getBuilding(args.id).then(
        building => {
            var arr = [];
            arr.push(new Building(building.id, building));
            return arr;
        }
    ) : buildingRepo.getBuildings().then(
        buildings => {
            return buildings.map(building => new Building(building.id, building));
        }
    );
}

function createBuilding({input}) {
    return buildingRepo.createBuilding(input).then(newId => {
        return new Building(newId, input);
    })
}

function position(args) {
    return args.id !== undefined ? positionRepo.getPosition(args.id).then(
        position => {
            var arr = [];
            arr.push(new Position(position.id, position.description));
            return arr;
        }
    ) : positionRepo.getPositions().then(
        positions => {
            return positions.map(position => new Position(position.id, position.description));
        }
    );
}

function createPosition({input}) {
    return positionRepo.createPosition(input.description).then(newId => {
        return new Position(newId, input.description);
    })
}

module.exports  = {
    root: {
        building: building,
        createBuilding: createBuilding,
        position: position,
        createPosition: createPosition
    }
}