---
author: "@dlech"
title: "Kernel Release Cycle 17"
---

This is a bug fix release. There are a couple of motor driver bug fixes. We
have also changed the default configuration for the rtl8192cu driver so that
it does not try to use power saving mode. This driver is used by many low-cost
Wi-Fi dongles such as the Edimax EW-7811Un. Sometimes these devices would go to
sleep and not want to wake up, which caused problems for many people.

<!--more-->

### Version Info

In this round of releases, we have:

* `v4.4.32-17-ev3dev-ev3` for EV3.
* `v4.4.31-ti-rt-r67-17-ev3dev-bb.org` for BeagleBone.
* `v4.4.32-17-ev3dev-rpi` for Raspberry Pi 0/1.
* `v4.4.32-17-ev3dev-rpi2` for Raspberry Pi 2/3.

You can also find this kernel in [snapshot build][download] `2016-11-16`.

[download]: https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/

### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/74949b64e2f1c060b29ed72302fbda0580a9574e/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/74949b64e2f1c060b29ed72302fbda0580a9574e/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/74949b64e2f1c060b29ed72302fbda0580a9574e/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/74949b64e2f1c060b29ed72302fbda0580a9574e/ev3dev-rpi2/changelog
