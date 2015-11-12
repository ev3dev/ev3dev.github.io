---
author: "@dlech"
title: "Image release rpi2-ev3dev-jessie-2015-09-15"
---

This image release contains updated packages from the previous
release, including packages from the Debian 8.1 and 8.2 point
releases and a new [ev3dev kernel] \(v4.1.7-7-ev3dev-rpi2).

[Download] and [release notes].

Note: If you have already installed a previous rpi2 image, you
don't need to install this new release.
`sudo apt-get update; sudo apt-get upgrade; sudo apt-get dist-upgrade`
is (hopefully) sufficient to get all of the changes.

[ev3dev kernel]: https://github.com/ev3dev/ev3dev-kpkg/blob/ev3dev-jessie/ev3dev-rpi2/changelog
[Download]: https://github.com/ev3dev/ev3dev/releases/tag/rpi2-ev3dev-jessie-2015-09-15
[release notes]: https://github.com/ev3dev/ev3dev/blob/master/release-notes/rpi2-ev3dev-jessie-2015-09-15.img-release-notes.md
