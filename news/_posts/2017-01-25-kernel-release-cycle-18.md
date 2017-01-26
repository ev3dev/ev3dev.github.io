---
author: "@dlech"
title: "Kernel Release Cycle 18"
---

![EV3 buttons](/images/ev3/labeled-buttons.png)
{: .image-responsive .pull-right}

This is another bug fix release. We found a really old bug! Apparently, no one
has ever noticed that button press events on the EV3 were backwards. It's
been this way for at least two years. It is fixed now, but it might cause you
problems if you have been depending on this broken behavior.

<!--more-->

Another significant change is that the BeagleBone kernel is no longer using
PREEMPT_RT (also known as "realtime"). It turns out that it breaks our motor
drivers. None of the other supported ev3dev platforms use a realtime kernel,
so this will actually make things more consistent between platforms.


### Version Info

In this round of releases, we have:

* `v4.4.44-18-ev3dev-ev3` for EV3.
* `v4.4.43-ti-rt-r84-18-ev3dev-bb.org` for BeagleBone.
* `v4.4.44-18-ev3dev-rpi` for Raspberry Pi 0/1.
* `v4.4.44-18-ev3dev-rpi2` for Raspberry Pi 2/3.

You can also find this kernel in [snapshot build][download] `2017-01-25`.

[download]: https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/


### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/5bae32b67e830515448e47dbd810ee7126412022/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/5bae32b67e830515448e47dbd810ee7126412022/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/5bae32b67e830515448e47dbd810ee7126412022/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/5bae32b67e830515448e47dbd810ee7126412022/ev3dev-rpi2/changelog
