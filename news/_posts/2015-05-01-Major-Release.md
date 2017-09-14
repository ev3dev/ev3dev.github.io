---
author: "@dlech"
title: "Major Release!"
---

A new SD card image, a new kernel, updated packages and (coming soon) a new
platform.

# SD Card image release 2015-05-01-ev3dev-jessie.img

This image release contains some fundamental changes. As a result, unlike the
other recent releases where you can `apt-get upgrade` instead of re-flashing
your SD card, you need to re-flash for this one.

This biggest change is that we are dropping LVM (logical volume management).
We are also moving from ext3 to ext4 for the file system. Also dropped is the
need for an initramfs. Hopefully we should see better performance because of
this, mostly in the form of a slightly faster boot time.

Additionally, instead of a swap partition, there is now a swap file that is
created and managed by `dphys-swap`.

We've also added some new packages for peer hostname resolution so you don't
have to use the IP address all of the time. So now as soon as you have a network
connection, you should be able to `ping ev3dev.local` on Linux and Mac or
`ping ev3dev` on Windows.

And finally, we've gone back to using the default `ssh.service` instead of
`ssh.socket`. This is made possible by installing `libpam-systemd` to
workaround a bug.

[Download] and [release notes].

# Kernel release v3.16.7-ckt10-4-ev3dev-ev3

We've changed the version scheme slightly to match the recommendations from the
[Debian Kernel Handbook]. So, `3.16.7-ckt10` is the upstream kernel we are based
on. `-4-` is the ABI version. ABI means we only change this when we have made
changes that would require you to rebuild any extra kernel modules. This number
will match the DKMS package release version. The `-ev3dev-` part means this is
an "ev3dev" kernel and it has ev3dev drivers in it. And finally `-ev3` at the
end is the "kernel flavor". We use this to mean it is targeted at the LEGO
MINDSTORMS EV3 hardware.

This kernel release includes quite a few driver changes as well. As mentioned
in the section above, support for LVM is removed, so installing this version
on an older image will render it un-bootable.

There have been significant changes to the [dc-motor class] and the [servo-motor
class]. They have been changed to be more like the recent changes to the
[tacho-motor class]. Also, there are some small changes with a couple HiTechnic
sensors.

Also see the [ev3dev changelog] and the upstream [ckt10 changelog].

# Other Packages

## base-files 8ev3dev1

This package has been updated to reflect the fact that jessie is now stable.

## brickman 0.6.0

Updated to use the changes in the motor kernel drivers. Also added a motor browser.

## ev3dev-base 9.0

Updated to not create an initrd and changed how `console-setup.service` works
since we are no longer shipping plymouth.

## linux-latest-ev3dev-ev3

The name of this package has changed from `linux-latest-ev3dev` to reflect the
changes in the kernel naming scheme and also (hopefully) to not break existing
installs.

# ev3dev on Raspberry Pi

I'm probably jumping the gun by announcing this, but it is very exciting!

We are working on porting ev3dev to Raspberry Pi for use with the [Dexter Industries
BrickPi]. (Thank you Dexter Industries and Shari Vedovato for donating the hardware).

I haven't even started on the drivers for the BrickPi yet, but any early adopters
that are interested can try out the first ev3dev image (also available on the
[Download] page). It also run Debian jessie and has the other ev3dev drivers.
This mean you can use WeDo out of the box and if you are clever, you can probably
get an I2C sensor working on input port 5 on the BrickPi.

Note: This only works on Raspberry Pi 1 models. If someone would like to donate
a Raspberry Pi 2 to the cause, we can make an image for it too.

[Debian Kernel Handbook]: http://kernel-handbook.alioth.debian.org/
[Download]: https://github.com/ev3dev/ev3dev/releases/tag/ev3dev-jessie-2015-05-01
[release notes]: https://github.com/ev3dev/ev3dev/blob/ev3dev-jessie/release-notes/ev3dev-jessie-2015-05-01.img-release-notes.md
[dc-motor class]: /docs/drivers/dc-motor-class/
[servo-motor class]: /docs/drivers/servo-motor-class/
[tacho-motor class]: /docs/drivers/tacho-motor-class/
[ev3dev changelog]: https://github.com/ev3dev/ev3dev-kpkg/blob/ev3dev-jessie/ev3dev-ev3/changelog
[ckt10 changelog]: https://lists.ubuntu.com/archives/kernel-team/2015-April/056345.html
[Dexter Industries BrickPi]: http://www.dexterindustries.com/BrickPi/
