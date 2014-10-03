---
title: ev3dev
subtitle: Debian on LEGO MINDSTORMS EV3!
---

* Table of Contents
{:toc}

## Introduction

The ev3dev distribution is a full Debian 7 (wheezy) Linux distribution running
on the 3.3.x kernel that has been customized for the LEGO MINDSTORMS EV3
controller.

Rather than use custom language bindings that use direct access to mmap'ed
files, this distribution aims to allow as many programming languages as
possible to access the EV3 peripherals using simple Linux file access. If your
favorite programming language is available as an ARM port, and it can read and
write files, you can use it to program the EV3.

Currently the ev3dev distribution includes the following languages:

* bash/dash
* awk/gawk
* perl
* Lua
* guile
* ruby
* python
* Google Go (golang)
* Node.js

If your favorite language isn't listed, you can still program with the EV3.
ev3dev supports standard `apt` tools, so once you get up-and-running
you can install whatever language you like.

And although you *can* directly access the APIs via file I/O if you want to,
let's face it: that's tedious. It's much easier when you have a higher-level
library to use. We have an official "unified" language binding repository
[here](http://github.com/ev3dev/ev3dev-lang), with support for C++, Lua,
Node.JS and vala.

These unified bindings are all built around a single
[API specification](http://github.com/ev3dev/ev3dev-lang/blob/language-binding-unification/wrapper-specification.md)
so the interface is almost identical for each, and they are being updated and
enhanced regularly. You can also get bindings for other languages from our
contributors. Here's a full list:

* Unified bindings:
    * [Lua](https://github.com/ev3dev/ev3dev-lang/tree/language-binding-unification/lua)
    * [C++](https://github.com/ev3dev/ev3dev-lang/tree/language-binding-unification/cpp)
    * [Node.js](https://github.com/ev3dev/ev3dev-lang/tree/language-binding-unification/js)
    * [Vala](https://github.com/ev3dev/ev3dev-lang/tree/language-binding-unification/vala)
* Extra languages:
    * [Google Go](https://github.com/mattrajca/GoEV3) by @mattrajca
    * [Python](https://github.com/topikachu/python-ev3) by @topikachu
    * [C (with optional Perl, Python and Ruby bindings)](https://github.com/in4lio/ev3dev-c) by @in4lio

## Features

Features above and beyond the official LEGO kernel include:

* Support for Atheros, Realtek, and other wifi chipsets so you're not stuck
  with one specific wifi dongle
* Support for SSH terminal sessions
* Ethernet over USB functionality and a full network stack
* Actual user accounts instead of passwordless root access
* Fully upgradeable and customizable install using standard "apt" tools,
  running on the brick
* NFS file share / file transfer capability
* Automatic NTP clock updates 
* Access to device drivers through user-space filesystem
* Built in text editors like vim and nano
* Prebuilt support for programming languages like Lua, perl, gawk, Python,
  guile, Ruby, and more
* Support for all host operating systems including Windows, Mac, Linux,
  Android, even Blackberry!

Put more simply: ev3dev can do almost everything normal Linux can, while the
stock LEGO kernel cannot.

#### Using the ev3dev Kernel:

Don't want to give up your official LEGO MINDSTORMS EV3 kernel and rootfs? You
don't need to!

Just install  ev3dev  on any microSD card (min 1GB suggested, but can you even
buy one that small anymore?) and plug it into the microSD slot on the EV3. The
uboot loader will look on the card, find the ev3dev kernel and happily boot
that instead!

When you want to use the official LEGO tools, just shutdown the EV3, unplug the
ev3dev microSD card and restart the brick.

This is still an early beta, so it's not as polished as the official LEGO
offering, but it's getting better every week as we add support for more of the
native EV3 drivers. Alongside the main kernel, work is also being done on
[brickman], which adds a LEGO-like GUI.

## The state of the project

Currently, the project is being maintained by @dlech and @rhempel in their
spare time. Active development is being done in the main [ev3dev-kernel] repo
as well as in places like [brickman] and other related packages.

ev3dev supports many of the basic functions of the brick, including:

* Motors
* Sensors
* Sound
* LEDs
* The LCD

## Getting Started
To start working with ev3dev, head over to the [Getting Started] page on the
main wiki.

## Assorted Info / FAQ

#### Does ev3dev replace the firmware on my EV3 programmable brick?

No. ev3dev runs completely off of an SD card, leaving the existing firmware
intact. To restore the original functionality of your brick, just power it off
and remove the SD card containing ev3dev. When you turn it back on, it will
boot using the existing firmware.

#### Can ev3dev do everything that the official firmware can?

No. Although the goal is to support as much as we can, some things will
probably never make it in to ev3dev for various reasons. Here are some things
that ev3dev doesn't do (currently):

* Offer a GUI on boot
* Run programs from EV3-G
* Automatically configure PC interaction (networking)

#### What's a Linux?

If you are at this section right now as a result of true inquiry, that probably
means that ev3dev isn't something for you (yet). We're currently in a heavy
development stage so ev3dev requires some more advanced knowledge and lots of
time to use. We invite you to look here often, because some day we will have
many more user-friendly features for you to take advantage of. Stay tuned!

[Getting Started]: https://github.com/ev3dev/ev3dev/wiki/getting-started-v2
[ev3dev-kernel]: https://github.com/ev3dev/ev3dev-kernel
[brickman]: https://github.com/ev3dev/brickman
