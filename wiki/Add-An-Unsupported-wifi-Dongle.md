---
title: Add An Unsupported wifi Dongle
index: wiki
---

### How To Do It

In many cases, you can just plug in your USB wifi dongle and it will "Just Work (tm)" - but sometimes, it just won't. Here's how to get that off brand dongle you bought on DealExtreme to work.

### Don't repeat the past

First, search [issues](https://github.com/ev3dev/ev3dev/issues?q=+label%3AWi-fi+) to see if anyone has discussed this adapter before.

### Figure out the USB pid/vid

Use the `lsusb` command to dump the current USB device list. For my TPLINK TL-WN725N device, it looks like this:

```clean
Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
Bus 001 Device 005: ID 0bda:8179 Realtek Semiconductor Corp.
```

So, good news, the TL-WN725N uses a Realtek chipset, but which one?

### Figure out the chipset details

Head on over to the [Wikidevi site](http://wikidevi.com/wiki/Main_Page), then paste `0bda:8179` into the search window and you'll get some hits for that pid/vid combination.

A bit of reading and you'll find that it uses the Realtek RTL8188EUS chipset - and you can get drivers for it, but only for the Raspberry Pi.

Some chipsets already have mainline kernel drivers. If this is the case, but the driver is not loading on your EV3, we may not have it enabled the driver in the kernel configuration. Open an [issue](https://github.com/ev3dev/ev3dev/issues) and we'll turn it on and see if it works.

For chipsets that don't have a mainline driver or in the case that the mainline driver doesn't work (like rtl8192cu) the we need to find a 3rd party driver that works. Often, the manufacturer will have one on their website if they are Linux-friendly.

If you find a 3rd party driver that works (as in you followed the instructions and compiled it and tested it for more than 5 minutes), then we need to package it up like [rtl8188eu](https://github.com/ev3dev/rtl8188eu) or [rtl8192cu](https://github.com/ev3dev/rtl8192cu-fixes). Then we can build it and release it every time we release a kernel so you don't have to.
