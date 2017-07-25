---
author: "@dlech"
title: "Kernel Release Cycle 21"
---

![NXTCam5](/images/mindsensors/nxtcam5.png)
{: .image-responsive .pull-right}

[mindsensors.com] Has released a new camera sensor, the [NXTCam5]. So, we've
added support for it to ev3dev. The sensor API is basically the same
as its predecessors', but this camera is much more advanced. For example, it
can track faces and lines, and take pictures and record videos. You can also
easily modify the software on the camera itself using python. It's pretty cool.

<!--more-->

Additional changes:

* Enabled kernel modules needed for tethering, which has apparently
  been broken for a while and nobody noticed.
* Added a `PASSIVE` mode for HiTechnic Color Sensor V2.
* Enable 9V out on input port pin 1 in `other-i2c` mode.

[mindsensors.com]: http://www.mindsensors.com/
[NXTCam5]: http://www.mindsensors.com/vision-for-robots/191-vision-subsystem-v5-for-nxt-or-ev3-with-fixed-lens

### Version Info

In this round of releases, we have:

* `v4.4.78-21-ev3dev-ev3` for EV3.
* `v4.4.68-ti-rt-r112-21-ev3dev-bb.org` for BeagleBone.
* `v4.4.78-21-ev3dev-rpi` for Raspberry Pi 0/1.
* `v4.4.78-21-ev3dev-rpi2` for Raspberry Pi 2/3.

You can also find this kernel in the `ev3dev-jessie` [snapshot builds][download] starting with `2017-07-25`.

[download]: https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/


### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/6558cb752fd47d4ead34d1975db20c31a8313bea/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/6558cb752fd47d4ead34d1975db20c31a8313bea/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/6558cb752fd47d4ead34d1975db20c31a8313bea/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/6558cb752fd47d4ead34d1975db20c31a8313bea/ev3dev-rpi2/changelog
