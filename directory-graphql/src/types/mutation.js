class Mutation {
    constructor({message}) {
        this.message = message;
    }

    setMessage({message}) {
        this.message = message;
    }

    getMessage({message}) {
        return message;
    }
}

module.exports = Mutation;