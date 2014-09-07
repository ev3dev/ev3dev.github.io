---
title: EV3 USB Host Port
index: wiki
---

The [AM1808 SoC](EV3 Processor) has 1 USB 1.1 Host Port (OHCI). Unfortunately, this means that we won't get any high speed (USB 2.0) performance.

##Usage
This is the port where you plug in your wifi dongle or other devices into the EV3.

##Notes
There are some pin mux issues with the VBUS pin that need to be sorted out. lsm2012 has the VBUS pin specifed as GPIO 1,4. However, this pin is muxed for I2C0 SDA which is being used for EEPROM communications, so obviously, the GPIO is incorrect.
