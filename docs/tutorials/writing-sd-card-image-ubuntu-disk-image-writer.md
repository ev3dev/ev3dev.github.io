---
title: Writing an SD Card Image Using Ubuntu Disk Image Writer
group: sd-card-image
---

{% include /docs/imaging-tutorial-etcher-banner.html %}

1.  Open up the folder where you downloaded the ev3dev image file

2.  Right-click and select *Extract Here* to uncompress the file

	{% include /util/screenshot.html source="/images/Ubuntu-SD-Flash/ubuntu1.png" scale="50" %}

3.  This will extract a single file with the same name minus the `.xz` (or
    `.zip`). Right-click this new file and select *Open With > Disk Image Writer*.

    {% include /util/screenshot.html source="/images/Ubuntu-SD-Flash/ubuntu2.png" scale="50" %}

4.  Make sure your SD card is plugged in and select it from the list, then click
    *Start Restoring...*.

    {% include /util/screenshot.html source="/images/Ubuntu-SD-Flash/ubuntu3.png" scale="50" %}

5. Heed the warning. This is your last change to backup any files on your SD
   card. When you are ready, click *Restore*.

    {% include /util/screenshot.html source="/images/Ubuntu-SD-Flash/ubuntu4.png" scale="50" %}

6.  Yes, this requires root privileges, so type in your password and click
    *Authenticate*

    {% include /util/screenshot.html source="/images/Ubuntu-SD-Flash/ubuntu5.png" scale="50" %}

6.  Wait for it... This could take a while depending on the speed and size of
    your SD card.

7. When it is done, click the eject button and remove the SD Card.

    {% include /util/screenshot.html source="/images/Ubuntu-SD-Flash/ubuntu6.png" scale="50" %}