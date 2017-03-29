---
author: "@dlech"
title: "Announcing ev3dev-jessie-2016-10-17 Release"
---

Hey look, we have a new release! It has been quite a while since our last release.
We made some [breaking changes to the motors][motors] back in April and it took
quite a while to get some of the libraries back in a working state. In the mean
time we changed our image building infrastructure to be [based on docker][docker],
which makes the build process much better for the future, but had the side effect
of introducing some new (and old) problems that had to be tracked down and fixed.

But now we feel like we have repaired most of the regressions and other problems
caused by the changes and have something working well enough to call it an official
release. Please let us know if you run into any problems.

[motors]: /news/2016/04/11/Kernel-Release-Cycle-10
[docker]: /news/2016/08/05/ev3dev-and-docker

<!--more-->

### Motors

If you are upgrading from the 2015-12-30 image *and* you never upgraded the
kernel, you will most likely find that your motors no longer work because of
[changes in the motor drivers][motors]. Follow the link to read about the changes.


### Etcher and Bmaps

In our [Getting Started] guide, we now recommend using [Etcher] for flashing the
disk image to your SD card. Even though it is still in beta, we have found that
it works quite well.

Starting with this release, the image downloads now include a [bmap]. Etcher uses
this to only write the parts of the image file with important information and
skips the parts that are unused space. This makes writing the image go two to
three times faster than our previous release!

[Getting Started]: /docs/getting-started
[Etcher]: http://etcher.io
[bmap]: https://source.tizen.org/documentation/reference/bmaptool


### Ev3dev Tools

There are a couple new programs of interest. Try running `ev3dev-sysinfo` in a
terminal. Be sure to include this information when you report an issue on GitHub.

    robot@ev3dev:~$ ev3dev-sysinfo
    Image file:         ev3dev-jessie-ev3-generic-2016-10-17
    Kernel version:     4.4.24-16-ev3dev-ev3
    Board:              LEGO MINDSTORMS EV3 Programmable Brick
    Revision:           0006
    Brickman:           0.8.0
    ev3devKit:          0.4.2

Also, `sudo ev3dev-config` will help you with some basic administrative tasks.

    Arrow keys to navigate / <ENTER> to select / <ESC> to exit menu

    ┌─────────────┤ ev3dev Software Configuration Tool (ev3dev-config) ├─────────────┐
    │                                                                                │
    │      1 Change User Password   Change password for the default user (robot)     │
    │      2 Hardware Configuration Configure EV3-related drivers                    │
    │      3 Update                 Update all packages                              │
    │      4 Advanced Options       Configure advanced settings                      │
    │      5 System Info            Get information on your ev3dev system            │
    │                                                                                │
    │                                                                                │
    │                                                                                │
    │                                                                                │
    │                                                                                │
    │                                                                                │
    │                                                                                │
    │                     <Select>                     <Finish>                      │
    │                                                                                │
    └────────────────────────────────────────────────────────────────────────────────┘


### Download

We have a fancy new [download](/downloads) page. Check it out!
