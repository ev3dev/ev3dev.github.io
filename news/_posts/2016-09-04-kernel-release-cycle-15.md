---
author: "@dlech"
title: "Kernel Release Cycle 15"
---

This release is all about I2C. I2C (and sound) was broken on the EV3 if you were
running `flash-kernel 3.35ev3dev10` or higher. Actually it has been broken since
the very first days of ev3dev. It was just by chance that they worked in previous
releases because of a strange interaction with the serial port on input port 1.

Also, we now have I2C support on FatcatLab's EVB for BeagleBone. Due to a hardware
shortcoming (no GPIO on input port pin 2), not all I2C sensors may be automatically
detected, but many will be. Also, due to another hardware shortcoming (no 9V on
input port pin 1), the NXT Ultrasonic sensor may not work reliably even though
it is detected.

<!--more-->

We also enabled some MIDI drivers in the EV3 kernel, so you can try hooking it up
to your MIDI keyboard or see what happens with @JorgePe's [laser harp].

[laser harp]: http://ofalcao.pt/blog/series/lego-laser-harp

In this round of releases, we have:

* `v4.4.19-15-ev3dev-ev3` for EV3.
* `v4.4.19-ti-rt-r41-15-ev3dev-bb.org` for BeagleBone.
* `v4.4.19-15-ev3dev-rpi` for Raspberry Pi 0/1.
* `v4.4.19-15-ev3dev-rpi2` for Raspberry Pi 2/3.

You can also find this kernel in [nightly build][download] `2016-09-04`.

[download]: https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/

### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/cf5ad76d2cc57754aca6272989ca663a83b26777/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/cf5ad76d2cc57754aca6272989ca663a83b26777/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/cf5ad76d2cc57754aca6272989ca663a83b26777/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/cf5ad76d2cc57754aca6272989ca663a83b26777/ev3dev-rpi2/changelog
