---
author: "@dlech"
title: "Image release ev3-ev3dev-jessie-2015-07-08"
---

This image release contains updated packages from the previous
ev3dev-jessie-2015-05-20 release, including packages from the Debian 8.1 point
release and a new [ev3dev kernel].

[Download] and [release notes].

Note: If you have already installed the ev3dev-jessie-2015-05-01 or newer release, you
don't need to install this new release.
`sudo apt-get update; sudo apt-get upgrade; sudo apt-get dist-upgrade`
is (hopefully) sufficient to get all of the changes. If you have an older release,
you need to install a new image because of some [major changes].

[Download]: https://github.com/ev3dev/ev3dev/releases/tag/ev3-ev3dev-jessie-2015-07-08
[release notes]: https://github.com/ev3dev/ev3dev/blob/master/release-notes/ev3-ev3dev-jessie-2015-07-08.img-release-notes.md
[ev3dev kernel]: {{ internal-link-base }}/news/2015/07/08/Kernel-Release-v3.16.7-ckt11-5-ev3dev-ev3
[major changes]: {{ internal-link-base }}/news/2015/05/01/Major-Release
