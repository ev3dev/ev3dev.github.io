---
author: "@dlech"
title: "Package Release: connman (1.27-0ev3dev3), ev3dev-connman-config (1), grx (2.4.9-0ev3dev2)"
---

I've pushed out two updated packages and one new package today.

#### connman (1.27-0ev3dev3)

The package now installs a default `/etc/connman/main.conf` file.

There are also a couple bug fixes related to bluetooth thethering.
* Running `connmanctl tether bluetooth [on|off]` no longer returns an false error message.
* Bluetooth tethering stays enabled across reboots if `PersistentTetheringMode` option is set.

#### ev3dev-connman-config (1)

This is a new package, so you will need to manually install it.

    sudo apt-get install ev3dev-connman-config

It replaces `/etc/connman/main.conf` with a copy that contains modified options for ev3dev.
It adds the gadget technology to the list of technologies that automatically connect (Note:
this will not affect existing gadget services, it will only affect new installs, so don't
expect to see anything different here). It also sets `PersistentTetheringMode` to `true` so
that tethering will persist across reboots.

#### grx (2.4.9-0ev3dev2)

This is the graphics library used by brickman (libgrx2-20). This update fixes a bug that caused
pixels to be inverted after switching virtual consoles.
