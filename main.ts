/**
 * Custom blocks
 */
//% weight=100 color=#EB0DD5 icon=""
namespace motocart {
    const MOVE_STEP = .2;
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
    let initialized = false;
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
    player.say("Ready to Roll!");
	
    //% block
    function getMazeElevation(x:number,z:number):number {
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
    }
    
    //% block
    function getMazeBlock(x:number, z:number):string {
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
    // @param passengerName - the name of the passenger to use
    function create(startPosition:Position, startHeading:number,passengerName:string):boolean {
        // set the initial position and heading
        xpos = startPosition.getValue(Axis.X)+.5;
        ypos = startPosition.getValue(Axis.Y);
        zpos = startPosition.getValue(Axis.Z)+.5;
        dir = 0;
        
        // if the cart exists, teleport it
        let sel = mobs.target(ALL_ENTITIES)
        sel.addRule("type", "minecart")
        sel.addRule("tag", player.name())
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

        sel = mobs.target(ALL_ENTITIES)
        sel.addRule("type", "villager")
        sel.addRule("tag", player.name())
        qta = mobs.queryTarget(sel);
        if (qta.length!=0) {
            // the villager exists - just make it ride the cart
            player.execute("/ride @e[type=villager,tag="+ player.name()+"] start_riding @e[type=minecart,tag=" + player.name() + "]");
        } else {
            // summon a passenger to ride the minecart
            player.execute("/ride @e[type=minecart,tag=" + player.name() + "] summon_rider villager \"\" \"" + passengerName+"\"");

            // tag the passenger to make it unique
            player.execute("/tag @e[type=villager,x=" + xpos + ",y=" + ypos + ",z=" + zpos + "] add " + player.name())
        }
        initialized = true;
       rotate(startHeading);
       return true;
    }

    /** 
     * detect whether there is a sidewalk to the right of the player and some distance ahead.  The distance must be no more than 3
     * @param distanceAhead 0 for immediately next to the player, 1 for one ahead, etc eg: 0
     * @return true if there is a sidewalk, otherwise, false
     */
    //% block
    export function isSidewalkRight():boolean {
        let p = rotatePoint(pos(0,0,1), dir)
        return getMazeBlock(Math.floor(xpos+p.getValue(Axis.X)),Math.floor(zpos+p.getValue(Axis.Z)))=="X";
    }

    /**
     * detect whether there is a sidewalk in front of the player at some distance ahead.  The distance must be no more than 3
     * @param distanceAhead 1 for immediately in front of the player, 2 for twi ahead, etc eg: 1
     * @return true if there is a sidewalk, otherwise, false
     */
    //% block
    export function isSidewalkAhead():boolean {
        let p = rotatePoint(pos(1,0,0), dir)
        return getMazeBlock(Math.floor(xpos+p.getValue(Axis.X)),Math.floor(zpos+p.getValue(Axis.Z)))=="X";
    }

    /**
     * Check the floor beneath the cart.  If it is a stop sign, return true.  Otherwise, return false.
     * @return the type of block, otherwise, return false
     * @param distance - the distance ahead of player to check
     * @return true if location is a stop, otherwise false
     */
    //% block
    export function isAtStop (): boolean {
        return getMazeBlock(Math.floor(xpos),Math.floor(zpos))!='_';
    }

    /**
     * Check the intersection type and return true if right turns are allowed.
     * @return true if right turns are allowed, otherwise, return false
     * @param distance - the distance ahead of player to check
     * @return true if turn is allowed, otherwise false
     */
    //% block
    export function canRightTurn (): boolean {
        let b = getMazeBlock(Math.floor(xpos),Math.floor(zpos));
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
        let b = getMazeBlock(Math.floor(xpos),Math.floor(zpos));
        return ((b=='1')||(b=='3')||(b=='4'));
    }

    /**
     * Check the intersection type and return true if straight through is allowed.
     * @return true if stright through is allowed, otherwise, return false
     * @param distance - the distance ahead of player to check
     * @return true if straight through is allowed, otherwise false
     */
    //% block
    export function canGoStraight (distance:number): boolean {
        let b = getMazeBlock(Math.floor(xpos),Math.floor(zpos));
        return ((b=='1')||(b=='2')||(b=='3'));
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
                    create(blockpos,0,"Sparky")

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
                    swWorldRtX = (getMazeBlock(worldRtX.getValue(Axis.X),worldRtX.getValue(Axis.Z))=="X");    
                }
            }
            if (newRtZ!=worldRtZ) {
                worldRtZ = newRtZ;
                if (worldRtZ==worldRtX) {
                    swWorldRtZ = swWorldRtX;
                } else {
                    swWorldRtZ = (getMazeBlock(worldRtZ.getValue(Axis.X),worldRtZ.getValue(Axis.Z))=="X");    
                }
            }
            if (newLtX!=worldLtX) {
                worldLtX = newLtX;
                if (worldLtX==worldLtZ) {
                    swWorldLtX = swWorldLtZ;
                } else {
                    swWorldLtX = (getMazeBlock(worldLtX.getValue(Axis.X),worldLtX.getValue(Axis.Z))=="X");    
                }
            }
            if (newLtZ!=worldLtZ) {
                worldLtZ = newLtZ;
                if (worldLtZ==worldLtX) {
                    swWorldLtZ = swWorldLtX;
                } else {
                    swWorldLtZ = (getMazeBlock(worldLtZ.getValue(Axis.X),worldLtZ.getValue(Axis.Z))=="X");    
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
        }
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

