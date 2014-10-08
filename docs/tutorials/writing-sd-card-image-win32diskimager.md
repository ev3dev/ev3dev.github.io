---
title: Writing an SD Card Image Using Win32DiskImager
subject: SD Card Image
---

1. Open up the folder where you downloaded the image file

2. Right-click it, click "Extract All", and choose a location to extract it to

    {% include screenshot.html source="/images/Windows-SD-Flash/Extract-zip.png" scale="50" %}

3. If you haven't already, download and run the latest installer for Win32 Disk Imager from [here](http://sourceforge.net/projects/win32diskimager/files/latest/download) and wait for it to finish installing

4. Start the application, and select the `.img` file that we extracted earlier

    {% include screenshot.html source="/images/Windows-SD-Flash/Image-writer.png" scale="50" %}

5. Make sure that your SD card is plugged in to the computer, and choose it's drive letter from the list

6. Select "Write", and accept the warning to initiate the process of writing the image to the SD card

    {% include screenshot.html source="/images/Windows-SD-Flash/Image-writer-warning.png" scale="50" %}

7. It may take a few minutes, so be patient while it finishes. Once it's done, you can eject the SD card from the system tray and unplug it from the computer.