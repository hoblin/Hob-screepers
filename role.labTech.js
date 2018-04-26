/**
 * Created by Bob on 7/12/2017.
 */

let _ = require('lodash');
const profiler = require('screeps-profiler');

/**
 * @return {null}
 */
function role(creep) {
    //INITIAL CHECKS
    creep.say(ICONS.reaction, true);
    if (creep.renewalCheck(6)) return null;
    if (creep.borderCheck()) return null;
    if (creep.wrongRoom()) return null;
    creep.repairRoad();
    if (creep.carry[RESOURCE_ENERGY] > 0) {
        let adjacentStructure = _.filter(creep.pos.findInRange(FIND_STRUCTURES, 1), (s) => (s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_SPAWN) && s.energy < s.energyCapacity);
        if (adjacentStructure.length > 0) creep.transfer(adjacentStructure[0], RESOURCE_ENERGY);
    }
    if (_.sum(creep.carry) === 0) creep.memory.hauling = false;
    if (_.sum(creep.carry) > creep.carryCapacity * 0.75) creep.memory.hauling = true;
        if (droppedResources(creep)) return null;
        let labs = shuffle(_.filter(creep.room.structures, (s) => s.structureType === STRUCTURE_LAB));
        let terminal = creep.room.terminal;
        let storage = creep.room.storage;
        for (let key in labs) {
            let helper = _.filter(creep.room.creeps, (c) => c.memory && c.memory.labHelper === labs[key].id && c.id !== creep.id)[0];
            if (helper) continue;
            if (creep.memory.emptying ||
                (labs[key].memory.itemNeeded && !labs[key].memory.neededBoost && (labs[key].mineralType && labs[key].mineralType !== labs[key].memory.itemNeeded)) ||
                (!labs[key].memory.itemNeeded && !labs[key].memory.neededBoost && labs[key].mineralAmount >= 500) ||
                (!labs[key].memory.itemNeeded && !labs[key].memory.neededBoost && labs[key].mineralType && labs[key].mineralType !== labs[key].memory.creating)) {
                if (!creep.memory.labHelper) creep.memory.labHelper = labs[key].id;
                let lab = Game.getObjectById(creep.memory.labHelper);
                if (_.sum(creep.carry) > 0) {
                    for (let resourceType in creep.carry) {
                        if (resourceType > 0 && ((_.includes(END_GAME_BOOSTS, resourceType) || _.includes(TIER_2_BOOSTS, resourceType) || resourceType === RESOURCE_GHODIUM) && _.sum(terminal.store) < terminal.storeCapacity * 0.95)) {
                            switch (creep.transfer(terminal, resourceType)) {
                                case OK:
                                    creep.memory.emptying = undefined;
                                    creep.memory.labHelper = undefined;
                                    return undefined;
                                case ERR_NOT_IN_RANGE:
                                    creep.memory.emptying = true;
                                    creep.shibMove(terminal);
                                    return undefined;
                            }
                        } else {
                            switch (creep.transfer(storage, resourceType)) {
                                case OK:
                                    creep.memory.emptying = undefined;
                                    creep.memory.labHelper = undefined;
                                    return undefined;
                                case ERR_NOT_IN_RANGE:
                                    creep.memory.emptying = true;
                                    creep.shibMove(storage);
                                    return undefined;
                            }
                        }
                    }
                } else {
                    switch (creep.withdraw(lab, lab.mineralType)) {
                        case OK:
                            creep.memory.emptying = true;
                            creep.memory.itemStorage = undefined;
                            creep.memory.componentNeeded = undefined;
                            return undefined;
                        case ERR_NOT_IN_RANGE:
                            creep.shibMove(labs[key]);
                            creep.memory.emptying = true;
                            return undefined;
                        case ERR_NOT_ENOUGH_RESOURCES:
                            creep.memory.emptying = undefined;
                            creep.memory.itemStorage = undefined;
                            creep.memory.componentNeeded = undefined;
                            return undefined;
                    }
                }
            } else if (labs[key].memory.itemNeeded && (labs[key].mineralAmount < 250 || !labs[key].mineralAmount) && (!labs[key].mineralType || labs[key].mineralType === labs[key].memory.itemNeeded)) {
                if (!creep.memory.labHelper) creep.memory.labHelper = labs[key].id;
                let lab = Game.getObjectById(creep.memory.labHelper);
                creep.memory.componentNeeded = lab.memory.itemNeeded;
                if (creep.carry[creep.memory.componentNeeded] === 0 || !creep.carry[creep.memory.componentNeeded]) {
                    if (!creep.memory.itemStorage) {
                        if (storage.store[lab.memory.itemNeeded] > 0) {
                            creep.memory.itemStorage = storage.id;
                        } else if (terminal.store[lab.memory.itemNeeded] > 0) {
                            creep.memory.itemStorage = terminal.id;
                        } else {
                            creep.memory.itemStorage = undefined;
                            creep.memory.labHelper = undefined;
                            creep.memory.componentNeeded = undefined;
                        }
                    } else {
                        if (_.sum(creep.carry) > creep.carry[creep.memory.componentNeeded] || (_.sum(creep.carry) > 0 && !creep.carry[creep.memory.componentNeeded])) {
                            for (let resourceType in creep.carry) {
                                switch (creep.transfer(storage, resourceType)) {
                                    case OK:
                                        creep.memory.emptying = undefined;
                                        return undefined;
                                    case ERR_NOT_IN_RANGE:
                                        creep.shibMove(storage);
                                        return undefined;
                                }
                            }
                        } else {
                            switch (creep.withdraw(Game.getObjectById(creep.memory.itemStorage), creep.memory.componentNeeded)) {
                                case OK:
                                    creep.memory.itemStorage = undefined;
                                    return undefined;
                                case ERR_NOT_IN_RANGE:
                                    creep.shibMove(Game.getObjectById(creep.memory.itemStorage));
                                    return undefined;
                                case ERR_NOT_ENOUGH_RESOURCES:
                                    creep.memory.emptying = undefined;
                                    creep.memory.itemStorage = undefined;
                                    creep.memory.componentNeeded = undefined;
                                    return undefined;
                            }
                        }
                    }
                } else if (creep.carry[creep.memory.componentNeeded] > 0) {
                    if (lab) {
                        switch (creep.transfer(lab, creep.memory.componentNeeded)) {
                            case OK:
                                creep.memory.itemStorage = undefined;
                                creep.memory.labHelper = undefined;
                                creep.memory.componentNeeded = undefined;
                                return undefined;
                            case ERR_NOT_IN_RANGE:
                                creep.shibMove(lab);
                                return undefined;
                        }
                    } else {
                        creep.memory.itemStorage = undefined;
                        creep.memory.labHelper = undefined;
                        creep.memory.componentNeeded = undefined;
                    }
                } else {
                    if (_.sum(creep.carry) > 0) {
                        for (let resourceType in creep.carry) {
                            if (resourceType > 0 && ((_.includes(END_GAME_BOOSTS, resourceType) || _.includes(TIER_2_BOOSTS, resourceType) || resourceType === RESOURCE_GHODIUM) && _.sum(terminal.store) < terminal.storeCapacity * 0.95)) {
                                switch (creep.transfer(terminal, resourceType)) {
                                    case OK:
                                        creep.memory.emptying = undefined;
                                        return undefined;
                                    case ERR_NOT_IN_RANGE:
                                        creep.shibMove(terminal);
                                        return undefined;
                                }
                            } else {
                                switch (creep.transfer(storage, resourceType)) {
                                    case OK:
                                        creep.memory.emptying = undefined;
                                        return undefined;
                                    case ERR_NOT_IN_RANGE:
                                        creep.shibMove(storage);
                                        return undefined;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!creep.memory.labHelper) {
            let closeLab = creep.pos.findClosestByRange(creep.room.structures, {filter: (s) => s.structureType === STRUCTURE_LAB});
            if (creep.pos.getRangeTo(closeLab) > 3) {
                creep.shibMove(closeLab, {range: 2})
            } else {
                creep.idleFor(15);
            }
        }
}

module.exports.role = profiler.registerFN(role, 'labTechRole');

function droppedResources(creep) {
    let tombstone;
    if (!!~['shard0', 'shard1', 'shard2'].indexOf(Game.shard.name)) tombstone = creep.room.find(FIND_TOMBSTONES, {filter: (r) => _.sum(r.store) > r.store[RESOURCE_ENERGY] || (!r.store[RESOURCE_ENERGY] && _.sum(r.store) > 0)})[0];
    let resources = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (r) => r.resourceType !== RESOURCE_ENERGY})[0];
    if (!!~['shard0', 'shard1', 'shard2'].indexOf(Game.shard.name) && tombstone) {
        let storage = creep.room.storage;
        if (_.sum(creep.carry) > 0) {
            for (let resourceType in creep.carry) {
                switch (creep.transfer(storage, resourceType)) {
                    case OK:
                        return false;
                    case ERR_NOT_IN_RANGE:
                        creep.shibMove(storage);
                        return true;
                }
            }
        } else {
            for (let resourceType in tombstone.store) {
                switch (creep.withdraw(tombstone, resourceType)) {
                    case OK:
                        return true;
                    case ERR_NOT_IN_RANGE:
                        creep.shibMove(tombstone);
                        return true;
                }
            }
        }
    } else if (resources) {
        let storage = creep.room.storage;
        if (_.sum(creep.carry) > 0) {
            for (let resourceType in creep.carry) {
                switch (creep.transfer(storage, resourceType)) {
                    case OK:
                        return false;
                    case ERR_NOT_IN_RANGE:
                        creep.shibMove(storage);
                        return true;
                }
            }
        } else {
            switch (creep.pickup(resources)) {
                case OK:
                    return true;
                case ERR_NOT_IN_RANGE:
                    creep.shibMove(resources);
                    return true;
            }
        }
    } else {
        return false;
    }
}