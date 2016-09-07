---
title: Upgrading ev3dev From the Command Line
subject: System
---

{% include icon.html type="warning" %}
By upgrading ev3dev you are also upgrading the drivers, so there may be changes that break user software. 
You should check the ev3dev [news feed](http://www.ev3dev.org/news/){: .alert-link } for breaking changes before upgrading.
{: .alert .alert-warning}

When you flash an SD card with an ev3dev image, you are "installing" the version of ev3dev that was available at the time that the image was made. However, sometimes you will want to upgrade the version of ev3dev that you are using so that you can take advantage of new features that have been added or bug fixes that have been made. One option to get a new version is to re-flash your SD card with a newer image, but this also deletes any files you have saved on it. Alternatively, you can upgrade the ev3dev system (the device drivers and kernel) without having to delete any of your work. In this tutorial, we will show you how to upgrade ev3dev from the command line.

**Make sure that you have already configured a network connection and connected to ev3dev via SSH before beginning.**


Before starting the upgrade process, you will need to have ev3dev download a list of the most recent versions of available software. To do this, run the following command:


    sudo apt-get update


This might take up to ten minutes, depending on hardware and network connection speed.

------

You have multiple options in how you upgrade ev3dev. You can either upgrade just the ev3dev core (which is the quickest option) or upgrade all software installed on the EV3 (which may take an hour or longer).

# Upgrading just the ev3dev kernel (faster)

Run the following command, replacing `linux-image-ev3dev-ev3` as shown below:

    sudo apt-get install linux-image-ev3dev-ev3


Hardware platform                  | Package name
-----------------------------------|-------------
LEGO MINDSTORMS EV3                | `linux-image-ev3dev-ev3`
Raspberry Pi Zero / Raspberry Pi 1 | `linux-image-ev3dev-rpi`
Raspberry Pi 2 / Raspberry Pi 3    | `linux-image-ev3dev-rpi2`
BeagleBone                         | `linux-image-ev3dev-bb.org`
{: .table .table-striped .table-bordered }


If that command prints `linux-image-ev3dev-ev3 is already the newest version.`
there was no new kernel available, and you are done (unless you forgot to run
`sudo apt-get update` as shown above). If the command does not output that line,
**you will need to reboot the EV3 before the new kernel can be used. Do so through
Brickman on the EV3 display or by running `sudo reboot`.**

# Upgrading all packages (slower)

Run these commands in the following order:

    sudo apt-get upgrade
    sudo apt-get dist-upgrade

Wait for each command to complete before typing the next.  Some steps require 
confirmation to proceed. Press 'y' when asked.  

{% include icon.html type="warning" %}
The `upgrade` step may take a couple hours to complete, depending on your network
connection and hardware.
{: .alert .alert-warning}

Although you don't necessarily need to reboot if no new kernel was installed,
it's difficult to see whether one was installed based on the command output.
To reboot, run `sudo reboot` or do it through Brickman.

# Confirming that the upgrade worked

After the brick has rebooted (assuming you installed a new kernel version), press `About` on the brick's main menu and scroll down to "Kernel" to confirm it
has a current kernel.

{% include screenshot.html source="/images/brickman/about-kernel-version.png" caption="Brickman's about page" %}
