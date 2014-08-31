---
title: EV3 SD Card Reader
index: wiki
---

The [AM1808 SoC](EV3 Processor) has 2 hardware MMC/SD card reader controllers.

##Usage
__MMCSD0__: On board SD Card reader

__MMCSD1__: Not used/connected

##Notes
* There are GPIO pin mux issues that need to be sorted out. lms2012 has the read/write pin (WP) and the card detect pin (CD) disabled, so currently so does ev3dev. CD doesn't matter too much since ev3dev runs off of the SD card and if it is removed, we crash. WP is not really useful either becuase ev3dev need write access to the SD card in order to work. However, it would not be nice to write to an SD card that someone thought they had protected.

    The lsm2012 code shows WP as GPIO 4,1 which is also used for "bluetooth shutdown" and CD as GPIO 4,2 which is muxed for MMCSD0 DAT3. 

* In the lsm2012 code, it appears that in the development stages LEGO tried using a combination wifi/bluetooth controller that uses the MMCSD1 interface, but this was not included in the production hardware.
