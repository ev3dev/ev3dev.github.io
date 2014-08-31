---
title: Setting Up OSX USB Ethernet Networking
index: wiki
---

## <a name="ConnectingToOSXHost"/> Connecting to an OSX Host

Setting up USB Networking on an OSX host is not too bad. If you're not too familiar with dealing with adding devices on your OSX machine, get a friend to help. Once the setup is done, it's easy to connect to the EV3.

The first step is to make sure that the `ev3dev.rc.local` file on the FAT32 partition of the microUSB card that has the `ev3dev` image is set up to load the `g_cdc` module.

Then open up "About this Mac" under the Apple icon on the Finder menu, and check out the entries under "Hardware/USB". Look for and highlight the "CDC Composite Gadget".

It should look like this:

![DeviceReportCDC](images/OSXRNDIS/DeviceReportCDC.png)

Next, we need to give the device an address. Open up "System Preferences" and select the network icon...

![SystemPreferencesNetwork](images/OSXRNDIS/SystemPreferencesNetwork.png)

Once you get the "Network" dialog, click on the "+" in the lower left area to add the new CDC device. You'll need to select it in the drop down box. The name will be similar to what is shown below. I have named the service "ev3dev" so it's easier to keep track of later.

![AddNewDevice](images/OSXRNDIS/AddNewDevice.png)

## <a name="SettingIPAddress"/> Set the IP Address

From here, it's a simple matter of setting the IP address and mask for the service. Again, I'm using the suggested default for the host of `192.168.2.1`

![SetIPv4Address](images/OSXRNDIS/SetIPv4Address.png)

## <a name="TestAndConnect"/> Test And Connect To the EV3

Now it's time to test things - a simple ping of the target address (I'm assuming the default) should look like this:

![PingWorks](images/OSXRNDIS/PingWorks.png)

For `ssh` access to the EV3 under OSX, you can use the good old `ssh` program from the terminal window. I'm sure there are other solutions, and if you send me your suggestoins I'll add them to a list.

Just type `ssh root@192.168.2.100` and you'll get something like the following screenshot. The fingerprint warning only shows up the first time for a specific EV3 if you're lucky enough to have more than one.

![sshWorks](images/OSXRNDIS/sshWorks.png)

All done, now you can conenct directly to the EV3 over a USB cable!
