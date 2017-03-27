---
title: Getting Started with Node JS
group: software-languages
author: "@liam-b"
---

{% include /style/icon.html type="warning" %}
Note that Node.js runs frustratingly slowly on the EV3 brick and is limited to an old version of both Node.js and npm. You may want to consider using Python or another ev3dev-supported language instead.
{: .alert .alert-warning}

<p class="lead">
Node.js is a framework that allows you to run JavaScript as a local application. It is designed to make building servers and other asynchronous apps as easy as possible. In this tutorial, we'll show you how to get up-and-running with Node.js on ev3dev.
</p>

**Before you start, make sure that you have [configured a network connection](/docs/networking/) on
your ev3dev device and have [opened an SSH connection](/docs/tutorials/connecting-to-ev3dev-with-ssh/) to it.**

## Installing ev3dev-lang (and quick-start)
To install the library which allows you to use ev3dev features, run the following command from your SSH connection:

```shell
npm install ev3dev-lang
```

In all JavaScript files that you write from here forward, include the following line to import the module:
```javascript
var ev3dev = require('ev3dev-lang');
```

For a bit more info on this visit the ev3dev-lang-js [GitHub page](https://github.com/wasabifan/ev3dev-lang-js).

## Exploring Node.js and ev3dev

### Picking an editor: Nano

For this tutorial, we will be using a text editor called `nano`. For more info on how to use nano, check out the [nano cheat sheet](/docs/tutorials/nano-cheat-sheet). Feel free to use a different one if you know what you're doing.

### Hello world
To start, navigate to a project directory (e.g `~/src/js`) that we can store our files in:

```shell
mkdir -p ~/src/js && cd ~/src/js
```

Create a JavaScript file and open it with `nano test.js`. In the opened editor, add the following code:

```javascript
console.log('hello world!');
```

If you're using `nano`, refer to the [nano cheat sheet](/docs/tutorials/nano-cheat-sheet/) to learn how to save the file.

Running `node test.js`should print `hello world!` to the console. If this worked, you are ready to start coding with node!

### Motors
Let's try running a motor. Plug an EV3 motor into port A, then open `test.js` again and write:

```javascript
var ev3dev = require('ev3dev-lang');

var motor = new ev3dev.Motor('outA'); // create new motor plugged into port A called 'motor'

motor.runForTime(3000, 500); // run the motor for 3 seconds at 500 degrees/second
```

Save the file and run it. Again, you can run the file with `node test.js`. If you get any errors when you try to run this, make sure that your motor is plugged in correctly.

You can refer to the [motor documentation page](http://wasabifan.github.io/ev3dev-lang-js/classes/_motors_.motor.html) to learn about other things you can do with motors (such as using the `runForever()` and `runToRelativePosition()` methods).

### Sensors
Plug an EV3 color sensor into port 1, then edit `test.js` again appending this to the bottom:

```javascript
var sensor = new ev3dev.ColorSensor('in1'); // create new color sensor called 'sensor'. in1 refers to port 1

setInterval(function () {
  console.log(sensor.reflectedLightIntensity); // log the reflected light percent of the sensor every 300 milliseconds
}, 300)
```

If you run your file now, you should see it continuously log the brightness that the sensor is detecting to the console. To stop the code, press <kbd>Ctrl</kbd>+<kbd>C</kbd>.

For other sensors, check out the [sensors documentation page](http://wasabifan.github.io/ev3dev-lang-js/modules/_sensors_.html). Every sensor has a set of "properties" that can be read; you should refer to the documentation site to see which properties can be used.

### Next steps
You've now learned the basics of using Node.js with ev3dev! For info on all supported sensors, motors and other documentation visit the [GitHub page](https://github.com/wasabifan/ev3dev-lang-js) and the [documentation page](http://wasabifan.github.io/ev3dev-lang-js).

The documentation website has a list of "modules" along the side; click on each to visit the detail page for that module. When looking at the page for a specific class, pay attention to the **methods** and **accessors** (e.g., the large motor has **methods** such as `runForever()` and `runForTime()`, and the color sensor has **accessors** such as `reflectedLightIntensity`and `ambientLightIntensity`).

The [sensor list](http://docs.ev3dev.org/projects/lego-linux-drivers/en/ev3dev-jessie/sensor_data.html) and the [motor list](http://docs.ev3dev.org/projects/lego-linux-drivers/en/ev3dev-jessie/motor_data.html) are the best place to look to see what you can do with ev3dev.

Happy coding!
