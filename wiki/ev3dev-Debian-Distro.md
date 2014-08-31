---
title: ev3dev Debian Distro
index: wiki
---

ev3dev is a customized version of the [Embedded Debian](http://www.emdebian.org/) project using the [Grip packages](http://www.emdebian.org/grip/index.html).

##The ev3dev Package Repository
We have our own package repo to distribute the kernel and kernel modules and other packages that are patched to work on the EV3.

In future versions, you should not have to manually set this up, but for now, here are the steps:

* Save the following to ```/etc/apt/sources.list.d/ev3dev.list```.

        deb http://ppa.lechnology.com/ev3dev wheezy main
        deb-src http://ppa.lechnology.com/ev3dev wheezy main

* Then...

        sudo apt-key adv --fetch-keys http://ppa.lechnology.com/gpg.key
        sudo apt-get update



