# poppy scripts examples

A set of example scripts based on the [poppy-robot-cli](https://github.com/nbarikipoulos/poppy-robot-cli)/[core](https://github.com/nbarikipoulos/poppy-robot-core) modules dedicated to drive the __Poppy Ergo Jr__.

<!-- toc -->

- [Prerequisite](#prerequisite)
- [Install](#install)
- [Basic Examples](#basic-examples)
  * [basic.js](#basicjs)
  * [tetris.js](#tetrisjs)
  * [XmasTree.js](#xmastreejs)
- [Other Examples](#other-examples)
  * [Key Driven Poppy](#key-driven-poppy)
- [Credits](#credits)
- [License](#license)

<!-- tocstop -->

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

that will "initialize" the node.js context for this folder,

- Then, to launch any of these examples, simply type:

  ```shell
  node path_to_script_file
  ```

  to execute them.

## Basic Examples

### basic.js

A true beginner example introducing to script writing.

### tetris.js

A more 'real-life' case which demonstrates:

- the sequencing of many scripts,
- the sequential/simultaneously movement of motors.

The default release of this script is in 'simultaneously move' mode. Simply editing it and setting the variable named 'seq' to true will set all the motions in sequential mode.

It aims to demonstrate how to (efficiently enough) write scripts in a concise manner.

### XmasTree.js

The led hell :)

## Other Examples

### Key Driven Poppy

A customizable example to drive the motors (Poppy Ergo Jr) or users' scripts with keyboard.

Type:

```shell
node key-driven-poppy/start
````

then, type h to display available key binding and enjoy 🙂.

Users can easily register their own scripts modifying the keyBinding.js file.

## Credits

- Nicolas Barriquand ([nbarikipoulos](https://github.com/nbarikipoulos))

## License

- Code is MIT licensed. See [LICENSE](./LICENSE.md).
