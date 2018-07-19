# poppy-examples

A set of examples for the [poppy-robot-client](https://github.com/nbarikipoulos/poppy-robot-client)

<!-- toc -->

- [Usage](#usage)
- [Basic examples](#basic-examples)
  * [basic.js](#basicjs)
  * [tetris.js](#tetrisjs)
  * [XmasTree.js](#xmastreejs)

<!-- tocstop -->

## Usage

All these script files could be executed if the poppy-robot-client has been first globally installed (see [here](https://github.com/nbarikipoulos/poppy-robot-client#installing-the-poppy-robot-client-module)) and following the steps below:

- Clone this repository anywhere on your computer:
```shell
git clone https://github.com/nbarikipoulos/poppy-examples.git
```
- Open a terminal in this folder and type (only once):
```shell
npm link poppy-robot-client 
```
that will "initialize" the node.js context for this folder,
- Then, to launch any of these examples, simply type:
```shell
node path_to_script_file
```
to execute them.

## Basic examples

### basic.js

A true beginner script introducing to script writing.

### tetris.js

A more 'real-life' case which demonstrates:
- the sequencing of many scripts,
- the synchronous/asynchronous call of actions.

The default release of this script is in asynchronous mode. Simply editing it and setting the variable named sync to true will set all the motions in synchronous mode.

### XmasTree.js

The led hell :).
It demonstrates how to (efficiently enough) write scripts in a concise manner.

## Other examples

### Key Driven Poppy

A customizable example to drive the motors (Poppy Ergo Jr) or users' scripts with keyboard.

Next to poppy init, if needed, type:
```
node key-driven-poppy/start
````
then, type h to display available key binding and enjoy :)

Users can easily register their own script modifiyng the keyBinding.js file.