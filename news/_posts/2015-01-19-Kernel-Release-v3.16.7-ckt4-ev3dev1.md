---
author: "@dlech"
title: "Kernel Release: v3.16.7-ckt4-ev3dev1"
---

Kernel version 3.16.7-ckt4-ev3dev1 has been released. This release includes the
most recent upstream patches. There does not seem to be anything in the
[upstream changelog] that should affect any of the core ev3dev functions. There
are some changes that may benefit uses of other devices, such as USB sound
cards.

ev3dev changes:

* Support for the [mindsensors.com LineLeader] sensor has been added.
* An [issue with motor detection] that was introduced in kernel version
3.16.7-ckt3-ev3dev1 has been fixed.

[upstream changelog]: http://kernel.ubuntu.com/~kernel-ppa/mainline/v3.16.7-ckt4-utopic/CHANGES
[mindsensors.com LineLeader]: http://mindsensors.com/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=111
[issue with motor detection]: https://github.com/ev3dev/ev3dev/issues/245