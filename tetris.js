'use strict'

const { createPoppy } = require('poppy-robot-cli')

const { init, end, wait } = require('./scripts/utils')
const { moveMotors, restPosition } = require('./scripts/movements')

// seq = false => Request to move (position/rotation) are send to the robot and it does not wait the end of the movement to process next instruction
// seq = true => sequential: once move instruction is send to motor, it awaits the end of the motor move until processing next step
const seq = false
const speed = 100 // Speed of motors

// duration used in scripts belows are calibrates for speed of motors set to 100
const duration = (t100) => Math.trunc(t100 * 100 / speed)

// ////////////////////////////////////
// Scripts
// ////////////////////////////////////

const start = init(speed) // Set speed and switch all motors to stiff state
const finish = [
  wait(seq ? 0 : duration(750)), // avoid to send the compliant instruction too soon
  end()
]

// Function which returns a script moving the motor m1 to the position 'value' (async)
const moveMotor1To = (position) => moveMotors(
  { motors: 'm1', position }
)

//
// a 'store' of movements
//
const movements = [{
  name: 'allMotorsToZero',
  script: moveMotors({ motors: 'all', position: 0, wait: seq }),
  t100: 3000 // ref with speed set to 100
}, {
  name: 'toRestPosition',
  script: restPosition(seq),
  t100: 1000
}, {
  name: 'toTetris1',
  script: moveMotors(
    { motors: ['m2', 'm3'], position: 0, wait: seq },
    { motors: ['m4', 'm5'], position: 90, wait: seq }
  ),
  t100: 2500
}, {
  name: 'toTetris2',
  script: moveMotors(
    { motors: 'm2', position: -90, wait: seq },
    { motors: 'm4', position: 0, wait: seq }
  ),
  t100: 1800
}]

const get = (name) => movements.find(elt => elt.name === name)

// ////////////////////////////////////
// Let group the scripts to execute
// ////////////////////////////////////

const x = [ // tuple (position for m1, script to execute on other motors)
  [0, 'allMotorsToZero'],
  [90, 'toRestPosition'],
  [-90, 'toTetris1'],
  [90, 'toTetris2'],
  [0, 'toRestPosition']
]

const scripts = []

for (const [pos, name] of x) {
  const mvt = get(name)

  scripts.push(
    moveMotor1To(pos), // Independently move m1 (async)
    mvt.script, // Script for other motors
    wait(seq ? 0 : duration(mvt.t100)) // In "async" movement, wait end of mvt
  )
}

createPoppy().then(poppy => {
  poppy.exec(
    start,
    scripts,
    finish
  )
})
