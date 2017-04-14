---
author: "@dlech"
title: "Kernel Release Cycle 20"
---

![BrickPi3](/images/brickpi/brickpi3.jpg)
{: .image-responsive .pull-right}

[Dexter Industries] made some major breaking changes to their BrickPi3 firmware,
so this release is all about the BrickPi3 (again). Major shout-out to
@sanjayseshan for spending a significant portion of his spring break helping to
get the drivers updated for the BrickPi3 firmware v1.4.x. We also now support
stacking up to 4 BrickPi3s on a single Raspberry Pi.

<!--more-->

There are also some kernel modules enabled for using GSM modems with the EV3.
And finally, a corner case involving stopping motors before a position setpoint
is reached was fixed.

[Dexter Industries]: https://www.dexterindustries.com/
[BrickPi3]: https://www.dexterindustries.com/new-brickpi3-lego-mindstorms/

### Version Info

In this round of releases, we have:

* `v4.4.61-20-ev3dev-ev3` for EV3.
* `v4.4.61-ti-rt-r98-20-ev3dev-bb.org` for BeagleBone.
* `v4.4.61-20-ev3dev-rpi` for Raspberry Pi 0/1.
* `v4.4.61-20-ev3dev-rpi2` for Raspberry Pi 2/3.

You can also find this kernel in [snapshot build][download] `2017-04-14`.

[download]: https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/


### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/a90ed59ed7ece41c46c564653b4acb4a1dd4640c/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/a90ed59ed7ece41c46c564653b4acb4a1dd4640c/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/a90ed59ed7ece41c46c564653b4acb4a1dd4640c/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/a90ed59ed7ece41c46c564653b4acb4a1dd4640c/ev3dev-rpi2/changelog
