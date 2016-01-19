---
author: "@dlech"
title: "Kernel Release: v3.16.7-ckt14-6-ev3dev-ev3"
redirect_from: /news/2015/07/08/Kernel-Release-v3.16.7-ckt11-5-ev3dev-ev3
---

Kernel version 3.16.7-ckt14-6-ev3dev-ev3 has been released. The most noticeable
change is that the previous kernel release used way more CPU than it should have.
We were experimenting with the CONFIG_HZ setting and it has been changed back
to the default value.

Also, if you use the rtl8188eu wireless driver, we have switched from an out of
kernel package to the driver in the mainline kernel, so let us know if you run
into any problems.

We have removed the 50ms polling limit from I2C sensors. You can now poll faster
than this, but beware... if you poll too fast, the auto-detection algorithm might
think you unplugged the sensor. You can work around this by setting the port to
`i2c` mode instead of the default `auto`.

The full ev3dev changelog can be found [here][ev3dev-changelog]. Check it out to
see what else changed.

This kernel also includes the latest upstream patches. See [ckt12-changelog],
[ckt13-changelog] and [ckt14-changelog].

[ckt12-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-May/057956.html
[ckt13-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-June/058406.html
[ckt14-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-June/059280.html
[ev3dev-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ca79dfae4abdb4740b3053b72ca6667d24b5e6c0/ev3dev-ev3/changelog
