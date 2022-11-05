'use strict'

const { createPoppy, createScript } = require('poppy-robot-cli')
const parseArgs = require('minimist')

const argv = parseArgs(process.argv.slice(2))

const dt = argv._[0] ?? 1

// ////////////////////////////////////
// Move m1/other motors by steps of dt
// Steps of the script
// 0/ (---) initialisation,
// 1/ (dt) all motors to positions 0
// ith/ (dt) m1 => rotation
//           in the same times move others motors
// last/ (---) back to rest position, release the motors
// ////////////////////////////////////

const start = createScript('all').stiff()
const end = createScript('all').compliant()

// Move m1/other motors by steps of dt
const ith = (
  pos1, // Target position for m1
  {
    motors = ['m2', 'm3', 'm4', 'm5', 'm6'], // others motors: Default is all others
    positions = [-90, 90, 0, -90, -90], // target positions: Default is rest-like position
    duration = dt
  } = {}
) => createScript('m1')
  .goto(pos1, duration)
  .select(motors)
  .goto(positions, duration, true)

// ////////////////////////////////////
// Let's create the scripts to execute
// ////////////////////////////////////

const scripts = [
  ith(0, { positions: 0 }),
  ith(90, { positions: [-90, 0, -90, 90, 0] }),
  ith(-90, { motors: 'm4', positions: 90 }),
  ith(0, { positions: [90, 90, 90, 90, -90] }),
  ith(-90, { motors: 'm2', positions: -90 }),
  ith(90, { positions: [0, 0, 0, 90, 0] }),
  ith(-90, { positions: [-90, 90, 90, 90, -90] }),
  ith(0)
]

// ////////////////////////////////////
// At last, execute the scripts
// ////////////////////////////////////

createPoppy().then(poppy => {
  poppy.exec(
    start,
    scripts,
    end
  )
})
