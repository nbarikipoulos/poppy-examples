'use strict'

const readline = require('readline')

const { createPoppy, createScript } = require('poppy-robot-cli')

// ////////////////////////////////////
// Initialization
// ////////////////////////////////////

const DEGREES = 10 // rotate by values for up, down, left, right keys

let INSTANCE

const init = async _ => {
  INSTANCE = await createPoppy()

  await INSTANCE.exec(
    createScript('all')
      .speed(150)
      .stiff()
  )
}

// Read the key binding from keyBinding.js
const KEYS = require('./keyBinding')()

let motorHandler = 'all' // variable which handles the selected motors

// ////////////////////////////////////
// Some utility functions
// ////////////////////////////////////

const execute = (script) => INSTANCE.exec(script)

// ////////////////////////////////////
// Key listener
// ////////////////////////////////////

const keyListener = async (str, key) => {
  const K = [{ // Exit
    test: (str, key) => key.ctrl && key.name === 'c',
    cb: async _ => {
      await execute(createScript('all').compliant())
      console.log('See you soon.')
      process.exit()
    }
  }, { // Help
    test: (str, key) => key.name === 'h',
    cb: _ => {
      console.log('"0": select all motors')
      console.log('"1" to "6": select motor')
      console.log(`"up", "right": rotate selected motor by ${DEGREES} degrees`)
      console.log(`"down", "left": rotate selected motor by -${DEGREES} degrees`)
      Array.from(KEYS.values())
        .forEach(elt => console.log(`${elt.key}: ${elt.desc}`))
      console.log('Press CRTL-c to exit.')
    }
  }, { // Select all motors
    test: (str, key) => str === '0',
    cb: _ => {
      motorHandler = 'all'
      console.log('All motors selected')
    }
  }, {
    test: (str, key) => str >= '1' && str <= '6',
    cb: _ => {
      motorHandler = `m${str}`
      console.log(`Motor ${motorHandler} selected`)
    }
  }, {
    test: (str, key) => key.name === 'up' || key.name === 'right',
    cb: async _ => {
      await execute(createScript(motorHandler).rotate(DEGREES))
      console.log(`Motor ${motorHandler} rotated by ${DEGREES}`)
    }
  }, {
    test: (str, key) => key.name === 'down' || key.name === 'left',
    cb: async _ => {
      await execute(createScript(motorHandler).rotate(0 - DEGREES))
      console.log(`Motor ${motorHandler} rotated by -${DEGREES}`)
    }
  }, {
    test: (str, key) => KEYS.has(str),
    cb: async _ => {
      const target = KEYS.get(str)
      console.log(`Executing script named "${target.desc}"`)
      await execute(target.script)
    }
  }, {
    test: _ => true,
    cb: _ => console.log(`Unknown key "${str}". Type h to show bend keys.`)
  }]

  await K.find(elt => elt.test(str, key)).cb()
}

// ////////////////////////////////////
// Main job
// ////////////////////////////////////

init().then(_ => {
  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
  process.stdin.on('keypress', keyListener)
})

console.log('Press any key...')
