---
author: "@dlech"
title: "Kernel Release Cycle 16"
---

There is nothing too exciting in this release. Most of the changes are for
adding support for a new BeagleBone cape that is being developed.

This release includes one bug fix. Support for polling the `status` attribute
of the tacho motor class has been restored for EV3. (It is still broken for
BrickPi and PiStorms.)

<!--more-->

Here is an example of how to make use of this feature:

{% highlight python %}
#!/usr/bin/env python3

# 1. Connect motors first!
# 2. Run this program in a terminal
# 3. Control the motors in a second terminal
# 4. Watch the output of this program
# 5. Press CTRL+C to stop this program

import glob
import select

motors = glob.glob('/sys/class/tacho-motor/motor*')
p = select.poll()
lookup = {}

for m in motors:
    # get the output port name for each motor
    with open(m + '/address', 'r') as a:
        name = a.read().strip()

    # get a handle to the status attribute
    s = open(m + '/state', 'r')

    # register the status attribute with the poll object. POLLPRI is important!
    p.register(s, select.POLLPRI)

    # save these for later
    lookup[s.fileno()] = (name, s)

while True:
    # wait for a an event
    for fd, event in p.poll():
        # get the info for the motor that caused the event
        name, s = lookup[fd]

        if event & select.POLLPRI:
            # print info about the event
            s.seek(0)
            print(name, s.read().strip())
        else:
            print(name, 'Poll error!')
{% endhighlight %}

### Version Info

In this round of releases, we have:

* `v4.4.24-16-ev3dev-ev3` for EV3.
* `v4.4.24-ti-rt-r55-16-ev3dev-bb.org` for BeagleBone.
* `v4.4.23-16-ev3dev-rpi` for Raspberry Pi 0/1.
* `v4.4.23-16-ev3dev-rpi2` for Raspberry Pi 2/3.

You can also find this kernel in [snapshot build][download] `2016-10-15`.

[download]: https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/

### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/560058bd7d84fd2a0a086c3b24117f0fedb1dd01/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/560058bd7d84fd2a0a086c3b24117f0fedb1dd01/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/560058bd7d84fd2a0a086c3b24117f0fedb1dd01/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/560058bd7d84fd2a0a086c3b24117f0fedb1dd01/ev3dev-rpi2/changelog
