---
title: EV3 PRU
index: wiki
---

The [AM1808 SoC](EV3 Processor) has 2 [Independent Programmable Realtime
Unit](http://processors.wiki.ti.com/index.php/Programmable_Realtime_Unit_Subsystem) (PRU) Cores.

## Usage
__PRU0__: Used to provide software UART for input ports 3 and 4.

__PRU1__: Not used.

## Documentation
* [TI Soft-UART Users guide](http://processors.wiki.ti.com/index.php/Soft-UART_Implementation_on_OMAPL_PRU_-_Software_Users_Guide)

## Firmware
The PRU requires firmware to implement the UART interfaces. We are using the firmware from LEGO (distributed in the [ev3dev-uart](Package-ev3dev-uart) package).

    /lib/firmware/PRU_SUART.bin

## Device Driver
### Origin
The device driver originally comes from TI and was ported from LMS2012. LMS2012 had 2 copies of this driver, one in the [linux kernel source](https://github.com/mindboards/ev3sources/tree/master/extra/linux-03.20.00.13/pru-firmware-05-31-2011-1423-v3.0) and one in the [LMS2012 source](https://github.com/mindboards/ev3sources/tree/master/lms2012/d_uart/Linuxmod_AM1808/pru-firmware-05-31-2011-1423-v3.0). We are using the one from the kernel. The one in the LSM2012 section has been modified by LEGO to work with their d_uart.c driver.

### ev3dev Implementation
Only slight modifications were made to this driver to get it to work with the 3.3.0 kernel. Code is [here](../ev3dev-kernel/tree/uart-sensors/drivers/tty/serial/omapl_pru).
