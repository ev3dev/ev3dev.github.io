---
author: "@dlech"
title: "Kernel Release: v3.16.7-ckt9-ev3dev1/dkms3.0"
---
{% include internal-link-base.html %}

Kernel version 3.16.7-ckt9-ev3dev1 has been released. This release contains a
major overhaul of the tacho-motor class. There are lots of breaking changes,
but it should now be easier to use. It also includes support for the
[mindsensors.com NxtMMX][nxtmmx] motor multiplexer. The coolest part about the
NxtMMX is that it uses the same tacho-motor class, so the same code will work
no matter what the motor is plugged in to. Well, there are a couple exceptions,
but they are mostly the same.

Check out the new [tacho-motor tutorial] to get a feel for how to use the "new"
tacho-motor class. For more information, see the [driver documentation
page][tacho-motor-class] and [issue #282]. If you find any problems with
tacho-motor class, please open a new issue rather than posting on an existing
issue.

Also, because of the breaking changes, brickman will no longer be able to stop
the motors when terminating a program. This will be fixed soon.

The full ev3dev changelog can be found [here][ev3dev-changelog]. Check it out to
see what else changed.

This kernel also includes the latest upstream patches. See [ckt7-changelog],
[ckt8-changelog] and [ckt9-changelog].

[nxtmmx]: {{ internal-link-base }}/docs/sensors/mindsensors.com-multiplexer-for-nxt-ev3-motors/
[tacho-motor tutorial]: {{ internal-link-base }}/docs/tutorials/tacho-motors
[tacho-motor-class]: {{ internal-link-base }}/docs/drivers/tacho-motor-class
[issue #282]: https://github.com/ev3dev/ev3dev/issues/282
[ckt7-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-February/054674.html
[ckt8-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-March/055191.html
[ckt9-changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-March/055905.html
[ev3dev-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ev3dev-jessie/debian/changelog