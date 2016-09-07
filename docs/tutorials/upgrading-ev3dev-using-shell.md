---
title: Upgrading ev3dev Using Shell
subject: System
---

{% include icon.html type="warning" %}
By upgrading ev3dev you are also upgrading the drivers, so there may be changes that break user software. 
You should check the ev3dev [news feed](http://www.ev3dev.org/news/) for breaking changes before upgrading.
{: .alert .alert-warning}

Once you've written the ev3dev image to the SD card, booted, and setup a network 
connection, you may want to update to the latest kernel.  To do so:

1. Connect to the ev3dev device using SSH.  (Wireless or USB.)  The default login is 
username=robot, password=maker.

2. Execute these commands in sequence:

    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get dist-upgrade
    sudo reboot

Wait for each command to complete before typing the next.  Some steps require 
confirmation to proceed.  Press 'y' when asked.  

{% include icon.html type="warning" %}
The `upgrade` step may take a couple hours to complete.
{: .alert .alert-warning}

3. After the brick has rebooted, press `About` on the brick's menu to confirm it
has a current kernel.
