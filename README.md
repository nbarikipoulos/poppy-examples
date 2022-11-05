# Examples for Poppy Scripts

[![JavaScript Style Guide][standard-image]][standard-url]

A set of example scripts based on the [poppy-robot-cli](https://github.com/nbarikipoulos/poppy-robot-cli)/[core](https://github.com/nbarikipoulos/poppy-robot-core) modules dedicated to __Poppy Ergo Jr__.

## Prerequisite

These examples requires the Poppy software ^v4.0.0 installed on robot.

## Install

- Clone this repository anywhere on your computer:

  ```shell
  git clone https://github.com/nbarikipoulos/poppy-examples.git
  ```

- Open a terminal in this folder and type:

  ```shell
  npm install
  ```

- Then, to launch any of these examples, simply type:

  ```shell
  node path_to_script_file [option]
  ```

  to execute them.

## Scripts

name | desc. | option
---|---|---
basic.js | A first example introducing to script writing. | Duration of the script  (in s). Default is 5s.
tetris.js | A more 'real-life' case. | Duration of each step (in s). Default is 1s.
led.js | Let's blink and activate the led of the motors to move. | Color of the led (defaut is green).

## Credits

- Nicolas Barriquand ([nbarikipoulos](https://github.com/nbarikipoulos))

## License

- Code is MIT licensed. See [LICENSE](./LICENSE.md).

[standard-url]: https://standardjs.com
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
