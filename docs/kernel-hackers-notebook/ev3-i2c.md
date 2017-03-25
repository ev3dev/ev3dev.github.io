---
title: EV3 I2C
---

The [AM1808 SoC](../ev3-processor) has 2 hardware [Inter-Integrated Circuit][i2c]
(I2C) controllers. Additionally, there are 4 software controllers implemented using
[fast interrupts](../ev3-fiq) (FIQs).

## Usage

__I2C0__: [Boot EEPROM](../ev3-eeprom) at 400kHz

__I2C1__: Not used/connected

__[FIQ](../ev3-fiq) I2C__: Input ports 1-4 at 10kHz

## Device Drivers

The Linux kernel has a well established [framework for I2C drivers].

The SoC I2C uses the existing driver at [drivers/i2c/busses/i2c-davinci.c] as a backend.

Since there are not enough I2C controllers on the SoC, LEGO chose to implement
the I2C buses for the four input ports using GPIOs. A secondary reason for this
is that the NXT Ultrasonic sensors does not work well with standard I2C masters.
It requires an extra clock pulse between the stop and the next start. (TODO: add
references here.)

This Linux kernel has an existing GPIO i2c driver, but in order to get the
performance needed, we have to use [fast interrupts](../ev3-fiq) (FIQs). (Be sure
to follow the link for some interesting reading.) So, the really low level stuff
is done in [arch/arm/mach-davinci/legoev3-fiq.c] and the rest is in
[drivers/i2c/busses/i2c-legoev3.c].

## I2C Addressing

See [I2C Sensor Addressing](http://docs.ev3dev.org/projects/lego-linux-drivers/en/ev3dev-jessie/i2c.html#addressing).

[i2c]: https://en.wikipedia.org/wiki/I2c
[framework for I2C drivers]: https://www.kernel.org/doc/Documentation/i2c/
[drivers/i2c/busses/i2c-davinci.c]: https://github.com/ev3dev/ev3-kernel/blob/ev3dev-jessie/drivers/i2c/busses/i2c-davinci.c
[arch/arm/mach-davinci/legoev3-fiq.c]: https://github.com/ev3dev/ev3-kernel/blob/ev3dev-jessie/arch/arm/mach-davinci/legoev3-fiq.c
[drivers/i2c/busses/i2c-legoev3.c]: https://github.com/ev3dev/lego-linux-drivers/blob/master/ev3/legoev3_i2c.c
