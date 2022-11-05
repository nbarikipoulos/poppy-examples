'use strict'

const { createScript, createPoppy } = require('poppy-robot-cli')
const parseArgs = require('minimist')

const argv = parseArgs(process.argv.slice(2))

const duration = argv._[0] ?? 5

// ////////////////////////////////////
// Steps of the script
// 0/ (---) initialisation
// 1/ (t/5) Move all motors to 0
// 2/ (t/5) m1 to -120, others to rest-like position
// 3/ (2t/5) m1 to 120, others to 0
// 4/ (t/5) m1 to 0, others to rest-like position
// 5/ (---) release the motors
// ////////////////////////////////////

// Rest-like positions for 'm2', 'm3', 'm4', 'm5', 'm6'
const rest = [-90, 90, 0, -90, -90]

const dt = duration / 5.0

const script = createScript() // Create a new script
  .select('all') // Step 0
  .stiff()
  .goto(0, dt, true) // Step 1
  .goto([120].concat(rest), dt, true) // Step 2
  .select('m1') // Step 3
  .goto(-120, 2 * dt)
  .select('m2', 'm3', 'm4', 'm5', 'm6')
  .goto(0, 2 * dt, true)
  .select('all') // Step 4
  .goto([0].concat(rest), dt, true)
  .compliant() // Step 5

// ////////////////////////////////////
// At last, execute the script
// ////////////////////////////////////

createPoppy().then(poppy => {
  poppy.exec(script)
})
