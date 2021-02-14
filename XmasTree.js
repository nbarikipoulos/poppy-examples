/*! Copyright (c) 2018-2020 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const { createPoppy } = require('poppy-robot-cli')

const { init, end, wait } = require('./scripts/utils')
const { moveMotor, restPosition } = require('./scripts/movements')
const { ledChaser, blink } = require('./scripts/led')

const speed = 150

// /////////////////////////
// Scripts
// ////////////////////////////////////

const toStablePosition = [
  moveMotor('m1', 0),
  restPosition(), wait(1000)
]

// Script that moves all motors to the postion 0
const start = moveMotor('all', 0).wait(2000)

// "Main" mvt
const tuples = [
  ['m1', -60],
  ['m2', -90],
  ['m3', 90],
  ['m4', 90],
  ['m5', -90],
  ['m6', 90]
]

const mainMoveScript = [].concat(
  tuples.map(tuple => moveMotor(...tuple, true).led('cyan')),
  wait(1000),
  tuples.reverse().map(tuple => moveMotor(tuple[0], 0, true).led('off'))
)

// ////////////////////////////////////
// At last, execute the scripts
// ////////////////////////////////////

createPoppy().then(poppy => {
  const motors = poppy.allMotorIds
  const lChaser = ledChaser(motors)

  poppy.exec(
    init(speed),
    blink(),
    toStablePosition,
    start,
    lChaser,
    mainMoveScript,
    toStablePosition,
    lChaser, // once again :)
    end()
  )
})
