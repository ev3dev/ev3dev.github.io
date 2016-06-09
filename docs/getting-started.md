---
title: Getting Started with ev3dev
categories: docs getting-started
excerpt: "So you're ready to try out ev3dev. Great! Here are step-by-step instructions to help you get ev3dev up and running on your EV3 or Raspberry Pi."
---

* Table of Contents
{:toc}

So you're ready to try out ev3dev. Great! Here are step-by-step instructions
to help you get ev3dev up and running on your EV3 or Raspberry Pi.

First, here are the things you need before starting:

* A LEGO MINDSTORMS EV3 Intelligent Brick or Raspberry Pi (any model).
* A [microSD] or [microSDHC] card (2GB or larger). [microSDXC] is not supported
  on the EV3. **All cards larger than 32GB will not work with the EV3!**
* A computer with an adapter for the SD card. You will need administrator user
  permissions on this computer.
* A way to communicate.

  For the EV3, this can be one of the following:

  * USB cable (the one that comes with the EV3)
  * USB Wi-Fi dongle
  * USB Ethernet (wired) dongle
  * Bluetooth

  For Raspberry Pi you will need to use the wired Ethernet connection first.
  With PiStorms the EV3 options will work too since you have a screen to configure
  them on.


{% include icon.html type="warning" %}
The instructions on this page only apply to releases dated December
2015 or later. Older releases are no longer supported. There are many major changes
in the December release, so if something seems broken or the documentation seems incorrect,
please [open an issue on GitHub](/support){: .alert-link}.
{: .alert .alert-warning}

## Step 1: Download the latest ev3dev image file

Releases are posted [on GitHub][releases]. Follow the link and download the latest
**Test Release** image file for your hardware. Releases for LEGO MINDSTORMS EV3
start with `ev3-`, Raspberry Pi starts with `rpi-` and Raspberry Pi 2 starts
with `rpi2-`.

For most users, downloading the `.xz` file will be the best option, but the `.zip`
will work as well. If you are planning to image your card manually instead of
following the recommended steps, you will need to choose based on your OS and
imaging program.

## Step 2: Copy the image on to the SD card

<div class="alert alert-danger">
    {% include icon.html type="danger" %}
    This will erase everything on your SD card! Backup your files
    If you do not want to lose them!
</div>

Now it's time to write the image to the card.

1. Download and install Etcher from [their website](http://etcher.io).
2. Launch Etcher after it has finished installing.

   {% include screenshot.html source="/images/etcher/home.png" caption="Etcher home screen" width="300px" %}

3. Click the "Select image" button and browse to the folder where you
   downloaded an ev3dev release. Select the file that you downloaded.
   The release can be a `.img.zip` or `.img.xz`; whichever
   you have will work with Etcher.

   {% include screenshot.html source="/images/etcher/image-selected.png" caption="Image chosen in Etcher" width="300px" %}

4. Plug the SD card into your PC (if your PC doesn't have a micro SD
   slot, you can use an adapter or external reader). Etcher should
   detect the new device and display its information under the "Select
   drive" step. Confirm that the selected drive is correct.
   - If you have multiple removable drives available, you may need to
     use the "Change" button to select the proper device.

   {% include screenshot.html source="/images/etcher/drive-selected.png" caption="Drive selected in Etcher" width="300px" %}

5. When you are confident that you have selected the correct drive,
   click "Flash!" and wait for the operation to complete.
   
   {% include screenshot.html source="/images/etcher/flash-started.png" caption="Etcher flashing the SD card" width="300px" %}

<br/>

<div class="alert alert-info" markdown="1">
{% include icon.html type="info" %}
For more detailed information and more alternatives, check out
[our other tutorials](/docs/tutorials/#group-sd-card-image){: .alert-link }.
You can also check out [this page for RaspberryPi](http://elinux.org/RPi_Easy_SD_Card_Setup){: .alert-link }.
Much of the information there is applicable to ev3dev.
</div>

<div class="panel panel-warning">
<div class="panel-heading">
{% include icon.html type="warning" %}
<strong>Raspberry Pi Only!</strong>
</div>
<div class="panel-body" markdown="1">
You must make some changes to `config.txt` to enable support for BrickPi or
PiStorms before you put your SD card in your Raspberry Pi.

You may have to remove the SD card from your host computer and plug it back in
after flashing it in order for it to be detected. In your file browser, open
up `EV3DEV_BOOT`. This contains a file named `config.txt`. Open `config.txt`
in your favorite text editor and follow the instructions in the file to enable
either BrickPi or PiStorms.
</div>
</div>

{% include inline-screenshot.html source="/images/brickman/main-menu.png" caption="When the boot is complete, the LEDs will turn green and you will see something like this on the screen" %}

## Step 3: Boot ev3dev

Put the SD Card in your EV3 and power it on. At first, you will see the
MINDSTORMS boot splash and the red LEDs will be on. This is immediately
followed by the ev3dev boot splash and the LEDs changing to orange. The
LEDs indicate disk (SD card) activity.

**Note:** If you are using Raspberry Pi hardware without a screen, just wait for
the Activity LED to stop flashing, then go to the next step.

After about one minute, the screen will go blank. This happens on the first boot
only. The first boot takes longer than subsequent boots because the EV3
has to create a unique SSH host ids and take care of a few other housekeeping
items. After another minute or two, you will see the *brickman loading...* screen.
If nothing has happened after five minutes, something is not right - check the
troubleshooting tips below.

You will notice the number in the battery in the upper right corner. This
displays the remaining voltage of the power supply. It is not possible to
calculate an accurate percent value of the remaining energy, so this value is
chosen. If the voltage drops below 5V the brick will turn off. All not saved
data may be lost. Keep in mind, that it may take a much longer time from 8V to
6.5V than from 6.5V down to 5V!

<div class="panel panel-info">
<div class="panel-heading">
{% include icon.html type="info" %}
Troubleshooting tips if your EV3 won't boot
</div>
<div class="panel-body" markdown="1">
* Make sure nothing is plugged into the EV3 (USB/sensors/motors/etc.)
* Try writing the image to the SD card again.
* You may have a bad/incompatible SD card - try a different SD card.
* Check the condition of the EV3 batteries.
</div>
</div>

## Step 4: Setup a network connection

There are lots of choices here. Your choice depends on what type of connection
you want to use and on the OS of your host computer, so pick the one that applies:

* __Ethernet over USB__ (just requires the USB cable that comes with the EV3)
    * [Connecting to the Internet](../tutorials/connecting-to-the-internet-via-usb) tutorial
* __USB Ethernet dongle__ (as in the kind with an RJ45 connector)
    * If your network has a DHCP server, this will "just work".
* __USB Wi-Fi Dongle__
    * Setting up Wi-Fi Via the Brickman User Interface (hopefully you can figure
      this out, but it would be nice if someone made a tutorial)
    * [Setting Up Wi-Fi Using the Command Line](../tutorials/setting-up-wifi-using-the-command-line)
      (requires another connection type first to get to the command line, but way
      easier to enter you passphrase this way)
* __Bluetooth__
    * Note: Bluetooth may not work on the first boot. Please reboot if you see "???"
      after you power on Bluetooth.
    * [Connecting to the Internet](../tutorials/connecting-to-the-internet-via-bluetooth) tutorial

{% include icon.html type="info" %}
For Raspberry Pi with no display, you must use the wired Ethernet port
to connect for the first time. You can setup additional connections using the
`connmanctl` command.
{: class="alert alert-info"}

## Step 5: Do something awesome

This will be where we tell you how to use the EV3's main functions, and how
to write programs. We are still learning, so everything here should be
considered experimental and subject to major changes.

### Using the EV3 hardware drivers

Here are some guides for using each of the major components.

* [Sensors](/docs/sensors)
* [Motors](/docs/tutorials/tacho-motors/)
* [Sound](https://github.com/ev3dev/ev3dev/wiki/Using-Sound)
* [LCD](/docs/tutorials/using-ev3-lcd/)
* [Buttons](/docs/tutorials/using-ev3-buttons/)
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

## Step 6: Calling it a day

When you are ready to wish your EV3 goodnight, turn if off by pressing the
*back* button from the main menu in brickman or pressing and holding the *back*
button from any screen in brickman. This will open a dialog where you can select
*Power Off* to turn off the EV3. (Running `sudo poweroff` in a terminal works too.)

[microSD]: https://en.wikipedia.org/wiki/Secure_Digital#SD
[microSDHC]: https://en.wikipedia.org/wiki/Secure_Digital#SDHC
[microSDXC]: https://en.wikipedia.org/wiki/Secure_Digital#SDXC
[releases]:https://github.com/mindboards/ev3dev/releases
