/*! Copyright (c) 2018-2019 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const P = require('poppy-robot-cli');

//
// keys "0" to "6" are reserved to select motor,
// "up", "down", "left", "right" to move motors, once selected
// "h" to display available keys
//

module.exports = _ => {

    let keys = new Map();
    KEYS.forEach( elt => keys.set( elt.key, elt) );

    return keys;
}

//////////////////////////////////////
// Array of {key, description, script factory} objects
//////////////////////////////////////

const KEYS = [{
    key: 't',
    desc: 'Tetris position (sync)',
    script: _ => toTetris(true) // Call a function which provides the script
},{
    key: 'T',
    desc: 'Tetris position (async)',
    script: _ => toTetris(false)
},{
    key: 'z',
    desc: 'All motors to 0 (sync)',
    script: _ => P.createScript('all').position(0) //... or directly write the script
},{
    key: 'Z',
    desc: 'All motors to 0 (async)',
    script: _ => P.createScript('all').position(0,false).wait(1000)
},{
    key: 'o',
    desc: 'Open grip',
    script: _ => P.createScript('m6').position(90)
},{
    key: 'c',
    desc: 'close grip',
    script: _ => P.createScript('m6').position(0)
}];

//////////////////////////////////////
// Scripts
//////////////////////////////////////

let toTetris = (sync) => P.createScript()
    .select('m6')
    .position(0, sync)
    .select('m2')
    .position(-90, sync)
    .select('m3')
    .position(90, sync)
    .select('m4')
    .position(0, sync)
    .select('m5')
    .position(-90, sync)
    .select('m1')
    .position(0, sync)
    .wait(sync ? 0:1500)
;