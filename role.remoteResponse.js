/**
 * Created by Bob on 7/12/2017.
 */

let _ = require('lodash');
const profiler = require('screeps-profiler');

function role(creep) {
    creep.borderCheck();
    if (creep.hits < creep.hitsMax / 2) {
        creep.heal(creep);
    }
    if (Game.rooms[creep.memory.responseTarget] && creep.pos.roomName === Game.rooms[creep.memory.responseTarget].name) {
        creep.memory.destinationReached = true;
    } else {
        delete creep.memory.destinationReached;
    }
    if (!creep.memory.destinationReached) {
        let hostiles = creep.findClosestEnemy();
        if (creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }
        if (hostiles) {
            creep.handleMilitaryCreep();
        } else {
            creep.shibMove(new RoomPosition(25, 25, creep.memory.responseTarget), {range: 15}); //to move to any room}
        }
    } else {
        if (!creep.handleMilitaryCreep(false, true)) {
            findDefensivePosition(creep, creep);
        }
    }
}

module.exports.role = profiler.registerFN(role, 'remoteResponder');

function findDefensivePosition(creep, target) {
    if (target) {
        let bestRampart = target.pos.findClosestByPath(creep.room.structures, {filter: (r) => r.structureType === STRUCTURE_RAMPART && !r.pos.checkForObstacleStructure() && !r.pos.checkForConstructionSites() && (r.pos.lookFor(LOOK_CREEPS).length === 0 || (r.pos.x === creep.pos.x && r.pos.y === creep.pos.y)) && r.my});
        if (bestRampart) {
            creep.memory.assignedRampart = bestRampart.id;
            if (bestRampart.pos !== creep.pos) {
                creep.shibMove(bestRampart, {range: 0});
            }
        }
    }
}
