---
author: "@dlech"
title: "Image release ev3-ev3dev-jessie-2015-05-20"
---

This image release contains updated packages and some fixes from the previous
ev3dev-jessie-2015-05-01 release. For starters, we are tacking on `ev3-` on to
the front of the release name so that you know this is for LEGO MINDSTORMS EV3
hardware. This way you can tell it apart from the `rpi-` and `rpi2-` releases
that are for Raspberry Pi hardware.

[Download] and [release notes].

Note: If you have already installed the ev3dev-jessie-2015-05-01 release, you
don't need to install this new release. `apt-get update; apt-get upgrade; apt-get dist-upgrade`
is (hopefully) sufficient to get all of the changes.

# Kernel release v3.16.7-ckt11-5-ev3dev-ev3

There are a few breaking changes in this kernel release:

* The `inverted` state of the motor `polarity` properties has been changed to
`inversed` to match the mainline kernel PWM drivers.
* The names of the LEDs have been changed. They now look like `ev3-left0:red:ev3dev`.
* The names of UART sensors have changed. Well known sensors now have a more useful names,
  namely `lego-ev3-color`, `lego-ev3-gyro`, `lego-ev3-us` and `lego-ev3-ir`. Unknown
  UART sensors will have the name `ev3-uart-<type-id>` where `<type-id>` is an unique
  identification number sent by the sensor.

Another interesting change is that we have changed the kernel timer frequency
(CONFIG_HZ) from 100Hz to 1000Hz. This may improve some low-latency applications.
Let us know if you notice a change.

Also, there is now [BrickPi] support. "But I thought BrickPi was just for Raspberry Pi?",
you might say? Well, not anymore! It is possible to attach the BrickPi to an EV3
either using a USB serial adapter cable or via one of the input ports. You just
have to make your own cable and you can use the BrickPi as IO expansion for your
EV3! BrickPi of course also works with ev3dev on Raspberry Pis as well.

The latest stable upstream patches from the Canonical Kernel Team are included as well.

See the [ev3dev changelog] and the upstream [ckt11 changelog] for more info.

# Other Packages


## brickman 0.6.1

Updated to use the changes in the LED names. Also changed Wi-Fi connection timeout
from 2 minutes to 5 minutes.

## flash-kernel 3.35ev3dev3

EV3 board definitions have been included in the `flash-kernel` package instead
of the separate `ev3dev-flash-kernel` package.

## ev3dev-base 10.0

This package is now obsolete and is not included in the ev3-ev3dev-jessie-2015-05-20
release. It is a meta package that depended on lots of `ev3dev-*` packages. These
have been consolidated into new packages: `ev3-config`, `ev3-systemd` `ev3dev-rules`
`firmware-ev3` and `fonts-tom-thumb`.

## ev3-config 1

Contains some configuration files related to serial port debugging and disabling
console blanking.

## ev3-systemd 2

Provides systemd unit files and udev rules needed to make some of the EV3 hardware work.

## ev3dev-rules 1

Provides platform independent udev rules for ev3dev drivers.

## firmware-ev3 1

Contains the firmware files needed to make Bluetooth and two of the UART ports work.

## fonts-tom-thumb 1

A tiny 4x6 font for cramming as much as possible on the EV3 screen.


[Download]: https://github.com/ev3dev/ev3dev/releases/tag/ev3-ev3dev-jessie-2015-05-20
[release notes]: https://github.com/ev3dev/ev3dev/blob/ev3dev-jessie/release-notes/ev3-ev3dev-jessie-2015-05-20.img-release-notes.md
[ev3dev changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ev3dev-jessie/ev3dev-ev3/changelog
[ckt11 changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-May/057147.html
[BrickPi]: https://www.dexterindustries.com/BrickPi/
