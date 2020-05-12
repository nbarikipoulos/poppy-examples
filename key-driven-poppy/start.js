/*! Copyright (c) 2018-2020 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const readline = require('readline')

const P = require('poppy-robot-cli')

// ////////////////////////////////////
// Initialization
// ////////////////////////////////////

const DEGREES = 10 // rotate by values for up, down, left, right keys

let INSTANCE

const init = async _ => {
  INSTANCE = await P.createPoppy()

  await INSTANCE.exec(
    P.createScript('all')
      .speed(150)
      .stiff()
  )
}

// Read the key binding from keyBinding.js
const KEYS = require('./keyBinding')()

let motorHandler = 'all' // variable which handles the selected motors

// ////////////////////////////////////
// Some utility functions
// ////////////////////////////////////

const execute = (script) => INSTANCE.exec(script)

// ////////////////////////////////////
// Key listener
// ////////////////////////////////////

const keyListener = async (str, key) => {
  //
  // Reserved key first
  //

  if ( // Exit
    key.ctrl && key.name === 'c'
  ) {
    await execute(P.createScript('all').compliant())
    console.log('See you soon.')
    process.exit()
  } else if ( // Help
    key.name === 'h'
  ) {
    console.log('"0": select all motors')
    console.log('"1" to "6": select motor')
    console.log(`"up", "right": rotate selected motor by ${DEGREES} degrees`)
    console.log(`"down", "left": rotate selected motor by -${DEGREES} degrees`)
    Array.from(KEYS.values())
      .forEach(elt => console.log(`${elt.key}: ${elt.desc}`))
    console.log('Press CRTL-c to exit.')
  } else if ( // Select all motors
    str === '0'
  ) {
    motorHandler = 'all'
    console.log('All motors selected')
  } else if ( // Select a motor (m1 to m6)
    str >= '1' && str <= '6'
  ) {
    motorHandler = `m${str}`
    console.log(`Motor ${motorHandler} selected`)
  } else if ( // Rotate selected motor(s) of +DEGREES
    key.name === 'up' || key.name === 'right'
  ) {
    await execute(P.createScript(motorHandler).rotate(DEGREES))
    console.log(`Motor ${motorHandler} rotated by ${DEGREES}`)
  } else if ( // Rotate selected motor(s) of -DEGREES
    key.name === 'down' || key.name === 'left'
  ) {
    await execute(P.createScript(motorHandler).rotate(0 - DEGREES))
    console.log(`Motor ${motorHandler} rotated by -${DEGREES}`)
  } else if ( // Bend keys of provided scripts
    KEYS.has(str)
  ) {
    const factory = KEYS.get(str)
    console.log(`Executing script named "${factory.desc}"`)
    await execute(factory.script())
  } else { // Unknown keys
    console.log(`Unknown key "${str}". Type h to show bend keys.`)
  }
}

// ////////////////////////////////////
// Main job
// ////////////////////////////////////

init().then(_ => {
  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
  process.stdin.on('keypress', keyListener)
})

console.log('Press any key...')
