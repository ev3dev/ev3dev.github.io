---
author: "@G33kDude and @dlech"
code_url: "https://gist.github.com/dlech/11098915"
layout: project
category: projects
---

This is still a work in progress. It is a Segway-style balancing robot based on
the [HTWay](http://www.hitechnic.com/blog/gyro-sensor/htway/). You can control
it with the EV3 IR Remote/Sensor.

Interesting features:

* Uses udev to enumerate sensors and motors. Sensors and motors can be plugged
  into any port without any configuration changes.
* Can use either the EV3 Gyro sensor or the HiTechnic Gyro sensor. The gyro
  sensor type is automatically detected, so you don't have to make any
  configuration changes.

TODO: Update for new motor ABI, make a video, building instructions,
Wiimote control, smartphone control, and more...

![ev3dev HTWay](https://dl.dropbox.com/s/gdrb1uk3uy20anu/Gyro_Bot5.png)