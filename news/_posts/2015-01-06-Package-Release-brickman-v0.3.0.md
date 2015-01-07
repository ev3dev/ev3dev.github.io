---
author: "@dlech"
title: "Package Release: brickman v0.3.0"
---

A new version of brickman has been released. This version includes a "Device
Browser" that allows you to view the ports and sensors connected to the EV3.

The port browser can be used to monitor the state of auto-detection. In the
case of Analog/NXT sensors, the port browser can also be used to specify the
exact type of sensor.

The sensor browser can be used to see what types of sensors are attached and
which port they are attached to. You can set the mode of the sensor and send
the sensor commands (if it has any) and view a single value (only shows the
first value if there is more than one value).

No support for motors or LEDs yet.

Also fixes [issue #201](https://github.com/ev3dev/ev3dev/issues/201).

