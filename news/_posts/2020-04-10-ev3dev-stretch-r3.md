---
author: "@dlech"
title: "ev3dev-stretch R3 Release"
---

<img src="/images/news/brickman-stable-stamped.png" alt="Stamped with text: Stable" style="width: 300px; max-width: 100%;" class="image-responsive pull-right" />

After a month of testing, ev3dev-stretch R3 is ready to go! Thanks to everyone
who downloaded and tested the release candidate!

The new SD card image can be found on the main [downloads page][1].

[1]: /downloads

<!--more-->

Changes since ev3dev-stretch R2:

- Updated to Debian 9.12
- Improved Bluetooth availability (again) [#1314](https://github.com/ev3dev/ev3dev/issues/1314)
- Programs started with `brickrun` now run with higher priority
- [A few small Linux kernel driver fixes](https://github.com/ev3dev/ev3dev-kpkg/blob/38fe00a2ad385679559f7a2a3069c36fa93bc707/ev3dev-ev3/changelog#L1-L7)
- Fix bitmap fonts on Raspberry Pi
- Updated ev3dev-lang Python, MicroPython and Java libraries
