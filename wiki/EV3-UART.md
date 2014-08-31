---
title: EV3 UART
index: wiki
---

The [AM1808 SoC](EV3 Processor) has 3 hardware [UART](https://en.wikipedia.org/wiki/Universal_asynchronous_receiver/transmitter) controllers. We are also using the [PRU](EV3 PRU) to provide 2 additional software UARTs.

##Usage

Port | Use
-----|----
__UART0__ | Input port 2 UART sensors.
__UART1__ | Input port 1 UART sensors. Also debugging terminal (starts at boot).
__UART2__ | Bluetooth.
__PRU0/SUART0__ | Input port 4 UART sensors.
__PRU0/SUART1__ | Input port 3 UART sensors.


## Device Drivers
See the [PRU](EV3 PRU) page for info on the PRU UART drivers.

The SoC UARTs are standard UARTs and therefore use the [8250](../../ev3dev-kernel/tree/uart-sensors/drivers/tty/serial/8250) driver. Both types of UARTs (SoC and PRU) of course implement the [tty](../../ev3dev-kernel/tree/uart-sensors/drivers/tty) device class. The interesting part is the LEGOEV3 [line discipline](../../ev3dev-kernel/blob/uart-sensors/Documentation/serial/tty.txt) that runs on top of the tty driver.

### LEGOEV3 Line Discipline
Source: [uart-sensors/drivers/legoev3/legoev3_uart.c](../../ev3dev-kernel/blob/uart-sensors/drivers/legoev3/legoev3_uart.c)

There are udev rules in place ([/lib/udev/rules.d/ev3dev-uart.rules](../../ev3dev-base/blob/master/debian/ev3dev-uart.udev) in conjunction with [/lib/ev3dev/uart.sh](../..//ev3dev-base/blob/master/usr/lib/ev3dev/uart.sh)) that attach the line discipline to a tty (serial port) when a UART sensor is detected on a given input port. When the sensor is removed, the line discipline is detached (process killed). 
