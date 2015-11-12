---
title: Getting Started with ev3dev
categories: docs getting-started
---

* Table of Contents
{:toc}

So you are ready to try out ev3dev. Great!. Here are step-by-step instructions
to get ev3dev up and running on your EV3 or Raspberry Pi.

First, here are the things you need before starting:

* A LEGO MINDSTORMS EV3 Intelligent Brick or Raspberry Pi (any model).
* A [microSD] or [microSDHC] card (2GB or larger). [microSDXC] is not supported
  on the EV3. **All cards larger than 32GB will not work with the EV3!**
* A computer with an adapter for the SD card. You will need administrator user
  permissions on this computer.
* A way to communicate. For the EV3, this can be one of the following:
    * USB cable (the one that comes with the EV3)
    * USB WiFi dongle
    * USB Ethernet (wired) dongle
    * Bluetooth
  For Raspberry Pi you will need to use the wired Ethernet connection first.

<div class="alert alert-warning">
    <span class="glyphicon glyphicon-alert"></span>
    The instructions on this page only apply to releases dated September
2015 or later. Older releases are no longer supported.
</div>

## Step 1: Download the latest ev3dev image file

Releases are posted [on GitHub][releases]. Follow the link and download the latest
**Test Release** image file for your hardware. Releases for LEGO MINDSTORMS EV3
start with `ev3-`, Raspberry Pi starts with `rpi-` and Raspberry Pi 2 starts
with `rpi2-`.

Downloading the `.zip` file is recommended for
Windows/Mac and the `.xz` file is recommended for Linux. The `.xz` is smaller,
but it requires that you have additional software installed on Windows/Mac to
decompress it (such as [7-Zip] on Windows).

## Step 2: Copy the image on to the SD card

<div class="alert alert-danger">
    <span class="glyphicon glyphicon-exclamation-sign"></span>
    This will erase everything on your SD card! Backup your files
    If you do not want to lose them!
</div>

There are a vast number of ways to do this, so pick the one from the list that
sounds the easiest to you:

* **Linux**
    * [Command Line](../tutorials/writing-sd-card-image-linux-command-line)
    * [Ubuntu (graphical interface)](../tutorials/writing-sd-card-image-ubuntu-disk-image-writer)
* **Mac OS X**
    * [Command Line](../tutorials/writing-sd-card-image-mac-command-line)
* **Windows**
    * [Win32DiskImager (graphical interface)](../tutorials/writing-sd-card-image-win32diskimager)

<br/>

<div class="alert alert-info">
    <span class="glyphicon glyphicon-info-sign"></span>
    For more detailed information and more alternatives, check out
   <a class="alert-link" href="http://elinux.org/RPi_Easy_SD_Card_Setup">this page for RaspberryPi</a>. Much
of the information there is applicable to ev3dev.
</div>

{% include inline-screenshot.html source="/images/brickman/main-menu.png" caption="When the boot is complete, the LEDs will turn green and you will see something like this on the screen" %}

## Step 3: Boot ev3dev

Put the SD Card in your EV3 and power it on. At first, you will see the
MINDSTORMS boot splash and the red LEDs will be on. This is immediately
followed by the ev3dev boot splash and the LEDs changing to orange. The
LEDs indicate disk (SD card) activity.

Note: If you are using Raspberry Pi hardware without a screen, just wait for
the Activity LED to stop flashing, then go to the next step.

After one or two minutes, the screen will go blank. This happens on the first boot
only. The first boot takes a little longer than subsequent boots because the EV3
has to create a unique SSH host ids and take care of a few other housekeeping
items. After another minute or two, you will see the *brickman loading...* screen.


You will notice the number in the battery in the upper right corner. This
displays the remaining voltage of the power supply. It is not possible to
calculate an accurate percent value of the remaining energy, so this value is
chosen. If the voltage drops below 5V the brick will turn off. All not saved
data may be lost. Keep in mind, that is may take a much longer time from 8V to
6.5V than from 6.5V down to 5V!

<div class="panel panel-info">
    <div class="panel-heading">
        Troubleshooting tips if your EV3 won't boot
    </div>
    <div class="panel-body">
        <ul>
            <li>Make sure nothing is plugged into the EV3 (USB/sensors/motors/etc.)</li>
            <li>Try writing the image to the SD card again.</li>
            <li>You may have a bad/incompatible SD card - try a different SD card.</li>
            <li>Check the condition of the EV3 batteries.</li>
        </ul>
    </div>
</div>

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
    * Note: Bluetooth may not work on the first boot. Please reboot if you see "???"
       after you power on Bluetooth.
    * [Connecting to the Internet](../tutorials/connecting-to-the-internet-via-bluetooth) tutorial

**Note:** For Raspberry Pi you must use the wired Ethernet port to connect for the
first time. The default host name is `ev3dev-rpi` or `ev3dev-rpi2` depending
on which model you have. You can setup additional connections using the
`connmanctl` command.

## Step 5: First things to do with ev3dev

Here are some suggestions of some things you should do to get ev3dev setup.

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
    root@ev3dev:~# usermod -a -G sudo,ev3dev,plugdev,audio,video,input,bluetooth,i2c user

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

### Update packages

**NOTE: If you are a beginner with Linux and/or Debian, you should skip updating packages
for now. We are working on some major changes and things will be inconsisent with the
documentation if you upgrade.**

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
* [Motors](/docs/tutorials/tacho-motors/)
* [Sound](https://github.com/ev3dev/ev3dev/wiki/Using-Sound)
* [LCD](/docs/tutorials/LCD/)
* [Buttons](/docs/tutorials/buttons/)
* [LEDs](https://github.com/ev3dev/ev3dev/wiki/Using-the-LEDs)
* [Bluetooth](https://github.com/ev3dev/ev3dev/wiki/Using-Bluetooth)

### Writing programs

There are a number of programming languages available to use. The brick can
run almost all languages that any other Linux distro can, so your favorite
language is probably supported. Language bindings have already been written
for many languages. You can learn more about the available libraries [here](/docs/libraries).

If the language you want isn't listed, you still can use it, but you'll have to
do more of the heavy lifting yourself using the guides above. Once you get the
hang of it, you can even write your own interface library and have it listed here!

{% include inline-screenshot.html source="/images/brickman/shutdown-menu.png" caption="The 'Shutdown...' dialog in Brickman" %}

## Step 7: Calling it a day

When you are ready to wish your EV3 goodnight, turn if off by pressing the
*back* button from the main menu in brickman or pressing and holding the *back*
button from any screen in brickman. This will open a dialog where you can select
*Power Off* to turn off the EV3.

[microSD]: https://en.wikipedia.org/wiki/Secure_Digital#SD
[microSDHC]: https://en.wikipedia.org/wiki/Secure_Digital#SDHC
[microSDXC]: https://en.wikipedia.org/wiki/Secure_Digital#SDXC
[releases]:https://github.com/mindboards/ev3dev/releases
[7-Zip]: http://www.7-zip.org/
