---
title: EV3 Buttons
---

The 6 buttons on the EV3 are connected to GPIOs.

<table class="table table-striped table-bordered">
    <tr>
        <th>Button</th>
        <th>GPIO</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>0</td>
        <td>7-5</td>
        <td>Up</td>
    </tr>
    <tr>
        <td>1</td>
        <td>1-13</td>
        <td>Enter</td>
    </tr>
    <tr>
        <td>2</td>
        <td>7-14</td>
        <td>Down</td>
    </tr>
    <tr>
        <td>3</td>
        <td>7-12</td>
        <td>Right</td>
    </tr>
    <tr>
        <td>4</td>
        <td>6-6</td>
        <td>Left</td>
    </tr>
    <tr>
        <td>5</td>
        <td>6-10</td>
        <td>Backspace</td>
    </tr>
</table>

## Device Driver

We are using the existing [gpio-keys](https://github.com/ev3dev/ev3dev-kernel/blob/master/drivers/input/keyboard/gpio_keys.c) driver. This causes the buttons to function as regular keyboard keys. Key mapping is defined in [board-legoev3.c](https://github.com/ev3dev/ev3dev-kernel/blob/master/arch/arm/mach-davinci/board-legoev3.c).