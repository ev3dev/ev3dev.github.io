---
title: Color LCD on the EV3
author: "@dlech"
---

I was just brought to my attention on [IRC](http://www.ev3dev.org/support/#irc) that we haven't been doing a very good job bragging on ourselves.

So, the long story is... when I first got my EV3, of course I took it apart. In the course of poking and prodding around,
I cracked the LCD screen. So I began to look for a replacement. It seems that the LCD was custom manufactured for LEGO
and there is nothing else with a 178x128 resolution. But Adafruit sells a [160x128 display](https://www.adafruit.com/products/358) that fits.

I've actually had a color LCD in one of my EV3s for almost a year now, but @rhempel just got around to modding his own
and making a nice video about it.

<iframe width="560" height="315" src="https://www.youtube.com/embed/gPNJC5Uz9HY" frameborder="0" allowfullscreen></iframe>

Points of interest:

* The color display is 160x128 pixels vs.178x128 on the one that comes with the EV3.
* The display is automatically detected and will work with no modification to the ev3dev kernel.
* The backlight pulls about 20mA, which is comparable to the LEDs on the EV3. The backlight can also be dimmed.
