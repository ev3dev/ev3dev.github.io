---
title: Using the EV3 LEDs
group: hardware-standard
---

* Table of Contents
{:toc}


### Basics

When the EV3 is booting, the LEDs flash amber (orange). When it is finished
booting, they turn solid green. This functionality is hard-coded in the kernel
and in Brickman.

After the boot is complete, you can control the LEDs yourself. The LEDs live in
`/sys/class/leds/`.

```bash
$ ls /sys/class/leds/
ev3:left:green:ev3dev  ev3:right:green:ev3dev
ev3:left:red:ev3dev    ev3:right:red:ev3dev
```

You probably noticed that _amber_ is missing here. We will get to that in a bit.

Each LED has its own attributes for controlling it. We are using the standard
Linux LED device class, so there is a bunch of extra stuff that it not really
useful. Let's figure out what is...

```bash
$ ls /sys/class/leds/ev3:left\:green\:ev3dev
brightness  device  max_brightness  power subsystem  trigger  uevent
```

{% include /style/icon.html type="info" %}
You only have to escape the colons using the backslash (`\:`) when using a command
line shell. The actual directory name is `ev3:left:green:ev3dev`.
{: .alert .alert-info}

```bash
# turn the left green LED off
$ echo 0 > /sys/class/leds/ev3:left\:green\:ev3dev/brightness
# find out what the maximum brightness value is
$ cat /sys/class/leds/ev3:left\:green\:ev3dev/max_brightness
255
# turn the left green LED back on (255 means 100%)
$ echo 255 > /sys/class/leds/ev3:left\:green\:ev3dev/brightness
# dim the left green LED 1/2 way
$ echo 127 > /sys/class/leds/ev3:left\:green\:ev3dev/brightness
```

{% include /style/icon.html type="info" %}
You you must be a member of the `ev3dev` group (or root) to be able to control the LEDs.
{: .alert .alert-info}


### Triggers

Triggers can make the LED do interesting things.

```bash
$ cat /sys/class/leds/ev3:left\:green\:ev3dev/trigger
[none] mmc0 timer heartbeat default-on transient
legoev3-battery-charging-or-full legoev3-battery-charging legoev3-battery-full
legoev3-battery-charging-blink-full-solid rfkill0
```

* `none` means we are manually controlling the LED with `brightness` like we just did.
* `mmc0` makes the LED blink whenever there is SD card activity. This is what the
  LEDs were doing during boot.
* `timer` makes the LED blink periodically. When we change the trigger, we get
  new attributes for controlling the on and off times. Times are in milliseconds.

  ```bash
  $ echo timer > /sys/class/leds/ev3:left\:green\:ev3dev/trigger
  $ ls /sys/class/leds/ev3:left\:green\:ev3dev
  brightness  delay_on  max_brightness  subsystem  uevent
  delay_off   device    power	      trigger
  $ cat /sys/class/leds/ev3:left\:green\:ev3dev/delay_on
  500
  $ echo 1000 > /sys/class/leds/ev3:left\:green\:ev3dev/delay_on
  $ echo 2000 > /sys/class/leds/ev3:left\:green\:ev3dev/delay_off
  ```

* `heartbeat` makes the LED blink at a rate proportional to CPU usage.
* `default-on` works just like `none` except that it turns the LED on instead of
   off when the trigger is set.
* `legoev3-battery-*` are not useful. The batteries (including the rechargeable
  battery pack) do not have a way of telling the EV3 what is going on, so it is
  assumed that the batteries are always discharging. Therefore these triggers
  will always turn the LED off.
* `rfkill0` is the RF (radio frequency) kill switch for the built-in Bluetooth.
  It should make the LED indicate if the built-in Bluetooth is turned on or not.


### What about amber/orange?

To make the LED amber, we just have to turn on both the red and green LEDs at the same time. 

```bash
# make left LED illuminate amber
$ echo 255 > /sys/class/leds/ev3:left\:green\:ev3dev/brightness; echo 255 > /sys/class/leds/ev3:left\:red\:ev3dev/brightness
# turn off left LED
$ echo 0 > /sys/class/leds/ev3:left\:green\:ev3dev/brightness; echo 0 > /sys/class/leds/ev3:left\:red\:ev3dev/brightness
```

How does red + green make amber? If you open up your favorite paint program that
has a color chooser where you can adjust the individual red, green and blue values,
we can see what is going on. Make sure blue is on zero, then change red and green
both to their maximum values. You get yellow. On the EV3, the red LED is a bit
stronger than than the green LED, so both LEDs at max brightness appears orange
(which we are calling amber just because it is "supposed" to be sort of yellow-ish).
In your paint program, if you leave red at the maximum value and start decreasing
green, the color will start to turn orange and then red. So, playing around with
the `brightness` values a bit, we can actually get orange and yellow.

```bash
# make the left LED really orange
$ echo 180 > /sys/class/leds/ev3:left\:green\:ev3dev/brightness; echo 255 > /sys/class/leds/ev3:left\:red\:ev3dev/brightness
# make the left LED yellow (this shows us how much stronger the red led is!)
$ echo 255 > /sys/class/leds/ev3:left\:green\:ev3dev/brightness; echo 25 > /sys/class/leds/ev3:left\:red\:ev3dev/brightness
```
