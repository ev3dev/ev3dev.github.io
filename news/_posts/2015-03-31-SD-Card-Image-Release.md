---
author: "@dlech"
title: "SD Card Image Release"
---

This release fixes a problem when writing an image file to an SD card that already
has ev3dev installed. On previous releases, the firstboot script could fail causing
the swap partition to not be created and errors due to a duplicate volume group.
It could even break `flash-kernel`, which means kernel upgrades would not be installed
correctly. See issue [#267] for more information.

Also contains updated packages since the last image release.

Here is the [download] and the [release notes].

[#267]: https://github.com/ev3dev/ev3dev/issues/267
[download]: https://github.com/ev3dev/ev3dev/releases/tag/ev3dev-jessie-2015-03-31
[release notes]: https://github.com/ev3dev/ev3dev/blob/master/release-notes/ev3dev-jessie-2015-03-31.img-release-notes.md
