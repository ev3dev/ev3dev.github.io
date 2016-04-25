---
author: "@dlech"
title: "Kernel Release Cycle 10"
---

In this round of releases, we have:

* `v3.16.7-ckt26-10-ev3dev-ev3` for the EV3.
* `v4.1.18-ti-rt-r56-10-ev3dev-bb.org` for the BeagleBone.
* `v4.1.21-10-ev3dev-rpi` for the Raspberry Pi 0/1.
* `v4.1.21-10-ev3dev-rpi2` for the Raspberry Pi 2/3.

**Note:** `rt` in the BeagleBone kernel denotes that it is a [realtime kernel].
BeagleBone has been shipping a realtime kernel for a few months now, so it will
be interesting to see if we run into issues or if there is a noticeable difference
in performance. Perhaps in the future we can get a realtime kernel running on
the EV3 as well.

[realtime kernel]: https://rt.wiki.kernel.org/index.php/Main_Page

### Breaking Changes

**Motor Drivers!**

There has been a major overhaul of the tacho-motor class. Most of the changes
are under the hood, however there are a few important breaking changes that
users need to know about.

* `speed_regulation` attribute is removed. Now, all `run-*` commands except for
  `run-direct` behave the same as the old `speed_regulation` = `on`. If you need
  unregulated control of motors (`speed_regulation` = `off`) use the `run-direct`
  command.
* `encoder_polarity` attribute is removed. You probably were not using this
  unless you were using Firgelli linear actuators. More on these later...
* `stop_command` is renamed to `stop_action`. Since we were making breaking
  changes, we decided to change this to make it clear that when you write to
  this attribute, the motor does not stop until you write `stop` to `command`.
  **Note:** This change also affects the dc-motor class.
* `max_speed` attribute is added. This returns the maximum speed of the motor
   with no load at 9V.
* New `linear` subclass for linear actuators.
  * This is for use with Firgelli linear actuators.
  * These are not automatically detected. You have to specify the driver by
    using the `set_device` attribute of the output port.
  * The devices will show up as `/sys/class/tacho-motor/linearN` instead of
    `/sys/class/tacho-motor/motorN`
  * These will not have the `count_per_rot` attribute. Instead, they will have
    `count_per_m` (tachometer counts per meter of linear travel) and 
    `full_travel_count` (tachometer counts for full travel of the actuator)

### Fixes

Thanks to some new contributors for the following:

* @harmooni fixed the HiTechnic Angle Sensor driver.
* @markosko fixed the HiTechic Compass Sensor driver.

Also we backported a couple of mainline kernel patches to our EV3 kernel:

* Fixed some Sony Dualshock controllers not working.
* Fixed camera button on LEGO Vision Command cameras not working.

And last, but not least, BrickPi got some love:

* Motor control is greatly improved. You can now control motors very close to
  the same way you can on the EV3.
* Fixed inconsistent port addresses.
* Fixed a sensor connection bug.
* Fixed NXT/Analog sensors value not changing.

### Changelogs

For a more complete changelog, follow the link for your platform:
[EV3][ev3-changelog], [BB][bb.org-changelog], [RPi][rpi-changelog] or [RPi2][rpi2-changelog].

[ev3-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ad411405b3bd9def95234c6ed3998d228aac6443/ev3dev-ev3/changelog
[bb.org-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ad411405b3bd9def95234c6ed3998d228aac6443/ev3dev-bb.org/changelog
[rpi-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ad411405b3bd9def95234c6ed3998d228aac6443/ev3dev-rpi/changelog
[rpi2-changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ad411405b3bd9def95234c6ed3998d228aac6443/ev3dev-rpi2/changelog
