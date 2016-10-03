---
title: Getting Started with ev3dev
categories: docs getting-started
excerpt: "So you're ready to try out ev3dev. Great! Here are step-by-step instructions to help you get ev3dev up and running on your EV3 or Raspberry Pi."
no-wrapper: true
---

<div class="colored-section">
<div class="container" markdown="1">

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

</div>
</div>

<div class="dark-bg colored-section">
<div class="container" markdown="1">

## Step 1: Download the latest ev3dev image file

<div class="release-link-container" markdown="1">

<br/>
<div class="text-center">
<a data-release-link-platform="ev3" class="btn btn-lg btn-primary"><span class="glyphicon glyphicon-download-alt"></span> Download for LEGO MINDSTORMS EV3</a>
<br/><br/>
<h2 class="centered-light-heading"> Other platforms </h2>
<a data-release-link-platform="rpi" class="btn btn-md btn-primary download-button-small">Raspberry Pi 1</a>
<a data-release-link-platform="rpi2" class="btn btn-md btn-primary download-button-small">Raspberry Pi 2</a>
<a data-release-link-platform="bone" class="btn btn-md btn-primary download-button-small">BeagleBone</a>
</div>

<br/>
To get started, you will need to download the release corresponding to the platform
you are using. If you want the latest and greatest, check out the ["nightly"][nightly]
image builds. If you are looking for older releases or other file types, you can
check out the [GitHub releases page][releases].

</div>
<div class="release-link-alt" markdown="1">
To get started, you will need to download the release corresponding to the platform
you are using. Visit the [GitHub releases page][releases] and find the image that
corresponds to your platform:

- Releases for the LEGO MINDSTORMS EV3 start with `ev3- `
- Releases for the Raspberry Pi 1 start with `rpi-`
- Releases for the Raspberry Pi 2 and 3 start with `rpi2-`
- Releases for the BeagleBone start with `evb-`
</div>
</div>
</div>

<div class="colored-section">
<div class="container" markdown="1">

## Step 2: Copy the image on to the SD card

<div class="alert alert-danger">
    {% include icon.html type="danger" %}
    This will erase everything on your SD card! Backup your files
    if you do not want to lose them!
</div>

Now it's time to write the image to the card.

1. Download and install Etcher from [their website](http://etcher.io).
2. Launch Etcher after it has finished installing.

   {% include screenshot.html source="/images/etcher/home.png" caption="Etcher home screen" width="600px" %}

3. Click the "Select image" button and browse to the folder where you
   downloaded an ev3dev release. Select the file that you downloaded.
   The release can be a `.img.zip` or `.img.xz`; whichever
   you have will work with Etcher.

   {% include screenshot.html source="/images/etcher/image-selected.png" caption="Image chosen in Etcher" width="600px" %}

4. Plug the SD card into your PC (if your PC doesn't have a micro SD
   slot, you can use an adapter or external reader). Etcher should
   detect the new device and display its information under the "Select
   drive" step. Confirm that the selected drive is correct.

   {% include screenshot.html source="/images/etcher/drive-selected.png" caption="Drive selected in Etcher" width="600px" %}
   
5. If you have multiple removable drives available, you may need to
     use the "Change" button to select the proper device.

6. When you are confident that you have selected the correct drive,
   click "Flash!" and wait for the operation to complete.
   
   {% include screenshot.html source="/images/etcher/flash-started.png" caption="Etcher flashing the SD card" width="600px" %}

7. If you arrive at this screen, you have successfully flashed your SD card and are ready to move on to the next step.
   
   {% include screenshot.html source="/images/etcher/success.png" caption="Etcher success screen" width="600px" %}
<br/>

<div class="alert alert-info" markdown="1">
{% include icon.html type="info" %}
For more detailed information and more alternatives, check out
[our other tutorials](/docs/tutorials/#group-administration-and-setup-sd-card-image){: .alert-link }.
You can also check out [this page for RaspberryPi](http://elinux.org/RPi_Easy_SD_Card_Setup){: .alert-link }.
Much of the information there is applicable to ev3dev.
</div>

</div>
</div>

<div class="dark-bg colored-section">
<div class="container" markdown="1">

## Step 3 (Raspberry Pi only): Update options in config.txt

<div class="alert alert-warning" markdown="1">
{% include icon.html type="warning" %}
This is for Raspberry Pi only! Users of other platforms can skip this step.
</div>

You must make some changes to `config.txt` to enable support for BrickPi or
PiStorms before you put your SD card in your Raspberry Pi.

You may have to remove the SD card from your host computer and plug it back in
after flashing it in order for it to be detected. In your file browser, open
up `EV3DEV_BOOT`. This contains a file named `config.txt`. Open `config.txt`
in your favorite text editor and follow the instructions in the file to enable
either BrickPi or PiStorms.

</div>
</div>

<div class="colored-section">
<div class="container" markdown="1">

<div class="row">
<div class="col-md-8" markdown="1">
## Step 4: Boot ev3dev

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
</div>

<div class="col-md-4">
{% include screenshot.html source="/images/brickman/main-menu.png" caption="When the boot is complete, the LEDs will turn green and you will see something like this on the screen" %}
</div>
</div>

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

</div>
</div>

<div class="dark-bg colored-section">
<div class="container" markdown="1">

## Step 5: Setup a network connection

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

Now that you have a network connection, you should
[connect to your EV3 with SSH](/docs/tutorials/connecting-to-ev3dev-with-ssh)
if you haven't done so already.

</div>
</div>

<div class="colored-section">
<div class="container" markdown="1">

## Step 6: Do something awesome

The brick can run almost all programming languages that any other Linux distro can, so your
favorite language is probably supported. Language bindings have already been
written for many languages. **You can learn more about the available libraries
[here](/docs/programming-languages).**

If the language you want isn't listed, you still can use it, but you'll have to
do more of the heavy lifting yourself. You can look at the [driver index page](/docs/drivers/)
for information on the interfaces you need to use to control devices. Once you get the
hang of it, you can even write your own interface library and have it listed here!

</div>
</div>

<div class="dark-bg colored-section">
<div class="container" markdown="1">

<div class="row">
<div class="col-md-8" markdown="1">
## Step 7: Calling it a day

When you are ready to wish your EV3 goodnight, turn if off by pressing the
*back* button from the main menu in brickman or pressing and holding the *back*
button from any screen in brickman. This will open a dialog where you can select
*Power Off* to turn off the EV3. (Running `sudo poweroff` in a terminal works too.)
</div>

<div class="col-md-4">
{% include screenshot.html source="/images/brickman/shutdown-menu.png" caption="The 'Shutdown...' dialog in Brickman" %}
</div>
</div>

</div>
</div>
[microSD]: https://en.wikipedia.org/wiki/Secure_Digital#SD
[microSDHC]: https://en.wikipedia.org/wiki/Secure_Digital#SDHC
[microSDXC]: https://en.wikipedia.org/wiki/Secure_Digital#SDXC
[releases]:https://github.com/ev3dev/ev3dev/releases
[nightly]:https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/
