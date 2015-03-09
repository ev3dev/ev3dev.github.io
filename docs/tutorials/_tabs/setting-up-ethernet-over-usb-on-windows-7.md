1.  On the EV3, first verify that the RNDIS driver is enabled. In brickman,
    open the *Wireless and Networks* menu and select *USB*. Make sure *RNDIS*
    is selected and active.

    {% include screenshot.html source="/images/brickman/usb-rndis-active.png" %}

2.  Connect your EV3 to your Windows computer using the USB cable that came with
    the EV3.

3.  When it is connected, Windows will automatically install a driver for it.
    **It installs the wrong driver!** We need to fix this. Open up *Control
    Panel > Hardware and Sound* and select *Device Manager*

    {% include screenshot.html source="/images/WindowsRNDIS/control-panel-hard-and-sound-device-manager.png" %}

4.  In *Device Manager*, find your EV3's RNDIS device. It is under *Network
    Adapters > USB Ethernet/RNDIS Gadget*.


    {% include screenshot.html source="/images/WindowsRNDIS/device-manager-ethernet-usb-rndis-gadget.png" %}

5.  Double-click it and select the *Drivers* tab. It says that it is using an
    Acer driver, which doesn't work properly with ev3dev. Click *Update
    driver...* to change the driver.

    {% include screenshot.html source="/images/WindowsRNDIS/usb-ethernt-rndis-gadget-properties-acer.png" %}

6.  Select *Browse my computer for driver software*.

    {% include screenshot.html source="/images/WindowsRNDIS/update-driver-software-usb-ethernet-rndis-gadget.png" %}

7.  Then *Let me pick from a list of device drivers on my computer*.

    {% include screenshot.html source="/images/WindowsRNDIS/update-driver-software-usb-ethernet-rndis-gadget-2.png" %}

8.  Uncheck the box that says *Show compatible hardware*. In the *Manufacturer*
    list, pick *Microsoft Corporation* (in Windows 8, pick *Microsoft*). In
    the *Network Adapter* list, pick *Remote NDIS Compatible Device*. Then
    click *Next*.

    {% include screenshot.html source="/images/WindowsRNDIS/update-driver-software-usb-ethernet-rndis-gadget-3.png" %}

9.  Windows thinks we don't know what we are doing, but really we do, so click
    *Yes*.

    {% include screenshot.html source="/images/WindowsRNDIS/update-driver-warning.png" %}

10. When it is done installing, click *Close*.

    {% include screenshot.html source="/images/WindowsRNDIS/update-driver-software-usb-ethernet-rndis-gadget-4.png" %}

11. Yea! We have the right driver now! Click *Close* again. You can close the
    *Device Manager* too. We are done with it.

    {% include screenshot.html source="/images/WindowsRNDIS/usb-ethernt-rndis-gadget-properties-microsoft.png" %}

12. Now, open up the *Network and Sharing Center* either using the notification
    tray icon or using *Control Panel > Network and Internet > Network and
    Sharing Center*. Click on *Change adapter settings*.

    {% include screenshot.html source="/images/WindowsRNDIS/Network-and-Sharing-Center-Change-adapter-settings.png" %}

13. There will be a connection that says *USB Ethernet/RNDIS Gadget*.

    {% include screenshot.html source="/images/WindowsRNDIS/Network-Connections.png" %}

14. This is the EV3. Let's rename it so it is easy to identify. Right-click the
    *USB Ethernet/RNDIS* adapter and select *Rename*. Call it EV3 or whatever
    you like.

    {% include screenshot.html source="/images/WindowsRNDIS/Network-Connections-Rename.png" %}

15. If you don't need to access the Internet from your EV3 over this
    connection, manually configure the IP address to `192.168.137.1`. Note:
    you won't be able to update packages without an Internet connection.

    TODO: Need detailed description with screenshots.

    Then skip to step 18.

    If you do want to be able to connect to the Internet from the EV3, continue
    with the next step.

16. To share our Internet connection with the EV3, Double-click the other
    network connection (**not** the one we just renamed). This will show the
    connection status. If you have more than one other connection, you will
    want to verify that this connection is indeed the Internet connection.

    {% include screenshot.html source="/images/WindowsRNDIS/Local-Area-Connection-Status.png" %}

17. Click on the *Properties* button. In the window that opens, select the
    *Sharing* tab and check the box that says *Allow other network users to
    connect through this computer's Internet connection*.

    {% include screenshot.html source="/images/WindowsRNDIS/Local-Area-Connection-Properties-Sharing.png" %}

    If you have more than two network connections, it will ask for a "Home
    networking connection". If you see this, select your EV3's network adapter
    from the list (this will be called *EV3* if you renamed it earlier in the
    guide).

    {% include screenshot.html source="/images/WindowsRNDIS/Local-Area-Connection-Properties-Sharing-with-Extra-Selection.png" %}

    Click *OK* when you are done and close the status window as well. Windows
    will automatically reconfigure your other network connections.

18. Now, we need to assign an IP address to our EV3. In brickman, go to
    *Networking* and select *Manage connections...*, then select the *Wired*
    connection.

    {% include screenshot.html source="/images/brickman/networking-connections-wired-only.png" %}

    On the *IPv4* tab, select *Change...*.

    {% include screenshot.html source="/images/brickman/networking-ipv4-tab-change-selected.png" %}

    Then choose *Load Windows Defaults*.

    {% include screenshot.html source="/images/brickman/networking-load-windows-defaults.png" %}

    The settings on the *IPv4* tab will remain blank because we are not
    connected yet. On the *Conn.* tab, check the box for *Connect automatically*.
    This way you don't have to connect manually after you reboot.

    {% include screenshot.html source="/images/brickman/networking-connect-automatically-selected.png" %}

    Then select *Connect*. *State* should change to *Online*. Go back to
    the *IPv4* tab. It will show the IP address of your EV3.

    {% include screenshot.html source="/images/brickman/networking-ipv4-tab-with-windows-defaults.png" %}

19. Now we are going to connect to the EV3 using ssh. To do this, you need a
    program called [PuTTY].

    Start PuTTY. In the *PuTTY Configuration* window, type the IP address that
    we just saw (`192.168.137.3`). Then click the *Open* button to connect.

    {% include screenshot.html source="/images/WindowsRNDIS/WindowsRNDISPutty.png" %}

    The first time you connect, you'll get a warning about the new RSA fingerprint.

    {% include screenshot.html source="/images/WindowsRNDIS/WindowsRNDISPuttyFingerprint.png" %}

    Once you're connected, type in the userid as `root` and the password as `r00tme` and you should be connected.

    {% include screenshot.html source="/images/WindowsRNDIS/WindowsRNDISPuttyConnected.png" %}

[PuTTY]: http://www.chiark.greenend.org.uk/%7Esgtatham/putty/