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

// function printIt(obj) {
//     if (obj === undefined || obj === null) {
//         console.log("obj is bad stop.");
//         return;
//     }

//     for (var key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             console.log("Key: " + key);
//             console.log("obj[key]: " + obj[key]);
//         }
//     }
// }

module.exports  = {
    root: {
        building: building
    }
}