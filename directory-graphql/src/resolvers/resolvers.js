var RandomDie = require('../types/randomDie.js');

function quoteOfTheDay() {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';    
}

function random() {
    return Math.random();
}

function rollDice(args) {
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
}

function getDie({numSides}) {
    return new RandomDie(numSides || 6);
}

module.exports  = {
    root: {
        quoteOfTheDay: quoteOfTheDay,
        random: random,
        getDie: getDie
        
    }
}