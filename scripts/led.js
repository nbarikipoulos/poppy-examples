/*! Copyright (c) 2020 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const { createScript } = require('poppy-robot-cli')

// here a led chaser behavior script :)
const ledChaser = (motors, reverse = true) => {
  const script = createScript()

  let index = 0
  motors.forEach(motor => script
    .select(motor)
    .led(LED[index++ % 7])
    .wait(200)
  )

  if (reverse) {
    motors.reverse().forEach(motor => script // reverse the motor ids array
      .select(motor) // select the motor
      .led('off') // turn off led
      .wait(150) // wait a little
    )
  }

  return script
}

// A function returning a blinking script
const blink = (motors = 'all', {
  repeat = 5,
  delay = 300,
  color = 'green'
} = {}) => {
  const script = createScript(motors).led(color)
    .wait(0.8 * delay)
    .led('off')
    .wait(1.2 * delay)

  return Array(repeat).fill(script)
}

const LED = [ // The led colors
  'red',
  'green',
  'blue',
  'yellow',
  'cyan',
  'pink',
  'white'
]

// ////////////////////////////////
// ////////////////////////////////
// Public API
// ////////////////////////////////
// ////////////////////////////////

module.exports = {
  ledChaser,
  blink,
  LED
}
