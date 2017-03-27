---
title: ev3dev Linux Kernel
---

The bleeding edge upstream development for linux-davinci is hosted at
[kernel.org][nsekhar].

The ev3dev kernel was originally based on [Davinci PSP 03.22.00.02] from TI.

[nsekhar]: https://git.kernel.org/cgit/linux/kernel/git/nsekhar/linux-davinci.git
[Davinci PSP 03.22.00.02]: http://processors.wiki.ti.com/index.php/DaVinci_PSP_03.22.00.02_Release_Notes

## Kernel Drivers

Most, if not all, of the customization of the ev3dev kernel is the addition and
patching of hardware drivers for the EV3 specific hardware. TODO: add more about
the ev3dev device driver philosophy - particularly in regard to attributes.

Be sure to check out the [hardware](../index.html#hardware) pages for specifics on
how the drivers interface with the hardware.

## LMS2012 sources

Most of the EV3 specific drivers are based on the source code for the official
LEGO firmware (aka LMS2012). The following table shows the relation of ev3dev
drivers to LMS2012 drivers.

<table class="table table-striped table-bordered">
    <tr>
        <th>lms2012</th>
        <th>ev3dev</th>
        <th>Notes</th>
    </tr>
    <tr>
        <td rowspan="3"><a href="https://github.com/mindboards/ev3sources/blob/fea79c0e219cd5e43193ce2987b496e04758f3e2/lms2012/d_analog/Linuxmod_AM1808/d_analog.c">d_analog.c</a></td>
        <td markdown="span">[legoev3_analog.c]</td>
        <td>Device1 portion of d_analog.c</td>
    </tr>
    <tr>
        <td markdown="span">[legoev3_ports_in.c]</td>
        <td>Input portion of Device3</td>
    </tr>
    <tr>
        <td markdown="span">[legoev3_ports_out.c]</td>
        <td>Output portion of Device3</td>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_bt/Linuxmod_AM1808/d_bt.c">d_bt.c</a></td>
        <td markdown="span">[legoev3_bluetooth.c]</td>
        <td>
            d_bt.c Device1 is not implemented yet
            <hr>Device2 is for firmware update, so is not needed in ev3dev
            <hr>"slow clock" comes from <a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/extra/linux-03.20.00.13/arch/arm/mach-davinci/board-da850-evm.c">board-da850-evm.c</a> in the lms2012 kernel
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_iic/Linuxmod_AM1808/d_iic.c">d_iic.c</a></td>
        <td markdown="span">[legoev3_i2c.c]</td>
        <td>Using standard linux kernel i2c</td>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_power/Linuxmod_AM1808/d_power.c">d_power.c</a></td>
        <td markdown="span">[legoev3_battery.c]</td>
        <td markdown="span">ev3dev power off is done in [board-legoev3.c]</td>
    </tr>
    <tr>
        <td rowspan="2"><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_pwm/Linuxmod_AM1808/d_pwm.c">d_pwm.c</a></td>
        <td markdown="span">[legoev3_motor.c]</td>
        <td></td>
    </tr>
    <tr>
        <td markdown="span">[tacho_motor_class.c]</td>
        <td></td>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_sound/Linuxmod_AM1808/d_sound.c">d_sound.c</a></td>
        <td markdown="span">[legoev3_sound.c]</td>
        <td>Implemented as a ALSA sound driver for PCM playback and an input device for tone playback</td>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_uart/Linuxmod_AM1808/d_uart_mod.c">d_uart_mod.c</a></td>
        <td></td>
        <td>Using standard kernel drivers for the SoC UARTs. Ported <a href="https://github.com/mindboards/ev3dev-kernel/tree/master/drivers/tty/serial/omapl_pru">omapl_pru</a> from LEGO firmware for PRU UARTs.</td>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_ui/Linuxmod_AM1808/d_ui.c">d_ui.c</a></td>
        <td></td>
        <td>Using standard kernel drivers, gpio-keys for buttons and leds-gpio for LEDs</td>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_usbdev/Linuxmod_AM1808/d_usbdev.c">d_usbdev.c</a></td>
        <td></td>
        <td>Probably won't implement something like this in ev3dev<hr>Using exiting USB gadget drivers</td>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_usbhost/Linuxmod_AM1808/d_usbhost.c">d_usbhost.c</a></td>
        <td></td>
        <td>Not implementing because it does not do anything</td>
    </tr>
    <tr>
        <th colspan="3">Kernel</th>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/extra/linux-03.20.00.13/arch/arm/mach-davinci/board-da850-evm.c">board-da850-evm.c</a></td>
        <td markdown="span">[board-legoev3.c]</td>
        <td></td>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/extra/linux-03.20.00.13/arch/arm/mach-davinci/davinci-iic.c">davinci-iic.c</a></td>
        <td>[legoev3-fiq.c]</td>
        <td>lms2012 just uses this for i2c, ev3dev uses it for i2c and sound</td>
    </tr>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/extra/linux-03.20.00.13/drivers/video/st7586fb.c">st7586fb.c</a></td>
        <td markdown="span">[st7586fb.c]</td>
        <td></td>
    </tr>
</table>

## Where to find stuff

Most everything is in the [lego-linux-drivers] repository nowadays.

[legoev3_analog.c]: https://github.com/ev3dev/lego-linux-drivers/blob/ev3dev-jessie/ev3/legoev3_analog.c
[legoev3_ports_in.c]: https://github.com/ev3dev/lego-linux-drivers/blob/ev3dev-jessie/ev3/legoev3_ports_in.c
[legoev3_ports_out.c]: https://github.com/ev3dev/lego-linux-drivers/blob/ev3dev-jessie/ev3/legoev3_ports_out.c
[legoev3_bluetooth.c]: https://github.com/ev3dev/lego-linux-drivers/blob/ev3dev-jessie/ev3/legoev3_bluetooth.c
[legoev3_i2c.c]: https://github.com/ev3dev/lego-linux-drivers/blob/ev3dev-jessie/ev3/legoev3_i2c.c
[legoev3_battery.c]: https://github.com/ev3dev/lego-linux-drivers/blob/ev3dev-jessie/ev3/legoev3_battery.c
[legoev3_motor.c]: https://github.com/ev3dev/lego-linux-drivers/blob/ev3dev-jessie/ev3/legoev3_motor.c
[tacho_motor_class.c]: https://github.com/ev3dev/lego-linux-drivers/blob/ev3dev-jessie/motors/tacho_motor_class.c
[legoev3_sound.c]: https://github.com/ev3dev/lego-linux-drivers/blob/ev3dev-jessie/ev3/legoev3_sound.c
[board-legoev3.c]: https://github.com/ev3dev/ev3-kernel/blob/ev3dev-jessie/arch/arm/mach-davinci/board-legoev3.c
[legoev3-fiq.c]: https://github.com/ev3dev/ev3-kernel/blob/ev3dev-jessie/arch/arm/mach-davinci/legoev3-fiq.c
[st7586fb.c]: https://github.com/ev3dev/ev3-kernel/blob/ev3dev-jessie/drivers/video/st7586fb.c
[lego-linux-drivers]: https://github.com/ev3dev/lego-linux-drivers
