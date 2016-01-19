---
author: "@dlech"
title: "Kernel Release: v3.16.7-ckt3-ev3dev1"
---

Kernel version 3.16.7-ckt3-ev3dev1 has been released. This release includes the
most recent upstream patches. Kernel 3.16 is not a long-term support version
and is no longer maintained by the usual kernel maintainers on [kernel.org].
However, since it is used in Debian Jessie and Ubuntu Utopic, Ubuntu has taken
over maintenance of this kernel branch in a semi-official capacity. This is
is where the "ckt" in the kernel version comes from - Canonical Kernel Team.
We will be tracking this branch for the ev3dev-jessie release.

The most notable change from the upstream is that the WNA1000 WiFi dongle is
working again. Yay! (It is the only dongle supported on the official LEGO
firmware, so lots of people have this one.)

We've also taken the opportunity to change the versioning scheme. `3.16.7` is
the stable release version from [kernel.org]. `ckt3` as already mentioned is a
special case since this particular kernel is being maintained by Canonical. The
3 will be increased each time they do a kernel release. And of course, `ev3dev1`
is the ev3dev version number. The 1 will be increased each time we do a release
between upstream releases and reset back to 1 when we merge a new upstream
release.

Additional changes include support for the LEGO Power Functions Servo Motor
([88004]). It currently only works when connected to a WeDo USB Hub and not the
output ports of the EV3. There are some bug fixes for input and output ports
using the new lego-port class and a kernel oops in the rcx-motor driver. There
are also some breaking changes of sysfs attribute renames.

See the [changelog] for a more technical list of changes.


[kernel.org]: https://www.kernel.org
[changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ac3001ff292fdd72768e031db5ac1676428f90ed/debian/changelog
[88004]: http://shop.lego.com/en-US/Power-Functions-Servo-Motor-88004
