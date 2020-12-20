/*! Copyright (c) 2020 Nicolas Barriquand <nicolas.barriquand@outlook.fr>. MIT licensed. */

'use strict'

const { createScript } = require('poppy-robot-cli')

const moveMotor = (motor, position, wait = false) => createScript(motor).position(position, wait)

const moveMotors = (...values) => {
  const script = createScript()

  for (const v of values) {
    const motors = Array.isArray(v.motors) ? v.motors : [v.motors]
    script.select(...motors).position(v.position, v.wait || false)
  }

  return script
}

// Tetris-like stable position
const restPosition = (wait = false) => moveMotors(
  { motors: 'm6', position: 0, wait },
  { motors: 'm5', position: -90, wait },
  { motors: 'm4', position: 0, wait },
  { motors: 'm3', position: 90, wait },
  { motors: 'm2', position: -90, wait }
)

module.exports = {
  moveMotor,
  moveMotors,
  restPosition
}
