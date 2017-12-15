class Person {
    constructor(id, {firstName, lastName, buildingId, positionId}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.buildingId = buildingId;
        this.positionId = positionId;
    }
}

module.exports = Person;