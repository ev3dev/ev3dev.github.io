---
title: Getting started v2
index: wiki
---

## Introduction

By the time you get to this page, you probably already know that ev3dev is Debian Linux for the LEGO Mindstorms EV3. If you have more basic questions, check out the [[FAQ|Frequently Asked Questions]].

## Step 1: Get a microSD card

You need a [microSD](https://en.wikipedia.org/wiki/Secure_Digital#SD) or [microSDHC](https://en.wikipedia.org/wiki/Secure_Digital#SDHC) card. [microSDXC](https://en.wikipedia.org/wiki/Secure_Digital#SDXC) is not supported (you might be able to get it to work, but it will operate at reduced capacity and speed).

Also look at the [speed class rating](https://en.wikipedia.org/wiki/Secure_Digital#Speed_class_rating). Class 10 is the fastest, but slower speeds will work just fine. Ultra High Speed (UHS) classes are not supported (again, they should work, but not at the rated speed).

You will also need a host computer with an adapter for the SD card.

## Step 2: Download the latest ev3dev image file

Releases are [here](https://github.com/mindboards/ev3dev/releases).

**NOTE:** Downloading the `.zip` file is recommended for Windows/Mac and the `.xz` file is recommended for Linux. `.xz` requires that you have additional software installed on Windows/Mac to decompress it (such as [7-Zip](http://www.7-zip.org/) on Windows).

## Step 3: Copy the image on to the SD card

**IMPORTANT:** THIS WILL ERASE EVERYTHING ON YOUR SD CARD! BACKUP YOUR FILES IF YOU DO NOT WANT TO LOOSE THEM!

There are a vast number of ways to do this, so pick the one from the list that sounds the easiest to you:

* **Linux**
    * [[Command Line|Writing an ev3dev Image to SD Using Command Line Tools on Linux]]
    * [[Ubuntu (graphical interface)|Writing an ev3dev Image file to SD Using Graphical Interface Tools on Ubuntu]]
* **Mac OS X**
    * [[Command Line|Writing the ev3dev Image to SD Using Command Line Tools on Mac OS X]]
* **Windows**
    * [[Win32DiskImager (graphical interface)|Writing an Image to a SD Card Using Win32DiskImager on Windows]]

**TIP:** For more detailed information and more alternatives, check out [this page for RaspberryPi](http://elinux.org/RPi_Easy_SD_Card_Setup). Much of the information there is applicable to ev3dev.

## Step 4: Enable USB networking

In order to communicate with the EV3, we need a network connection. We are going to setup a TCP/IP connection over USB since USB is the one type of connection that *everyone* has. If you want to use a WiFi dongle or some other type of connection, we will get to that, but we need to set up USB first.

You should still have your SD card plugged in to your host computer. In your file browser/manager/finder/whaterver-you-call-it, there should be a removable drive called EV3_BOOT. Open it.

There is a file called `ev3dev.rc.local`. Open it in a text editor.

**IMPORTANT: Windows users - do not use Notepad or Wordpad.** They will change the line endings and corrupt the file. Use a 3rd party editor that can handle Unix line endings, such as [Notepad++](http://www.notepad-plus-plus.org/).

Follow the instructions in the file. Uncomment means "delete the `#` at the front of the line.

Windows users should have:

    export EV3_GADGET="g_ether"
    ...
    #export EV3_GADGET="g_cdc"

And Linux/Mac users should have:

    #export EV3_GADGET="g_ether"
    ...
    export EV3_GADGET="g_cdc"

Save and close the file when you are done.

## Step 5: Boot ev3dev

Be sure to safely eject your SD card from you host computer first, then put the SD Card in your EV3 and power it on.

At first, you will see the Mindstorms boot splash and the red LEDs will be on. This is immediately followed by the ev3dev boot splash and the LEDs changing to amber. The left LED indicates CPU activity and the right LED indicates disk (SD card) activity.

Shortly after the ev3dev boot splash, the screen will go blank and then eventually say `"Debian GNU/Linux 7 (wheezy)"`. Any time after the screen goes blank, you can press any of the directional buttons (up, down, left, right) to toggle displaying boot messages.

The first boot will take a little longer that subsequent boots because the EV3 has to create a unique SSH host ids and take care of a few other housekeeping items.

When the boot is complete, the LEDs will turn green and you will see this on the screen:

                 _____     _
       _____   _|___ /  __| | _____   __
      / _ \ \ / / |_ \ / _` |/ _ \ \ / /
     |  __/\ V / ___) | (_| |  __/\ V /
      \___| \_/ |____/ \__,_|\___| \_/
    
    Debian GNU/Linux 7 on LEGO MINDSTORMS EV3!
    ev3dev tty1
    ev3dev login: _

## Step 6: Use SSH to connect over the USB network interface

This depends on the OS of your host computer, so choose the one that applies:

* [[Linux (NetworkManager)|Connecting via USB to Linux host with NetworkManager]]
* [[Mac OS X|Connecting via USB on Mac OS X]]
* [[Windows|Connecting via USB on Windows]]

## Step 7: First things to do with ev3dev

Here are some suggestions of some things you should do to get your EV3 setup.

### Change your root password

    root@ev3dev:~# passwd
    Enter new UNIX password: 
    Retype new UNIX password: 
    passwd: password updated successfully

### Set up a new user

Replace `user` with your actual user name and `First Last` with your real name (if you want it on the EV3 - you can leave it blank too). Don't miss the command to assign groups hiding at the end.

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
    root@ev3dev:~# usermod -a -G sudo,plugdev,audio,video user

### Set the time zone

    root@ev3dev:~# dpkg-reconfigure tzdata

Then just follow the instructions on the screen.

**NOTE:** The EV3 does not have a battery backup for the realtime clock. Whenever you remove the batteries, the clock will be reset. If the EV3 is connected to the Internet, the clock will be automatically set via NTP, otherwise, you can manually set the date/time with the `date` command.


### Set the locale

You can skip this if en-US is OK.

    root@ev3dev:~# dpkg-reconfigure locales

### Grow your file system to use the entire SD card

The ev3dev image is only 500MB so that you don't have to wait so long while writing the image to the SD card (and also so it will fit on a 512MB card). This means that you have some unused space on your SD card that you can reclaim. When you have some time to kill, run this command (it takes 10-11 minutes on my 2GB SD card). It will expand the root file system partition to use the rest of the free space on your SD card.

    root@ev3dev:~# lvextend --extents +100%FREE --resizefs /dev/ev3devVG/root /dev/mmcblk0p3

**IMPORTANT**: Don't wait until you get an error that your disk is full before doing this. You need some free disk space available in order to run this command.

### Update packages

Make sure your EV3 is connected to the Internet first. Updating the package list the first time will take a few minutes.

    root@ev3dev:~# apt-get update
    root@ev3dev:~# apt-get upgrade
    root@ev3dev:~# apt-get dist-upgrade

If a new kernel package is installed, you will need to reboot.

    root@ev3dev:~# reboot

## Step 8: Do something awesome

This will be where we tell you how to use the EV3's main functions, and how to write programs. We are still learning, so everything here should be considered experimental and subject to major changes.

### Using the EV3 hardware drivers
Here are some guides for using each of the major components.
- [[Using Sensors]]
- [[Using Motors]]
- [[Using Sound]]
- [[Using the LCD]]
- [[Using the Buttons]]
- [[Using the LEDs]]
- [[Using Bluetooth]]

### Writing programs
There are a number of programming languages available to use. The brick can run almost all languages that any other Linux distro can, so your favorite language is probably supported. Language bindings have already been written for some languages:

- [[Using brickstrap to cross compile and debug]]
- [C++ language bindings/samples](https://github.com/fdetro/ev3dev-lang)
- [Google Go](https://github.com/mattrajca/GoEV3)
- [Node.js](https://github.com/WasabiFan/ev3dev-NodeJS)
- Python [Rubik's cube solver](https://github.com/mindboards/ev3dev/issues/63#issuecomment-42717732) and [balancing robot](https://gist.github.com/dlech/11098915)

If the language you want isn't listed, you still can use it, but you'll have to do more of the heavy lifting yourself using the guides above. Once you get the hang of it, you can even write your own interface library and have it listed here!

## Step 9: Calling it a day

When you are ready to wish your EV3 goodnight, turn if off by running:

    root@ev3dev:~# poweroff
