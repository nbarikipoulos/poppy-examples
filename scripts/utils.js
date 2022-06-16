'use strict'

const { createScript } = require('poppy-robot-cli')

const init = (speed, motors = 'all', stiff = true) => {
  let script = createScript(motors)
    .speed(speed)

  if (stiff) {
    script = script.stiff()
  }

  return script
}

const end = (motors = 'all') => createScript(motors).compliant()

const wait = (duration) => createScript('all').wait(duration)

module.exports = {
  init,
  end,
  wait
}
