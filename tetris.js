/*! Copyright (c) 2018 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const P = require('poppy-robot-client');

// sync = false => asynchronous movement of motors
//     i.e. we send move instruction to motor and do not wait the end of its move.
// sync = true => synchronous: we wait until motor will finish its move before sending
//      the next instruction
let sync = false;

//////////////////////////////////////
// Some utility functions
//////////////////////////////////////

// Function which returns a script moving the motor m1 to the position 'value'
let m1_move_to = (value, sync) => P.createScript()
    .select('m1')
    .position(value, sync)
;

// Function which return a wait script (delay is in ms)
let wait = (delay) => P.createScript()
    .wait(delay)
;

//////////////////////////////////////
// Some utility scripts
//////////////////////////////////////

let init = P.createScript('all')
    .compliant(false)
    .speed(100)
;

let end = P.createScript('all')
    .wait(sync? 0: 1500) // in async mode, without wait, 
                         // the compliant true instruction is exececuted too soon
    .compliant(true);

//////////////////////////////////////
// The 'tetris' Scripts
//////////////////////////////////////

let toPosition0 = P.createScript('all')
    .speed( !sync? 50: 100) // when moving all motor together, speed seems to be higher...
    .position(0,sync)
    .wait(sync? 0: 3000) // no need to wait in sync mode
    .speed(100)
;

let toTetris0 = P.createScript()
    .select('m5')
    .position(-90, sync)
    .select('m4')
    .position(0, sync)
    .select('m3')
    .position(90, sync)
    .select('m2')
    .position(-90, sync)
    .wait(sync ? 0:1500)
;

let toTetris1 = P.createScript()
    .select('m2', 'm3')
    .position(0, sync)
    .select('m4', 'm5')
    .position(90, sync)
    .wait(sync ? 0:2500)
;

let toTetris2 = P.createScript()
    .select('m2')
    .position(-90, sync)
    .select('m4')
    .position(0, sync)
    .wait(sync ? 0:1800)
;

//////////////////////////////////////
// Let sequence the scripts to execte
//////////////////////////////////////

// Array which handles and sequences all the scripts we
// want to execute
let scripts = [];

// Initialisation
scripts.push(
  init
  ,m1_move_to(0, sync)
  ,toPosition0
);

// tetris0 movement
scripts.push(
    m1_move_to(90, sync) // rotate m1 by 90 degrees(async)
    ,toTetris0 // toTretris0 script (async)
);

scripts.push(
    m1_move_to(-90, sync)
    ,toTetris1
);

// tetris01 mouvement: bis repetita...
scripts.push(
    m1_move_to(90, sync)
   ,toTetris2
);


scripts.push( // Back to Tetris0
    m1_move_to(0, sync) // rotate m1 by 90 degrees(async)
    ,toTetris0 // toTretris0 script (async)
);

scripts.push(end) // compliant to true

//////////////////////////////////////
// At last, execute the scripts
//////////////////////////////////////

let poppy = P.createPoppy();

poppy.exec(...scripts); // '...' is the spread operator which split an array in single elements
                        // is equivalent to scripts[0], scripts[1], ...