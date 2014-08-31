---
title: EV3 SPI
index: wiki
---

The [AM1808 SoC](EV3 Processor) has 2 hardware [Serial Peripheral Interface Bus](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus) controllers (SPIs).

Note: CS stands for Chip Select, which allows more than one device to be connected to a bus.

##Usage
__SPI0__:

* __CS0__: NAND Flash (Not implemented in ev3dev)
* __CS3__: [Analog/Digital converter](EV3 A|D Converter)

__SPI1__: (chip select not used)

* [LCD controller](EV3 LCD)


