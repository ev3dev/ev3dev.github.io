---
author: "@dlech"
title: "Announcing ev3dev-jessie-2017-02-11 Release"
---

This is a stable maintenance release. But, we did manage to sneak a few
new features in because they were too good to pass up.

<!--more-->

### What's New?

#### BrickPi3 support

Dexter Industries recently released a new version of their BrickPi product
called the [BrickPi3]. The BrickPi3 features improved support for EV3 sensors
and improved support for controlling motors, plus a power switch and a [Grove]
sensor adapter.

[BrickPi3]: https://www.dexterindustries.com/new-brickpi3-lego-mindstorms/
[Grove]: http://wiki.seeed.cc/Grove_System/

#### Packages

We have added a few new packages:

* `python-ptvsd` and `python3-ptvsd` - Python Tools for Visual Studio - lets
  you do remote debugging with [Visual Studio Code] (unfortunately, the python3
  version does not seem to work on the EV3)
* `python-gattlib` and `python3-gattlib` - python wrapper for gattlib - for
  those that like to play with Bluetooth Low Energy devices (requires separate
  BLE capable adapter)

Plus, we have included the updates from [Debian 8.7].

[Visual Studio Code]: https://code.visualstudio.com/
[Debian 8.7]: https://www.debian.org/News/2017/20170114

More details are in the [release notes].

[release notes]: https://github.com/ev3dev/ev3dev/blob/master/release-notes/ev3dev-jessie-ev3-generic-2017-02-11-release-notes.md


### What is fixed (or broken)?

* We have fixed a long standing problem with USB networking not working on macOS.
  We had a workaround for this that involved editing `ev3dev.txt` in the boot
  partition. This file is no longer present because this workaround is no longer
  needed.
* We have fixed an even longer standing bug with the EV3 buttons. The pressed
  and released states were inverted. This may break your existing button code.
  `ev3dev-lang-python` has been updated already, so if you are using that library,
  you have nothing to worry about.


### Download

You can find SD card images on our [download](/download) page.
