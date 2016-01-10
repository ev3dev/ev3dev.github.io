---
author: "@dlech"
title: "Kernel Release Cycle 9"
---

In this round of releases, we have:

* `v3.16.7-ckt21-9-ev3dev-ev3` for the EV3.
* `v4.1.15-9-ev3dev-rpi` for the Raspberry Pi (0/1).
* `v4.1.15-9-ev3dev-rpi2` for the Raspberry Pi 2.

### Breaking Changes

One breaking change, but it is a significant one. In all of the sysfs classes
provided by `lego-linux-drivers` (`lego-port`, `lego-sensor`, `tacho-motor`,
`dc-motor`, `servo-motor`), the `port_name` attribute has been renamed to `address`.

This will break pretty much every library for ev3dev out there. It's an easy fix
but it will take some time for the library authors to fix it. For this reason,
don't upgrade yet unless you are planning on updating code for this change.

Make that two breaking changes. This one is pretty minor though. LEDs on the
BrickPi are renamed from `brickpi{1,2}:blue:ev3dev` to `brickpi:led{1,2}:blue:ev3dev`.

### New Features

Hardware support (EV3 kernel):

* Enabled kernel modules for USB over IP.
* Enabled kernel modules for Sony Sixaxis controllers.

New in `lego-linux-drivers`:

__User-defined sensors__ - you can now write userspace drivers that will show
up as a `lego-sensor` device. The driver is setup by using [configfs](https://en.wikipedia.org/wiki/Configfs).
Once setup, this will create two new devices in sysfs. One in `lego-sensor` and
one in `user-lego-sensor`. The device in `user-lego-sensor` is used to write
data from userspace to the kernel. The data can then be read by the usual means
from the device in the `lego-sensor` subsystem.

### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

This EV3 kernel also includes the latest upstream patches. See [ckt20-changelog],
[ckt21-changelog]. The Raspberry Pi kernels are updated to kernel v4.1.15.

[ckt20-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-November/065769.html
[ckt21-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-December/066818.html
[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/c72b03100a3aa8e332b410074e74572b35df2324/ev3dev-ev3/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/c72b03100a3aa8e332b410074e74572b35df2324/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/c72b03100a3aa8e332b410074e74572b35df2324/ev3dev-rpi2/changelog
