/*! Copyright (c) 2018-2020 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const { createScript, createPoppy } = require('poppy-robot-cli')

// ////////////////////////////////////
// Scripts
// ////////////////////////////////////

const speed = 100

const init = createScript() // Create a new script
  .select('all') // select all motors
  .speed(speed) // set speed
  .stiff() // make them programmtically "drivable"

const toPosition0 = createScript() // Create a new script
  .select('all') // select all motors
  .position(0, true) // sequentially move all motor to the position 0
  // i.e. we execute this instruction awaiting that
  // each motor reachs its target position before next instruction

// This position is a 'stable' rest position when 'freeing' motor i.e. switching their
// compliant states to true
const toPosition1 = createScript() // Create a new script
  .select('m2') // select the motor m2
  .position(-90) // move it to the position -90 degrees
  .select('m3') // select the motor m3
  .position(90) // ...
  .select('m4')
  .position(0)
  .select('m5')
  .position(-90)
  .select('m1')
  .position(0)
  .wait(Math.trunc(1500 * 100 / speed)) // 1500ms for speed set to 100

const openGrip = createScript() // Create a new script
  .select('m6') // select the 'm6' motor
  .position(90, true) // "open" it and await the end of the rotation

const closeGrip = createScript() // Create a new script
  .select('m6') // select the 'm6' motor
  .position(0, true) // "close" it, and await end of the rootation

const openClose = [openGrip, closeGrip]

const end = createScript()
  .select('all') // select all motors
  .compliant() // switch motors to the 'compliant' state

// ////////////////////////////////////
// At last, execute the scripts
// ////////////////////////////////////

createPoppy().then(poppy => {
  poppy.exec(
    init,
    toPosition0,
    openClose,
    openClose, // let do it twice
    toPosition1, // go to 'stable' rest position
    end // 'free' the motors
  )
})
