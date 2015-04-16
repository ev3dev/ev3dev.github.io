---
title: EV3 USB OTG Port
---

The [AM1808 SoC](../ev3-processor) has 1 USB 2.0 On-The-Go Port (OTG).

## Usage

This is the port that you connect to your computer.

## Notes

* Although the SoC supports OTG, it is not usable on the EV3. The OTG spec requires
a Micro A/B connector and there are some missing jumpers on the EV3 circuit board.

* It is possible to use the port in host mode instead of peripheral mode, though,
if you supply your own 5V. See [Issue #230] for more information.

* The OTG port does not support isochronous transfers. See [Issue #230].

[Issue #230]: https://github.com/ev3dev/ev3dev/issues/230