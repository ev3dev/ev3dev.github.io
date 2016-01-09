---
title: EV3 PRU
subtitle: Programmable Runtime Unit
---

The [AM1808 SoC](../ev3-processor) has 2 [Independent Programmable Realtime Unit]
(PRU) Cores.

[Independent Programmable Realtime Unit]: http://processors.wiki.ti.com/index.php/Programmable_Realtime_Unit_Subsystem

## Usage

__PRU0__: Used to provide software UART for input ports 3 and 4.

__PRU1__: Not used.

## Documentation

* [TI Soft-UART Users guide](http://processors.wiki.ti.com/index.php/Soft-UART_Implementation_on_OMAPL_PRU_-_Software_Users_Guide)

## Firmware

The PRU requires firmware to implement the UART interfaces. We are using the
firmware from LEGO (distributed in the [firmware-ev3] package).

    /lib/firmware/PRU_SUART.bin

[firmware-ev3]: https://github.com/ev3dev/firmware-ev3

## Device Driver

### Origin

The device driver originally comes from TI and was ported from LMS2012. LMS2012
had 2 copies of this driver, one in the [linux kernel source] and one in the
[LMS2012 source]. We are using the one from the kernel. The one in the LSM2012
section has been modified by LEGO to work with their d_uart.c driver.

[linux kernel source]: https://github.com/mindboards/ev3sources/tree/master/extra/linux-03.20.00.13/pru-firmware-05-31-2011-1423-v3.0
[LMS2012 source]: https://github.com/mindboards/ev3sources/tree/master/lms2012/d_uart/Linuxmod_AM1808/pru-firmware-05-31-2011-1423-v3.0

### ev3dev Implementation

Only slight modifications were made to this driver to get it to work with the
3.16 kernel. Code is [here][source code].

[source code]: https://github.com/ev3dev/ev3-kernel/tree/ev3dev-jessie/drivers/tty/serial/omapl_pru
