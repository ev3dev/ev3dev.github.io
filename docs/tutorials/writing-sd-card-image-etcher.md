---
title: Writing an SD Card Image Using Etcher (Cross-Platform)
subject: SD Card Image
---

1. Download and install Etcher from [their website](http://etcher.io).
2. Launch Etcher after it has finished installing.

   <div>{% include screenshot.html source="/images/etcher/home.png" caption="Etcher home screen" %}</div>

3. Click the "Select image" button and browse to the folder where you
   downloaded an ev3dev release. Select the file that you downloaded.
   The release can be a `.img.zip`, `.img.xz` or just `.img`; whichever
   you have will work with Etcher.

   <div>{% include screenshot.html source="/images/etcher/image-selected.png" caption="Image chosen in Etcher" %}</div>

4. Plug the SD card into your PC (if your PC doesn't have a micro SD
   slot, you can use an adapter or external reader). Etcher should
   detect the new device and display its information under the "Select
   drive" step. Confirm that the selected drive is correct.
   - If you have multiple removable drives available, you may need to
     use the "Change" button to select the proper device.

   <div>{% include screenshot.html source="/images/etcher/drive-selected.png" caption="Drive selected in Etcher" %}</div>

5. When you are confident that you have selected the correct drive,
   click "Flash!" and wait for the operation to complete.
   
   <div>{% include screenshot.html source="/images/etcher/flash-started.png" caption="Etcher flashing the SD card" %}</div>