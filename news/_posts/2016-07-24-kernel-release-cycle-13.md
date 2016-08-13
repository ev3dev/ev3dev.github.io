---
author: "@dlech"
title: "Kernel Release Cycle 13"
excerpt: "Kernel release cycle 13 is now available!"
---

In this round of releases, we have:

* `v4.4.15-13-ev3dev-ev3` for EV3.
* `v4.4.15-ti-rt-r37-13-ev3dev-bb.org` for BeagleBone.
* `v4.4.15-13-ev3dev-rpi` for Raspberry Pi 0/1.
* `v4.4.15-13-ev3dev-rpi2` for Raspberry Pi 2/3.

This is mainly a bug fix release.

You can also find this kernel in our latest nightly build:

2016-08-13 update: Image build snapshots are now hosted [here][download].

[download]: https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/

### Fixes

* Got rtl8192cu Wi-Fi driver working again in EV3 kernel.
* Fixed some issues with PixyCam driver.
* Fixed some issues with ramping motors (thanks @rhempel)
* Fixed some issues with EV3/UART sensors.
* Fixed some issues with FatcatLab EVB sound and battery drivers.

### Breaking Changes

* Renamed Firgelli motor drivers. (The company has a new name - Actuonix)

### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/e2e0ef9f8017bf920c754a4758d50f5ff887f81a/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/6189b465330bc606adde1b75d8d6d1c05f3f284b/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/0ce6bf7d79a97ed0da9f3ec1786009e594ee4c0e/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/94a52b32dcd2e5d57ad8385303a86ff59b76c7cf/ev3dev-rpi2/changelog
