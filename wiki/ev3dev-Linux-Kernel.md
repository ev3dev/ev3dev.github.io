---
title: ev3dev Linux Kernel
index: wiki
---

The ev3dev kernel is based on [Davinci PSP 03.22.00.02](http://processors.wiki.ti.com/index.php/DaVinci_PSP_03.22.00.02_Release_Notes) from TI.


The bleeding edge upstream development for linux-davinci is hosted at [kernel.org](https://git.kernel.org/cgit/linux/kernel/git/nsekhar/linux-davinci.git).

#Kernel Drivers
Most, if not all, of the customization of the ev3dev kernel is the addition and patching of hardware drivers for the EV3 specific hardware. TODO: add more about the ev3dev device driver philosophy - particularly in regard to attributes.

Be sure to check out the [hardware](ev3dev-kernel-hackers-notebook#hardware) pages for specifics on how the drivers interface with the hardware.

##LMS2012 sources
Most of the EV3 specific drivers are based on the source code for the official LEGO firmware (aka LMS2012). The following table shows the relation of ev3dev drivers to LMS2012 drivers. 

<table>
    <tr>
        <th>lms2012
        <th>ev3dev
        <th>Notes
    <tr>
        <td rowspan="3"><a href="https://github.com/mindboards/ev3sources/blob/fea79c0e219cd5e43193ce2987b496e04758f3e2/lms2012/d_analog/Linuxmod_AM1808/d_analog.c">d_analog.c</a>
        <td><a href="../../ev3dev-kernel/blob/master/drivers/legoev3/legoev3_analog.c">legoev3-analog.c</a>
        <td>Device1 portion of d_analog.c
    <tr>
        <td><a href="../../ev3dev-kernel/blob/master/drivers/legoev3/ev3_input_port.c">ev3_input_port.c</a>
        <td>Input portion of Device3
    <tr>
        <td><a href="../../ev3dev-kernel/blob/master/drivers/legoev3/ev3_output_port.c">ev3_input_port.c</a>
        <td>Output portion of Device3
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_bt/Linuxmod_AM1808/d_bt.c">d_bt.c</a>
        <td><a href="../../ev3dev-kernel/ev3dev-kernel/blob/master/drivers/legoev3/legoev3_bluetooth.c">legoev3_bluetooth.c</a>
        <td>d_bt.c Device1 is not implemented yet
            <hr>Device2 is for firmware update, so is not needed in ev3dev
            <hr>"slow clock" comes from <a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/extra/linux-03.20.00.13/arch/arm/mach-davinci/board-da850-evm.c">board-da850-evm.c</a> in the lsm2012 kernel
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_iic/Linuxmod_AM1808/d_iic.c">d_iic.c</a>
        <td><a href="../../ev3dev-kernel/blob/master/drivers/i2c/busses/i2c-legoev3.c">i2c-legoev3.c</a>
        <td>Using standard linux kernel i2c
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_power/Linuxmod_AM1808/d_power.c">d_power.c</a>
        <td><a href="../../ev3dev-kernel/blob/master/drivers/power/legoev3_battery.c">legoev3_battery.c</a>
        <td>ev3dev power off is done in <a href="../../ev3dev-kernel/blob/master/arch/arm/mach-davinci/board-legoev3.c">board-legoev3.c</a>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_pwm/Linuxmod_AM1808/d_pwm.c">d_pwm.c</a>
        <td><a href="../../ev3dev-kernel/blob/master/drivers/legoev3/ev3_tacho_motor.c">ev3_tacho_motor.c</a><br /><a href="../../ev3dev-kernel/blob/master/drivers/legoev3/tacho_motor_class.c">tacho_motor_class.c</a>
        <td>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_sound/Linuxmod_AM1808/d_sound.c">d_sound.c</a>
        <td><a href="../../ev3dev-kernel/blob/master/sound/pwm/legoev3.c">legoev3.c</a>
        <td>Implemented as a ALSA sound driver for PCM playback and an input device for tone playback
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_uart/Linuxmod_AM1808/d_uart_mod.c">d_uart_mod.c</a>
        <td>
        <td>Using standard kernel drivers for the SoC UARTs. Ported <a href=
https://github.com/mindboards/ev3dev-kernel/tree/master/drivers/tty/serial/omapl_pru">omapl_pru</a> from LEGO firmware for PRU UARTs.
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_ui/Linuxmod_AM1808/d_ui.c">d_ui.c</a>
        <td>
        <td>Using standard kernel drivers, gpio-keys for buttons and leds-gpio for LEDs
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_usbdev/Linuxmod_AM1808/d_usbdev.c">d_usbdev.c</a>
        <td>
        <td>Probably won't implement something like this in ev3dev<hr>Using exiting USB gadget drivers
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/lms2012/d_usbhost/Linuxmod_AM1808/d_usbhost.c">d_usbhost.c</a>
        <td>
        <td>Not implementing because it does not do anything
    <tr>
        <th colspan="3">Kernel
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/extra/linux-03.20.00.13/arch/arm/mach-davinci/board-da850-evm.c">board-da850-evm.c</a>
        <td><a href="../../ev3dev-kernel/blob/master/arch/arm/mach-davinci/board-legoev3.c">board-legoev3.c</a>
        <td>
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/extra/linux-03.20.00.13/arch/arm/mach-davinci/davinci-iic.c">davinci-iic.c</a>
        <td><a href="../../ev3dev-kernel/blob/master/arch/arm/mach-davinci/legoev3-fiq.c">legoev3-fiq.c</a>
        <td>lsm2012 just uses this for i2c, ev3dev uses it for i2c and sound
    <tr>
        <td><a href="https://github.com/mindboards/ev3sources/blob/7357369b6ebae4ee62001f3964f0f5fd0cce3c32/extra/linux-03.20.00.13/drivers/video/st7586fb.c">st7586fb.c</a>
        <td><a href="../../ev3dev-kernel/blob/master/drivers/video/st7586fb.c">st7586fb.c</a>
        <td>
</table>


##Where to find stuff
Drivers that implement standard kernel interfaces are located in the appropriate place in the kernel tree. Drivers that don't fit anywhere else are in ```drivers/legoev3/```.

````
$ tree -P "*legoev3*|ev3_*|nxt_*|ms_*|st7586*" -I "*.o|*.ko|*.mod.c|ms_mg.*|config|debian" --prune
.
├── arch
│   └── arm
│       └── mach-davinci
│           ├── board-legoev3.c
│           ├── board-legoev3.h
│           ├── include
│           │   └── mach
│           │       ├── legoev3-fiq.h
│           │       └── legoev3.h
│           └── legoev3-fiq.c
├── drivers
│   ├── i2c
│   │   └── busses
│   │       └── i2c-legoev3.c
│   ├── legoev3
│   │   ├── ev3_input_port.c
│   │   ├── ev3_touch_sensor.c
│   │   ├── ev3_uart_sensor.c
│   │   ├── legoev3_analog.c
│   │   ├── legoev3_bluetooth.c
│   │   ├── legoev3_ports.c
│   │   ├── legoev3_uart.c
│   │   ├── ms_light_array.c
│   │   ├── nxt_i2c_sensor.c
│   │   ├── nxt_touch_sensor.c
│   │   └── nxt_ultrasonic.c
│   ├── power
│   │   └── legoev3_battery.c
│   └── video
│       └── st7586fb.c
├── include
│   ├── linux
│   │   ├── i2c-algo-legoev3.h
│   │   ├── i2c-legoev3.h
│   │   ├── legoev3
│   │   │   ├── ev3_input_port.h
│   │   │   ├── ev3_output_port.h
│   │   │   ├── legoev3_analog.h
│   │   │   ├── legoev3_bluetooth.h
│   │   │   ├── legoev3_input_port.h
│   │   │   ├── legoev3_ports.h
│   │   │   └── nxt_i2c_sensor.h
│   │   └── power
│   │       └── legoev3_battery.h
│   ├── sound
│   │   └── legoev3.h
│   └── video
│       └── st7586fb.h
└── sound
    └── pwm
        ├── legoev3.c
        └── legoev3.h
````
