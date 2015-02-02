---
author: "@dlech"
title: "Package Release: connman, grx"
---

Updated packages:

### connman (1.28-0ev3dev1)

New upstream release.

Here is the full [announcement](https://01.org/connman/blogs/pflykt/2015/connman-1.28).


### grx (2.4.9-0ev3dev5)

This is the graphics library used by brickman (libgrx20-2).

Version 2.4.9-0ev3dev4 was not released, but it fixed issues with dynamic
library linking. The dependencies on libjpeg and libpng were not properly set,
which required programs using libgrx to have to link libjpeg and libpng manually
which is not ideal and could cause linking to fail.

Version 2.4.9-0ev3dev5 makes changing the current virtual console to graphics
mode usable by non-root users. So, try libgrx for your next project!