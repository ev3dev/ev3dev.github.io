---
title: Examples Using EV3DEV
index: wiki
---

Here you can find examples, how to use the EV3DEV kernel drivers. The examples are using only `echo` and `cat` from the command line, but it is possible to write and read the same files with other programming languages. Before you can start, boot from SD card, open an SSH connection, and login. If you do not have an SSH connection already, go back to [Home](Home) how to do this. 

## Turning On LEDs
The following example shows, how to turn on the right green LED. In the same way you can use all LEDs (left green, right green, left red, right red). You can see an orange LED, if the red and green LED has been turned on at the same side.

### Deactivate LED Trigger
Before using the LED it is necessary to deactivate the LED trigger (for heartbeat, ...), e.g. you can deactivate the trigger for the right green LED with
```
echo none > /sys/class/leds/ev3\:green\:right/trigger
```
This can be verified with
```
cat /sys/class/leds/ev3\:green\:right/trigger
```

### Turning LED On and Off
Turn on the right green LED:
```
echo 1 > /sys/class/leds/ev3\:green\:right/brightness
```
Turn off the right green LED:
```
echo 0 > /sys/class/leds/ev3\:green\:right/brightness
```
