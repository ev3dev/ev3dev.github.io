---
title: Getting Started with Node JS
group: software-languages
author: "@liam-b"
---

{% include /style/icon.html type="warning" %}
Note that Node JS run really slowly on the EV3 brick and is limited to NPM version 0.10.29 which can be a problem when trying to install some libraries.
{: .alert .alert-warning}

**Before you start, make sure that you have configured a network connection to
your ev3dev device and have opened an SSH connection to it.**

## Installing ev3dev-lang
To install the library run:

```shell
npm install ev3dev-lang
```

Now whenever you want to use this in code, just write:

```javascript
var ev3dev = require('ev3dev-lang');
```

For a bit more info on this visit the ev3dev-lang [github page](https://github.com/wasabifan/ev3dev-lang-js).

## Nano
For this tutorial, we will be using nano. For more info on how to use nano check out the [nano cheat sheet](/docs/tutorials/nano-cheat-sheet).

## Hello world 
Navigate to a project directory (e.g `~/src/js`) and make a new file with `touch test.js`

Open it with `nano test.js` and write:
```javascript
var test = 'hello world!';
console.log(test);
```

Running `node test.js`should print `hello world!` to the console. If this worked you are ready to start coding with node!

## Motors
Plug a ev3 large motor into port A, then open `test.js` and write:

{% include /style/icon.html type="warning" %}
This snippet of code will not work for any other motors!
{: .alert .alert-warning}

```javascript
var ev3dev = require('ev3dev-lang');

var motor = new ev3dev.LargeMotor('outA'); // create new motor plugged into port A called 'motor'

motor.runForever(200); // run motor at speed 200

setTimeout(function () {
  motor.stop(); // stop the motor after a second
}, 1000)
```

If you get any errors when you try to run this, make sure your motor is plugged in correctly.

For other motors such as the `MeduimMotor`, check the [default supported motors](http://wasabifan.github.io/ev3dev-lang-js/modules/_motors_.html) list.

And from reading the [documentation page](http://wasabifan.github.io/ev3dev-lang-js) you should be able to get a good idea of what methods you can use with the motor (things like `runForever()` and `runForTime()`). Then when you use it in code, it should look like:

```javascript
motor.doSomething(speed, otherArgument) // where doSomething can be replaced by any valid method.
```

You can also **reset** and **read** the position of a motor using `motor.reset()` and `motor.position`.

## Sensors
Plug a ev3 color sensor into port 1, then edit `test.js` again appending this to the bottom:

```javascript
var sensor = new ev3dev.ColorSensor('in1'); // create new color sensor called 'sensor'. in1 refers to port 1

setInterval(function () {
  console.log(sensor.reflectedLightIntensity); // log the reflected light percent of the sensor every 300 milliseconds
}, 300)
```

For other sensors, check the [default supported sensors](http://wasabifan.github.io/ev3dev-lang-js/modules/_sensors_.html) list.

To change a sensors mode you'll need to check what modes it has by looking at the [ev3dev sensor list](http://docs.ev3dev.org/projects/lego-linux-drivers/en/ev3dev-jessie/sensor_data.html) and use:

```javascript
sensor.mode = 'NEW-MODE'; // where 'NEW-MODE' can be replaced by any valid mode
```

And then using `sensor.someValueAcessor` will return the sensor value, where `someValueAcessor` can be replaced by any valid accessor (also found on the [default supported sensors](http://wasabifan.github.io/ev3dev-lang-js/modules/_sensors_.html) list by clicking on the sensor you are using)

## Next steps
So that's the basic overview of how to use node with ev3dev! For info on all supported sensors, motors and other documentation visit the [github page](https://github.com/wasabifan/ev3dev-lang-js) and the [documentation page](http://wasabifan.github.io/ev3dev-lang-js).

The documentation page looks a bit confusing, but what you really need to worry about are the names of the classes and the **methods** / **accessors**. (eg. the large motor has **methods** such as: `runForever()`, `runForTime()` etc and the color sensor has **accessors** such as: `reflectedLightIntensity`, `ambientLightIntensity` etc)

The [sensor list](http://docs.ev3dev.org/projects/lego-linux-drivers/en/ev3dev-jessie/sensor_data.html) and the [motor list](http://docs.ev3dev.org/projects/lego-linux-drivers/en/ev3dev-jessie/motor_data.html) are both really useful pages aswell.
