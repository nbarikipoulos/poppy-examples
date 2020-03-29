/*! Copyright (c) 2018-2020 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const P = require('poppy-robot-cli')

// seq = false => Request to move (position/rotation) are send to the robot and it does not wait the end of the movement to process next instruction
// seq = true => sequential: once move instruction is send to motor, we await the end of the movement until processing next step
const seq = false

// ////////////////////////////////////
// Some utility functions
// ////////////////////////////////////

// Function which returns a script moving the motor m1 to the position 'value'
const moveMotor1To = (value, seq) => P.createScript()
  .select('m1')
  .position(value, seq)

// ////////////////////////////////////
// Some utility scripts
// ////////////////////////////////////

const init = P.createScript('all')
  .compliant(false)
  .speed(100)

const end = P.createScript('all')
  .wait(seq ? 0 : 500) // in "parallel" mode, without wait, the compliant true instruction is exececuted too soon (i.e. before the end of all motor rotations)
  .compliant(true)

// ////////////////////////////////////
// The 'tetris' Scripts
// ////////////////////////////////////

const toPosition0 = P.createScript('all')
  .speed(100)
  .position(0, seq)
  .wait(seq ? 0 : 3000) // no need to wait in sequential mode

const toTetris0 = P.createScript()
  .select('m5')
  .position(-90, seq)
  .select('m4')
  .position(0, seq)
  .select('m3')
  .position(90, seq)
  .select('m2')
  .position(-90, seq)
  .wait(seq ? 0 : 1500)

const toTetris1 = P.createScript()
  .select('m2', 'm3')
  .position(0, seq)
  .select('m4', 'm5')
  .position(90, seq)
  .wait(seq ? 0 : 2500)

const toTetris2 = P.createScript()
  .select('m2')
  .position(-90, seq)
  .select('m4')
  .position(0, seq)
  .wait(seq ? 0 : 1800)

// ////////////////////////////////////
// Let sequence the scripts to execute
// ////////////////////////////////////

// Array which handles and sequences all the scripts we
// want to execute
const scripts = []

// Initialisation
scripts.push(
  init,
  moveMotor1To(0, seq),
  toPosition0
)

// tetris0 movement
scripts.push(
  moveMotor1To(90, seq), // rotate m1 by 90 degrees(async)
  toTetris0 // toTretris0 script (async)
)

scripts.push(
  moveMotor1To(-90, seq),
  toTetris1
)

// tetris01 mouvement: bis repetita...
scripts.push(
  moveMotor1To(90, seq),
  toTetris2
)

scripts.push( // Back to Tetris0
  moveMotor1To(0, seq), // rotate m1 by 90 degrees(async)
  toTetris0 // toTretris0 script (async)
)

scripts.push(end) // compliant to true

// ////////////////////////////////////
// At last, execute the scripts
// ////////////////////////////////////

P.createPoppy().then(poppy => {
  poppy.exec(...scripts)
})
