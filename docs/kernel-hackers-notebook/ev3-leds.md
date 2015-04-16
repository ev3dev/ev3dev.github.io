---
title: EV3 LEDs
---

The 2 LEDs on the EV3 are connected via GPIOs (2 each). Each LED has 3 colors: red, amber and green. Turning on a single GPIO will change the LED to red or green. Turning on both GPIOs will change the LED to amber (orange).

<table>
    <tr>
        <th>LED</th>
        <th>GPIO</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>0</td>
        <td>6-13</td>
        <td>Left, Red</td>
    </tr>
    <tr>
        <td>1</td>
        <td>6-7</td>
        <td>Left, Green</td>
    </tr>
    <tr>
        <td>2</td>
        <td>6-14</td>
        <td>Right, Green</td>
    </tr>
    <tr>
        <td>3</td>
        <td>6-12</td>
        <td>Right, Red</td>
    </tr>
</table>

## Device Driver

We are using the [pwm-gpio] and [leds-pwm] drivers to be able to control the LEDs. This provides a [standard interface] for using the LEDs. The LED devices are defined in [board-legoev3.c].

[pwm-gpio]: https://github.com/ev3dev/ev3dev-kernel/blob/ev3dev-jessie/drivers/pwm/pwm-gpio.c
[leds-pwm]: https://github.com/ev3dev/ev3dev-kernel/blob/ev3dev-jessie/drivers/leds/leds-pwm.c
[standard interface]: https://www.kernel.org/doc/Documentation/leds/leds-class.txt
[board-legoev3.c]: https://github.com/ev3dev/ev3dev-kernel/blob/ev3dev-jessie/arch/arm/mach-davinci/board-legoev3.c