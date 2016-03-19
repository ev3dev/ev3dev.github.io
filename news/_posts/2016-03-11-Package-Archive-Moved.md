---
author: "@dlech"
---

We have moved the ev3dev.org package archives around a bit. Everything now
lives at <http://archive.ev3dev.org>. I have setup redirects from the old
location so that most people won't need to do anything.

If you like things to be correct, you can edit the `/etc/apt/sources.list`
file on your EV3.

    deb http://archive.ev3dev.org/debian jessie main
    #deb-src http://archive.ev3dev.org/debian jessie main

If you are using any ev3dev.org desktop development tools, we now have a
separate directory for Ubuntu packages. So, users of `brickstrap`, etc.
will need to update `/etc/apt/sources.list` on their development machine.

    deb http://archive.ev3dev.org/ubuntu trusty main
    #deb-src http://archive.ev3dev.org/ubuntu trusty main
