/**
 * Created by Bob on 7/12/2017.
 */

let _ = require('lodash');
const profiler = require('screeps-profiler');

function role(creep) {
    creep.borderCheck();
    creep.room.cacheRoomIntel();
    let sentence = ['Just', 'Here', 'Annoying', 'You'];
    let word = Game.time % sentence.length;
    creep.say(sentence[word], true);
    if (!creep.memory.destination) {
        let adjacent = Game.map.describeExits(creep.pos.roomName);
        creep.memory.destination = _.sample(adjacent);
    }
    if (creep.memory.destinationReached !== true) {
        creep.shibMove(new RoomPosition(25, 25, creep.memory.destination), {
            allowHostile: true,
            offRoad: true,
            range: 23
        });
        if (Game.time % 100) creep.memory.destinationReached = true;
        if (creep.pos.roomName === creep.memory.destination) {
            if (!creep.handleMilitaryCreep(false, false, false, true)) {
                if (creep.room.controller && (!creep.room.controller.sign || creep.room.controller.sign.username !== USERNAME) &&
                    (!creep.room.controller.owner || !_.includes(FRIENDLIES, creep.room.controller.owner.username)) &&
                    (!creep.room.controller.reservation || !_.includes(FRIENDLIES, creep.room.controller.reservation.username))) {
                    let signs = ["This one will be mine.", "I'll eat that.", "Om-nom-nom", "I want this one", "MOAR ROOMS!!!1!1!"];
                    switch (creep.signController(creep.room.controller, _.sample(signs))) {
                        case OK:
                            creep.memory.destinationReached = true;
                            break;
                        case ERR_NOT_IN_RANGE:
                            creep.shibMove(creep.room.controller, {offRoad: true});
                    }
                } else {
                    creep.memory.destinationReached = true;
                }
            }
        }
    } else {
        creep.memory.destination = undefined;
        creep.memory.destinationReached = undefined;
    }
}

module.exports.role = profiler.registerFN(role, 'explorerRole');
