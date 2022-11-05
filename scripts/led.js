'use strict'

const { createScript } = require('poppy-robot-cli')

// Led chaser script
const ledChaser = (
  motors,
  fn = _ => shake(), // _ => ['cyan']
  reverse = true
) => {
  const script = createScript()

  const dt = 0.2

  const colors = fn()
  const size = colors.length

  motors.forEach((motor, i) => script
    .select(motor)
    .led(colors[i % size])
    .wait(dt)
  )

  if (reverse) {
    [...motors].reverse().forEach(motor => script
      .select(motor)
      .led('off')
      .wait(dt)
    )
  }

  return script
}

// A function returning a blinking script
const blink = (motors = 'all', {
  repeat = 2,
  delay = 0.3,
  color = 'green'
} = {}) => {
  const script = createScript(motors).led(color)
    .wait(delay)
    .led('off')
    .wait(delay)

  return Array(repeat).fill(script)
}

const shake = _ => {
  const result = []

  const colors = [...LED]

  while (colors.length) {
    const idx = Math.floor(Math.random() * (colors.length - 1))
    const color = colors[idx]
    if (color !== 'red') {
      result.push(colors[idx])
    }
    colors.splice(idx, 1)
  }

  return result
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
  blink
}
