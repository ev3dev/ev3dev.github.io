---
author: "@dlech"
title: "Package Release: brickman, ev3devkit, zram-init"
---

It's been a while since I did a proper package release announcement. Here are some
packages that depend on the latest "level 9" kernel.

### brickman (0.7.0)

Lots of changes in this release. The most obvious change is the increase in font
size. We hope this makes it easier to read. The display on the PiStorms has higher
DPI than the display on the EV3, so this font actually is still kind of small
on the PiStorms. 

In addition to supporting the most recent kernel and PiStorms, this release also
ships with OpenRoberta support built-in (thanks to @ensonic). In order for this
to work though, you will need a yet-to-be-released `openrobertalab` package.
Stay tuned for more about that.

Another important change is that launching programs from the file browser in
brickman will now be limited to the `robot` user. If you didn't create a user
named `robot`, you can find some instructions on how to rename your user and
set the appropriate groups [here](https://github.com/ev3dev/ev3dev/issues/393#issuecomment-141865479)
(hope you can read it even though it is crossed out).

### ev3devkit (0.3.0)

This is the toolkit that brickman is built on. Many of the brickman changes also
required changes to ev3devkit. This means that ev3devKit works better on the
Raspberry Pi now.

### zram-init (3.5ev3dev1)

The latest kernel enables [zram](https://en.wikipedia.org/wiki/Zram) support.
The `zram-init` package lets us take advantage of this for the swapfile.
The 64MB of RAM on the EV3 is just not enough to run Debian so we don't recommend
running without swap on the EV3. However, having a swapfile on the SD card is A)
very slow and B) will wear out your SD card faster. The swapfile provided by
`zram-init` exists only in RAM, but is is compressed to free more RAM. The
compression does use some CPU time, but it is actually still faster than writing
to the SD card. (Note: The Raspberry Pi actually has enough RAM that we can run
without a swapfile.)

This package will be included by default in the next image release. If you want
to be an early adopter though, uninstall `dphys-swapfile` first, then install
this package (but only after you have update to the most recent kernel).
