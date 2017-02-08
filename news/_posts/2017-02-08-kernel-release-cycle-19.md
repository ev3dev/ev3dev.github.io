---
author: "@dlech"
title: "Kernel Release Cycle 19"
---

![BrickPi3](/images/brickpi/brickpi3.jpg)
{: .image-responsive .pull-right}

This release is all about the BrickPi. [Dexter Industries] has recently released
a new version of their MINDSTORMS compatible kit for Raspberry Pi called the
[BrickPi3]. This kernel release adds support for this new board.

The BrickPi3 has better motor control and improved EV3 sensor support. There
are a few missing features for complete ev3dev compatibility, like no speed
control when using the `run-to-*-pos` commands and only the `running` flag
is working on the motor `state` attribute. But, the firmware is easy to update
on the Brickpi3 (unlike the older BrickPi's), so these issues could be fixed
in future firmware updates.

<!--more-->

We have also added a workaround for the popular mindsensors.com IMU sensor to
get it working on the older BrickPi and BrickPi+. Shout-out to @bmegli for this!

If you are using EV3 or BeagleBone, the only changes are upstream kernel fixes
from the 4.4 stable kernel.

[Dexter Industries]: https://www.dexterindustries.com/
[BrickPi3]: https://www.dexterindustries.com/new-brickpi3-lego-mindstorms/

### Version Info

In this round of releases, we have:

* `v4.4.47-19-ev3dev-ev3` for EV3.
* `v4.4.47-ti-rt-r87-19-ev3dev-bb.org` for BeagleBone.
* `v4.4.47-19-ev3dev-rpi` for Raspberry Pi 0/1.
* `v4.4.47-19-ev3dev-rpi2` for Raspberry Pi 2/3.

You can also find this kernel in [snapshot build][download] `2017-02-08`.

[download]: https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/


### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/d13af46db9c9301f03b5cc3caccaff8c99c6810e/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/d13af46db9c9301f03b5cc3caccaff8c99c6810e/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/d13af46db9c9301f03b5cc3caccaff8c99c6810e/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/d13af46db9c9301f03b5cc3caccaff8c99c6810e/ev3dev-rpi2/changelog
