---
title: Getting Started with ev3dev
categories: docs getting-started
---

* Table of Contents
{:toc}

So you are ready to try out ev3dev. Great!. Here are step-by-step instructions
to get ev3dev up and running on your EV3.

First, here are the things you need before starting:

* A LEGO MINDSTORMS EV3 Intelligent Brick (obviously).
* A [microSD] or [microSDHC] card. [microSDXC] is not supported (you
  might be able to get it to work, but it will operate at reduced speed).
  Cards larger than 32GB will not work!
  Also look at the [speed class rating]. Class 10 is the fastest, but
  slower speeds will work just fine. Ultra High Speed (UHS) classes are not
  supported (again, they should work, but not at the rated speed).
* A computer with an adapter for the SD card. You will need administrator user
  permissions on this computer.
* A way to communicate with the EV3. This can be one of the following:
    * USB cable (the one that comes with the EV3)
    * USB WiFi dongle
    * USB Ethernet (wired) dongle
    * Bluetooth

---

**IMPORTANT:** The instructions on this page only apply to releases dated March
2015 or later. For earlier releases (i.e. wheesy "Latest Release"), see
[Getting Started v2] on the old wiki. These older releases are no longer
supported.

---

## Step 1: Download the latest ev3dev image file

Releases are posted [on GitHub][releases]. Follow the link and download the latest
**Test Release** image file. Downloading the `.zip` file is recommended for
Windows/Mac and the `.xz` file is recommended for Linux. The `.xz` is smaller,
but it requires that you have additional software installed on Windows/Mac to
decompress it (such as [7-Zip] on Windows).

## Step 2: Copy the image on to the SD card

---

**IMPORTANT:** THIS WILL ERASE EVERYTHING ON YOUR SD CARD! BACKUP YOUR FILES
IF YOU DO NOT WANT TO LOOSE THEM!

---

There are a vast number of ways to do this, so pick the one from the list that
sounds the easiest to you:

* **Linux**
    * [Command Line](../tutorials/writing-sd-card-image-linux-command-line)
    * [Ubuntu (graphical interface)](../tutorials/writing-sd-card-image-ubuntu-disk-image-writer)
* **Mac OS X**
    * [Command Line](../tutorials/writing-sd-card-image-mac-command-line)
* **Windows**
    * [Win32DiskImager (graphical interface)](../tutorials/writing-sd-card-image-win32diskimager)

**TIP:** For more detailed information and more alternatives, check out
[this page for RaspberryPi](http://elinux.org/RPi_Easy_SD_Card_Setup). Much
of the information there is applicable to ev3dev.

## Step 3: Boot ev3dev

Put the SD Card in your EV3 and power it on. At first, you will see the
MINDSTORMS boot splash and the red LEDs will be on. This is immediately
followed by the ev3dev boot splash and the LEDs changing to orange. The left
LED indicates CPU activity and the right LED indicates disk (SD card) activity.

Shortly after the ev3dev boot splash, the screen will go blank <s>and then
eventually say `"Debian GNU/Linux 7 (wheezy)"`. Any time after the screen goes
blank, you can press any of the directional buttons (up, down, left, right)
to toggle displaying boot messages.</s> (Plymouth is currently broken, so no
boot messages for now.)

The first boot will take a little longer than subsequent boots because the EV3
has to create a unique SSH host ids and take care of a few other housekeeping
items.

When the boot is complete, the LEDs will turn green and you will see something
like this on the screen:

{% include screenshot.html source="/images/brickman/main-menu.png" %}

You will notice the number in the battery in the upper right corner. This displays the remaining voltage of the power supply. It is not possible to calculate an accurate percent value of the remaining energy, so this value is choosen. If the voltage drops below 5V the brick will turn off. All not saved data may be lost. Keep in mind, that is may take a much longer time from 8V to 6.5V than from 6.5V down to 5V!

**Troubleshooting tips if your EV3 won't boot:**

* Make sure nothing is plugged into the EV3 (USB/sensors/motors/etc.)
* Try writing the image to the SD card again.
* You may have a bad/incompatible SD card - try a different SD card.
* Check the condition of the EV3 batteries.

## Step 4: Setup a network connection

There are lots of choices here. Your choice depends on what type of connection
you want to use and on the OS of your host computer, so pick the one that applies:

* Ethernet over USB (just requires the USB cable that comes with the EV3)
    * [Connecting to the Internet](../tutorials/connecting-to-the-internet-via-usb) tutorial
* USB Ethernet dongle (as in the kind with an RJ45 connector)
    * If your network has a DHCP server, this will "just work". See (non-existent) brickman
      docs for more info.
* USB WiFi Dongle
    * Hopefully you can figure it out. I'm putting off writing detailed docs
      until brickman is a bit more stable.
* Bluetooth
    * [Connecting to the Internet](../tutorials/connecting-to-the-internet-via-bluetooth) tutorial

## Step 4.5: Make sure the firstboot script ran correctly

Recently, some users have reported problems that are related to the firstboot script not running correctly.
Please verify that the items in [this list](https://github.com/ev3dev/ev3dev/issues/267#issuecomment-73917167)
are correct. If not, leave a comment to help us figure out what is going wrong.

## Step 5: First things to do with ev3dev

Here are some suggestions of some things you should do to get your EV3 setup.

### Change your root password

The default root password is r00tme - those are zeros, not "Ohs".

    root@ev3dev:~# passwd
    Enter new UNIX password: 
    Retype new UNIX password: 
    passwd: password updated successfully

### Set up a new user

Replace `user` with your actual user name and `First Last` with your real name
(if you want it on the EV3 - you can leave it blank too). Don't miss the
command to assign groups hiding at the end.

    root@ev3dev:~# adduser user
    Adding user `user' ...
    Adding new group `user' (1001) ...
    Adding new user `user' (1001) with group `user' ...
    Creating home directory `/home/user' ...
    Copying files from `/etc/skel' ...
    Enter new UNIX password: 
    Retype new UNIX password: 
    passwd: password updated successfully
    Changing the user information for user
    Enter the new value, or press ENTER for the default
    	Full Name []: First Last
    	Room Number []:    
    	Work Phone []: 
    	Home Phone []: 
    	Other []: 
    Is the information correct? [Y/n] y
    root@ev3dev:~# usermod -a -G sudo,ev3dev,plugdev,audio,video,input,bluetooth user

### Set the time zone

    root@ev3dev:~# dpkg-reconfigure tzdata

Then just follow the instructions on the screen.

**NOTE:** The EV3 does not have a battery backup for the realtime clock.
Whenever you remove the batteries, the clock will be reset. If the EV3 is
connected to the Internet, the clock will be automatically set via NTP,
otherwise, you can manually set the date/time with the `date` command.


### Set the locale

You can skip this if en-US is OK.

    root@ev3dev:~# dpkg-reconfigure locales

### Grow your root file system

The ev3dev image is only ~900MB so that you don't have to wait so long while
writing the image to the SD card (and also so it will fit on a 1GB card). This
means that you have some unused space on your SD card that you can reclaim.
This command will expand the root file system partition to use the rest of the
free space on your SD card.

    root@ev3dev:~# lvextend --extents +100%FREE --resizefs /dev/ev3devVG/root /dev/mmcblk0p3

**IMPORTANT**: Don't wait until you get an error that your disk is full before
doing this. You need some free disk space available in order to run this command.

### Update packages

Make sure your EV3 is connected to the Internet first. 
Updating the packages for the first time will take minutes.
The duration depends on the speed class of the SD card and on the updates involved.

    root@ev3dev:~# apt-get update
    root@ev3dev:~# apt-get upgrade
    root@ev3dev:~# apt-get dist-upgrade

If a new kernel package is installed, you will need to reboot.

    root@ev3dev:~# reboot

## Step 6: Do something awesome

This will be where we tell you how to use the EV3's main functions, and how
to write programs. We are still learning, so everything here should be
considered experimental and subject to major changes.

### Using the EV3 hardware drivers

Here are some guides for using each of the major components.

* [Sensors](/docs/sensors)
* [Motors](https://github.com/ev3dev/ev3dev/wiki/Using-Motors)
* [Sound](https://github.com/ev3dev/ev3dev/wiki/Using-Sound)
* [LCD](https://github.com/ev3dev/ev3dev/wiki/Using-the-LCD)
* [Buttons](https://github.com/ev3dev/ev3dev/wiki/Using-the-Buttons)
* [LEDs](https://github.com/ev3dev/ev3dev/wiki/Using-the-LEDs)
* [Bluetooth](https://github.com/ev3dev/ev3dev/wiki/Using-Bluetooth)

### Writing programs

There are a number of programming languages available to use. The brick can
run almost all languages that any other Linux distro can, so your favorite
language is probably supported. Language bindings have already been written
for some languages:

- [Using brickstrap to cross compile and debug](https://github.com/ev3dev/ev3dev/wiki/Using-brickstrap-to-cross-compile-and-debug)
- [C++, Lua and Vala language bindings/samples](https://github.com/ev3dev/ev3dev-lang)
- [Clojure](https://github.com/annapawlicka/clj-ev3dev)
- [Google Go](https://github.com/ldmberman/GoEV3)
- [Node.js](https://github.com/WasabiFan/ev3dev-NodeJS)
- [Python](https://github.com/topikachu/python-ev3)

If the language you want isn't listed, you still can use it, but you'll have to
do more of the heavy lifting yourself using the guides above. Once you get the
hang of it, you can even write your own interface library and have it listed here!

## Step 7: Calling it a day

When you are ready to wish your EV3 goodnight, turn if off by pressing the
*back* button from the main menu in brickman or pressing and holding the *back*
button from any screen in brickman. This will open a dialog where you can select
*Power Off* to turn off the EV3.

{% include screenshot.html source="/images/brickman/shutdown-menu.png" %}

[microSD]: https://en.wikipedia.org/wiki/Secure_Digital#SD
[microSDHC]: https://en.wikipedia.org/wiki/Secure_Digital#SDHC
[microSDXC]: https://en.wikipedia.org/wiki/Secure_Digital#SDXC
[speed class rating]: https://en.wikipedia.org/wiki/Secure_Digital#Speed_class_rating
[releases]:https://github.com/mindboards/ev3dev/releases
[7-Zip]: http://www.7-zip.org/
[Getting Started v2]: https://github.com/ev3dev/ev3dev/wiki/Getting-started-v2
