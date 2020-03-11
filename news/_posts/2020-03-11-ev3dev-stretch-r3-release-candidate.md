---
author: "@dlech"
title: "ev3dev-stretch R3 Release Candidate"
---

<img src="/images/news/brickman-rc-stamped.png" alt="Stamped with text: Release Candidate" style="width: 300px; max-width: 100%;" class="image-responsive pull-right" />

We have a new stable release candidate ready for testing.

Download `snapshot-ev3dev-stretch-ev3-generic-2020-03-07.img.xz` from [here][1].

[1]: https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/2020-03-08/

<!--more-->

Changes since ev3dev-stretch R2:

- Updated to Debian 9.12
- Improved Bluetooth availability (again) [#1314](https://github.com/ev3dev/ev3dev/issues/1314)
- Programs started with `brickrun` run with higher priority
- [A few small Linux kernel driver fixes](https://github.com/ev3dev/ev3dev-kpkg/blob/38fe00a2ad385679559f7a2a3069c36fa93bc707/ev3dev-ev3/changelog#L1-L7)
- Fix bitmap fonts on Raspberry Pi

If all goes well, this will become the new main download in a few weeks.
