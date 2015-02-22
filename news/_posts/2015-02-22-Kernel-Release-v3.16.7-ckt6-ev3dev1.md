---
author: "@dlech"
title: "Kernel Release: v3.16.7-ckt6-ev3dev1/dkms2.1"
---

Kernel version 3.16.7-ckt6-ev3dev1 has been released. It is primarily a bug fix
release with no breaking changes (names that changed were already broken). This
release includes the most recent upstream patches. We didn't do an ev3dev kernel
release for upstream ckt5, so [these changes][ckt5-changelog] are included in
this kernel as well. The upstream ckt6 changelog is [here][ckt6-changelog].
Nothing really jumps out at me as affecting ev3dev users.

The ev3dev changelog can be found [here][ev3dev-changelog]. Check it out to see
what we have fixed.

Additionally, we are now releasing a [DKMS package] that includes the ev3dev driver
stack that you can run on any Linux, like your desktop, laptop or Raspberry Pi.
So, if you want to use the WeDo USB hub or UART sensors with something besides
the EV3, you can!

[ckt5-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-February/053889.html
[ckt6-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-February/054254.html
[ev3dev-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ev3dev-jessie/debian/changelog
[DKMS package]: https://github.com/ev3dev/lego-linux-drivers-dkms