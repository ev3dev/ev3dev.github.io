---
title: EV3 UART
---

The [AM1808 SoC](../ev3-processor) has 3 hardware [UART] controllers. We are
also using the [PRU](../ev3-pru) to provide 2 additional software UARTs.

## Usage

Port | Use
-----|----
__UART0__ | Input port 2 UART sensors.
__UART1__ | Input port 1 UART sensors. Also debugging terminal (starts at boot).
__UART2__ | Bluetooth.
__PRU0/SUART0__ | Input port 4 UART sensors.
__PRU0/SUART1__ | Input port 3 UART sensors.


## Device Drivers

See the [PRU](../ev3-pru) page for info on the PRU UART drivers.

The SoC UARTs are standard UARTs and therefore use the
[8250](https://github.com/ev3dev/ev3-kernel/tree/ev3dev-jessie/drivers/tty/serial/8250)
driver. Both types of UARTs (SoC and PRU) of course implement the
[tty](https://github.com/ev3dev/ev3-kernel/tree/ev3dev-jessie/drivers/tty)
device class. The interesting part is the LEGOEV3 [line discipline] that runs
on top of the tty driver.

### LEGOEV3 Line Discipline
Source: [ev3_uart_sensor_ld.c](https://github.com/ev3dev/lego-linux-drivers/blob/ev3dev-jessie/sensors/ev3_uart_sensor_ld.c)

There are udev rules in place ([ev3.rules] in conjunction with [ev3-uart@.service])
that attach the line discipline to a tty (serial port) when a UART sensor is
detected on a given input port. When the sensor is removed, the line discipline
is detached (process killed).

[UART]: https://en.wikipedia.org/wiki/Universal_asynchronous_receiver/transmitter
[line discipline]: https://www.kernel.org/doc/Documentation/serial/tty.txt
[ev3.rules]: https://github.com/ev3dev/ev3-systemd/blob/ev3dev-jessie/debian/ev3.udev#L19
[ev3-uart@.service]: https://github.com/ev3dev/ev3-systemd/blob/ev3dev-jessie/systemd/ev3-uart%40.service
