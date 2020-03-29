/*! Copyright (c) 2018-2020 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const P = require('poppy-robot-cli')

const led = [ // The led colors
  'red',
  'green',
  'blue',
  'yellow',
  'cyan',
  'pink',
  'white'
]

// ////////////////////////////////////
// Some utility functions
// ////////////////////////////////////

// here a led chaser behavior script :)
const createLedChaser = (motors) => {
  const script = P.createScript()

  let index = 0
  motors.forEach(motor => script // For each motor add to the ledChaser script the following instruction
    .select(motor) // select the motor with id 'id' (sic)
    .led(led[index++ % 7]) // why not?
    .wait(200) // wait a little
  )

  motors.reverse().forEach(motor => script // reverse the motor ids array
    .select(motor) // select the motor
    .led('off') // turn off led
    .wait(150) // wait a little
  )

  return script
}
// A function returning a blinking script
const blink = (color, repeat = 5) => {
  const script = P.createScript('all')
    .select('all')

  const delay = 200 // it does not look nice with lower value

  for (let i = 0; i < repeat; i++) {
    script.led(color)
      .wait(delay)
      .led('off')
      .wait(delay)
  }
  return script
}

// ////////////////////////////////////
// Some utility scripts
// ////////////////////////////////////

const init = P.createScript('all') // new script and all motor selected
  .compliant(false) // Switch motor to  the programmatically-drivable state
  .speed(100) // set them a default speed

const end = P.createScript('all') // new script and all motor selected
  .compliant(true) // Switch motor to 'rest' state
  .led('off') // Turn off leds.

// This create a motion to a 'stable' position in rest mode
// i.e. 'freeing' motor i.e. switch their compliant states to true
const toStablePosition = P.createScript() // Create a new script

let tuples = [ // let define an array of tuple (motor/target position)
  ['m2', -90],
  ['m3', 90],
  ['m4', 0],
  ['m5', -90],
  ['m6', 0],
  ['m1', 0]
]

tuples.forEach(tuple => toStablePosition // for each tuple in tuples, let add to toStablePosition
  .select(tuple[0]) // select motor
  .position(tuple[1]) // "move to" action
)
toStablePosition.wait(1000)

// /////////////////////////
// Our scripts
// ////////////////////////////////////

// Script that moves all motors to the postion 0
const start = P.createScript('all')
  .speed(50)
  .position(0)
  .wait(2000)
  .speed(100)

// a mvt
const mainMoveScript = P.createScript() // let create a new script

tuples = [
  ['m1', -60],
  ['m2', -90],
  ['m3', 90],
  ['m4', 90],
  ['m5', -90],
  ['m6', 90]
]

tuples.forEach(tuple => mainMoveScript // for each tuple in pos, let add to mainMoveScript
  .select(tuple[0]) // a "select motor" action
  .position(tuple[1], true) // a "move to" action
  .led('pink') // at last set the led color of motor
)
mainMoveScript.wait(1000) // wait a little

tuples.reverse() // reverse the motor list...
  .forEach(tuple => mainMoveScript // and turn off led (nice, isn't it??)
    .select(tuple[0])
    .led('off')
    .wait(300)
  )

// ////////////////////////////////////
// At last, execute the scripts
// ////////////////////////////////////

P.createPoppy().then(poppy => {
  const ledChaser = createLedChaser(poppy.getAllMotorIds())

  poppy.exec(
    init,
    blink('blue'),
    start,
    ledChaser,
    mainMoveScript,
    toStablePosition,
    ledChaser, // once again :)
    end
  )
})
