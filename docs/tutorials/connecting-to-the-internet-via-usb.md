---
title: Connecting to the Internet via USB
subject: Networking
---


__Note:__ If you do not need to access the Internet from the EV3 brick, consider
using [tethering] instead.

[tethering]: /docs/tutorials/using-usb-tethering

---

These instructions are for [brickman v0.5.0](http://www.ev3dev.org/news/2015/02/24/Package-Release/).
If you are using an older version, please upgrade.

*   {: tab="Mac OSX"}Note: These instructions were written using OSX version 10.9,
    but should work for other versions as well.

    1.  On the EV3, first verify that the CDC driver is enabled. In brickman,
        open the *Wireless and Networks* menu and select *USB*. Make sure *CDC* is
        selected and active.

        {% include screenshot.html source="/images/brickman/usb-cdc-active.png" %}

    2.  On your Mac, open up *System Preferences* and select *Network*.

        {% include screenshot.html source="/images/OSXRNDIS/SystemPreferencesNetwork.png" %}

    3.  Once you get the *Network* dialog, click on the `+` icon in the lower left
        area to add a new network device. You'll need to select the CDC Composite
        Gadget in the drop down box. The name will be similar to what is shown
        below. I have renamed the service "ev3dev" so it's easier to keep track of
        later. Click *Create* when you are done.

        {% include screenshot.html source="/images/OSXRNDIS/AddNewDevice.png" %}

    4.  Click *Apply* to save your changes. After a short time, the ev3dev entry
        (or whatever you named it) should show connected and have a Self-Assigned
        IP address

        {% include screenshot.html source="/images/OSXRNDIS/CDC-Connected.png" %}

    5. If you don't need to access the Internet from your EV3 over this
        connection, manually configure the IP address to `192.168.2.1`. Note:
        you won't be able to update packages without an Internet connection.

        TODO: Need detailed description with screenshots.

        Then skip to step 7.

        If you do want to be able to connect to the Internet from the EV3, continue
        with the next step.

    6.  To share our Internet connection with the EV3. Go back to *System
        Preferences* and select *Sharing*.

        {% include screenshot.html source="/images/OSXRNDIS/SystemPreferencesSharing.png" %}

        Click *Internet Connection* on the left, but don't check the box yet. On
        the right, *Share your connection from:* will be *Wi-Fi* (or *Ethernet* if
        you have a wired connection). Also check the box next to *CDC Composite
        Gadget*

        {% include screenshot.html source="/images/OSXRNDIS/Sharing-Internet-Connection.png" %}

        Now check the box next to *Internet Connection* on the left to enable it.
        Read the warning and then click *Start*.

        {% include screenshot.html source="/images/OSXRNDIS/Sharing-Internet-Connection-Warning.png" %}

    7.  Now, we need to assign an IP address to our EV3. In brickman, go to
        *Networking* and select *Manage connections...*, then select the *Wired*
        connection.

        {% include screenshot.html source="/images/brickman/networking-connections-wired-only.png" %}

        On the *IPv4* tab, select *Change...*.

        {% include screenshot.html source="/images/brickman/networking-ipv4-tab-change-selected.png" %}

        Then choose *Load Mac Defaults*.

        {% include screenshot.html source="/images/brickman/networking-load-mac-defaults.png" %}

        The settings on the *IPv4* tab will remain blank because we are not
        connected yet. On the *Conn.* tab, check the box for *Connect automatically*.
        This way you don't have to connect manually after you reboot.

        {% include screenshot.html source="/images/brickman/networking-connect-automatically-selected.png" %}

        Then select *Connect*. *State* should change to *Online*. Go back to
        the *IPv4* tab. It will show the IP address of your EV3.

        {% include screenshot.html source="/images/brickman/networking-ipv4-tab-with-mac-defaults.png" %}

    8.  For `ssh` access to the EV3 under OS X, you can use the good old `ssh`
        program from the terminal window. I'm sure there are other solutions, and
        if you send me your suggestions I'll add them to a list.

        In a terminal, run the following command.

            host:~ user$ ssh root@192.168.2.3

        If you have never connected before, you will prompted to confirm the
        authenticity of the host, so type `yes` when prompted.

            The authenticity of host '192.168.2.3 (192.168.2.3)' can't be established.
            RSA key fingerprint is xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx.
            Are you sure you want to continue connecting (yes/no)? yes
            Warning: Permanently added '192.168.2.3' (RSA) to the list of known hosts.

        The default root password is `r00tme`.

            root@192.168.3.1's password: 
            Linux ev3dev 3.3.0-0-ev3dev #2 PREEMPT Wed Mar 19 20:10:05 CDT 2014 armv5tejl
                         _____     _
               _____   _|___ /  __| | _____   __
              / _ \ \ / / |_ \ / _` |/ _ \ \ / /
             |  __/\ V / ___) | (_| |  __/\ V /
              \___| \_/ |____/ \__,_|\___| \_/
            
            Debian jessie on LEGO MINDSTORMS EV3!
            
            The programs included with the Debian GNU/Linux system are free software;
            the exact distribution terms for each program are described in the
            individual files in /usr/share/doc/*/copyright.
            
            Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
            permitted by applicable law.
            root@ev3dev:~# 

*   {: tab="Ubuntu"}Note: This instructions are written for Ubuntu 14.04 using
    the default desktop (aka Unity).

    1.  On the EV3, first verify that the CDC driver is enabled. In brickman,
        open the *Wireless and Networks* menu and select *USB*. Make sure *CDC* is
        selected and active.

        {% include screenshot.html source="/images/brickman/usb-cdc-active.png" %}

    2.  On your host computer, with the EV3 connected via USB, open up *System Settings* and select *Network*

        {% include screenshot.html source="/images/Ubuntu-CDC/System-Settings-Network.png" %}

    3.  In the *Network* dialog, you should see a Wired connection that says
        *Connecting*. It may say *Disconnected* instead if it has timed out already.
        You can also idetentify the connection by the *Hardware Address* - it will
        start with `12:16:53`. Click the *Options...* button for this connection.

        {% include screenshot.html source="/images/Ubuntu-CDC/Network-Connecting.png" %}

    4.  In the dialog that open, change the *Connection Name* to whatever you want
        (using *ev3dev* here). Select the *IPv4 Settings* tab and change the
        *Method* to *Shared to other computers*.

        {% include screenshot.html source="/images/Ubuntu-CDC/Network-Options.png" %}

        Click *Save...* when you are done. The connection will now say that it is
        connected.

        {% include screenshot.html source="/images/Ubuntu-CDC/Network-Connected.png" %}

    5.  Now, we need to assign an IP address to our EV3. In brickman, go to
        *Wireless and Networks* and select *All Network Connections*, then select
        the *Wired* connection with the USB icon.

        {% include screenshot.html source="/images/brickman/networking-connections-wired-only.png" %}

        On the *IPv4* tab, select *Change...*.

        {% include screenshot.html source="/images/brickman/networking-ipv4-tab-change-selected.png" %}

        Then choose *Load Linux Defaults*.

        {% include screenshot.html source="/images/brickman/networking-load-linux-defaults.png" %}

        The settings on the *IPv4* tab will remain blank because we are not
        connected yet. On the *Conn.* tab, check the box for *Connect automatically*.
        This way you don't have to connect manually after you reboot.

        {% include screenshot.html source="/images/brickman/networking-connect-automatically-selected.png" %}

        Then select *Connect*. *State* should change to *Online*. Go back to
        the *IPv4* tab. It will show the IP address of your EV3.

        {% include screenshot.html source="/images/brickman/networking-ipv4-tab-with-linux-defaults.png" %}

    6.  Now we are going to connect to the EV3 using ssh.

            user@host:~$ ssh root@10.42.0.3

        If you have never connected before, you will prompted to confirm the
        authenticity of the host, so type `yes` when prompted.

            The authenticity of host '10.42.0.3 (10.42.0.3)' can't be established.
            ECDSA key fingerprint is be:9e:66:8b:d1:14:b8:8a:ea:4c:6e:07:2d:d9:68:05.
            Are you sure you want to continue connecting (yes/no)? yes
            Warning: Permanently added '10.42.0.3' (ECDSA) to the list of known hosts.

        The default root password is `r00tme`.

            root@10.42.0.3's password: 
            Linux ev3dev 3.3.0-0-ev3dev #2 PREEMPT Wed Mar 19 20:10:05 CDT 2014 armv5tejl
                         _____     _
               _____   _|___ /  __| | _____   __
              / _ \ \ / / |_ \ / _` |/ _ \ \ / /
             |  __/\ V / ___) | (_| |  __/\ V /
              \___| \_/ |____/ \__,_|\___| \_/
            
            Debian jessie on LEGO MINDSTORMS EV3!
            
            The programs included with the Debian GNU/Linux system are free software;
            the exact distribution terms for each program are described in the
            individual files in /usr/share/doc/*/copyright.
            
            Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
            permitted by applicable law.
            root@ev3dev:~# 


*   {: tab="Windows"}

    *   {: tab="7/8"}

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

    *   {: tab="10"}
        1.  On the EV3, first verify that the RNDIS driver is enabled. In brickman,
            open the *Wireless and Networks* menu and select *USB*. Make sure *RNDIS*
            is selected and active.

            {% include screenshot.html source="/images/brickman/usb-rndis-active.png" %}

        2.  Connect your EV3 to your Windows computer using the USB cable that came with
            the EV3.

        3.  When it is connected, Windows will automatically install a driver for it.
            **It installs the wrong driver!** We need to fix this. We've created
            a Windows .inf file to work around this. Right-click [linux.inf] and
            select *Save Link As...* to download the file (if you don't right-click,
            it will just open in the browser).

        4.  Now, we need to reboot your computer in a mode that allows unsigned
            drivers. Make sure all other programs are closed and all your work
            is saved. Then open up Windows Settings (*Start > Settings*). Select
            *Update & security*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/windows-settings-update-and-security.png" %}

        5.  Select *Recovery* in the list on the left, then click *Restart Now*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/windows-settings-recovery-restart-now.png" %}

        6.  Windows will start to shut down, then it will give you some options.
            Choose *Troubleshoot*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/restart-options.png" scale="30" %}

        7.  Then choose *Advanced Options*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/restart-troubleshoot.png" scale="30" %}

        8.  Then *Startup Settings*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/restart-advanced-options.png" scale="70" %}

        9.  And finally click *Restart*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/restart-startup-settings.png" scale="70" %}

        10. After your computer reboots, you will be prompted with a menu. Press
            *7* to *Disable driver signature enforcement*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/startup-settings.png" scale="70" %}

        11. After Windows finishes booting and you have logged in, in the search
            bar, type in *Device Manager* and then click to open it.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/start-menu-device-manager.png" %}

        12. In *Device Manager*, find your EV3's RNDIS device. It is under *Network
            Adapters > USB Ethernet/RNDIS Gadget*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/device-manager-ethernet-usb-rndis-gadget.png" %}

        13. Double-click it and select the *Drivers* tab. It says that it is using an
            Acer driver, which doesn't work properly with ev3dev. Click *Update
            driver...* to change the driver.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/usb-ethernt-rndis-gadget-properties-acer.png" %}

        14. Select *Browse my computer for driver software*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/update-driver-software-usb-ethernet-rndis-gadget.png" %}

        15. Then *Let me pick from a list of device drivers on my computer*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/update-driver-software-usb-ethernet-rndis-gadget-2.png" %}

        16. Select *Have Disk*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/update-driver-software-usb-ethernet-rndis-gadget-3.png" %}

        17. Click *Browse...*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/install-from-disk-1.png" %}

        18. Navigate to the location that you saved the `linux.inf` file earlier.
            Select it and click *Open*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/locate-file-linux-inf.png" %}

        19. Click *OK*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/install-from-disk-2.png" %}

        20. Pick *Remote NDIS Compatible Device* from the list, then click *Next*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/update-driver-software-usb-ethernet-rndis-gadget-4.png" %}

        21. Windows doesn't like the fact that our .inf file is not signed. Don't
            worry, it just installs the Microsoft RNDIS driver (which is signed).
            Nothing really dangerous here. Click *Install this driver software anyway*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/windows-security-install-anyway.png" %}

        21. When it is done installing, click *Close*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/update-driver-software-usb-ethernet-rndis-gadget-5.png" %}

        22. Yea! We have the right driver now! Click *Close* again. You can close the
            *Device Manager* too. We are done with it.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/usb-ethernt-rndis-gadget-properties-ev3dev.png" %}

        23. Now, open up the *Network & Internet* settings either using the notification
            tray icon or the Start menu. Select *Ethernet* on the left, then click
            on *Change adapter options*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/settings-network-and-internet-ethernet.png" %}

        24. There will be a connection that says *USB Ethernet/RNDIS Gadget*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/network-connections.png" %}

        25. This is the EV3. Let's rename it so it is easy to identify. Right-click the
            *USB Ethernet/RNDIS* adapter and select *Rename*. Call it EV3 or whatever
            you like.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/network-connections-rename.png" %}

        26. If you don't need to access the Internet from your EV3 over this
            connection, manually configure the IP address to `192.168.137.1`. Note:
            you won't be able to update packages without an Internet connection.

            TODO: Need detailed description with screenshots.

            Then skip to step 18.

            If you do want to be able to connect to the Internet from the EV3, continue
            with the next step.

        27. To share our Internet connection with the EV3, Double-click the other
            network connection (**not** the one we just renamed). This will show the
            connection status. If you have more than one other connection, you will
            want to verify that this connection is indeed the Internet connection.
            Click on the *Properties* button.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/ethernet-status.png" %}

        28. In the window that opens, select the *Sharing* tab and check the box
            that says *Allow other network users to connect through this computer's
            Internet connection*.

            {% include screenshot.html source="/images/screenshots/windows/10/rndis/ethernet-properties-sharing.png" %}

            Click *OK* when you are done and close the status window as well. Windows
            will automatically reconfigure your other network connections.

        29. Now, we need to assign an IP address to our EV3. In brickman, go to
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

        30. Now we are going to connect to the EV3 using ssh. To do this, you need a
            program called [PuTTY].

            Start PuTTY. In the *PuTTY Configuration* window, type the IP address that
            we just saw (`192.168.137.3`). Then click the *Open* button to connect.

            {% include screenshot.html source="/images/WindowsRNDIS/WindowsRNDISPutty.png" %}

            The first time you connect, you'll get a warning about the new RSA fingerprint.

            {% include screenshot.html source="/images/WindowsRNDIS/WindowsRNDISPuttyFingerprint.png" %}

            Once you're connected, type in the userid as `root` and the password as `r00tme` and you should be connected.

            {% include screenshot.html source="/images/WindowsRNDIS/WindowsRNDISPuttyConnected.png" %}
    {: tab-list="os-version"}
{: tab-list="os"}


[PuTTY]: http://www.chiark.greenend.org.uk/%7Esgtatham/putty/
[linux.inf]: https://raw.githubusercontent.com/ev3dev/ev3-kernel/ev3dev-jessie/Documentation/usb/linux.inf
