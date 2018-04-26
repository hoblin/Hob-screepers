let Log = require('logger');

let globals = function () {

    global.log = new Log();

    global.HOSTILES = [];

    global.ATTACK_LOCALS = true;

    global.FRIENDLIES = RawMemory.segments[2];

    global.TEN_CPU = Game.cpu.limit === 10 || Game.shard.name === 'shard1';

    //Terminal
    global.REACTION_NEEDS = [RESOURCE_ZYNTHIUM,
        RESOURCE_KEANIUM, RESOURCE_UTRIUM, RESOURCE_LEMERGIUM, RESOURCE_OXYGEN, RESOURCE_HYDROGEN, RESOURCE_CATALYST];

    global.BOOST_NEEDS = [];

    global.TRADE_TARGETS = [];

    global.DO_NOT_SELL_LIST = [RESOURCE_CATALYZED_UTRIUM_ACID,
        RESOURCE_CATALYZED_ZYNTHIUM_ACID,
        RESOURCE_CATALYZED_GHODIUM_ACID];

    global.TRADE_AMOUNT = 5000;
    global.ENERGY_AMOUNT = 20000;
    global.REACTION_AMOUNT = 1000;
    global.SELL_OFF_AMOUNT = 10000;
    global.BOOST_AMOUNT = 2500;

    // Reaction
    global.MAKE_THESE_BOOSTS = [RESOURCE_GHODIUM, RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_GHODIUM_ACID, RESOURCE_UTRIUM_ACID, RESOURCE_GHODIUM_ALKALIDE, RESOURCE_LEMERGIUM_ACID, RESOURCE_GHODIUM_HYDRIDE, RESOURCE_GHODIUM_OXIDE, RESOURCE_LEMERGIUM_OXIDE, RESOURCE_UTRIUM_HYDRIDE, RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_HYDROXIDE];
    global.END_GAME_BOOSTS = [RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_ZYNTHIUM_ACID, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_CATALYZED_UTRIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE];
    global.TIER_2_BOOSTS = [RESOURCE_GHODIUM_ALKALIDE, RESOURCE_GHODIUM_ACID, RESOURCE_ZYNTHIUM_ACID, RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_LEMERGIUM_ACID, RESOURCE_KEANIUM_ACID, RESOURCE_KEANIUM_ALKALIDE, RESOURCE_UTRIUM_ALKALIDE, RESOURCE_UTRIUM_ACID];
    global.TIER_1_BOOSTS = [RESOURCE_GHODIUM_HYDRIDE, RESOURCE_GHODIUM_OXIDE, RESOURCE_ZYNTHIUM_HYDRIDE, RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_LEMERGIUM_OXIDE, RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_KEANIUM_OXIDE, RESOURCE_KEANIUM_HYDRIDE, RESOURCE_UTRIUM_HYDRIDE, RESOURCE_UTRIUM_OXIDE];

    global.PRIORITIES = {
        // Harvesters
        stationaryHarvester: 1,
        // Workers
        worker: 5,
        waller: 3,
        upgrader: 3,
        mineralHarvester: 6,
        // Haulers
        hauler: 2,
        // Remotes
        remoteUtility: 5,
        remoteHarvester: 4,
        remoteHauler: 3,
        pioneer: 4,
        remoteResponse: 3,
        reserver: 4,
        // Power
        Power: 5,
        // SK
        SKworker: 6,
        SKattacker: 7,
        SKsupport: 6,
        SKhauler: 6,
        // Military
        urgent: 3,
        high: 5,
        medium: 6,
        secondary: 7,
        siege: 6,
        harass: 5,
        hold: 4,
        raid: 8,
        clean: 8,
        swarm: 4,
        scout: 2,
        responder: 2,
        // Misc
        claimer: 2,
        explorer: 2,
        jerk: 2,
    };

    global.SPAWN = {
        0: {
            stationaryHarvester: [WORK, WORK, CARRY, MOVE],
            worker: [MOVE, MOVE, CARRY, WORK],
            waller: [MOVE, MOVE, CARRY, WORK],
            upgrader: [MOVE, MOVE, CARRY, WORK],
            hauler: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            explorer: [MOVE],
            scout: [MOVE],
            responder: [TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK],
            longbow: [RANGED_ATTACK, MOVE]
        }
    };

    global.ICONS = {
        [STRUCTURE_CONTROLLER]: "\uD83C\uDFF0"
        , [STRUCTURE_SPAWN]: "\uD83C\uDFE5"
        , [STRUCTURE_EXTENSION]: "\uD83C\uDFEA"
        , [STRUCTURE_CONTAINER]: "\uD83D\uDCE4"
        , [STRUCTURE_STORAGE]: "\uD83C\uDFE6"
        , [STRUCTURE_RAMPART]: "\uD83D\uDEA7"
        , [STRUCTURE_WALL]: "\u26F0"
        , [STRUCTURE_TOWER]: "\uD83D\uDD2B"
        , [STRUCTURE_ROAD]: "\uD83D\uDEE3"
        , [STRUCTURE_LINK]: "\uD83D\uDCEE"
        , [STRUCTURE_EXTRACTOR]: "\uD83C\uDFED"
        , [STRUCTURE_LAB]: "\u2697"
        , [STRUCTURE_TERMINAL]: "\uD83C\uDFEC"
        , [STRUCTURE_OBSERVER]: "\uD83D\uDCE1"
        , [STRUCTURE_POWER_SPAWN]: "\uD83C\uDFDB"
        , [STRUCTURE_NUKER]: "\u2622"
        , [STRUCTURE_KEEPER_LAIR]: "" // TODO: Add icon for keeper lair
        , [STRUCTURE_PORTAL]: "" // TODO: Add icon for portal
        , [STRUCTURE_POWER_BANK]: "" // TODO: Add icon for power bank
        , source: "" // TODO: Add icon for source
        , constructionSite: "\uD83C\uDFD7"
        , resource: "\uD83D\uDEE2"
        , creep: "" // TODO: Add icon for creep
        , moveTo: "\u27A1"
        , attack: "\uD83D\uDDE1" // NOTE: Same as attackController
        , build: "\uD83D\uDD28"
        , repair: "\uD83D\uDD27"
        , dismantle: "\u2692"
        , harvest: "\u26CF"
        , pickup: "\u2B07" // NOTE: Same as withdraw
        , withdraw: "\u2B07" // NOTE: Same as pickup
        , transfer: "\u2B06" // NOTE: Same as upgradeController
        , upgradeController: "\u2B06" // NOTE: Same as transfer
        , claimController: "\uD83D\uDDDD"
        , reserveController: "\uD83D\uDD12"
        , attackController: "\uD83D\uDDE1" // NOTE: Same as attack
        , recycle: "\u267B"
        , tired: "\uD83D\uDCA6"
        , stuck0: "\uD83D\uDCA5"
        , stuck1: "\uD83D\uDCAB"
        , stuck2: "\uD83D\uDCA2"
        , wait0: "\uD83D\uDD5B" // 12:00
        , wait1: "\uD83D\uDD67" // 12:30
        , wait2: "\uD83D\uDD50" // 01:00
        , wait3: "\uD83D\uDD5C" // 01:30
        , wait4: "\uD83D\uDD51" // 02:00
        , wait5: "\uD83D\uDD5D" // 02:30
        , wait6: "\uD83D\uDD52" // 03:00
        , wait7: "\uD83D\uDD5E" // 03:30
        , wait8: "\uD83D\uDD53" // 04:00
        , wait9: "\uD83D\uDD5F" // 04:30
        , wait10: "\uD83D\uDD54" // 05:00
        , wait11: "\uD83D\uDD60" // 05:30
        , wait12: "\uD83D\uDD55" // 06:00
        , wait13: "\uD83D\uDD61" // 06:30
        , wait14: "\uD83D\uDD56" // 07:00
        , wait15: "\uD83D\uDD62" // 07:30
        , wait16: "\uD83D\uDD57" // 08:00
        , wait17: "\uD83D\uDD63" // 08:30
        , wait18: "\uD83D\uDD58" // 09:00
        , wait19: "\uD83D\uDD64" // 09:30
        , wait20: "\uD83D\uDD59" // 10:00
        , wait21: "\uD83D\uDD65" // 10:30
        , wait22: "\uD83D\uDD5A" // 11:00
        , wait23: "\uD83D\uDD66" // 11:30
        , sleep: "\uD83D\uDCA4" // for when script is terminated early to refill bucket
        , testPassed: "\uD83C\uDF89" // for when scout reaches its goal location
        , testFinished: "\uD83C\uDFC1" // for when scout has finished its test run
        , reaction: "\ud83d\udd2c"
        , haul: "\ud83d\ude9a"
        , respond: "\ud83d\ude93"
        , boost: "\ud83c\udccf"
        , nuke: "\u2622"
        , noEntry: "\u26d4"
        , renew: "\u26fd"
        , greenCheck: "\u2705"
        , crossedSword: "\u2694"
    };

    global.CUMULATIVE_CONTROLLER_DOWNGRADE = _.map(CONTROLLER_DOWNGRADE, (v1, k1, c1) => (_.reduce(c1, (a, v2, k2, c2) => (a + ((k2 <= k1) ? v2 : 0)), 0)));

    global.resourceWorth = function (resourceType) {
        switch (resourceType) {
            case RESOURCE_ENERGY:
            default:
                return 1; // 10^0
            case RESOURCE_HYDROGEN:
            case RESOURCE_OXYGEN:
            case RESOURCE_UTRIUM:
            case RESOURCE_LEMERGIUM:
            case RESOURCE_KEANIUM:
            case RESOURCE_ZYNTHIUM:
            case RESOURCE_CATALYST:
                return 10; // 10^1
            case RESOURCE_HYDROXIDE:
            case RESOURCE_ZYNTHIUM_KEANITE:
            case RESOURCE_UTRIUM_LEMERGITE:
                return 100; // 10^2
            case RESOURCE_UTRIUM_HYDRIDE:
            case RESOURCE_UTRIUM_OXIDE:
            case RESOURCE_KEANIUM_HYDRIDE:
            case RESOURCE_KEANIUM_OXIDE:
            case RESOURCE_LEMERGIUM_HYDRIDE:
            case RESOURCE_LEMERGIUM_OXIDE:
            case RESOURCE_ZYNTHIUM_HYDRIDE:
            case RESOURCE_ZYNTHIUM_OXIDE:
            case RESOURCE_GHODIUM_HYDRIDE:
            case RESOURCE_GHODIUM_OXIDE:
                return 1000; // 10^3
            case RESOURCE_UTRIUM_ACID:
            case RESOURCE_UTRIUM_ALKALIDE:
            case RESOURCE_KEANIUM_ACID:
            case RESOURCE_KEANIUM_ALKALIDE:
            case RESOURCE_LEMERGIUM_ACID:
            case RESOURCE_LEMERGIUM_ALKALIDE:
            case RESOURCE_ZYNTHIUM_ACID:
            case RESOURCE_ZYNTHIUM_ALKALIDE:
            case RESOURCE_GHODIUM_ACID:
            case RESOURCE_GHODIUM_ALKALIDE:
                return 10000; // 10^4
            case RESOURCE_CATALYZED_UTRIUM_ACID:
            case RESOURCE_CATALYZED_UTRIUM_ALKALIDE:
            case RESOURCE_CATALYZED_KEANIUM_ACID:
            case RESOURCE_CATALYZED_KEANIUM_ALKALIDE:
            case RESOURCE_CATALYZED_LEMERGIUM_ACID:
            case RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE:
            case RESOURCE_CATALYZED_ZYNTHIUM_ACID:
            case RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE:
            case RESOURCE_CATALYZED_GHODIUM_ACID:
            case RESOURCE_CATALYZED_GHODIUM_ALKALIDE:
                return 100000; // 10^5
            case RESOURCE_POWER:
                return 1000000; // 10^6
        }
    };
    global.RCL_1_ENERGY = 300;
    global.RCL_2_ENERGY = 550;
    global.RCL_3_ENERGY = 800;
    global.RCL_4_ENERGY = 1300;
    global.RCL_5_ENERGY = 1800;
    global.RCL_6_ENERGY = 2300;
    global.RCL_7_ENERGY = 5600;
    global.RCL_8_ENERGY = 12900;

    global.RCL_1_EXTENSIONS = 0;
    global.RCL_2_EXTENSIONS = 5;
    global.RCL_3_EXTENSIONS = 10;
    global.RCL_4_EXTENSIONS = 20;
    global.RCL_5_EXTENSIONS = 30;
    global.RCL_6_EXTENSIONS = 40;
    global.RCL_7_EXTENSIONS = 50;
    global.RCL_8_EXTENSIONS = 60;

    global.EST_SEC_PER_TICK = 4; // time between ticks is currently averaging ~4.84 seconds (as of 2017/05/07)
    global.EST_TICKS_PER_MIN = Math.ceil(60 / EST_SEC_PER_TICK); // 60s
    global.EST_TICKS_PER_DAY = Math.ceil(86400 / EST_SEC_PER_TICK); // 24h * 60m * 60s = 86400s

    global.toStr = (obj) => JSON.stringify(obj, null, 2); // shortcut to stringify an object (idea credit: warinternal, from the Screeps Slack)

    // Boost Components
    global.BOOST_COMPONENTS = {
        //Tier 3
        [RESOURCE_CATALYZED_GHODIUM_ALKALIDE]: [RESOURCE_GHODIUM_ALKALIDE, RESOURCE_CATALYST],
        [RESOURCE_CATALYZED_GHODIUM_ACID]: [RESOURCE_GHODIUM_ACID, RESOURCE_CATALYST],
        [RESOURCE_CATALYZED_ZYNTHIUM_ACID]: [RESOURCE_ZYNTHIUM_ACID, RESOURCE_CATALYST],
        [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE]: [RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYST],
        [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE]: [RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_CATALYST],
        [RESOURCE_CATALYZED_LEMERGIUM_ACID]: [RESOURCE_LEMERGIUM_ACID, RESOURCE_CATALYST],
        [RESOURCE_CATALYZED_KEANIUM_ALKALIDE]: [RESOURCE_KEANIUM_ALKALIDE, RESOURCE_CATALYST],
        [RESOURCE_CATALYZED_KEANIUM_ACID]: [RESOURCE_KEANIUM_ACID, RESOURCE_CATALYST],
        [RESOURCE_CATALYZED_UTRIUM_ACID]: [RESOURCE_UTRIUM_ACID, RESOURCE_CATALYST],
        [RESOURCE_CATALYZED_UTRIUM_ALKALIDE]: [RESOURCE_UTRIUM_ALKALIDE, RESOURCE_CATALYST],
        //Tier 2
        [RESOURCE_GHODIUM_ACID]: [RESOURCE_GHODIUM_HYDRIDE, RESOURCE_HYDROXIDE],
        [RESOURCE_GHODIUM_ALKALIDE]: [RESOURCE_GHODIUM_OXIDE, RESOURCE_HYDROXIDE],
        [RESOURCE_ZYNTHIUM_ACID]: [RESOURCE_ZYNTHIUM_HYDRIDE, RESOURCE_HYDROXIDE],
        [RESOURCE_ZYNTHIUM_ALKALIDE]: [RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_HYDROXIDE],
        [RESOURCE_LEMERGIUM_ALKALIDE]: [RESOURCE_LEMERGIUM_OXIDE, RESOURCE_HYDROXIDE],
        [RESOURCE_LEMERGIUM_ACID]: [RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_HYDROXIDE],
        [RESOURCE_KEANIUM_ALKALIDE]: [RESOURCE_KEANIUM_OXIDE, RESOURCE_HYDROXIDE],
        [RESOURCE_KEANIUM_ACID]: [RESOURCE_KEANIUM_HYDRIDE, RESOURCE_HYDROXIDE],
        [RESOURCE_UTRIUM_ACID]: [RESOURCE_UTRIUM_HYDRIDE, RESOURCE_HYDROXIDE],
        [RESOURCE_UTRIUM_ALKALIDE]: [RESOURCE_UTRIUM_OXIDE, RESOURCE_HYDROXIDE],
        //Tier 1
        [RESOURCE_GHODIUM_HYDRIDE]: [RESOURCE_GHODIUM, RESOURCE_HYDROGEN],
        [RESOURCE_GHODIUM_OXIDE]: [RESOURCE_GHODIUM, RESOURCE_OXYGEN],
        [RESOURCE_ZYNTHIUM_HYDRIDE]: [RESOURCE_ZYNTHIUM, RESOURCE_HYDROGEN],
        [RESOURCE_ZYNTHIUM_OXIDE]: [RESOURCE_ZYNTHIUM, RESOURCE_OXYGEN],
        [RESOURCE_LEMERGIUM_OXIDE]: [RESOURCE_LEMERGIUM, RESOURCE_OXYGEN],
        [RESOURCE_LEMERGIUM_HYDRIDE]: [RESOURCE_LEMERGIUM, RESOURCE_HYDROGEN],
        [RESOURCE_KEANIUM_OXIDE]: [RESOURCE_KEANIUM, RESOURCE_OXYGEN],
        [RESOURCE_KEANIUM_HYDRIDE]: [RESOURCE_KEANIUM, RESOURCE_HYDROGEN],
        [RESOURCE_UTRIUM_HYDRIDE]: [RESOURCE_UTRIUM, RESOURCE_HYDROGEN],
        [RESOURCE_UTRIUM_OXIDE]: [RESOURCE_UTRIUM, RESOURCE_OXYGEN],
        //Base
        [RESOURCE_GHODIUM]: [RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE],
        [RESOURCE_HYDROXIDE]: [RESOURCE_OXYGEN, RESOURCE_HYDROGEN],
        [RESOURCE_ZYNTHIUM_KEANITE]: [RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM],
        [RESOURCE_UTRIUM_LEMERGITE]: [RESOURCE_UTRIUM, RESOURCE_LEMERGIUM]
    };

    global.MY_USERNAME = _.get(
        _.find(Game.spawns) || _.find(Game.creeps) || _.get(_.find(Game.rooms, room => room.controller && room.controller.my), 'controller'),
        ['owner', 'username'],
    );

    /*
     Cached dynamic properties: Declaration
     By warinternal, from the Screeps Slack
     NOTES:
     - This function is easiest to use when declared as a global
     - See prototype.creep for usage examples
     */
    global.defineCachedGetter = function (proto, propertyName, fn) {
        Object.defineProperty(proto, propertyName, {
            get: function () {
                if (this === proto || this === undefined)
                    return;
                let result = fn.call(this, this);
                Object.defineProperty(this, propertyName, {
                    value: result,
                    configurable: true,
                    enumerable: false
                });
                return result;
            },
            configurable: true,
            enumerable: false
        });
    };

    /*
     The following is copied from the path finder in the screeps driver at:
     https://github.com/screeps/driver/blob/master/lib/path-finder.js
     */
    //const MAX_WORLD_SIZE = 255; // Talk to marcel before growing world larger than W127N127 :: E127S127
    // Convert a room name to/from usable coordinates ("E1N1" -> { xx: 129, yy: 126 })
    global.parseRoomName = function (roomName) {
        let room = /^([WE])([0-9]+)([NS])([0-9]+)$/.exec(roomName);
        if (!room) {
            return; //throw src Error("Invalid room name " + roomName);
        }
        let rx = (WORLD_WIDTH >> 1) + ((room[1] === "W") ? (-Number(room[2])) : (Number(room[2]) + 1));
        let ry = (WORLD_HEIGHT >> 1) + ((room[3] === "N") ? (-Number(room[4])) : (Number(room[4]) + 1));
        if (((rx > 0) && (rx <= WORLD_WIDTH) && (ry > 0) && (ry <= WORLD_HEIGHT)) === false) {
            return; //throw src Error("Invalid room name " + roomName);
        }
        return {xx: rx, yy: ry};
    };
    // Converts return value of 'parseRoomName' back into a normal room name
    global.generateRoomName = function (xx, yy) {
        return (
            ((xx <= (WORLD_WIDTH >> 1)) ? ("W" + ((WORLD_WIDTH >> 1) - xx)) : ("E" + (xx - (WORLD_WIDTH >> 1) - 1)))
            + ((yy <= (WORLD_HEIGHT >> 1)) ? ("N" + ((WORLD_HEIGHT >> 1) - yy)) : ("S" + (yy - (WORLD_HEIGHT >> 1) - 1)))
        );
    };
    // Helper function to convert RoomPosition objects into global coordinate objects
    global.toWorldPosition = function (rp) {
        let xx = (rp.x | 0), yy = (rp.y | 0);
        if (((xx >= 0) && (xx < 50) && (yy >= 0) && (yy < 50)) === false) {
            return; //throw src Error("Invalid room position");
        }
        let offset = parseRoomName(rp.roomName);
        return {
            xx: (xx + offset.xx * 50)
            , yy: (yy + offset.yy * 50)
        };
    };
    // Converts back to a RoomPosition
    global.fromWorldPosition = function (wp) {
        return new RoomPosition(
            wp[0] % 50
            , wp[1] % 50
            , generateRoomName(Math.floor(wp[0] / 50), Math.floor(wp[1] / 50))
        );
    };

    //Get average of array
    global.average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

// League Of Automated Nations allied users list by Kamots
// Provides global.LOANlist as array of allied usernames. Array is empty if not in an alliance, but still defined.
// Updates on 2nd run and then every 1001 ticks or if the global scope gets cleared.
// Usage: After you require this file, just add this to anywhere in your main loop to run every tick: global.populateLOANlist();
// global.LOANlist will contain an array of usernames after global.populateLOANlist() runs twice in a row (two consecutive ticks).
    global.populateLOANlist = function (LOANuser = "LeagueOfAutomatedNations", LOANsegment = 99) {
        if ((typeof RawMemory.setActiveForeignSegment == "function") && !!~['shard0', 'shard1', 'shard2'].indexOf(Game.shard.name)) { // For running in sim or private servers without errors
            if ((typeof Memory.lastLOANtime == "undefined") || (typeof global.LOANlist == "undefined")) {
                Memory.lastLOANtime = Game.time - 1001;
                global.LOANlist = [];
            }

            if (Game.time >= (Memory.lastLOANtime + 1000)) {
                RawMemory.setActiveForeignSegment(LOANuser, LOANsegment);
            }

            if ((Game.time >= (Memory.lastLOANtime + 1001)) && (typeof RawMemory.foreignSegment != "undefined") && (RawMemory.foreignSegment.username == LOANuser) && (RawMemory.foreignSegment.id == LOANsegment)) {
                Memory.lastLOANtime = Game.time;
                let allMyRooms = _.filter(Game.rooms, (aRoom) => (typeof aRoom.controller != "undefined") && aRoom.controller.my);
                if (allMyRooms.length == 0) {
                    global.LOANlist = [];
                    return false;
                }
                let myUsername = allMyRooms[0].controller.owner.username;
                if (RawMemory.foreignSegment.data == null) return false;
                else {
                    let LOANdata = JSON.parse(RawMemory.foreignSegment.data);
                    let LOANdataKeys = Object.keys(LOANdata);
                    for (let iL = (LOANdataKeys.length - 1); iL >= 0; iL--) {
                        if (LOANdata[LOANdataKeys[iL]].indexOf(myUsername) >= 0) {
                            global.LOANlist = LOANdata[LOANdataKeys[iL]];
                            return true;
                        }
                    }
                    return false;
                }
            }
            return true;
        } else {
            global.LOANlist = [];
            return false;
        }
    };

    global.shuffle = function (array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    };
};

module.exports = globals;
