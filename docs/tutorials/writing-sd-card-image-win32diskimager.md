---
title: Writing an SD Card Image Using Win32DiskImager
subject: SD Card
---

1. Open up the folder where you downloaded the image file from GitHub.

2. Right-click it, click "Extract All",
and choose a location to extract the image to.

    {% include screenshot.html source="/images/Windows-SD-Flash/Extract-zip.png" %}

3. If you haven't already, download and run the latest installer
for Win32 Disk Imager from [here][imager] and wait for it to finish installing.

4. Make sure that your SD card is plugged in to the computer now.
It will only recognize drives that are plugged in before you start
the imaging program.

5. Start the application that was just installed, and select the `.img` file
that we extracted earlier.
Make sure to select your SD card's drive letter from the list,
and verify that it is the correct device.


    {% include screenshot.html source="/images/Windows-SD-Flash/Image-writer.png" %}

6. Click the  "Write" button.
This is your last chance to stop the process; after you write the image,
ALL data stored on your SD card will be lost.
If you are sure that you would like to continue,
accept the warning to start the installation.

    {% include screenshot.html source="/images/Windows-SD-Flash/Image-writer-warning.png" %}

7. This may take a few minutes, so be patient while it finishes.
Once it's done, you can eject the SD card from the system tray and unplug it from the computer.

[imager]: http://sourceforge.net/projects/win32diskimager/files/latest/download
