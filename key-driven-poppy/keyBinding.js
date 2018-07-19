/*!
 * (The MIT License)
 *
 * Copyright (c) 2018 N. Barikipoulos <nikolaos.barikipoulos@outlook.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
'use strict'

const P = require('poppy-robot-client');

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