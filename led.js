'use strict'

const { createPoppy, createScript } = require('poppy-robot-cli')
const parseArgs = require('minimist')

const { ledChaser, blink } = require('./scripts/led')

const argv = parseArgs(process.argv.slice(2))

const led = argv._[0] ?? 'green'

const dt = 1

const start = createScript('all').stiff()
const end = createScript('all').compliant()

const ith = (
  motors,
  positions,
  color = led,
  duration = dt
) => {
  const script = createScript(motors)
    .goto(positions, duration, true)

  return [
    blink(motors, { color }),
    createScript(motors).led(color),
    script,
    createScript(motors).led('off')
  ]
}

// ////////////////////////////////////
// Let's create the scripts to execute
// ////////////////////////////////////

const scripts = [
  ith('all', 0),
  ith(['m2', 'm5'], [90, -90]),
  ith(['m3', 'm6'], -90),
  ith(['m2', 'm3'], [-90, 90]),
  ith(['m1', 'm2'], [90, 0]),
  ith(['m4', 'm5', 'm6'], [-90, 90, 0]),
  ith(['m1', 'm2'], [0, 90]),
  ith(['m2', 'm5'], -90),
  ith(['m4', 'm6'], [0, -90])
]

// ////////////////////////////////////
// At last, execute the scripts
// ////////////////////////////////////

createPoppy().then(poppy => {
  const motors = poppy.motorNames
  poppy.exec(
    ledChaser(motors, _ => [led], false),
    start,
    scripts,
    end
  )
})
