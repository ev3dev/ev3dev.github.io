---
author: "@dlech"
title: "Announcing Support for FatcatLab's EVB"
---

Welcome to the family!
{:.lead}

It's another exciting milestone for ev3dev. Starting today, we now support
ev3dev on BeagleBone with [FatcatLab's EVB cape][EVB].

![EVB being hacked](/images/evb/evb-being-hacked.jpg){:.img-responsive}

Here are some things about the EVB you might like to know:

* Should work with BeagleBone [White], [Black] and [Green]. Has only been tested
  On BeagleBone Black.
* Ev3dev must be installed on a microSD card. It cannot be installed to the
  on-board eMMC because the eMMC pins are used by the EVB cape for other things.
* Auto-detection of NXT sensors does not always work correctly. This is a
  hardware limitation (missing gpio on input port pin 2).
* No I2C sensor support. This is a software issue, so could be fixed some day.
* The holes in the clear plastic cover that comes with the EVB have LEGO
  compatible spacing but do not have a LEGO compatible diameter. In other
  words, technic pins don't fit in the holes. Be prepared to get creative to
  physically attach it to your creation.

[Download] the SD card image, try it out and let us know how it goes.

[EVB]: http://fatcatlab.com/product/evb/
[White]: http://beagleboard.org/bone
[Black]: http://beagleboard.org/black
[Green]: http://beagleboard.org/green
[Download]: https://github.com/ev3dev/ev3dev/releases/tag/evb-ev3dev-jessie-2016-01-25
