var Building = require('../types/building');
var buildingRepo = require('../repos/buildingRepo');

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

module.exports  = {
    root: {
        building: building,
        createBuilding: createBuilding
    }
}