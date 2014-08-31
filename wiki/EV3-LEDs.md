---
title: EV3 LEDs
index: wiki
---

The 2 LEDs on the EV3 are connected via GPIOs (2 each). Each LED has 3 colors: red, amber and green. Turning on a single GPIO will change the LED to red or green. Turning on both GPIOs will change the LED to amber.

<table>
    <tr><th>LED<th>GPIO<th>Description
    <tr><td>0<td>6-12<td>Right, Red
    <tr><td>1<td>6-14<td>Right, Green
    <tr><td>2<td>6-13<td>Left, Red
    <tr><td>3<td>6-7<td>Left, Green
</table>

##Device Driver
We are using the existing [leds-gpio](../../ev3dev-kernel/blob/master/drivers/leds/leds-gpio.c) driver. This provides a [standard interface](https://www.kernel.org/doc/Documentation/leds/leds-class.txt) for using the LEDs. The LED devices are defined in [board-legoev3.c](../../ev3dev-kernel/blob/master/arch/arm/mach-davinci/board-legoev3.c).
