# poppy scripts examples

[![Dependency Status][david-image]][david-url]

A set of Scripts for the [poppy-robot-cli](https://github.com/nbarikipoulos/poppy-robot-cli)/[core](https://github.com/nbarikipoulos/poppy-robot-core) dedicated to the __Poppy Ergo Jr__.

<!-- toc -->

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
- the synchronous/asynchronous call of actions.

The default release of this script is in asynchronous mode. Simply editing it and setting the variable named sync to true will set all the motions in synchronous mode.

### XmasTree.js

The led hell :).
It demonstrates how to (efficiently enough) write scripts in a concise manner.

## Other Examples

### Key Driven Poppy

A customizable example to drive the motors (Poppy Ergo Jr) or users' scripts with keyboard.

Type:

```shell
node key-driven-poppy/start
````

then, type h to display available key binding and enjoy :)

Users can easily register their own scripts modifying the keyBinding.js file.

## Credits

- Nicolas Barriquand ([nbarikipoulos](https://github.com/nbarikipoulos))

## License

- Code is MIT licensed. See [LICENSE](./LICENSE.md).


[david-image]: https://img.shields.io/david/nbarikipoulos/poppy-examples.svg
[david-url]: https://david-dm.org/nbarikipoulos/poppy-examples