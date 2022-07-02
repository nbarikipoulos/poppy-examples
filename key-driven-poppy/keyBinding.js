'use strict'

const { createScript } = require('poppy-robot-cli')

//
// keys "0" to "6" are reserved to select motor,
// "up", "down", "left", "right" to move motors, once selected
// "h" to display available keys
//

module.exports = _ => {
  const keys = new Map()
  KEYS.forEach(elt => keys.set(elt.key, elt))

  return keys
}

// ////////////////////////////////////
// Scripts
// ////////////////////////////////////

const toTetris = (seq) => createScript()
  .select('m6').goto(0, seq)
  .select('m2').goto(-90, seq)
  .select('m3').goto(90, seq)
  .select('m4').goto(0, seq)
  .select('m5').goto(-90, seq)
  .select('m1').goto(0, seq)
  .wait(seq ? 0 : 1500)

// ////////////////////////////////////
// Array of {key, description, script factory} objects
// ////////////////////////////////////

const KEYS = [{
  key: 't',
  desc: 'Tetris position (motor sequentially moved)',
  script: toTetris(true) // Call a function which provides the script
}, {
  key: 'T',
  desc: 'Tetris position (motor simultaneously moved)',
  script: toTetris(false)
}, {
  key: 'z',
  desc: 'All motors to 0 (motor sequentially moved)',
  script: createScript('all').goto(0, true) // ... or directly write the script
}, {
  key: 'Z',
  desc: 'All motors to 0 (motor simultaneously moved)',
  script: createScript('all').goto(0).wait(1000)
}, {
  key: 'o',
  desc: 'Open grip',
  script: createScript('m6').goto(90)
}, {
  key: 'c',
  desc: 'close grip',
  script: createScript('m6').goto(0)
}]
