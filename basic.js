/*! Copyright (c) 2018-2019 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const P = require('poppy-robot-cli')

// ////////////////////////////////////
// We hereby write our scripts
// ////////////////////////////////////

const init = P.createScript() // Create a new script
  .select('all') // select all motors
  .speed(100) // set speed to 100
  .compliant(false) // make them drivable

const toPosition0 = P.createScript() // Create a new script
  .select('all') // select all motors
  .position(0) // move all motor to the position 0 synchronoulsy
  // i.e. we execute this instruction awaiting that
  // each motor reach their target position before next instruction

// This position is a 'stable' rest position when 'freeing' motor i.e. switch their
// compliant states to true
const toPosition1 = P.createScript() // Create a new script
  .select('m2') // select the motor m2
  .position(-90) // move it to the position -90 degrees.
  .select('m3') // select the motor m3
  .position(90) // ...
  .select('m4')
  .position(0)
  .select('m5')
  .position(-90)
  .select('m1')
  .position(0)

const openGrip = P.createScript() // Create a new script
  .select('m6') // select the 'm6' motor
  .position(90) // open it

const closeGrip = P.createScript() // Create a new script
  .select('m6') // select the 'm6' motor
  .position(0) // close it

const end = P.createScript()
  .select('all') // select all motors
  .compliant(true) // switch motors to 'rest' state

// ////////////////////////////////////
// At last, execute the scripts
// ////////////////////////////////////

const poppy = P.createPoppy() // Instantiate a Poppy object

poppy.exec(
  init,
  toPosition0,
  openGrip, closeGrip,
  openGrip, closeGrip, // let do it twice
  toPosition1, // go to 'stable' rest position
  end // 'free' the motors
)
