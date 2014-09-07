---
title: Using the ev3dev_ui.ko module
index: wiki
---

The EV3 modules that we are distributing all use a "mechanisms, not policy" design paradigm. All the module interaction is done though the `/sys/devices/platform/ev3dev` filesystem on Linux.

Rather than copy the data format that the official LEGO drivers use for the LEDs, the ev3dev_ui module makes use of standard human-readable files to control the LEDs and to read the buttons.

If your language of choice (yes, even the bash/dash shell) supports reading and writing to files, then it can be used to program a robot. You may want to write wrapper functions so that your robot control source is not cluttered with filenames.

Here is the sample code to make the left and right LEDs flash alternately:

`echo 1 > /sys/devices/platform/ev3dev/ui/ledleft0`   Make the left LED green when the pattern is 0
`echo 0 > /sys/devices/platform/ev3dev/ui/ledleft1`   Make the left LED off when the pattern is 1
`echo 0 > /sys/devices/platform/ev3dev/ui/ledright0`  Make the right LED off when the pattern is 0
`echo 2 > /sys/devices/platform/ev3dev/ui/ledright1`  Make the right LED red when the pattern is 1

And finally, set the pattern to 100ms '0' and 100ms '1'

`echo "0011" > /sys/devices/platform/ev3dev/ui/pattern
/proc/ev3dev_ui` Flashes left red and right red LEDs alternately
`echo -n -e \\x10\\x42 > /proc/ev3dev_ui` Flashes left green and right red LEDs alternately
`echo -n -e \\x10\\x66 > /proc/ev3dev_ui` Flashes both LEDs read and green alternately
`echo -n -e \\x00\\x00 > /proc/ev3dev_ui` Turns off the annoying flashing LEDs!

I'm sure you can figure out how to turn on the LEDs in any of the built in languages on the EV3, including bash/dash, awk, guile, lua, perl, and even python!

Here is the documentation for the ev3dev_ui.ko driver, straight from the code.

```
/*
 *  LED DRIVER OPERATION
 *  -------------------
 *
 *  The following files control the operation of the ev3dev_ui LED driver
 *
 *  /sys/devices/platform/ev3dev/ui/ledleft0
 *  /sys/devices/platform/ev3dev/ui/ledleft1
 *  /sys/devices/platform/ev3dev/ui/ledright0
 *  /sys/devices/platform/ev3dev/ui/ledright1
 *  /sys/devices/platform/ev3dev/ui/pattern
 *
 *  Let's take a step back and go over the LED operation on the EV3 hardware.
 *
 *  There are two LEDs on either side of the front panel button cluster, we'll
 *  call them ledleft and ledright. Each of these LEDs can take on one of the
 *  four following colours:
 *
 *  0 - black
 *  1 - green
 *  2 - red
 *  3 - orange
 *
 *  The flashing pattern of the LEDs is controlled by a pattern of up
 *  to 20 1's and 0's and each step in the pattern takes 50 msec, or 20 times
 *  per second. Therefore, you can specify an arbitrary flash pattern up
 *  to one second in length.
 * 
 *  You can probably figure out where this is headed. When the pattern bit
 *  is a '0' character, the left and right LEDs take on the colour in the
 *  leftled0 or rightled0 file respectively. Similarly, when the pattern bit
 *  is a '1' character, the left and right LEDs take on the colour in the
 *  rightled1 or righttled1 file.
 * 
 *  So, for an example, if you want to flash the left and right LEDs
 *  alternately red and green for 100 msec each time, that looks like this
 *  in the shell - it's trivial to do this in a real programming language.
 *
 *  echo "0" > /sys/devices/platform/ev3dev/ui/ledleft0
 *  echo "2" > /sys/devices/platform/ev3dev/ui/ledleft1
 *  echo "1" > /sys/devices/platform/ev3dev/ui/ledright0
 *  echo "0" > /sys/devices/platform/ev3dev/ui/ledright1
 *
 *  echo "0011" > /sys/devices/platform/ev3dev/ui/ledright1
 *  
 *  That's all there is to the ev3dev_ui LED driver!
 *  
 *  BUTTON DRIVER OPERATION
 *  -----------------------
 *
 *  The following files control the operation of the ev3dev_ui Button driver
 *
 *  /sys/devices/platform/ev3dev/ui/buttonesc
 *  /sys/devices/platform/ev3dev/ui/buttonleft
 *  /sys/devices/platform/ev3dev/ui/buttonright
 *  /sys/devices/platform/ev3dev/ui/buttonup
 *  /sys/devices/platform/ev3dev/ui/buttondown
 *  /sys/devices/platform/ev3dev/ui/buttonenter
 *
 *  These files hold the current state of the individual buttons. Simply read
 *  the file to get the button state. A '1' means the button is pressed, while
 *  a '0' means the button is not pressed.
 *
 *  /sys/devices/platform/ev3dev/ui/buttons
 *
 *  This file holds the current state of all the buttons at one. Read the file
 *  to return a string of '1' and '0' characters that represent the switch
 *  state  in this order
 *
 *  0  UP
 *  1  ENTER
 *  2  DOWN
 *  3  RIGHT
 *  4  LEFT
 *  5  BACK
 *
 *  Reading the files from the shell looks like this, it's trivial to do in a
 *  real programming language.
 *
 *  cat /sys/devices/platform/ev3dev/ui/buttons
 *
 *  If the result is "001010" it means the DOWN and LEFT buttons are pressed
 */
```

Neat!
