---
author: "@dlech"
title: "Kernel Release Cycle 8"
---

I'm changing my kernel announcement format a bit. It is too much to make a separate
announcement for three (and soon to be four) kernels. The "8" in "Kernel Release Cycle 8"
refers to the version of the ev3dev drivers that is shared between all of the kernels.
So, in this round of releases, we have:

* `v3.16.7-ckt19-8-ev3dev-ev3` for the EV3.
* `v4.1.12-8-ev3dev-rpi` for the Raspberry Pi (1).
* `v4.1.12-8-ev3dev-rpi2` for the Raspberry Pi 2.

### Breaking Changes

We made a few breaking changes for consistency now that we are starting to support
more platforms other than the EV3.

* The LEDs on the EV3 are now named `ev3:left:red:ev3dev` instead of `ev3-left0:red:ev3dev`.
* The WeDo ports are numbered 1 and 2 instead of 0 and 1.

Also, be aware that brickman has not been updated yet for these changes, so some
things may not work as expected until the next brickman release.

### New Features

Lots of new hardware support this go around.

* [Dexter Industries BrickPi+](http://www.dexterindustries.com/shop/brickpi-advanced-for-raspberry-pi/)
* [Dexter Industries dFlex](http://www.dexterindustries.com/shop/dflex-lego-mindstorms-nxt-flexible-sensor-for-mindstorms/)
* [mindsensors.com PiStorms](http://www.mindsensors.com/stem-education/13-pistorms-base-kit)
* [mindsensors.com NxtCam](http://www.mindsensors.com/ev3-and-nxt/14-vision-subsystem-v4-for-nxt-or-ev3-nxtcam-v4)
* [mindsensors.com PixyAdapt](http://www.mindsensors.com/ev3-and-nxt/36-pixy-adapter-with-pixy-camera-for-mindstorms-ev3)
* [Charmed Labs Pixy for LEGO MINDSTORMS](http://charmedlabs.com/default/pixy-cmucam5-for-lego/)

### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

This EV3 kernel also includes the latest upstream patches. See [ckt17-changelog],
[ckt18-changelog] and [ckt19-changelog]. The Raspberry Pi kernels are updated
to kernel v4.1.12.

[ckt17-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-September/062693.html
[ckt18-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-October/063582.html
[ckt19-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-October/064868.html
[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/d7a25712d3f56cc4351e399a9b69e3493b739a02/ev3dev-ev3/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/162ae6365660dc50fa1fd1cf30185e9240858312/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/bc248a3abb784ace049a47ccbfed6153ec5b6b9f/ev3dev-rpi2/changelog
