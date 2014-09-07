---
title: Using the LEDs
index: wiki
---

NOTE: You currently have to be root to use the LEDs.

### Basics
When the EV3 is booting, the LEDs flash amber. When it is finished booting, they turn solid green.

The LEDs live in ```/sys/class/leds```.

```sh
root@ev3dev:~# cd /sys/class/leds
root@ev3dev:/sys/class/leds# ls
ev3:green:left  ev3:green:right  ev3:red:left  ev3:red:right
```

You probably noticed that _amber_ is missing here. We will get to that in a bit.

Each LED has it's own attributes for controlling it. We are using the standard linux LED device class, so there is a bunch of extra stuff that it not really useful. Let's figure out what is...

```sh
root@ev3dev:/sys/class/leds# cd ev3\:green\:left
root@ev3dev:/sys/class/leds/ev3:green:left# ls
brightness  device  max_brightness  subsystem  trigger  uevent
```

We can't control brightness, so ignore ```max_brightness``` and treat brightness like an on/off switch. Let's turn the LED off and back on.

```sh
root@ev3dev:/sys/class/leds/ev3:green:left# echo 0 > brightness
root@ev3dev:/sys/class/leds/ev3:green:left# echo 1 > brightness
```

### Triggers
Triggers can make the LED do interesting things.

```sh
root@ev3dev:/sys/class/leds/ev3:green:left# cat trigger
[none] mmc0 timer heartbeat default-on legoev3-battery-charging-or-full legoev3-battery-charging
legoev3-battery-full legoev3-battery-charging-blink-full-solid
```

- ```none``` means we are manually controlling the LED with ```brightness``` like we just did.
- ```mmc0``` makes the LED blink whenever there is SD card activity. This is what the right LED was doing during boot.
- ```timer``` makes the LED blink. When we change the trigger, we get new attributes for controlling the on and off times. Times are in milliseconds.

    ```sh
    root@ev3dev:/sys/class/leds/ev3:green:left# echo timer > trigger
    root@ev3dev:/sys/class/leds/ev3:green:left# ls
    brightness  delay_on  max_brightness  trigger
    delay_off   device    subsystem       uevent
    root@ev3dev:/sys/class/leds/ev3:green:left# cat delay_on
    500
    root@ev3dev:/sys/class/leds/ev3:green:left# echo 1000 > delay_on
    root@ev3dev:/sys/class/leds/ev3:green:left# echo 2000 > delay_off
    ```

- ```heartbeat``` makes the LED blink at a rate proportional to CPU usage. This is what the left LED was doing during boot.
- ```default-on``` works just like ```none``` except that it turns the LED on when the trigger is set.
- ```legoev3-battery-*``` are not useful. The batteries (including the rechargeable battery pack) do not have a way of telling the EV3 what is going on, so it is assumed that the batteries are always discharging. Therefore these triggers will always turn the LED off.

### What about Amber?
To make the LED amber, we just have to turn on both the red and green LEDs at the same time.

```sh
root@ev3dev:/sys/class/leds/ev3:green:left# cd ..
root@ev3dev:/sys/class/leds# echo 1 > ev3\:green\:left/brightness; echo 1 > ev3\:red\:left/brightness
root@ev3dev:/sys/class/leds# echo 0 > ev3\:green\:left/brightness; echo 0 > ev3\:red\:left/brightness
```

Here is a fun trick. This makes the left LED cycle through each color (green-amber-red-off) every 500 msec.

```sh
root@ev3dev:/sys/class/leds# echo timer > ev3\:green\:left/trigger; \
echo 1000 > ev3\:green\:left/delay_on; \
echo 1000 > ev3\:green\:left/delay_off; \
sleep 1.5; \
echo timer > ev3\:red\:left/trigger; \
echo 1000 > ev3\:red\:left/delay_on; \
echo 1000 > ev3\:red\:left/delay_off
```
