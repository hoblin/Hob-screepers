Creep.prototype.robbery = function () {
    let sentence = ['#overlords', 'Thanks', 'For', 'The', 'Stuff', this.memory.targetRoom];
    let word = Game.time % sentence.length;
    this.say(sentence[word], true);
    let terminal = this.room.terminal;
    let storage = this.room.storage;
    if (this.room.name !== this.memory.targetRoom && !this.memory.hauling) return this.shibMove(new RoomPosition(25, 25, this.memory.targetRoom), {
        range: 23,
        preferHighway: true
    });
    if (this.room.name === this.memory.targetRoom && ((!terminal || (_.sum(terminal.store) - terminal.store[RESOURCE_ENERGY] === 0)) && (!storage || _.sum(storage.store) - storage.store[RESOURCE_ENERGY] === 0))) {
        switch (this.signController(this.room.controller, 'Thanks for the loot! #robbed #Overlord-Bot')) {
            case OK:
                break;
            case ERR_NOT_IN_RANGE:
                return this.shibMove(this.room.controller);
        }
        let cache = Memory.targetRooms || {};
        let tick = Game.time;
        cache[this.pos.roomName] = {
            tick: tick,
            type: 'clean',
            level: 1,
            complete: true
        };
        Memory.targetRooms = cache;
        return this.memory.role = 'remoteHauler';
    }
    if (!this.memory.hauling) {
        if (((!terminal || (_.sum(terminal.store) - terminal.store[RESOURCE_ENERGY] === 0)) && (!storage || _.sum(storage.store) - storage.store[RESOURCE_ENERGY] === 0)) || _.sum(this.carry) === this.carryCapacity) return this.memory.hauling = true;
        if (storage && _.sum(storage.store) - storage.store[RESOURCE_ENERGY] > 0) {
            for (let resourceType in storage.store) {
                if (resourceType === RESOURCE_ENERGY) continue;
                switch (this.withdraw(storage, resourceType)) {
                    case OK:
                        break;
                    case ERR_NOT_IN_RANGE:
                        return this.shibMove(storage);
                }
            }
        } else if (terminal && _.sum(terminal.store) - terminal.store[RESOURCE_ENERGY] > 0) {
            for (let resourceType in terminal.store) {
                if (resourceType === RESOURCE_ENERGY) continue;
                switch (this.withdraw(terminal, resourceType)) {
                    case OK:
                        break;
                    case ERR_NOT_IN_RANGE:
                        return this.shibMove(terminal);
                }
            }
        }
    } else {
        if (_.sum(this.carry) === 0) return delete this.memory.hauling;
        if (this.pos.roomName === this.memory.overlord) {
            if (this.renewalCheck(6)) return;
            if (this.memory.storageDestination) {
                let storageItem = Game.getObjectById(this.memory.storageDestination);
                for (const resourceType in this.carry) {
                    switch (this.transfer(storageItem, resourceType)) {
                        case OK:
                            break;
                        case ERR_NOT_IN_RANGE:
                            this.shibMove(storageItem);
                            break;
                        case ERR_FULL:
                            delete this.memory.storageDestination;
                            break;
                    }
                }
            } else {
                let storage = this.room.storage;
                let terminal = this.room.terminal;
                if (storage && _.sum(storage.store) < storage.storeCapacity * 0.70) {
                    this.memory.storageDestination = storage.id;
                    for (const resourceType in this.carry) {
                        switch (this.transfer(storage, resourceType)) {
                            case OK:
                                delete this.memory.storageDestination;
                                delete this.memory.destinationReached;
                                break;
                            case ERR_NOT_IN_RANGE:
                                this.shibMove(storage);
                                break;
                            case ERR_FULL:
                                delete this.memory.storageDestination;
                                this.findStorage();
                                break;
                        }
                    }
                } else if (terminal && _.sum(terminal.store) < terminal.storeCapacity * 0.70) {
                    this.memory.storageDestination = terminal.id;
                    for (const resourceType in this.carry) {
                        switch (this.transfer(terminal, resourceType)) {
                            case OK:
                                delete this.memory.storageDestination;
                                delete this.memory.destinationReached;
                                break;
                            case ERR_NOT_IN_RANGE:
                                this.shibMove(terminal);
                                break;
                            case ERR_FULL:
                                delete this.memory.storageDestination;
                                this.findStorage();
                                break;
                        }
                    }
                }
            }
        } else {
            return this.shibMove(new RoomPosition(25, 25, this.memory.overlord), {range: 19, preferHighway: true});
        }
    }
};