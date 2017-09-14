---
author: "@dlech"
title: "Raspberry Pi Image Release"
---

Today is a historic day for ev3dev - ev3dev is just not for the EV3 anymore!

You can now install ev3dev on your Raspberry Pi and use it with your [Dexter
Industries BrickPi]. That's right, you can use the *exact* same libraries and
programs developed for the EV3 (with some slight modifications to the port names)
on the Raspberry Pi with the BrickPi.

This image is just for Raspberry Pi 1 models - it won't work on Raspberry Pi 2.
However, we should have an image for Raspberry Pi 2 soon.

To save you some potential disappointment, you need to understand that the
BrickPi does not provided all of the current capabilities of the EV3. For example,
the motors do not support `brake` or `hold` stop actions, which can make certain
applications rather tricky. There also seems to be some issue with EV3/UART sensors
not updating for short periods of time. These things could be fixed by making
some changes to the BrickPi firmware, but there are no immediate plans to change
the BrickPi firmware.

Here is the [download] and the [release notes].

[Dexter Industries BrickPi]: http://www.dexterindustries.com/BrickPi/
[download]: https://github.com/ev3dev/ev3dev/releases/tag/rpi-ev3dev-jessie-2015-05-13
[release notes]: https://github.com/ev3dev/ev3dev/blob/ev3dev-jessie/release-notes/rpi-ev3dev-jessie-2015-05-13.img-release-notes.md
