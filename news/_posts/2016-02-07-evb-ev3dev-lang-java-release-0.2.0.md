---
author: "@jabrena"
title: "Announcing EV3Dev lang Java v0.2.0"
---

Do you like Java programming? If the answer is Yes, this Java library is the answer for EV3Dev. 

[EV3Dev-lang-java](https://jabrena.github.io/ev3dev-lang-java/#/) is a Java library designed to interact with the hardware managed by EV3Dev using the LeJOS way.

**What is the support for Lego Mindstorms boards?**

In this release, the library has implemented the support for the EV3 Brick and his his sensors & actuators included in the following kits:

* [45544 LEGO MINDSTORMS Education EV3 Core Set](https://education.lego.com/es-es/lego-education-product-database/mindstorms-ev3/45544-lego-mindstorms-education-ev3-core-set)
* [31313 LEGO MINDSTORMS EV3](http://www.lego.com/en-us/mindstorms/products/31313-mindstorms-ev3)

But in the next releases, the library will add support for [Raspberry Pi](https://www.raspberrypi.org/) with the hats [Mindsensors Pi Storms](http://www.mindsensors.com/teaching-stem-with-robotics/13-pistorms-base-kit-raspberry-pi-brain-for-lego-robot) & [Dexter Industries Brick Pi+](http://www.dexterindustries.com/brickpi/)

It's another exciting milestone for ev3dev. Starting today, we now support
ev3dev on BeagleBone with [FatcatLab's EVB cape][EVB].

![EVB being hacked](/images/evb/evb-being-hacked.jpg){:.img-responsive}

Here are some things about the EVB you might like to know:

* Should work with BeagleBone [White], [Black] and [Green]. Has only been tested
  on BeagleBone Black.
* Ev3dev must be installed on a microSD card. It cannot be installed to the
  on-board eMMC because the eMMC pins are used by the EVB cape for other things.
* Auto-detection of NXT sensors does not always work correctly. This is a
  hardware limitation (missing gpio on input port pin 2).
* No I2C sensor support. This is a software issue, so could be fixed some day.
* The holes in the clear plastic cover that comes with the EVB have LEGO
  compatible spacing but do not have a LEGO compatible diameter. In other
  words, technic pins don't fit in the holes. Be prepared to get creative to
  physically attach it to your creation.

[Download] the SD card image, try it out and let us know how it goes.

[EVB]: http://fatcatlab.com/product/evb/
[White]: http://beagleboard.org/bone
[Black]: http://beagleboard.org/black
[Green]: http://beagleboard.org/green
[Download]: https://github.com/ev3dev/ev3dev/releases/tag/evb-ev3dev-jessie-2016-01-25
