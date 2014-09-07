---
title: Connecting via USB on Windows
index: wiki
---

If you have not already, make sure you have followed the instructions in [Getting Started Step 4](Getting-started-v2#step-4-enable-usb-networking).

1. When you plug in your EV3 via USB while ev3dev is running Windows will automatically install a driver for it. **It installs the wrong driver!** We need to fix this. Open up *Control Panel > Hardware and Sound* and select *Device Manager*

    ![Control Panel > Hardware and Sound > Device Manager](images/WindowsRNDIS/control-panel-hard-and-sound-device-manager.png)

2. In *Device Manager*, find your EV3's RNDIS device. It is under *Network Adapters > USB Ethernet/RNDIS Gadget*.

    ![Device Manager > Network Adapters > USB Ethernet/RNDIS Gadget](images/WindowsRNDIS/device-manager-ethernet-usb-rndis-gadget.png)

3. Double-click it and select the *Drivers* tab. It says that it is using an Acer driver, which doesn't work properly with ev3dev. Click *Update driver...* to change the driver.

    ![USB Ethernet/RNDIS Gadget Properties (Acer)](images/WindowsRNDIS/usb-ethernt-rndis-gadget-properties-acer.png)

4. Select *Browse my computer for driver software*.

    ![Update Driver Software - USB Ethernet/RNDIS Gadget > Browse my computer for driver software](images/WindowsRNDIS/update-driver-software-usb-ethernet-rndis-gadget.png)

5. Then *Let me pick from a list of device drivers on my computer*.

    ![Update Driver Software - USB Ethernet/RNDIS Gadget > Let me pick from a list of device drivers on my computer](images/WindowsRNDIS/update-driver-software-usb-ethernet-rndis-gadget-2.png)

6. Uncheck the box that says *Show compatible hardware*. In the *Manufacturer* list, pick *Microsoft Corporation* (in Windows 8, pick *Microsoft*). In the *Network Adapter* list, pick *Remote NDIS Compatible Device*. Then click *Next*.

    ![Update Driver Software - USB Ethernet/RNDIS Gadget > Select Network Adapter](images/WindowsRNDIS/update-driver-software-usb-ethernet-rndis-gadget-3.png)

7. Windows thinks we don't know what we are doing, but really we do, so click *Yes*.

    ![Update Driver Warning](images/WindowsRNDIS/update-driver-warning.png)

8. When it is done installing, click *Close*.

    ![Update Driver Software - USB Ethernet/RNDIS Gadget > Windows has successfully updated your driver software](images/WindowsRNDIS/update-driver-software-usb-ethernet-rndis-gadget-4.png)

8. Yea! We have the right driver now! Click *Close* again. You can close the *Device Manager* too. We are done with it.

    ![USB Ethernet/RNDIS Gadget Properties (Microsoft)](images/WindowsRNDIS/usb-ethernt-rndis-gadget-properties-microsoft.png)

1. Now, open up the *Network and Sharing Center* either using the notification tray icon or using *Control Panel > Network and Internet > Network and Sharing Center*. Click on *Change adapter settings*.

    ![Network and Sharing Center Image](images/WindowsRNDIS/Network-and-Sharing-Center-Change-adapter-settings.png)

2. There will be a connection that says *USB Ethernet/RNDIS Gadget*.

    ![AddNewDevice](images/WindowsRNDIS/Network-Connections.png)

3. This is the EV3. Let's rename it so it is easy to identify. Right-click the *USB Ethernet/RNDIS* adapter and select *Rename*. Call it EV3 or whatever you like.

    ![AddNewDevice](images/WindowsRNDIS/Network-Connections-Rename.png)

4. Now, we need to share our Internet connection with the EV3. Double-click the other network connection (**not** the one we just renamed). This will show the connection status. If you have more than one other connection, you will want to verify that this connection is indeed the Internet connection.

    ![CDC-Connected](images/WindowsRNDIS/Local-Area-Connection-Status.png)

5. Click on the *Properties* button. In the window that opens, select the *Sharing* tab and check the box that says *Allow other network users to connect through this computer's Internet connection*.  

    ![CDC-Connected](images/WindowsRNDIS/Local-Area-Connection-Properties-Sharing.png)
    

    If you have more than two network connections, it will ask for a "Home networking connection". If you see this, select your EV3's network adapter from the list (this will be called *EV3* if you renamed it earlier in the guide).

    ![Extra-Options](images/WindowsRNDIS/Local-Area-Connection-Properties-Sharing-with-Extra-Selection.png)

    Click *OK* when you are done and close the status window as well. Windows will automatically reconfigure your other network connections.

4. Now, we need to find out what IP address our EV3 has. Windows is not very nice and will not tell us what it is. So, you have can do one of these two options.

    * You can plug a USB keyboard into the EV3 and log in. Run `ifconfig` to show the network status. Use Shift+PgUp if you need to scroll. Look for usb0. It should have an address assigned of 192.168.137.*.

    * We know the address starts with "192.168.137.", so we can just try pinging all 253 possible addresses. On a command prompt in Windows, run:

            C:\>for /l %x in (2,1,254) do ping -n 1 -w 10 192.168.137.%x | find "Reply"

        Watch for the line that has a reply and that is the address of your EV3.

6. Now we are going to connect to the EV3 using ssh. To do this, you need a program called [PuTTY](http://www.chiark.greenend.org.uk/%7Esgtatham/putty/).

    Start PuTTY. In the *PuTTY Configuration* window, type the IP address that you found in the box that says *Host Name (or IP Address)*. It will be different from the one in the screenshot. Then click the *Open* button to connect.

    ![WindowsRNDISPutty](images/WindowsRNDIS/WindowsRNDISPutty.png)

    The first time you connect, you'll get a warning about the new RSA fingerprint.

    ![WindowsRNDISPuttyFingerprint](images/WindowsRNDIS/WindowsRNDISPuttyFingerprint.png)

    Once you're connected, type in the userid as `root` and the password as `r00tme` and you should be connected.

    ![WindowsRNDISPuttyConnected](images/WindowsRNDIS/WindowsRNDISPuttyConnected.png)

7. Now check out the list of [first things](Getting-started-v2#step-7-first-things-to-do-with-ev3dev) you should do with ev3dev.
