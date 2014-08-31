---
title: Frequently Asked Questions
index: wiki
---

<br/>

**Does ev3dev replace the firmware on my EV3 programmable brick?**

No. ev3dev runs completely off of a SD card, leaving the existing firmware intact. To restore the original functionality of your brick, just power it off and remove the SD card containing ev3dev. When you turn it back on, it will boot using the existing firmware.

**How do I use the serial console on input port 1?**

TODO: this probably deserves its own page.

First, you need a USB/Serial adapter. The EV3 uses 3.3V logic, so pay attention and don't get one with 5V logic levels. Xander has a nice [blog post](http://botbench.com/blog/2013/08/05/mindsensors-ev3-usb-console-adapter/) with more details including how you can make your own cable.

By default, the serial console on input port 1 is mostly disabled so that it can be used by sensors. If you have a serial adapter hook up during boot, you will see the kernel boot messages up until init runs, then some weird unicode characters. This is the the senor driver detecting the adapter as an I2C sensor.

So, the first thing we need to do is tell the sensor drivers not to use input port 1. Edit `/etc/modprobe.d/ev3dev-ports.conf` and follow the instructions.

There are a couple useful things you can do with the serial console, so you need to edit one or two more files depending on what you want to accomplish.

1. You can print kernel messages to the serial console. This is useful for debugging drivers. You can see the same information using `dmesg`, so this is really only useful for serious kernel hacking when you cause kernel panics and such. Anyway, to enable kernel messages on the serial console, edit `/etc/sysctl.d/ev3dev.conf` and follow the instructions.

2. You can log in via the serial console. This is useful for troubleshooting network connection issues. To enable logging on via the serial console you have to do something different depending on whether you are using wheezy or jessie. In wheezy, edit `/etc/inittab` and follow the instructions at the very end of the file. In jessie, run the command `systemctl unmask serial-getty@ttyS1.service` to enable login and `systemctl mask serial-getty@ttyS1.service` to disable login.

After you have edited these files, you will need to reboot for these changes to take effect.
