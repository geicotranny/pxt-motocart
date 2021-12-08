/**
 * TODO:
 * Battery use
 * Motor accuracy (turns and distance)
 * Motor speed
 */
/**
 * Custom blocks
 */
//% weight=100 color=#EB0DD5 icon=""
namespace motocart {
    const MOVE_STEP = .2;
    enum TrafficViolation {
        INVALID_STOP,           // violation if cart stopped at non-stop area
        MISSED_STOP,            // violation if cart did not stop at stop sign
        WRONG_WAY,              
        LANE_VIOLATION,
        INVALID_DROPOFF,        // attempt was made to drop off in the wrong location
        INVALID_PICKUP,         // attempt was made to pick up at the wrong location 
        NO_GPS_WARNING,         // cart does not have GPS
        GPS_DISABLED_WARNING,   // GPS is not enabled for the classroom
        CANT_CLIMB
    };
    let isClassroom = checkForClassroomMarker();
    let initialized = false;
    let map_tile = [
		["XXXXXXXXXX","XXXXXXXXXX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX"],
		["XXXXXXXXXX","XXXXXXXXXX","________XX","________XX","________XX","________XX","________XX","________XX","XXXXXXXXXX","XXXXXXXXXX"],
		["XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XXXXXXXXXX","XXXXXXXXXX"],
		["XXXXXXXXXX","XXXXXXXXXX","XX________","XX________","XX________","XX________","XX________","XX________","XXXXXXXXXX","XXXXXXXXXX"],
		["XXXXXXXXXX","XXXXXXXXXX","XX________","XX________","XX________","XX________","XX________","XX________","XX______XX","XX______XX"],
		["XXXXXXXXXX","XXXXXXXXXX","________XX","________XX","________XX","________XX","________XX","________XX","XX______XX","XX______XX"],
		["XX______XX","XX______XX","________XX","________XX","________XX","________XX","________XX","________XX","XXXXXXXXXX","XXXXXXXXXX"],
		["XX______XX","XX______XX","XX________","XX________","XX________","XX________","XX________","XX________","XXXXXXXXXX","XXXXXXXXXX"],
		["XXXXXXXXXX","XXXXXXXXXX","________1_","________1_","__________","__________","_2________","_2________","XX____44XX","XX______XX"],
		["XX______XX","XX22____XX","________XX","________XX","________XX","________XX","_4______XX","_4______XX","XX____11XX","XX______XX"],
		["XX______XX","XX44____XX","________2_","________2_","__________","__________","_1________","_1________","XXXXXXXXXX","XXXXXXXXXX"],
		["XX______XX","XX11____XX","XX______4_","XX______4_","XX________","XX________","XX________","XX________","XX____22XX","XX______XX"],
		["XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX","XX______XX"],
		["XXXXXXXXXX","XXXXXXXXXX","__________","__________","__________","__________","__________","__________","XXXXXXXXXX","XXXXXXXXXX"]
    ];
	let mapData = [
        [{e:69,t:3,s:0},{e:70,t:5,s:0},{e:0,t:-1,s:0},{e:72,t:0,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:73,t:0,s:0},{e:0,t:-1,s:0},{e:73,t:0,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:73,t:0,s:0}],
        [{e:0,t:-1,s:0},{e:69,t:12,s:0},{e:0,t:-1,s:0},{e:71,t:7,s:0},{e:70,t:8,s:0},{e:71,t:13,s:0},{e:72,t:9,s:0},{e:0,t:-1,s:0},{e:72,t:11,s:12},{e:72,t:5,s:0},{e:0,t:-1,s:0},{e:72,t:12,s:0}],
        [{e:67,t:4,s:0},{e:68,t:10,s:0},{e:69,t:5,s:0},{e:0,t:-1,s:0},{e:69,t:12,s:0},{e:0,t:-1,s:0},{e:71,t:11,s:0},{e:71,t:13,s:0},{e:72,t:10,s:3},{e:72,t:10,s:10},{e:72,t:8,s:0},{e:71,t:6,s:0}],
        [{e:66,t:12,s:0},{e:0,t:-1,s:0},{e:68,t:7,s:0},{e:69,t:8,s:0},{e:69,t:6,s:0},{e:0,t:-1,s:0},{e:70,t:12,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:71,t:12,s:0},{e:0,t:-1,s:0}],
        [{e:66,t:12,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:68,t:12,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:69,t:11,s:12},{e:69,t:8,s:3},{e:70,t:13,s:0},{e:71,t:8,s:0},{e:70,t:10,s:0},{e:69,t:1,s:0}],
        [{e:65,t:7,s:0},{e:66,t:8,s:0},{e:66,t:13,s:0},{e:67,t:9,s:0},{e:0,t:-1,s:0},{e:68,t:4,s:0},{e:69,t:10,s:3},{e:69,t:9,s:12},{e:0,t:-1,s:0},{e:70,t:12,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0}],
        [{e:0,t:-1,s:0},{e:66,t:12,s:0},{e:0,t:-1,s:0},{e:66,t:7,s:0},{e:66,t:8,s:0},{e:67,t:6,s:0},{e:0,t:-1,s:0},{e:68,t:12,s:0},{e:0,t:-1,s:0},{e:69,t:7,s:0},{e:68,t:5,s:0},{e:0,t:-1,s:0}],
        [{e:0,t:-1,s:0},{e:65,t:12,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:65,t:12,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:67,t:12,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:67,t:7,s:0},{e:66,t:5,s:0}],
        [{e:65,t:3,s:0},{e:65,t:10,s:0},{e:65,t:8,s:0},{e:65,t:13,s:0},{e:65,t:10,s:0},{e:65,t:13,s:0},{e:66,t:8,s:0},{e:66,t:10,s:0},{e:67,t:5,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:65,t:12,s:0}],
        [{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:65,t:12,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:65,t:12,s:0},{e:0,t:-1,s:0},{e:66,t:7,s:0},{e:66,t:8,s:0},{e:65,t:13,s:0},{e:65,t:9,s:0}],
        [{e:65,t:3,s:0},{e:65,t:8,s:0},{e:65,t:10,s:0},{e:65,t:13,s:0},{e:65,t:5,s:0},{e:0,t:-1,s:0},{e:65,t:12,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:65,t:12,s:0},{e:0,t:-1,s:0},{e:65,t:2,s:0}],
        [{e:0,t:-1,s:0},{e:65,t:2,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0},{e:65,t:2,s:0},{e:0,t:-1,s:0},{e:65,t:7,s:0},{e:65,t:13,s:0},{e:65,t:13,s:0},{e:65,t:6,s:0},{e:0,t:-1,s:0},{e:0,t:-1,s:0}]
    ]
    // first index = the stop sign traveling from
    // second index = the stop sign traveling to
    // value 1 = turn left, 2 = turn right, 3 = go straight
    let gpsData = [
        [3,	3,	3,	3,	1,	3,	1,	3,	3,	1,	3,	3,	1,	3,	3,	3,	3,	1,	1,	3,	3,	3,	3,	3,	3,	3,	3,	1,	1,	3,	1,	1,	1,	3,	1,	3,	3,	1,	1,	1,	1,	3,	1,	1,	3,	3,	1,	1,	1,	1,	1,	1,	1,	1,	3,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	3,	3,	1],
        [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1],
        [3,	3,	3,	3,	3,	3,	2,	3,	3,	2,	3,	3,	2,	3,	3,	3,	3,	2,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	2,	2,	2,	3,	2,	3,	3,	2,	3,	2,	2,	3,	2,	2,	3,	3,	3,	2,	2,	2,	2,	2,	2,	3,	3,	3,	3,	3,	3,	3,	2,	2,	2,	2,	2,	2,	3,	3,	3,	2],
        [1,	2,	1,	1,	2,	2,	1,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	1,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2],
        [2,	2,	1,	2,	2,	2,	1,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	1,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2],
        [1,	3,	1,	1,	3,	3,	1,	3,	3,	1,	3,	3,	1,	3,	3,	3,	3,	1,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	1,	1,	1,	3,	3,	3,	3,	1,	3,	1,	3,	3,	3,	3,	3,	3,	3,	1,	1,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3],
        [1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	2,	1,	1,	1,	1,	1,	2,	2,	1,	1,	1,	1,	1,	1,	1,	2,	2,	2,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	2,	2,	2,	2,	2,	2,	1,	1,	1,	1],
        [3,	1,	3,	3,	3,	3,	3,	3,	1,	3,	1,	1,	3,	1,	1,	3,	1,	3,	3,	3,	1,	3,	1,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	1,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	1,	3],
        [2,	1,	2,	2,	2,	2,	2,	2,	1,	2,	2,	1,	2,	1,	1,	1,	1,	2,	2,	2,	1,	1,	1,	1,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	1,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	1,	2],
        [3,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3],
        [2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	1,	1,	2,	1,	1,	2,	1,	2,	1,	1,	1,	1,	1,	2,	1,	1,	2,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	2,	2,	1],
        [3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	1,	1,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	1,	1,	3,	1,	1,	1,	1,	1,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	3,	1,	1],
        [3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3],
        [1,	1,	1,	1,	3,	1,	1,	1,	1,	1,	1,	3,	3,	1,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	1,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	1,	3,	3],
        [2,	3,	2,	2,	2,	2,	2,	2,	3,	2,	3,	3,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	3,	2,	2],
        [3,	2,	3,	3,	3,	3,	3,	3,	2,	3,	2,	2,	3,	2,	2,	2,	2,	3,	3,	3,	2,	2,	2,	2,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	2,	2,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	2,	2,	3],
        [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
        [1,	1,	1,	1,	1,	1,	3,	1,	1,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
        [3,	3,	3,	3,	3,	2,	2,	3,	3,	3,	3,	3,	2,	3,	3,	2,	2,	3,	2,	3,	3,	2,	3,	3,	2,	2,	2,	2,	2,	3,	2,	3,	2,	2,	2,	3,	3,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	3,	3,	3,	2],
        [2,	2,	2,	2,	2,	2,	1,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	1,	2,	2,	2,	2,	1,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	1,	1,	1,	2,	2,	2,	2],
        [2,	1,	2,	2,	2,	2,	2,	2,	1,	2,	1,	1,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2],
        [2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	1,	2,	1,	1,	2,	1,	2,	2,	1,	1,	1,	1,	2,	1,	1,	2,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	2,	2,	1],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	1,	1,	1,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1],
        [3,	2,	3,	3,	3,	3,	3,	3,	2,	3,	2,	2,	3,	2,	2,	3,	2,	3,	3,	3,	2,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	3],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	2,	2,	2,	3,	3,	3,	3,	2,	3,	2,	2,	2,	3,	3,	2,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2],
        [3,	1,	3,	3,	3,	3,	3,	3,	1,	3,	1,	1,	3,	1,	1,	3,	1,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3],
        [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	2,	2,	2,	2,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	2,	2,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1],
        [1,	2,	1,	1,	1,	1,	1,	1,	2,	1,	2,	2,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	2,	2,	1,	2,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	2,	2,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1],
        [3,	3,	2,	2,	2,	3,	2,	2,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	2,	2,	3,	3,	3,	2,	3,	3,	2,	2,	3,	3,	3,	3,	3,	3,	3,	2,	2,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3],
        [1,	1,	2,	2,	2,	1,	2,	2,	1,	2,	1,	1,	2,	1,	1,	1,	1,	1,	2,	2,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	2,	2,	2,	1,	2,	2,	2,	2,	1,	2,	2,	1,	2,	2,	1,	1,	1,	2,	2,	2,	2,	2,	2,	1,	1,	1,	1,	1,	1,	1,	2,	2,	2,	2,	2,	2,	1,	1,	1,	2],
        [3,	3,	3,	3,	3,	1,	3,	3,	3,	1,	3,	3,	3,	3,	3,	1,	1,	3,	3,	1,	3,	1,	3,	1,	1,	1,	1,	1,	3,	3,	3,	3,	1,	1,	1,	1,	3,	3,	1,	1,	3,	1,	3,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	3,	3,	1],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	3,	3,	2,	2,	3,	3,	2,	2,	3,	3,	3,	3,	3,	3,	3,	2,	2,	2,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	2,	2,	2,	2,	2,	2,	3,	3,	3,	3],
        [1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	2,	1,	1,	2,	2,	1,	2,	1,	1,	2,	1,	2,	2,	2,	2,	2,	1,	1,	1,	1,	2,	2,	2,	1,	1,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	2],
        [1,	1,	1,	2,	2,	1,	2,	1,	1,	2,	1,	1,	2,	1,	1,	1,	1,	1,	2,	2,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	2,	2,	2,	1,	2,	2,	1,	2,	2,	2,	1,	2,	2,	2,	2,	2,	1,	2,	2,	2,	1,	2,	2,	2,	1,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	2],
        [2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	1,	1,	3,	1,	3,	3,	3,	1,	3,	3,	1,	1,	1,	1,	3,	1,	1,	3,	3,	1,	1,	1,	1,	1,	1,	1,	1,	3,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	3,	3,	1],
        [3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	1,	3,	3,	3,	3,	1,	3,	3,	1,	1,	1,	1,	3,	3,	3,	3,	1,	3,	1,	3,	3,	1,	3,	3,	1,	3,	1,	1,	3,	3,	1,	1,	3,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	3,	3,	1],
        [3,	3,	3,	2,	2,	3,	2,	3,	3,	2,	3,	3,	2,	3,	3,	3,	3,	3,	2,	2,	3,	3,	3,	3,	3,	3,	3,	2,	2,	3,	3,	2,	2,	3,	2,	3,	3,	2,	3,	3,	2,	3,	2,	2,	3,	3,	2,	2,	2,	2,	2,	2,	2,	2,	3,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	3,	3,	3,	2],
        [2,	2,	1,	1,	1,	2,	1,	1,	2,	1,	2,	2,	1,	2,	2,	2,	2,	2,	1,	1,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	1,	1,	2,	2,	2,	1,	2,	1,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	1,	1,	1,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	1,	1,	1,	2,	2,	2,	1],
        [1,	1,	2,	2,	2,	1,	2,	2,	1,	2,	1,	1,	2,	1,	1,	1,	1,	2,	2,	2,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	2,	2,	1,	2,	1,	1,	2,	1,	1,	2,	1,	1,	2,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1],
        [1,	1,	2,	2,	2,	1,	2,	2,	1,	2,	1,	1,	2,	1,	1,	1,	1,	1,	2,	2,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	2,	2,	2,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	2,	2,	2,	2,	2,	2,	1,	1,	1,	1],
        [2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	1,	2,	1,	1,	1,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	1,	1],
        [2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	3,	2,	2,	3,	2,	2,	2,	2,	3,	2,	2,	3,	3,	2,	2,	2,	2,	2,	2,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	2,	2,	3],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	1,	1,	1,	1,	1,	1,	3,	3,	3,	3],
        [2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	3,	2,	3,	2,	2,	3,	2,	2,	3,	2,	3,	3,	2,	2,	2,	3,	3,	3,	3,	3,	3,	2,	2,	2,	2,	2,	2,	2,	3,	3,	3,	3,	3,	3,	2,	2,	2,	3],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	1,	1,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1],
        [2,	2,	2,	3,	3,	2,	3,	2,	2,	3,	2,	2,	3,	2,	2,	2,	2,	2,	3,	3,	2,	2,	2,	2,	2,	2,	2,	3,	2,	2,	3,	3,	3,	3,	3,	3,	2,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	2,	2,	2],
        [3,	3,	1,	1,	1,	3,	1,	1,	3,	1,	3,	3,	1,	3,	3,	3,	3,	1,	1,	1,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	1,	1,	3,	1,	3,	3,	1,	3,	3,	1,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	2,	3,	3,	2,	3,	3,	3,	3,	2,	3,	3,	3,	3,	2,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	2,	2,	2,	2,	2,	2,	3,	3,	3,	3],
        [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	1,	1,	1,	3,	3,	1,	3,	1,	3,	3,	3,	3,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3],
        [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	1,	1,	1,	1,	3,	1,	3,	1,	1,	1,	3,	1,	1,	1,	3,	3,	3,	1,	3,	3,	3,	3,	1,	3,	3,	3,	1,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	1,	1,	1,	1],
        [2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	1,	2,	1,	2,	2,	1,	2,	2,	1,	2,	1,	1,	2,	2,	2,	1,	1,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	1,	1,	1,	2,	2,	2,	2],
        [2,	2,	1,	1,	1,	2,	1,	1,	2,	1,	2,	2,	1,	2,	2,	2,	2,	2,	1,	1,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	2,	1,	2,	2,	2,	2,	2,	1,	2,	1,	1,	1,	1,	1,	1,	2,	2,	2,	2],
        [2,	3,	2,	2,	2,	2,	2,	2,	3,	2,	3,	3,	2,	2,	2,	2,	3,	2,	2,	2,	2,	2,	3,	3,	2,	3,	2,	3,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	3,	2,	2,	2,	2,	2,	2,	2,	3,	3,	2],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	1,	3,	3,	1,	1,	3,	1,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3],
        [3,	3,	2,	2,	2,	3,	2,	2,	3,	2,	3,	3,	2,	3,	3,	3,	3,	3,	2,	2,	3,	3,	3,	3,	2,	3,	2,	3,	2,	3,	2,	2,	2,	2,	2,	2,	3,	2,	2,	2,	2,	2,	2,	2,	2,	3,	3,	2,	2,	2,	2,	2,	2,	2,	3,	3,	2,	3,	3,	3,	2,	2,	2,	2,	2,	2,	3,	3,	3,	2],
        [1,	1,	1,	2,	2,	1,	2,	1,	1,	2,	1,	1,	2,	1,	1,	1,	1,	1,	2,	2,	1,	1,	1,	1,	2,	1,	2,	1,	1,	1,	2,	2,	2,	1,	2,	2,	1,	2,	2,	2,	1,	1,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	2],
        [1,	2,	1,	1,	1,	1,	1,	1,	2,	1,	2,	2,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	2,	2,	1,	2,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	2,	1,	2,	1,	2,	1,	2,	1,	1,	1,	1,	1,	1,	1,	2,	2,	1],
        [3,	3,	3,	1,	1,	3,	1,	3,	3,	1,	3,	3,	1,	3,	3,	3,	3,	3,	1,	1,	3,	3,	3,	3,	1,	3,	1,	3,	3,	3,	1,	1,	1,	3,	1,	1,	3,	1,	1,	1,	3,	3,	1,	1,	1,	1,	1,	1,	1,	1,	3,	1,	1,	1,	3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	3,	3,	1],
        [2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	1,	3,	3,	3,	3],
        [2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	3,	3,	3,	3,	3,	2,	2,	2,	2],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	2,	3,	3,	3,	3],
        [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	3,	3,	3,	3,	3,	1,	1,	1,	1],
        [2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	2,	1,	2,	2,	2,	2],
        [2,	3,	2,	2,	3,	3,	2,	3,	3,	2,	3,	3,	2,	3,	3,	3,	3,	2,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	2,	2,	3,	3,	3,	3,	3,	2,	3,	2,	3,	3,	3,	3,	3,	3,	3,	3,	2,	2,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	2,	3,	3,	3],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3],
        [3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3]
    ]
    let stopData = [
        {xpos:48, zpos:-108, l:17, r:-2, s:2},
        {xpos:88, zpos:-108, l:8, r:67, s:-2},
        {xpos:41, zpos:-103, l:-2, r:17, s:3},
        {xpos:61, zpos:-103, l:66, r:7, s:-2},
        {xpos:47, zpos:-102, l:2, r:3, s:-2},
        {xpos:67, zpos:-102, l:0, r:-2, s:66},
        {xpos:12, zpos:-99, l:18, r:31, s:-2},
        {xpos:62, zpos:-99, l:13, r:-2, s:29},
        {xpos:82, zpos:-99, l:13, r:10, s:-2},
        {xpos:18, zpos:-98, l:-2, r:6, s:31},
        {xpos:68, zpos:-98, l:29, r:5, s:-2},
        {xpos:108, zpos:-98, l:20, r:-2, s:1},
        {xpos:11, zpos:-93, l:6, r:-2, s:18},
        {xpos:91, zpos:-93, l:1, r:-2, s:14},
        {xpos:101, zpos:-93, l:-2, r:20, s:11},
        {xpos:67, zpos:-92, l:-2, r:13, s:5},
        {xpos:107, zpos:-92, l:1, r:11, s:-2},
        {xpos:38, zpos:-88, l:28, r:-2, s:9},
        {xpos:31, zpos:-83, l:-2, r:28, s:4},
        {xpos:37, zpos:-82, l:9, r:4, s:-2},
        {xpos:102, zpos:-79, l:23, r:22, s:-2},
        {xpos:68, zpos:-78, l:29, r:15, s:-2},
        {xpos:98, zpos:-78, l:54, r:-2, s:68},
        {xpos:108, zpos:-78, l:-2, r:16, s:22},
        {xpos:91, zpos:-73, l:-2, r:54, s:25},
        {xpos:101, zpos:-73, l:16, r:-2, s:23},
        {xpos:77, zpos:-72, l:21, r:24, s:-2},
        {xpos:97, zpos:-72, l:68, r:25, s:-2},
        {xpos:32, zpos:-69, l:-2, r:30, s:37},
        {xpos:62, zpos:-69, l:33, r:36, s:-2},
        {xpos:18, zpos:-68, l:39, r:-2, s:12},
        {xpos:11, zpos:-63, l:-2, r:39, s:32},
        {xpos:31, zpos:-63, l:19, r:37, s:-2},
        {xpos:71, zpos:-63, l:26, r:41, s:-2},
        {xpos:17, zpos:-62, l:12, r:32, s:-2},
        {xpos:37, zpos:-62, l:30, r:-2, s:19},
        {xpos:48, zpos:-58, l:40, r:-2, s:35},
        {xpos:41, zpos:-53, l:-2, r:40, s:33},
        {xpos:47, zpos:-52, l:35, r:33, s:-2},
        {xpos:12, zpos:-39, l:48, r:47, s:-2},
        {xpos:42, zpos:-39, l:50, r:43, s:-2},
        {xpos:72, zpos:-39, l:56, r:45, s:-2},
        {xpos:18, zpos:-38, l:-2, r:34, s:47},
        {xpos:28, zpos:-38, l:60, r:-2, s:42},
        {xpos:48, zpos:-38, l:-2, r:38, s:43},
        {xpos:68, zpos:-38, l:58, r:-2, s:44},
        {xpos:78, zpos:-38, l:-2, r:69, s:45},
        {xpos:11, zpos:-33, l:34, r:-2, s:48},
        {xpos:21, zpos:-33, l:-2, r:60, s:49},
        {xpos:41, zpos:-33, l:38, r:-2, s:50},
        {xpos:61, zpos:-33, l:-2, r:58, s:51},
        {xpos:71, zpos:-33, l:69, r:-2, s:56},
        {xpos:27, zpos:-32, l:42, r:49, s:-2},
        {xpos:67, zpos:-32, l:44, r:51, s:-2},
        {xpos:112, zpos:-29, l:-2, r:55, s:59},
        {xpos:98, zpos:-28, l:53, r:-2, s:46},
        {xpos:91, zpos:-23, l:-2, r:53, s:57},
        {xpos:111, zpos:-23, l:27, r:59, s:-2},
        {xpos:97, zpos:-22, l:46, r:57, s:-2},
        {xpos:117, zpos:-22, l:55, r:-2, s:27},
        {xpos:22, zpos:-19, l:62, r:61, s:-2},
        {xpos:18, zpos:-18, l:65, r:-2, s:63},
        {xpos:28, zpos:-18, l:-2, r:52, s:61},
        {xpos:11, zpos:-13, l:-2, r:65, s:64},
        {xpos:21, zpos:-13, l:52, r:-2, s:62},
        {xpos:17, zpos:-12, l:63, r:64, s:-2},
        {xpos:62, zpos:-109, l:-2, r:0, s:7},
        {xpos:82, zpos:-109, l:-2, r:-2, s:8},
        {xpos:78, zpos:-78, l:-2, r:-2, s:21},
        {xpos:77, zpos:-62, l:-2, r:-2, s:26}
    ];
    let destinations = [
        {xpos:2, zpos:-116, stop:6, name:"10 Factory Row"},
        {xpos:34, zpos:-118, stop:2, name:"45 Vista Lane"},
        {xpos:64, zpos:-118, stop:66, name:"35 Hillside Drive"},
        {xpos:84, zpos:-118, stop:67, name:"55 High Street"},
        {xpos:27, zpos:-95, stop:9, name:"150 Industrial Parkway"},
        {xpos:7, zpos:-82, stop:12, name:"85 Commerce Way"},
        {xpos:85, zpos:-78, stop:68, name:"100 Main Street"},
        {xpos:117, zpos:-76, stop:23, name:"200 Riverside Drive"},
        {xpos:32, zpos:-56, stop:37, name:"55 Century Avenue"},
        {xpos:77, zpos:-56, stop:69, name:"25 Market Place"},
        {xpos:2, zpos:-36, stop:47, name:"75 Pine Drive"},
        {xpos:79, zpos:-8, stop:53, name:"35 Spruce Street"},
        {xpos:114, zpos:-13, stop:59, name:"1 Park Street"},
        {xpos:14, zpos:-3, stop:65, name:"45 Elm Drive"},
        {xpos:44, zpos:-3, stop:62, name:"65 Maple Way"},
        {xpos:114, zpos:-118, stop:11, name:"60 Ridgeline Street"}
    ];
    let xpos:number = 0;
    let ypos:number = 0;
    let zpos:number = 0;
    let dir:number = 0;
    let cornerRt:Position = world(0,0,0);
    let front:Position = world(0,0,0);
    let cornerLt:Position = world(0,0,0);
    let worldRtX = world(0,0,0);
    let worldRtZ = world(0,0,0);
    let worldLtX = world(0,0,0);
    let worldLtZ = world(0,0,0);
    let swWorldRtX = false;
    let swWorldRtZ = false;
    let swWorldLtX = false;
    let swWorldLtZ = false;

    // classroom settings
    let gps_enabled = false;
    let passengers_enabled = false;
    let realism = false;

    let gps_count  = 0;
    let battery_count = 0;
    let solar_count = 0;
    let power_count = 0;
    let noteblock_count = 0;
    let regen_count = 0;
    let speed_count = 0;
    let efficiency_count = 0;
    let accuracy_count = 0;
    let position_count = 0;
    let heading_count = 0;
    let ac_count = 0;
    let ergonomics_count = 0;

    let has_passenger=false;
    let destination=-1;
    let atStopState = false;
    let stoppedAtStopCount = 0;
    
    /** 
     * This task runs once each second.  It is used to make the 
     * actionbar text persistent on the screen.
     */
    systemMessage("Ready to Roll");
    function systemMessage(msg:string):void {
        player.execute("title @s actionbar "+msg);
    };
	
    /** this helper function determines if the cart is currently within its lane
     * If it is, it returns true.  Otherwise, false
     */
    function isInLane():boolean {
        if (!initialized) return true;
        let xr = (xpos+1000) % 10;
        let zr = (zpos+1000) % 10;
        let inXLane = ((xr>=2.0)&&(xr<=3.5))||((xr>=6.5)&&(xr<=8));
        let inZLane = ((zr>=2.0)&&(zr<=3.5))||((zr>=6.5)&&(zr<=8));
        return inXLane||inZLane;
    }

    /** this helper function determines if the cart is going the 
     * right direction. If it is, it returns true.  Otherwise, false
     */
    function isCorrectDirection():boolean {
        if (!initialized) return true;
        let xr = (xpos+1000) % 10;
        let zr = (zpos+1000) % 10;
        let inLane = false;
        if ((xr>=2.0)&&(xr<=3.5)) {
            // on west side of street - cart should be heading south
            inLane = true;
            if ((dir<=135)&&(dir>=45)) return true;
        } else if ((xr>=6.5)&&(xr<=8)) {
            // on east side of street - cart should be heading north
            inLane = true;
            if ((dir<=315)&&(dir>=225)) return true;
        }
        if ((zr>=2.0)&&(zr<=3.5)) {
            // north side of street - cart should be heading west
            inLane = true;
            if ((dir<=225)&&(dir>=135)) return true;
        } else if ((zr>=6.5)&&(zr<=8)) {
            // south side of street - cart should be heading east
            inLane = true;
            if ((dir<=45)||(dir>=315)) return true;
        }
        // either not in lane, or wrong way
        // if not in lane, return true so we don't double count
        // this violation.
        return !inLane;
    }

    /**
     * helper function that displays traffic violation messages
     */
    function showViolation(violation:TrafficViolation):void {
        // TODO: show the violation
player.say("Traffic Violation:"+violation);
        switch (violation) {
            case TrafficViolation.INVALID_STOP:
                player.execute("DIALOGUE OPEN @e[tag=mabel] @s invalid_stop")
                break;
            case TrafficViolation.MISSED_STOP:
                player.execute("DIALOGUE OPEN @e[tag=mabel] @s missed_stop")
                break;
            case TrafficViolation.WRONG_WAY:
                player.execute("DIALOGUE OPEN @e[tag=mabel] @s wrong_way")
                break;
            case TrafficViolation.LANE_VIOLATION:
                player.execute("DIALOGUE OPEN @e[tag=mabel] @s lane_violation")
                break;
            case TrafficViolation.INVALID_DROPOFF:
                player.execute("DIALOGUE OPEN @e[tag=mabel] @s invalid_dropoff")
                break;
            case TrafficViolation.INVALID_PICKUP:
                player.execute("DIALOGUE OPEN @e[tag=mabel] @s invalid_pickup")
                break;
            case TrafficViolation.NO_GPS_WARNING:
                player.execute("DIALOGUE OPEN @e[tag=mabel] @s no_gps")
                break;
            case TrafficViolation.GPS_DISABLED_WARNING:
                player.execute("DIALOGUE OPEN @e[tag=mabel] @s gps_disabled")
                break;
            case TrafficViolation.CANT_CLIMB:
                break;
            default:
                break;
        }
    }

    /**
     * helper function to remove the passenger if one exists
     */
    function removePassenger():void {
        if (!initialized) return;
        let sel = mobs.target(ALL_ENTITIES)
        sel.addRule("type", "villager")
        sel.addRule("tag", player.name())
        sel.withinRadius(2048);
        let qta = mobs.queryTarget(sel);
        if (qta.length!=0) {
            player.execute("/tp @e[type=villager,tag="+ player.name()+"] 0 0 0");
        }
        has_passenger = false;
    }
    /**
     * Determine if the cart has reached its destination
     */
    //% block
    export function isCartAtDestination():boolean {
        if (!initialized) return false;
        if (destination<0) return false;
        if ((Math.floor(xpos)==destinations[destination].xpos)&&(Math.floor(zpos)==destinations[destination].zpos)) return true;
        return false;
    }

    /**
     * Pause for a short period of time.  This function should only be used at stop signs.
     */
    //% block
    export function pauseAtStopSign() {
        if (!initialized) return;
        if (isAtStop()) {
            stoppedAtStopCount ++;
        } else {
            showViolation(TrafficViolation.INVALID_STOP);
        }
        loops.pause(2000);
    }

    /**
     * Attempt to drop off the passenger.  This function should only be called when
     * the destination is reached.
     */
    //% block
    export function dropOffPassenger() {
        if (!initialized) return;
        if ((!has_passenger) || (!isCartAtDestination())) {
            showViolation(TrafficViolation.INVALID_DROPOFF);
            return;
        }
        removePassenger();
        if (passengers_enabled) {
            player.execute("playsound random.levelup");
            systemMessage("Passenger Dropped Off");
        }
        loops.pause(2000);
        destination = -1;
    }

    /**
     * Attempt to pick up the passenger.  This function should only be called when
     * the destination is reached.
     */
    //% block
    export function pickUpPassenger() {
        if (!initialized) return;
        if ((has_passenger) || (!isCartAtDestination())) {
            showViolation(TrafficViolation.INVALID_PICKUP);
            return;
        } 
        if (passengers_enabled) {

            player.execute("playsound firework.launch");
            systemMessage("Passenger Picked Up");

            // summon a passenger
            let sel = mobs.target(ALL_ENTITIES)
            sel.addRule("type", "villager")
            sel.addRule("tag", player.name())
            sel.withinRadius(2048);
            let qta = mobs.queryTarget(sel);
            if (qta.length!=0) {
                // the villager exists - just make it ride the cart
                player.execute("/ride @e[type=villager,tag="+ player.name()+"] start_riding @e[type=minecart,tag=" + player.name() + "]");
            } else {
                // summon a passenger to ride the minecart
                // TODO: random name?
                player.execute("/ride @e[type=minecart,tag=" + player.name() + "] summon_rider villager \"\" \"passenger\"");

                // tag the passenger to make it unique
                player.execute("/tag @e[type=villager,x=" + xpos + ",y=" + ypos + ",z=" + zpos + "] add " + player.name())
            }    
        }
        loops.pause(2000);

        // get a destination (must be different than the current destination)
        let oldDestination = destination;
        while (destination==oldDestination) destination = Math.floor(Math.random()*destinations.length);
        has_passenger = true;
        systemMessage("Drop off passenger at "+destinations[destination].name)
    }

    /**
     * Find a new passenger to pick up. If a passenger has already been located, this function does nothing.
     */
    //% block
    export function findNewPassenger() {
        // get a destination (must be different than the current destination)
        if (destination>=0) return;
        destination = Math.floor(Math.random()*destinations.length);
        systemMessage("Pick up passenger at "+destinations[destination].name)
    }

    /**
     * Determine if there is a passenger in the cart
     */
    //% block
    export function isPassengerInCart():boolean {
        return has_passenger;
    }

    // attempt to stop the minecart - this function is asynchronous
    player.onTellCommand("stop", function() {
        initialized = false;
    })

    // call the cart to the starting position
    player.onTellCommand("call", function () {
        motocart.summonCart();
    })

    function checkScoreboard(comparison:string):boolean {
        let sel = mobs.target(ALL_ENTITIES);
        sel.addRule("type", "player");
        sel.addRule("name", player.name());
        sel.addRule("scores","{"+comparison+"}")
        let qta = mobs.queryTarget(sel);
        return (qta.length!=0);
    }

    function checkClassroomSetting(comparison:string):boolean {
        let sel = mobs.target(ALL_ENTITIES);
        sel.addRule("type", "armor_Stand");
        sel.addRule("name", "classroom1_marker");
        sel.addRule("scores","{"+comparison+"}")
        let qta = mobs.queryTarget(sel);
        return (qta.length!=0);
    }

    /** 
     * helper function to set minecart parameters based on world scoreboards.
     */
    function initMinecart():void {
        // remove the player's agent if it exists
        agent.teleport(world(0,0,0),NORTH);

        // initialize the minecart
        systemMessage("Initializing Cart")

        // add player to scoreboards if not already there.
        player.execute("scoreboard players add @s road_tests 0")
        player.execute("scoreboard players add @s upgrade_count 0")
        player.execute("scoreboard players add @s gps_enabled 0")
        player.execute("scoreboard players add @s gps_count 0")
        player.execute("scoreboard players add @s battery_count 0")
        player.execute("scoreboard players add @s solar_count 0")
        player.execute("scoreboard players add @s power_count 0")
        player.execute("scoreboard players add @s noteblock_count 0")
        player.execute("scoreboard players add @s regen_count 0")
        player.execute("scoreboard players add @s speed_count 0")
        player.execute("scoreboard players add @s efficiency_count 0")
        player.execute("scoreboard players add @s accuracy_count 0")
        player.execute("scoreboard players add @s position_count 0")
        player.execute("scoreboard players add @s heading_count 0")
        player.execute("scoreboard players add @s ac_count 0")
        player.execute("scoreboard players add @s ergonomics_count 0")

        // set interface behavior based on classroom settings
        gps_enabled = checkClassroomSetting("gps_enabled=!0");
        passengers_enabled = checkClassroomSetting("passengers=!0");
        realism = checkClassroomSetting("realism=!0");

        // set cart behavior based on customization
        if (checkScoreboard("gps_count=1")) gps_count = 1;
        for (let i=1;i<=5;i++) {if (checkScoreboard("battery_count="+i)) battery_count=i;}
        for (let i=1;i<=5;i++) {if (checkScoreboard("solar_count="+i)) solar_count=i;}
        for (let i=1;i<=5;i++) {if (checkScoreboard("regen_count="+i)) regen_count=i;}
        for (let i=1;i<=5;i++) {if (checkScoreboard("power_count="+i)) power_count=i;}
        for (let i=1;i<=5;i++) {if (checkScoreboard("speed_count="+i)) speed_count=i;}
        for (let i=1;i<=5;i++) {if (checkScoreboard("efficiency_count="+i)) efficiency_count=i;}
        for (let i=1;i<=5;i++) {if (checkScoreboard("accuracy_count="+i)) accuracy_count=i;}
        for (let i=1;i<=1;i++) {if (checkScoreboard("position_count="+i)) position_count=i;}
        for (let i=1;i<=1;i++) {if (checkScoreboard("heading_count="+i)) heading_count=i;}
        for (let i=1;i<=5;i++) {if (checkScoreboard("noteblock_count="+i)) noteblock_count=i;}
        for (let i=1;i<=1;i++) {if (checkScoreboard("ac_count="+i)) ac_count=i;}
        for (let i=1;i<=5;i++) {if (checkScoreboard("ergonomics_count="+i)) ergonomics_count=i;}
    }

    function checkForClassroomMarker():boolean {
        let sel = mobs.target(ALL_ENTITIES)
        sel.addRule("type", "armor_stand")
        sel.addRule("name", "classroom1_marker")
        let qta = mobs.queryTarget(sel);
        return (qta.length!=0);
    }

    function getMazeElevation(x:number,z:number):number {
        if (isClassroom) {
            // convert coordinates to block coordinates
            let xi = Math.floor(x);
            let zi = Math.floor(120+z)

            // range check to see if the point is on the map
            if (xi<0) return 0;
            if (xi>120) return 0;
            if (zi>120) return 0;
            if (zi<0) return 0;
            
            // get point offsets within the map tile
            let xr = xi%10;
            let zr = zi%10;
            let xd = Math.floor(xi/10);
            let zd = Math.floor(zi/10);

            // take care of elevation transitions
            if (xr==0) return Math.max(mapData[zd][xd].e,(mapData[zd][xd].e+mapData[zd][xd-1].e)/2);
            if (xr==9) return Math.max(mapData[zd][xd].e,(mapData[zd][xd].e+mapData[zd][xd+1].e)/2);
            if (zr==0) return Math.max(mapData[zd][xd].e,(mapData[zd][xd].e+mapData[zd-1][xd].e)/2);
            if (zr==9) return Math.max(mapData[zd][xd].e,(mapData[zd][xd].e+mapData[zd+1][xd].e)/2);

            // otherwise, return the base elevation for the current tile
            return mapData[zd][xd].e;
        } else {
            // convert coordinates to block coordinates
            let xi = Math.floor(x);
            let zi = Math.floor(z)

            return positions.groundPosition(world(xi,ypos+2,zi)).getValue(Axis.Y);
        }
    }
    
    function getMazeBlock(x:number, y:number, z:number):string {
        if (isClassroom) {
            // convert coordinates to block coordinates
            let xi = Math.floor(x);
            let zi = Math.floor(120+z)

            // range check to see if the point is on the map
            if (xi<0) return 'X';
            if (xi>120) return 'X';
            if (zi>120) return 'X';
            if (zi<0) return 'X';

            // get point offsets within the map tile
            let xr = xi%10;
            let zr = zi%10;
            let xd = Math.floor(xi/10);
            let zd = Math.floor(zi/10);
            
            // get the block value for the current position
            let tilenum = mapData[zd][xd].t;
            if ((tilenum<0)||(tilenum>13)) return "0";
            let blk = map_tile[tilenum][zr].substr(xr,1);

            // mask stop signs when the tile data calls for it
            if ((blk=="1")||(blk=="2")||(blk=="3")||(blk=="4")) {
                let msk = mapData[zd][xd].s;
                if (msk==0) return blk;
                // mask north
                if (((msk&8)!=0)&&(zr==1)) return "_";
                // mask south
                if (((msk&4)!=0)&&(zr==8)) return "_";
                // mask east
                if (((msk&2)!=0)&&(xr==8)) return "_";
                // mask west
                if (((msk&1)!=0)&&(xr==1)) return "_";
            }
            return blk;
        } else {
            // convert coordinates to block coordinates
            let xi = Math.floor(x);
            let zi = Math.floor(z)

            // get the elevation of the block in question
            let yi = Math.floor(y);

            // there is no way to get the block type from the minecraft API.
            // instead, individual checks must be made.
            let blockpos = world(xi,yi,zi);

            // optimization - only check for stops when looking under cart
            if (yi == Math.floor(ypos)) {
                if (blocks.testForBlock(STONE_BRICKS_SLAB, blockpos)) return "X";
                if (blocks.testForBlock(STONE_BRICKS, blockpos)) return "X";
            } else {
                if (blocks.testForBlock(WHITE_CONCRETE_POWDER, blockpos)) return "1";
                if (blocks.testForBlock(WOOL, blockpos)) return "2";
                if (blocks.testForBlock(WHITE_CONCRETE, blockpos)) return "3";
                if (blocks.testForBlock(BLOCK_OF_QUARTZ, blockpos)) return "4";
            }
            return "_";
        }
    }

    // helper function to teleport to specific location and heading
    function tp(x:number,y:number,z:number) {
        player.execute("/tp @e[type=minecart,tag="+player.name()+"] "+x+" "+y+" "+z);
    }
    
    // deg2rad
    // convert the specified angle indegrees to radians
    // @param degrees - the angle to convert
    // @return - the angle expressed in radians
    function deg2rad (angle: number) {
        let pi = 4 * Math.atan(1.0)
        return pi * angle / 180
    }

    // convert the specified angle in radians to degrees
    // @param angle - the angle to convert
    // @return - the angle expressed in degrees
    function rad2deg (angle: number) {
        let pi = 4 * Math.atan(1.0)
        return 180 * angle / pi
    }

    // rotate a point around the vertical (y) axis by a specified number
    // of degrees.  The rotation is specified in the rotation of the minecart which
    // is -90 degrees from world rotation.
    // @param point - the point to rotate
    // @param angle - the angle to rotate by (in degrees) in the clockwise direction
    // @return - the rotated point
    function rotatePoint (point: Position, angle: number) {
        let newX = point.getValue(Axis.X) * Math.cos(deg2rad(angle)) - point.getValue(Axis.Z) * Math.sin(deg2rad(angle))
        let newZ = point.getValue(Axis.X) * Math.sin(deg2rad(angle)) + point.getValue(Axis.Z) * Math.cos(deg2rad(angle))
        return pos(Math.round(1000 * newX) / 1000, point.getValue(Axis.Y), Math.round(1000 * newZ) / 1000)
    }

    // a helper function to create a minecart at the specified world position.
    // @param startPosition - where to place the cart
    // @param startHeading - the starting orientation of the cart
    function create(startPosition:Position, startHeading:number):boolean {
        initMinecart();

        // set the initial position and heading
        xpos = startPosition.getValue(Axis.X)+.5;
        ypos = startPosition.getValue(Axis.Y);
        zpos = startPosition.getValue(Axis.Z)+.5;
        dir = 0;
        
        // remove any existing passenger
        removePassenger();

        // if the cart exists, teleport it
        let sel = mobs.target(ALL_ENTITIES)
        sel.addRule("type", "minecart")
        sel.addRule("tag", player.name())
        sel.withinRadius(2048);
        let qta:QueryTargetResult[] = mobs.queryTarget(sel);
        if (qta.length!=0) {
            // cart exists, teleport it to the starting location
            tp(xpos,ypos,zpos);
        } else {
            // summon the cart
            player.execute("/summon minecart "+xpos+" "+ypos+" "+zpos);

            // tag the minecart to make it unique
            player.execute("/tag @e[type=minecart,x=" + xpos + ",y=" + ypos + ",z=" + zpos + "] add " + player.name())
        }

       initialized = true;
       has_passenger = false;
       destination = -1;
       rotate(startHeading);
       return true;
    }

    /** 
     * Get the gps direction to use for the current destination.  A value of 1
     * indicates a left turn.  A value of 2 indicates a right turn.  3 indicates
     * go straight. All other values indicate undefined.
     */
    //% block
    export function getGpsDirection():number {
        if (destination<0) return 0;
        if (gps_count==0) {
            showViolation(TrafficViolation.NO_GPS_WARNING);
            return 0;
        }
        if (!gps_enabled) {
            showViolation(TrafficViolation.GPS_DISABLED_WARNING);
            return 0;
        }

        let currentX = Math.floor(xpos);
        let currentZ = Math.floor(zpos);

        for (let idx = 0; idx<stopData.length; idx++) {
            if ((stopData[idx].xpos==currentX)&&(stopData[idx].zpos==currentZ)) {
                // here if the cart is at a known stop position - the index corresponds with
                // a start position in the gps table.
                return gpsData[idx][destinations[destination].stop];
            }
        }
        // here if the cart is not at a stop - just go straight
        return 3;
    }

    /**
     * returns a numeric code related to the current destiation of the cart.  For this function to 
     * return a valid destination, GPS must be enabled and the cart must be equiped with GPS.  If these
     * conditions are not met, then -1 is returned.
     */
    function getDestinationCode():number {
        if ((gps_count == 0)||(!gps_enabled)||(!initialized)) return -1;
        if (destination<0) {
            destination = Math.floor(Math.random()*destinations.length);
            systemMessage("Pick up passenger at "+destinations[destination].name)
         }
        return destination;
    }

    /** 
     * detect whether there is a sidewalk to the right of the minecart.
     * @return true if there is a sidewalk, otherwise, false
     */
    //% block
    export function isSidewalkRight():boolean {
        let p = rotatePoint(pos(0,0,1), dir)
        return getMazeBlock(xpos+p.getValue(Axis.X),ypos,zpos+p.getValue(Axis.Z))=="X";
    }

    /**
     * detect whether there is a sidewalk in front of the minecart.
     * @return true if there is a sidewalk, otherwise, false
     */
    //% block
    export function isSidewalkAhead():boolean {
        let p = rotatePoint(pos(1,0,0), dir)
        return getMazeBlock(xpos+p.getValue(Axis.X),ypos,zpos+p.getValue(Axis.Z))=="X";
    }

    /**
     * Check the floor beneath the cart.  If it is a stop sign, return true.  Otherwise, return false.
     * @return the type of block, otherwise, return false
     * @param distance - the distance ahead of player to check
     * @return true if location is a stop, otherwise false
     */
    //% block
    export function isAtStop (): boolean {
        return getMazeBlock(xpos,ypos-1,zpos)!='_';
    }

    /**
     * Check the intersection type and return true if right turns are allowed.
     * @return true if right turns are allowed, otherwise, return false
     * @param distance - the distance ahead of player to check
     * @return true if turn is allowed, otherwise false
     */
    //% block
    export function canRightTurn (): boolean {
        let b = getMazeBlock(xpos,ypos-1,zpos);
        return ((b=='2')||(b=='3')||(b=='4'));
    }

    /**
     * Check the intersection type and return true if left turns are allowed.
     * @return true if left turns are allowed, otherwise, return false
     * @param distance - the distance ahead of player to check
     * @return true if turn is allowed, otherwise false
     */
    //% block
    export function canLeftTurn (): boolean {
        let b = getMazeBlock(xpos,ypos-1,zpos);
        return ((b=='1')||(b=='3')||(b=='4'));
    }

    /**
     * Check the intersection type and return true if straight through is allowed.
     * @return true if stright through is allowed, otherwise, return false
     * @param distance - the distance ahead of player to check
     * @return true if straight through is allowed, otherwise false
     */
    //% block
    export function canGoStraight (): boolean {
        let b = getMazeBlock(xpos,ypos-1,zpos);
        return ((b=='1')||(b=='2')||(b=='3'));
    }

    /**  
     * return true if the cart is initialized, otherwise, false
    */
    //% block
    export function isInitialized():boolean {
        return initialized;
    }

    /**
     * Summon a cart on the target block nearest the player's current position and move the robot into the correct position to push the cart
     * @return true if the cart is created, otherwise false.
     */
    //% block
    export function summonCart(): boolean {
        // search for the target brick
        for (let dx = -2;dx <= 2; dx+=2) {
            for (let dz = -2;dz <= 2; dz+=2) {
                let blockpos = positions.groundPosition(
                    world(player.position().getValue(Axis.X)+dx,
                        100,
                        player.position().getValue(Axis.Z)+dz)
                );
                if (blocks.testForBlock(CHISELED_STONE_BRICKS, blockpos.add(pos(0,-1,0)))) {
                    // here the brick has been found
                    // summon the minecart
                    let cartpos = blockpos;
                    create(blockpos,0)

                    // based on the position of the curb to the minecart, set the player position and heading
                    if (blocks.testForBlock(STONE_BRICKS_SLAB,cartpos.add(pos(0,0,1)))) {
                        // curb to south
                        rotate(0);
                    } else if (blocks.testForBlock(STONE_BRICKS_SLAB,cartpos.add(pos(0,0,-1)))) {
                        // curb to north
                        rotate(180);
                    } else if (blocks.testForBlock(STONE_BRICKS_SLAB,cartpos.add(pos(1,0,0)))) {
                        rotate(-90);
                    } else if (blocks.testForBlock(STONE_BRICKS_SLAB,cartpos.add(pos(-1,0,0)))) {
                        rotate(90);
                    }
                    return true;
                }                
            }
        }
        return false;
    }

    /**
     * move a specified amount of distance at the current heading
     * @param distance - the distance to move eg
     */
    //% block
    export function move(distance:number) : void {
        if (!initialized) {
            return;
        }
        if (!isCorrectDirection()) showViolation(TrafficViolation.WRONG_WAY);
        let x = 0;
        // take steps of step size to get close to destination
        let dz = MOVE_STEP*2*front.getValue(Axis.Z);
        let dx = MOVE_STEP*2*front.getValue(Axis.X);

        while (x + MOVE_STEP <= distance) {
            x += MOVE_STEP;
            let newRtX  = world(Math.floor(xpos+dx+cornerRt.getValue(Axis.X)), ypos, Math.floor(zpos+cornerRt.getValue(Axis.Z)));
            let newRtZ  = world(Math.floor(xpos+cornerRt.getValue(Axis.X)), ypos, Math.floor(zpos+dz+cornerRt.getValue(Axis.Z)));
            let newLtX  = world(Math.floor(xpos+dx+cornerLt.getValue(Axis.X)), ypos, Math.floor(zpos+cornerLt.getValue(Axis.Z)));
            let newLtZ  = world(Math.floor(xpos+cornerRt.getValue(Axis.X)), ypos, Math.floor(zpos+dz+cornerLt.getValue(Axis.Z)));
            // update sidewalk checks
            if (newRtX!=worldRtX) {
                worldRtX = newRtX;
                if (worldRtX==worldRtZ) {
                    swWorldRtX = swWorldRtZ;
                } else {
                    swWorldRtX = (getMazeBlock(worldRtX.getValue(Axis.X),ypos,worldRtX.getValue(Axis.Z))=="X");    
                }
            }
            if (newRtZ!=worldRtZ) {
                worldRtZ = newRtZ;
                if (worldRtZ==worldRtX) {
                    swWorldRtZ = swWorldRtX;
                } else {
                    swWorldRtZ = (getMazeBlock(worldRtZ.getValue(Axis.X),ypos,worldRtZ.getValue(Axis.Z))=="X");    
                }
            }
            if (newLtX!=worldLtX) {
                worldLtX = newLtX;
                if (worldLtX==worldLtZ) {
                    swWorldLtX = swWorldLtZ;
                } else {
                    swWorldLtX = (getMazeBlock(worldLtX.getValue(Axis.X),ypos,worldLtX.getValue(Axis.Z))=="X");    
                }
            }
            if (newLtZ!=worldLtZ) {
                worldLtZ = newLtZ;
                if (worldLtZ==worldLtX) {
                    swWorldLtZ = swWorldLtX;
                } else {
                    swWorldLtZ = (getMazeBlock(worldLtZ.getValue(Axis.X),ypos,worldLtZ.getValue(Axis.Z))=="X");    
                }
            }

            let dxtemp = dx;
            let dztemp = dz;
            if (swWorldRtX) {
                let finalX = Math.round(xpos*2)/2;
                dxtemp = finalX-xpos;
            }
            if (swWorldRtZ) {
                let finalZ = Math.round(zpos*2)/2;
                dztemp = finalZ-zpos;
            }
            if (swWorldLtX) {
                let finalX = Math.round(xpos*2)/2;
                dxtemp = finalX-xpos;
            }
            if (swWorldLtZ) {
                let finalZ = Math.round(zpos*2)/2;
                dztemp = finalZ-zpos;
            }

            xpos = xpos+dxtemp;                
            zpos = zpos+dztemp;                
            xpos = Math.round(xpos*1000)/1000;
            zpos = Math.round(zpos*1000)/1000;
            ypos = getMazeElevation(xpos,zpos);
            tp(xpos,ypos,zpos);
            if (isAtStop()) {
                atStopState = true;
            } else {
                if (atStopState) {
                    // here if we just exited the stop
                    atStopState = false;
                    if (stoppedAtStopCount==0) showViolation(TrafficViolation.MISSED_STOP)
                    stoppedAtStopCount = 0;
                }
            }
        }
        if (!isInLane()) showViolation(TrafficViolation.LANE_VIOLATION);
    }

    /**
     * rotate the minecart a specific number of degrees. Positive numbers
     * turn to the right.  Negative numbers turn to the left.
     * @param angle - the number of degrees to turn
     */
    //% block
    export function rotate(angle:number) : void {
        if (!initialized) {
            return;
        }

        dir = dir+angle;
        if (dir>=360.0) dir = dir-360.0;
        if (dir<0.0) dir = dir+360.0;
        front = rotatePoint(world(0.5,0,0),dir);
        cornerRt = rotatePoint(world(.5,0,.45),dir);
        cornerLt = rotatePoint(world(.5,0,-.45),dir);
        player.execute("/tp @e[type=minecart,tag="+player.name()+"] "+xpos+" "+ypos+" "+zpos+" "+dir);
    }

    /**
     * Return the current position of the minecart expressed in world
     * coordinates.
     */
    //% block
    export function position(): Position {
        return world(xpos,ypos,zpos);
    }

    /** 
     * Return the current heading of the minecart, expressed in degrees.
     * 0 degrees is toward the positive X direction. 90 degrees is toward
     * the positive Z direction.
     */
    //% block
    export function heading():number {
        return dir;
    }
}
