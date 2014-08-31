---
title: Writing an ev3dev Image file to SD Using Graphical Interface Tools on Ubuntu
index: wiki
---

1. Open up the folder where you downloaded the ev3dev image file
2. Right-click and select *Extract Here* to uncompress the file

    <a href="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu1.png"><img height="50%" width="50%" src="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu1.png" /></a>

3. This will extract a single file with the same name minus the `.xz` (or `.zip`). Right-click this new file and select *Open With > Disk Image Writer*.

    <a href="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu2.png"><img height="50%" width="50%" src="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu2.png" /></a>

4. Make sure your SD card is plugged in and select it from the list, then click *Start Restoring...*.

    <a href="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu3.png"><img height="50%" width="50%" src="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu3.png" /></a>

5. Heed the warning. This is your last change to backup any files on your SD card. When you are ready, click *Restore*.

    <a href="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu4.png"><img height="50%" width="50%" src="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu4.png" /></a>

6. Yes, this requires root privileges, so type in your password and click *Authenticate*

    <a href="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu5.png"><img height="50%" width="50%" src="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu5.png" /></a>

6. Wait for it... This could take a while depending on the speed and size of your SD card.

7. When it is done copying the image, you should see something like this. Select the EV3_BOOT partition and click the &#9654; button to mount it (this will be needed in the next step of [[Getting Started v2]].

    <a href="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu6.png"><img height="50%" width="50%" src="https://raw.githubusercontent.com/wiki/mindboards/ev3dev/images/Ubuntu-SD-Flash/ubuntu6.png" /></a>
