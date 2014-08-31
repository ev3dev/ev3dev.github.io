---
title: EV3 Buttons
index: wiki
---

The 6 buttons on the EV3 are connected to GPIOs.

<table>
    <tr><th>Button<th>GPIO<th>Description
    <tr><td>0<td>7-5<td>Up
    <tr><td>1<td>1-13<td>Enter
    <tr><td>2<td>7-14<td>Down
    <tr><td>3<td>7-12<td>Right
    <tr><td>4<td>6-6<td>Left
    <tr><td>5<td>6-10<td>Back (ESC)
</table>

##Device Driver
We are using the existing [gpio-keys](../../ev3dev-kernel/blob/master/drivers/input/keyboard/gpio_keys.c) driver. This causes the buttons to function as regular keyboard keys. Key mapping is defined in [board-legoev3.c](../../ev3dev-kernel/blob/master/arch/arm/mach-davinci/board-legoev3.c). Currently the back key is mapped to ESC, but @dlech wonders if it might be better mapped to Backspace.
