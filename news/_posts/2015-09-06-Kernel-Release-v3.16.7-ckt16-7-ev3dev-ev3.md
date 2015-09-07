---
author: "@dlech"
title: "Kernel Release: v3.16.7-ckt16-7-ev3dev-ev3"
---

Kernel version 3.16.7-ckt16-7-ev3dev-ev3 has been released. No breaking changes
for once! Just a few bug fixes and one new feature: we added a `run-direct`
command to the `dc-motor` class that works just like the one already existing
for the `tacho-motor` class.

We also turned on a couple of Wi-Fi related modules to support some additional
Wi-Fi dongles.

If you use the rtl8188eu wireless driver, we have switched back to the
out of kernel module because the mainline kernel driver didn't work as well.
The out of tree module was also updated to the latest upstream version, so
hopefully that means it's even better than before the change.

The full ev3dev changelog can be found [here][ev3dev-changelog]. Check it out to
see what else changed.

This kernel also includes the latest upstream patches. See [ckt15-changelog]
and [ckt16-changelog].

[ckt15-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-July/060734.html
[ckt16-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-August/061821.html
[ev3dev-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ev3dev-jessie/ev3dev-ev3/changelog