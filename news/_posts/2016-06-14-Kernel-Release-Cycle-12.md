---
author: "@dlech"
title: "Kernel Release Cycle 12"
excerpt: "Kernel release cycle 12 is now available!"
---

In this round of releases, we have:

* `v4.4.13-12-ev3dev-ev3` for EV3.
* `v4.4.12-12-rt-r25-11-ev3dev-bb.org` for BeagleBone.
* `v4.4.13-12-ev3dev-rpi` for Raspberry Pi 0/1.
* `v4.4.13-12-ev3dev-rpi2` for Raspberry Pi 2/3.

You may notice on the EV3 that the boot logo looks a bit different. This is so
that we can display kernel messages on boot to help troubleshoot some issues
we have been having with the EV3 locking up on boot. Messages won't actually
be displayed until you upgrade the `flash-kernel` package to `3.35ev3dev9` and
edit `/etc/default/flash-kernel` to remove the `quiet` option and run
`flash-kernel` and then reboot.

    sudo apt-get update
    sudo apt-get install flash-kernel
    sudo nano /etc/default/flash-kernel
    sudo flash-kernel
    sudo reboot


### Fixes

* Kernel package no longer recommends kernel-common - this should prevent
  questions about /etc/kernel-img.conf during upgrade
* Hopefully fixed Wi-Fi regression for devices that use the rtl8192 driver
* Fixed some issues with EV3 UART sensors - big shout-out to @bmegli for helping
  with this!
* Fixed the LEGO NXT Energy Storage driver - thanks @kortschak
* Got LEGO NXT Temperature sensor working using lego-sensor class - also thanks
  @kortschak

### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/55419257875ea7231be4e787f905837320959811/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/9cf48a972aedb0296d1d2a11dadea03b5c8c8f4b/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/5ae765684f6df4b1373b428a43075bda7d8705ee/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/5ae765684f6df4b1373b428a43075bda7d8705ee/ev3dev-rpi2/changelog
