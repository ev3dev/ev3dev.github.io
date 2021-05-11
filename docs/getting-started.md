---
title: Getting Started with ev3dev
categories: docs getting-started
excerpt: "So you're ready to try out ev3dev. Great! Here are step-by-step instructions to help you get ev3dev up and running on your EV3 or Raspberry Pi."
no-wrapper: true
---

{% include /style/begin-section.html %}

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
* A way to communicate with the device.

  For the EV3, this can be one of the following:

  * USB cable (the one that comes with the EV3)
  * USB Wi-Fi dongle
  * USB Ethernet (wired) dongle
  * Bluetooth

  For Raspberry Pi you can use a wired Ethernet connection first.
  With PiStorms the EV3 options will work too since you have a built-in screen to configure them on.
  With BrickPi you can also set up other connections from the console using an external screen and keyboard.

{% include /style/end-section.html %}

{% include /style/begin-section.html bg="dark" %}

## Step 1: Download the latest ev3dev image file

<div class="release-link-container" markdown="1">

<br/>
<div class="text-center">
<!-- <a data-release-link-platform="ev3_beta" class="btn btn-lg btn-default"><span class="glyphicon glyphicon-download-alt"></span> Download ev3dev-buster beta for LEGO MINDSTORMS EV3</a>
<br/><br/> -->
<a data-release-link-platform="ev3" class="btn btn-lg btn-primary"><span class="glyphicon glyphicon-download-alt"></span> Download ev3dev-stretch for LEGO MINDSTORMS EV3</a>
<br/><br/>
<h2 class="centered-light-heading"> Other platforms </h2>
<!-- <a data-release-link-platform="rpi_beta" class="btn btn-md btn-default download-button-small">Raspberry Pi 1</a>
<a data-release-link-platform="rpi2_beta" class="btn btn-md btn-default download-button-small">Raspberry Pi 2</a>
<a data-release-link-platform="bone_beta" class="btn btn-md btn-default download-button-small">BeagleBone</a>
<br/><br/> -->
<a data-release-link-platform="rpi" class="btn btn-md btn-primary download-button-small">Raspberry Pi Zero/1</a>
<a data-release-link-platform="rpi2" class="btn btn-md btn-primary download-button-small">Raspberry Pi 2/3</a>
<a data-release-link-platform="bone" class="btn btn-md btn-primary download-button-small">BeagleBone</a>
</div>

<br/>
To get started, you will need to download the release corresponding to the platform
you are using. For additional downloads and advanced information, check out our
[dedicated download page](/downloads).

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

{% include /style/end-section.html %}

{% include /style/begin-section.html %}

## Step 2: Flash the SD card

{% include /style/icon.html type="danger" %}
This will erase everything on your SD card! Back up your files
if you do not want to lose them!
{: .alert .alert-danger }

Now it's time to write the image to the card.

1. Download and install Etcher from [their website](https://etcher.io).
2. Launch Etcher after it has finished installing.

   {% include /util/screenshot.html source="/images/etcher/home.png" caption="Etcher home screen" width="600px" %}

3. Click the "Select image" button and browse to the folder where you
   downloaded an ev3dev release. Select the file that you downloaded.
   The release can be a `.img.zip` or `.img.xz`; whichever
   you have will work with Etcher.

   {% include /util/screenshot.html source="/images/etcher/image-selected.png" caption="Image chosen in Etcher" width="600px" %}

4. Plug the SD card into your PC (if your PC doesn't have a micro SD
   slot, you can use an adapter or external reader). Etcher should
   detect the new device and display its information under the "Select
   drive" step. Confirm that the selected drive is correct.

   {% include /util/screenshot.html source="/images/etcher/drive-selected.png" caption="Drive selected in Etcher" width="600px" %}
   
5. If you have multiple removable drives available, you may need to
     use the "Change" button to select the proper device.

6. When you are confident that you have selected the correct drive,
   click "Flash!" and wait for the operation to complete.
   
   {% include /util/screenshot.html source="/images/etcher/flash-started.png" caption="Etcher flashing the SD card" width="600px" %}

7. If you arrive at this screen, you have successfully flashed your SD card and are ready to move on to the next step.
   
   {% include /util/screenshot.html source="/images/etcher/success.png" caption="Etcher success screen" width="600px" %}
<br/>

{% include /style/icon.html type="info" %}
For more detailed information and flashing utility alternatives, check out
[our other tutorials](/docs/tutorials/#group-administration-and-setup-sd-card-image){: .alert-link }.
You can also check out [this page for RaspberryPi](https://elinux.org/RPi_Easy_SD_Card_Setup){: .alert-link }.
Much of the information there is applicable to ev3dev.
{: .alert .alert-info }

{% include /style/end-section.html %}

{% include /style/begin-section.html bg="dark" %}

## Step 3A (Raspberry Pi only): Update options in config.txt

{% include /style/icon.html type="warning" %}
This is for Raspberry Pi only! Users of other platforms can skip this step.
{: .alert .alert-warning }

You must make some changes to `config.txt` to enable support for BrickPi or
PiStorms before you put your SD card in your Raspberry Pi.

You may have to remove the SD card from your host computer and plug it back in
after flashing it in order for it to be detected. In your file browser, open
up `EV3DEV_BOOT`. This contains a file named `config.txt`. Open `config.txt`
in your favorite text editor and follow the instructions in the file to enable
either BrickPi or PiStorms.

## Step 3B (BeagleBone only): Select cape in uEnv.txt

{% include /style/icon.html type="warning" %}
This is for Beaglebone only! Users of other platforms can skip this step.
{: .alert .alert-warning }

You must make some changes to `uEnv.txt` to enable support for FatcatLab EVB or
QuestCape before you put your SD card in your BeagleBone.

You may have to remove the SD card from your host computer and plug it back in
after flashing it in order for it to be detected. In your file browser, open
up `EV3DEV_BOOT`. This contains a file named `uEnv.txt`. Open `uEnv.txt`
in your favorite text editor and follow the instructions in the file to select
the cape your are using.

{% include /style/end-section.html %}

{% include /style/begin-section.html %}

<div class="row">
<div class="col-md-8" markdown="1">

## Step 4: Boot ev3dev

Put the SD Card in your EV3 and power it on. At first, you will see the
MINDSTORMS boot splash and the red LEDs will be on. This is immediately
followed by the ev3dev boot splash and the LEDs changing to orange. The
LEDs indicate disk (SD card) activity.

After about one minute, the screen will go blank. This happens on the first boot
only. The first boot takes longer than subsequent boots because the EV3
has to create a unique SSH host ids and take care of a few other housekeeping
items. After another minute or two, you will see the *brickman loading...* screen.
If nothing has happened after five minutes, something is not right - check the
troubleshooting tips below.

You will notice the number in the battery in the upper right corner. This
displays the remaining voltage of the power supply. It is not possible to
calculate an accurate percent value of the remaining energy, so this value is
chosen. If the voltage drops below 5V the brick will turn off. All unsaved
data will be lost. Keep in mind, that it may take a much longer time from 8V to
6.5V than from 6.5V down to 5V!

**Note:** If you are using Raspberry Pi hardware without a screen, just wait for
the Activity LED to stop flashing, then go to the next step. If alternatively 
you have connected the pi to a screen monitor via HDMI 
press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F6</kbd> at the end of the boot sequence. 
This should take you to a login prompt. Login as 'robot' with password 'maker'. 


</div>

<div class="col-md-4">
{% include /util/screenshot.html source="/images/brickman/main-menu.png" caption="When the boot is complete, the LEDs will turn green and you will see something like this on the screen" %}
</div>
</div>

{% include /style/begin-panel.html type="info" heading="Troubleshooting tips if your EV3 won't boot" %}

* Make sure nothing is plugged into the EV3 (USB/sensors/motors/etc.)
* Try writing the image to the SD card again.
* You may have a bad/incompatible SD card - try a different SD card.
* Check the condition of the EV3 batteries.

{% include /style/end-panel.html %}

<div class="row">
<div class="col-md-8" markdown="1">
### Shutting down

You'll often want to turn off your EV3 while it isn't in use. When you are ready
to wish your EV3 good night, turn if off by pressing the *back* button from the
main menu in brickman or pressing _and holding_ the *back* button from any screen
in brickman. This will open a dialog where you can select *Power Off* to turn
off the EV3. _If you're using the command line, running `sudo poweroff` in a
terminal works too._
</div>

<div class="col-md-4">
{% include /util/screenshot.html source="/images/brickman/shutdown-menu.png" caption="The 'Shutdown...' dialog in Brickman" %}
</div>
</div>

{% include /style/end-section.html %}

{% include /style/begin-section.html bg="dark" %}

## Step 5: Set up a network connection

Click on the button below to visit our networking page. There are lots of
choices here; choose the connection option that best suits you and your
available hardware.

<a class="btn btn-md btn-primary" href="/docs/networking" target="_blank"><span class="glyphicon glyphicon-globe"></span> Check out the available networking options</a>

{% include /style/end-section.html %}

{% include /style/begin-section.html %}

## Step 6: Connect to the EV3 via SSH

Now that you have a network connection, you should connect to your EV3 with SSH.
Connecting allows you to verify that the networking option that you configured
in the previous step is working. Once you have an SSH connection, you will be
able to securely run terminal commands on the EV3 from your PC. This lets you
run programs, change settings, and install new programs. Click the button below
to learn how to connect.

<a class="btn btn-md btn-primary" href="/docs/tutorials/connecting-to-ev3dev-with-ssh" target="_blank"><span class="glyphicon glyphicon-transfer"></span> Learn how to connect with SSH</a>

To test this out, let's try running a command (make sure that you have completed
the earlier part of this step first).

Type the command `fortune` into the SSH shell opened above and press
<kbd>Enter</kbd>. It will use a nifty program called `fortune` to print out a
random quote from a database. Feel free to try it multiple times!

    robot@ev3dev:~$ fortune
    Your domestic life may be harmonious.

If you don't see any errors printed, and your output looks similar to the above,
you're good to go!

{% include /style/end-section.html %}

{% include /style/begin-section.html bg="dark" %}

## Step 7: Choose a programming language and write some code

{% include /style/icon.html type="info" %}
If you were sent here from a language- or framework-specific webpage, you can
skip this step and return there for further instructions.
{: .alert .alert-info }

The brick can run the vast majority of popular programming languages, so your
favorite language is probably supported. Pick your language and write some code!

<a class="btn btn-md btn-primary" href="/docs/programming-languages"><span class="glyphicon glyphicon-console"></span> See the available programming languages</a>

{% include /style/end-section.html %}


[microSD]: https://en.wikipedia.org/wiki/Secure_Digital#SD
[microSDHC]: https://en.wikipedia.org/wiki/Secure_Digital#SDHC
[microSDXC]: https://en.wikipedia.org/wiki/Secure_Digital#SDXC
[releases]:https://github.com/ev3dev/ev3dev/releases
[nightly]:https://ev3dev.jfrog.io/artifactory/snapshots/
