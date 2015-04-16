---
title: EV3 EEPROM
---

## Essentials

* Microchip 24FC128
* 16K (128K in datasheet means 128Kbit = 16Kbyte)
* Write protected (read-only)
* Data stored:
    * 0x0000-0x3567: Boot loader
    * 0x3F00: Hardware Version
    * 0x3F01: Bitwise complement of hardware version (see notes below)
    * 0x3F06-0x3F11: Bluetooth MAC address

## Documentation

* [Webite](https://www.microchip.com/wwwproducts/Devices.aspx?dDocName=en010800)
* [Datasheet (pdf)](http://ww1.microchip.com/downloads/en/DeviceDoc/21191s.pdf)

## IMPORTANT NOTE!!!!

The data read from this EEPROM will be corrupt (first byte &= 0x42) unless the on-board bluetooth has been properly initialized! The on-board bluetooth shares the same i2c bus. GPIO 5,7 is connected to the SCL line and is used by the bluetooth driver to monitor if the I2C bus is busy. If this GPIO is not set to input, then it will hold the clock line high or low.

## sysfs

### Nodes

    /sys/devices/platform/i2c_davinci.1/i2c-1/1-0050
    /sys/bus/i2c/drivers/at24/1-0050

### attribues

* `eeprom`: binary file used to read EEPROM data.
* `name`: name of the device ("24c128")

## Boot loader

If you have a serial terminal connected to Input Port 1, you will see the following message that comes from the EEPROM boot loader:

    EV3 initialization passed!
    Booting EV3 EEprom Boot Loader

            EEprom Version:   0.60
            EV3 Flashtype:    N25Q128A13B

    EV3 Booting system

    Jumping to entry point at: 0xC1080000

NOTE: You can enter firmware update mode by writing 0x5555AAAA to memory address 0xFFFF1FFA (part of the 128K on-chip ram of the AM1808 processor) and then rebooting with `reboot -d -f -i`. This reboots without properly shutting down (see `reboot --help`), so we don't want to do this in ev3dev. On the official LEGO firmware, the firmware update writes over everything so it doesn't matter if it does not shut down properly. 

## Hardware Version

The hardware version is a 16 bit unsigned integer.

It appears that version 3 did not have the hardware version in the EEPROM. The complement of the hardware version is used to check for this. (Let A = data at 0x3F00 and B = data at 0x3F01, then if A XOR B == 0xFF, then we have hardware version = A, else we have hardware version = 3).

Get hardware version:

    hexdump -e '"V0.%02X"' -s 0x3f00 -n 1 < /sys/bus/i2c/drivers/at24/1-0050/eeprom


### List of hardware versions from lms2012.h


    //  V1.00     10      10        MP      (h = home, e = education)
    //  V0.50     05      5         EP3
    //  V0.40     04      4         EP2
    //  V0.30     03      3         EP1     (FINALB)  (DEFAULT if file "HwId" not found)
    //  V0.20     02      2         FINAL


It appears that LEGO dropped the idea of having hardware version 1.00 for mass produced models and elected to use 0.60 instead.

### List of hardware versions in the wild

If your EV3 has a hardware version not on this list, please add it

* 0.60 (0x06)


## Bluetooth MAC address

NOTE: On hardware version 3, the bluetooth address starts at 0x3F00 instead of 0x3F06.

LEGO's manufacturer ID is 00:16:53, so these should always be the first 3 16-bit words. The last 3 words are unique to each individual EV3.

Get formatted bluetooth MAC address:

    hexdump -e '5/1 "%02X:" "%02X"' -s 0x3f06 -n 6 < /sys/bus/i2c/drivers/at24/1-0050/eeprom
