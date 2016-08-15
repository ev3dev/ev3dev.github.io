---
author: "@dlech"
title: "Nightly Image Builds"
excerpt: 'ev3dev.org now offers "nightly" image builds.'
---

I have finally got around to something I should have a long time ago - automating
the build process of creating ev3dev SD card images. Now we can create new image
files for all platforms in around 30 minutes. The images are hosted on [bintray],
which is one of the many awesome services that are free for open source projects
like ev3dev.

We are calling these "nightly" images. The quotes mean that we won't actually
create new images every night, but just on demand whenever there are significant
updates to packages.

These images are totally untested, so we could use a few folks to try them out
and see if they actually work. <s>Click the nifty little badge below to find the
downloads.</s>

2016-08-13 update: Image build snapshots are now hosted [here][download].

[bintray]: https://bintray.com/
[download]: https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/
