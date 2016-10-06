---
title: Upgrading Ev3dev
subject: System
---

{% include icon.html type="warning" %}
By upgrading ev3dev you are also upgrading the drivers, so there may be changes that break user software. 
You should check the ev3dev [news feed](http://www.ev3dev.org/news/){: .alert-link } for breaking changes before upgrading.
{: .alert .alert-warning}

There are multiple ways that you can upgrade ev3dev.

# Option 1: Re-flashing your SD card (fastest)

This option will likely be the fastest by far. **By re-flashing your SD card, however, you will lose any files that were stored in your ev3dev installation, including code and installed programs.**

1. Download a recent image file. We haven't done a full release in a while, so
   we recommend that you download the newest [nightly image](https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/).
   - Choose a recent day from the list on that page and then download the file
     that matches your platform based on the table below.
     
     Hardware platform                  | File name
     -----------------------------------|-------------
     LEGO MINDSTORMS EV3                | `nightly-ev3dev-jessie-ev3-generic-####-##-##.img.xz`
     Raspberry Pi Zero / Raspberry Pi 1 | `nightly-ev3dev-jessie-rpi-generic-####-##-##.img.xz`
     Raspberry Pi 2 / Raspberry Pi 3    | `nightly-ev3dev-jessie-rpi2-generic-####-##-##.img.xz`
     BeagleBone                         | `nightly-ev3dev-jessie-bone-generic-####-##-##.img.xz`
     {: .table .table-striped .table-bordered }

2. Head over to our [Getting Started guide](/docs/getting-started#step-2-flash-the-sd-card)
   and follow the "Copy the image to the SD card" step.


# Option 2: Upgrading all installed software (slowest)
**Make sure that you have already configured a network connection and connected to ev3dev via SSH to use this option.**

This option will be the slowest, but it is easy to do and will also make sure that other software is up-to-date.

1. Run the following commands in order, waiting for each command to complete
   before typing the next. Some steps require confirmation to proceed. Press
   'y' when asked.

       sudo apt-get update
       sudo apt-get upgrade
       sudo apt-get dist-upgrade

   {% include icon.html type="warning" %}
   The `upgrade` step may take a couple hours to complete, depending on your
   network connection, hardware and the number of outdated packages.
   {: .alert .alert-warning}

2. Reboot by typing `sudo reboot` or by using the "Shutdown..." menu in Brickman
   (if using an EV3, click the "back" button to access it).

# Option 3: Upgrading only the kernel
**Make sure that you have already configured a network connection and connected to ev3dev via SSH to use this option.**

This will be slower than option one but significantly faster than option two.
This option will only upgrade core ev3dev packages and not other software.

1. Run the following commands, replacing `linux-image-ev3dev-ev3` as shown below:

       sudo apt-get update
       sudo apt-get install linux-image-ev3dev-ev3

   Hardware platform                  | Package name
   -----------------------------------|-------------
   LEGO MINDSTORMS EV3                | `linux-image-ev3dev-ev3`
   Raspberry Pi Zero / Raspberry Pi 1 | `linux-image-ev3dev-rpi`
   Raspberry Pi 2 / Raspberry Pi 3    | `linux-image-ev3dev-rpi2`
   BeagleBone                         | `linux-image-ev3dev-bb.org`
   {: .table .table-striped .table-bordered }

2. Reboot if the kernel was updated.
   - If the second command prints
     `linux-image-ev3dev-ev3 is already the newest version.` there was no new
     kernel available, and you are done.
   - If the command does not output that line, you will need to reboot the EV3
     before the new kernel can be used. Do so through
     Brickman on the EV3 display or by running `sudo reboot`.

# Confirming that the upgrade worked

After the brick has rebooted (assuming you installed a new kernel version), press `About` on the brick's main menu and scroll down to "Kernel" to confirm it
has a current kernel.

{% include screenshot.html source="/images/brickman/about-kernel-version.png" caption="Brickman's about page" %}
