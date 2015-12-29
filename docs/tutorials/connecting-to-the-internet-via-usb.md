---
title: Connecting to the Internet via USB
subject: Networking
---

<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
If you do not need to access the Internet from the EV3 brick, consider
using [tethering] instead.
{: class="alert alert-info"}

[tethering]: /docs/tutorials/using-usb-tethering

<span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>
These instructions are for [brickman v0.7.1](http://www.ev3dev.org/news/2015/02/24/Package-Release/).
If you are using an older version, please upgrade.
{: class="alert alert-warning"}

*   {: tab="Mac OSX"}<span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>
    If you are using OS X version 10.11, this won't work. Apple broke the USB/CDC
    gadget driver and has not fixed it yet (as of version 10.11.2). Please
    [file a bug with Apple](https://bugreport.apple.com/) and politely ask them
    to fix it.
    {: class="alert alert-warning"}

    <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
    These instructions were written using OS X version 10.9, but should work for
    other versions as well.
    {: class="alert alert-info"}

    1.  Use the USB cable provided with the EV3 to connect the EV3 to your Mac.
        On your Mac, open up *System Preferences* and select *Network*.

        {% include screenshot.html source="/images/osx/10.9/SystemPreferencesNetwork.png" %}

    2.  Once you get the *Network* dialog, click on the `+` icon in the lower left
        area to add a new network device. You'll need to select the CDC Composite
        Gadget in the drop down box. The name will be similar to what is shown
        below. I have renamed the service "ev3dev" so it's easier to keep track of
        later. Click *Create* when you are done.

        {% include screenshot.html source="/images/osx/10.9/AddNewDevice.png" %}

    3.  Click *Apply* to save your changes. After a short time, the ev3dev entry
        (or whatever you named it) should show connected and have a Self-Assigned
        IP address

        {% include screenshot.html source="/images/osx/10.9/CDC-Connected.png" %}

    4.  To share our Internet connection with the EV3. Go back to *System
        Preferences* and select *Sharing*.

        {% include screenshot.html source="/images/osx/10.9/SystemPreferencesSharing.png" %}

    5.  Click *Internet Connection* on the left, but don't check the box yet. On
        the right, *Share your connection from:* will be *Wi-Fi* (or *Ethernet* if
        you have a wired connection). Also check the box next to *CDC Composite
        Gadget*

        {% include screenshot.html source="/images/osx/10.9/Sharing-Internet-Connection.png" %}

    6.  Now, check the box next to *Internet Connection* on the left to enable it.
        Read the warning and then click *Start*.

        {% include screenshot.html source="/images/osx/10.9/Sharing-Internet-Connection-Warning.png" %}

    7.  Time to switch to the EV3. On the EV3, go to *Wireless and Networks* and
        select *All Network Connections*, then select the *Wired* connection.

        {% include screenshot.html source="/images/brickman/networking-connections-wired-only.png" %}

    9.  The *Status* should change to *Connecting* and then *Online* to indicate
        that you are in fact connected to the Internet. You can also check the
        *Connect automatically* box so that this connection will come up automatically
        in the future.

        {% include screenshot.html source="/images/brickman/wired-status-online-connect-automatically-selected.png" %}

    9.  For `ssh` access to the EV3 under OS X, you can use the good old `ssh`
        program from the terminal window. In a terminal, run the following command.

            ssh robot@ev3dev.local

        <div class="alert alert-info" markdown="1">
        <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
        If you have never connected before, you will prompted to confirm the
        authenticity of the host, so type `yes` when prompted.

            The authenticity of host 'ev3dev.local (192.168.2.3)' can't be established.
            RSA key fingerprint is xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx.
            Are you sure you want to continue connecting (yes/no)? yes
            Warning: Permanently added 'ev3dev.local' (RSA) to the list of known hosts.
        </div>

    10. Enter your password when prompted. The default password is `ev3dev`.

            robot@ev3dev's password: 
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
            robot@ev3dev:~$ 

*   {: tab="Ubuntu"}<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
    This instructions were written using Ubuntu 15.10 using the default desktop
    (aka Unity) however, they should be similar for other versions of Ubuntu
    and its derivatives as well as other desktops like GNOME Shell, Cinnamon
    and MATE.
    {:class="alert alert-info"}

    1.  On your host computer, with the EV3 connected via USB, open up the
        network application indicator (1). You should already see an entry for
        *LEGO Group EV3+ev3dev* (2). Click *Edit Connections...* (3) to open
        `nm-connection-manager`.

        {% include screenshot.html source="/images/ubuntu/15.10/network-application-indicator-edit-connections.png" %}

    2.  In the *Network Connections* dialog, click the *Add...* button.

        {% include screenshot.html source="/images/ubuntu/15.10/network-connections-add.png" %}

    3.  Make sure *Ethernet* is selected (1) and then click *Create...* (2).

        {% include screenshot.html source="/images/ubuntu/15.10/choose-a-connection-type.png" %}

    4.  Enter a *Connection Name* (1) and select the *Device MAC Address* of your
        EV3 from the list (2). The name can be anything you like. The MAC address
        will always start with `12:16:53`, so choose that one.

        {% include screenshot.html source="/images/ubuntu/15.10/editing-ev3dev-ethernet.png" %}

    5.  Then click on the *IPv4 Settings* tab (1) and change the *Method* to
        *Shared to other computers* (2). Click *Save* (3) when you are done.

        {% include screenshot.html source="/images/ubuntu/15.10/editing-ev3dev-ipv4-settings.png" %}

    6.  There may be a message that the network is connected. Don't believe it.
        We still have to tell the EV3 to connect. You can close the *Network
        Connections* dialog. We are done with it.

        {% include screenshot.html source="/images/ubuntu/15.10/network-connections-close.png" %}

    7.  Now, we need to assign an IP address to our EV3. In brickman, go to
        *Wireless and Networks* and select *All Network Connections*, then select
        the *Wired* connection with the USB icon.

        {% include screenshot.html source="/images/brickman/networking-connections-wired-only.png" %}

    8.  Then select *Connect*.

        {% include screenshot.html source="/images/brickman/wired-status-disconnected-connect-selected.png" %}

    9.  The *Status* should change to *Connecting* and then *Online* to indicate
        that you are in fact connected to the Internet. You can also check the
        *Connect automatically* box so that this connection will come up automatically
        in the future.

        {% include screenshot.html source="/images/brickman/wired-status-online-connect-automatically-selected.png" %}

    10. Now we are going to connect to the EV3 using ssh. Type the following
        command in a terminal window.

            ssh robot@ev3dev.local

        <div class="alert alert-info" markdown="1">
        <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
        If you have never connected before, you will prompted to confirm the
        authenticity of the host, so type `yes` when prompted.

            The authenticity of host 'ev3dev.local (10.42.0.228)' can't be established.
            ECDSA key fingerprint is SHA256:LjEw+uEG5x7kl9LwVeynjeybuBHT3VQB5simpcVqmu8.
            Are you sure you want to continue connecting (yes/no)? yes
            Warning: Permanently added 'ev3dev.local,10.42.0.228' (ECDSA) to the list of known hosts.
            Warning: Permanently added '10.42.0.228' (ECDSA) to the list of known hosts.
        </div>

    11. Enter you password when prompted. The default password is `ev3dev`.

            robot@ev3dev.local's password: 
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
            robot@ev3dev:~$ 


*   {: tab="Windows"}<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
    These instructions were written using Window 10, but should work Windows
    7 and 8 as well.
    {:class="alert alert-info"}

    1.  Before connecting the USB cable, go ahead and open *Devices and Printers*
        on your computer. It is in the *Control Panel* under *Hardware and Sound*.
        (Or just type *Devices and Printers* in the start menu.)

        {% include screenshot.html source="/images/windows/10/devices-and-printers.png" %}

    2.  Connect your EV3 to your Windows computer using the USB cable that came
        with the EV3. You should see an unknown device pop up right away.

        {% include screenshot.html source="/images/windows/10/devices-and-printers-new-device.png" %}

    3.  Wait a minute for Windows install the driver. It will detect the EV3
        as a *Remote NDIS Compatible Device*.

        {% include screenshot.html source="/images/windows/10/devices-and-printers-rndis.png" %}

        <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
        PROTIP: You can get an icon that looks like an actual EV3 by installing
        [Programmable Brick Icons](https://github.com/ev3dev/PBrickIcons).
        Follow the link for more information.
        {% include screenshot.html source="https://raw.githubusercontent.com/ev3dev/PBrickIcons/master/demo1.png" %}
        {:class="alert alert-info"}

    4.  Right-click the *Remote NDIS Compatible Device* and select *Network Settings*.
        This takes you to the *Network and Sharing Center*.

        {% include screenshot.html source="/images/windows/10/devices-and-printers-context-menu-network-settings.png" %}

    5.  In the *Network and Sharing Center*, click on *Change adapter settings*.

        {% include screenshot.html source="/images/windows/10/network-and-sharing-center-change-adapter-settings.png" %}

    6.  There will be a connection that says *Remote NDIS Compatible Device* (1).
        This is the EV3. Let's rename it so it is easy to identify. Right-click
        the adapter and select *Rename* (2). Call it EV3 or whatever you like.

        {% include screenshot.html source="/images/windows/10/network-connections-context-menu-rename.png" %}

    7.  To share our Internet connection with the EV3, Double-click the other
        network connection (**not** the one we just renamed). This will show the
        connection status.

        {% include screenshot.html source="/images/windows/10/network-connections-internet-adapter.png" %}

    8.  If you have more than one other connection, you will want to verify that
        this connection is indeed the Internet connection (1). Then, click on the
        *Properties* button (2).

        {% include screenshot.html source="/images/windows/10/local-area-connection-status.png" %}

    9.  In the window that opens, select the *Sharing* tab (1) and check the box
        that says *Allow other network users to connect through this computer's
        Internet connection* (2).

        {% include screenshot.html source="/images/windows/10/local-area-connection-properties-sharing.png" %}

        <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
        If you have more than two network connections, it will ask for a "Home
        networking connection". If you see this, select your EV3's network adapter
        from the list (this will be called *EV3* if you renamed it earlier in the
        guide).
        {% include screenshot.html source="/images/windows/8/local-area-connection-properties-sharing-with-extra-selection.png" %}
        {: class="alert alert-info"}

    10. Click *OK* when you are done and close the status window as well. Windows
        will automatically reconfigure your other network connections.

    11. Now, we need to do some setting up on the EV3. Go to *Networking* and
        select *Manage connections...*, then select the *Wired* connection.

        {% include screenshot.html source="/images/brickman/networking-connections-wired-only.png" %}

    12. Internet Connection Sharing on Windows is temperamental, so we are going
        to use a static IP address to help thing out. Select *IPv4* on the menu.

        {% include screenshot.html source="/images/brickman/wired-status-disconnected-ipv4-selected.png" %}

    13. Select *Change...*.

        {% include screenshot.html source="/images/brickman/wired-status-disconnected-ipv4-empty.png" %}

    14. Then choose *Load Windows Defaults*.

        {% include screenshot.html source="/images/brickman/networking-load-windows-defaults.png" %}

    15. The settings on the *IPv4* screen will remain blank because we are not
        connected yet. Go back to the previous screen and check the box for
        *Connect automatically*. This way you don't have to connect manually
        after you reboot. Then select *Connect*. *State* should change to
        *Online* to indicate that your EV3 is connected to the Internet.

        {% include screenshot.html source="/images/brickman/wired-status-online-connect-selected.png" %}

    16. Now we are going to connect to the EV3 using ssh. To do this, you need a
        program called [PuTTY]. Start PuTTY. In the *PuTTY Configuration* window,
        type in `ev3dev`. Then click the *Open* button to connect.

        {% include screenshot.html source="/images/windows/10/putty-configuration-ev3dev.png" %}

        <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
        The first time you connect, you'll get a warning about the new fingerprint.
        This is normal. Just click *Yes* to continue. You won't see this again
        unless you re-flash your SD card.
        {% include screenshot.html source="/images/windows/10/putty-security-alert.png" %}
        {: class="alert alert-info"}

        Once you're connected, type in the userid as `robot` and the password as
        `ev3dev` and you should be connected.

        {% include screenshot.html source="/images/windows/10/putty-robot-at-ev3dev.png" %}
{: tab-list="os"}


[PuTTY]: http://www.chiark.greenend.org.uk/%7Esgtatham/putty/
[linux.inf]: https://raw.githubusercontent.com/ev3dev/ev3-kernel/ev3dev-jessie/Documentation/usb/linux.inf
