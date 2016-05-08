---
author: "@dlech"
title: "Kernel Release Cycle 11"
excerpt: "Kernel release cycle 11 is now available! The big news is that all kernels are updated to v4.4.9"
---

In this round of releases, we have:

* `v4.4.9-11-ev3dev-ev3` for EV3.
* `v4.4.9-ti-rt-r25-11-ev3dev-bb.org` for BeagleBone.
* `v4.4.9-11-ev3dev-rpi` for Raspberry Pi 0/1.
* `v4.4.9-11-ev3dev-rpi2` for Raspberry Pi 2/3.

This release has come a bit sooner than expected because of a few serious bugs
in the release cycle 10 series.


### Major Kernel Version Update

The big news is that all kernels are updated to v4.4.9. Both Raspberry Pi and
BeagleBone upstream have switched to the 4.4 series as their stable kernel. Both
were using a 4.1 kernel previously. So, since they got updated, we figured it
was a good time to get the EV3 kernel updated as well. It was on a 3.16 kernel
previously, so it is a much bigger upgrade. We've done our best to make sure we
didn't break anything, but be sure to let us know if anything that was working
in a previous version is no longer working.

### Fixes

* tacho-motor run-direct command not working
* Kernel deadlock when booting with EV3/UART sensors plugged in
* EV3/UART sensor not working on input port 4 on BeagleBone/EVB

### New Driver

We also sneaked in a new driver. Thanks to @kortschak for getting the mindsensors.com
[pressure sensor] working!

[pressure sensor]: /docs/sensors/mindsensors.com-digital-pneumatic-pressure-sensor

### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/df1fe763165d002b6eb6482148abb98fca9dcae6/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/b912e043ad7c40df66b6007b56153c610e1f2896/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/1833e9369be118ac3072a775504f2c2fa8958432/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/1833e9369be118ac3072a775504f2c2fa8958432/ev3dev-rpi2/changelog
