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

const readline = require('readline');

const P = require('poppy-robot-client');

//////////////////////////////////////
// Initialization
//////////////////////////////////////

const DEGREES = 10; // rotate by values for up, down, left, right keys

// Create a poppy instance...
const poppy = P.createPoppy();

// ...And init it.
poppy.exec( P.createScript('all')
    .compliant(false)
    .speed(150)
    .wait(500) // Ensure this script is ended. 
);

// Read the key binding from keyBinding.js
const KEYS = require('./keyBinding')();

let motorHandler = 'all'; // variable which handles the selected motors

//////////////////////////////////////
// Some utility functions
//////////////////////////////////////

let execute = (script) => poppy.exec(script);

//////////////////////////////////////
// Main job
//////////////////////////////////////

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {

    //
    // Reserved key first
    //

    if (key.ctrl && key.name === 'c') { // Exit

        execute(P.createScript('all').compliant(true));
        console.log('See you soon.');
        setTimeout(_ => { process.exit();}, 500); // wait a little...

    } else if ( 'h' === key.name ) {

        console.log('"0": select all motors');
        console.log('"1" to "6": select motor');
        console.log(`"up", "right": rotate selected motor by ${DEGREES} degrees`);
        console.log(`"down", "left": rotate selected motor by -${DEGREES} degrees`);
        Array
            .from(KEYS.values())
            .forEach( elt => console.log(`${elt.key}: ${elt.desc}`) );
        ;

    } else if ( str === '0') {

        motorHandler = 'all';
        console.log('All motors selected')

    } else if ( str >= '1' && str <= '6') {

        motorHandler = `m${str}`;
        console.log(`Motor ${motorHandler} selected`);

    } else if ( 'up' === key.name || 'right' === key.name) {

        execute(P.createScript(motorHandler).rotate(DEGREES));
        console.log(`Motor ${motorHandler} rotated by ${DEGREES}`);

    } else if ( 'down' === key.name || 'left' === key.name) {

        execute(P.createScript(motorHandler).rotate(0 - DEGREES));
        console.log(`Motor ${motorHandler} rotated by -${DEGREES}`);

    //
    // Bend keys
    //

    } else if ( KEYS.has(str) ) {

        let factory = KEYS.get(str);
        console.log(`Executing script named "${factory.desc}"`);
        execute(factory.script());

    //
    // Unknown keys
    //

    } else {
        console.log(`Unknown key "${str}". Type h to show bend keys.`);
    }

});

console.log('Press any key...');