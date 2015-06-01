---
title: Connecting to the Internet via Bluetooth
subject: Networking
---

__Note:__ If you do not need to access the Internet from the EV3 brick, consider
using [tethering] instead.

[tethering]: /docs/tutorials/using-bluetooth-tethering

---

These instructions are for [brickman v0.5.0](http://www.ev3dev.org/news/2015/02/24/Package-Release/).
If you are using an older version, please upgrade.

*   {: tab="Android"}Note: These instructions were written using Android 4.1.2
    but should work for other versions as well.

    1.  On the EV3, first verify that Bluetooth is powered on. In brickman,
        open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
        *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
        status bar also indicates that Bluetooth is powered on.

        {% include screenshot.html source="/images/brickman/bluetooth-powered-no-devices.png" %}

    2.  On your Android device, open *System settings* and make sure *Bluetooth* is
        turned on.

        {% include screenshot.html source="/images/Android/Bluetooth/settings-bluetooth-on.png" %}

    3.  Then go to *Tethering & Mobile Hotspot* and turn on *Bluetooth tethering*

        {% include screenshot.html source="/images/Android/Bluetooth/tethering-enabled.png" %}

    4.  Go back to *Settings* and open *Bluetooth* and select your EV3 to pair it.

        {% include screenshot.html source="/images/Android/Bluetooth/searching.png" %}

    5.  Confirm the passkey on both devices when requested.

        {% include screenshot.html source="/images/Android/Bluetooth/pairing-request.png" %}
        {% include screenshot.html source="/images/Android/Bluetooth/brickman-pairing.png" %}

    6.  On the EV3, find your Android in the list of Bluetooth devices and and select it.

        {% include screenshot.html source="/images/Android/Bluetooth/brickman-device-selected.png" %}

    7.  You should have a *Network Connection* button. Select it to
        open the network connection settings. (You can also find the connection
        in *Wireless and Networks > All Network Connections*.)

        {% include screenshot.html source="/images/Android/Bluetooth/brickman-device.png" %}

        Then select *Connect*.

        {% include screenshot.html source="/images/Android/Bluetooth/brickman-network-connection.png" %}

        *State* should change to *Online*. Go to the *IPv4* tab. It will show
        the IP address of your EV3.

        {% include screenshot.html source="/images/Android/Bluetooth/brickman-ip.png" %}

    8.  For `ssh` access to the EV3 on Android, you can use an app call [ConnectBot].

        Run ConnectBot and start a new connection. Do this by entering `root@<ip-address>`
        where `<ip-address>` is the one seen on the EV3. Then press Enter on the keyboard
        to connect.

        {% include screenshot.html source="/images/Android/Bluetooth/connectbot-1.png" %}

        If you have never connected before, you will prompted to confirm the
        authenticity of the host, so select *Yes* when prompted.

        {% include screenshot.html source="/images/Android/Bluetooth/connectbot-2.png" %}

        The default root password is `r00tme`.

        {% include screenshot.html source="/images/Android/Bluetooth/connectbot-3.png" %}

        And you are connected.

        {% include screenshot.html source="/images/Android/Bluetooth/connectbot-4.png" %}


    [ConnectBot]: https://connectbot.org/

*   {: tab="Mac OSX"}

    1.  On the EV3, first verify that Bluetooth is powered on. In brickman,
        open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
        *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
        status bar also indicates that Bluetooth is powered on.

        {% include screenshot.html source="/images/brickman/bluetooth-powered-no-devices.png" %}

    2.  On your host computer, open *System Preferences* and go to *Bluetooth*. This
        will make your host computer discoverable.

        {% include screenshot.html source="/images/Mac-OS-X/Bluetooth/System-Preferences-Bluetooth.png" %}

    3.  On the EV3, select *Start Scan* on the *Bluetooth* menu. It should find your
        computer.

        {% include screenshot.html source="/images/brickman/bluetooth-powered-my-computer.png" %}

    4.  Select your computer from the menu and then select the *Pair* button.

        {% include screenshot.html source="/images/brickman/bluetooth-my-computer-not-paired.png" %}

    5.  Confirm the passkey on both devices when requested.

        {% include screenshot.html source="/images/brickman/bluetooth-confirm-passkey.png" %}
        {% include screenshot.html source="/images/Mac-OS-X/Bluetooth/Pairing-Request.png" %}

    6.  On your Mac, open up *System Preferences* and select *Network*.

        {% include screenshot.html source="/images/OSXRNDIS/SystemPreferencesNetwork.png" %}

    7.  If you do not already have a Bluetooth PAN device, click on the `+`
        icon in the lower left area to add a new network device. You'll need to
        select *Bluetooth PAN* in the drop down box. Click *Create* when you are done.

        {% include screenshot.html source="/images/Mac-OS-X/Bluetooth/System-Preferences-Network-Add-PAN.png" %}

    8.  You should see your EV3 listed next to *Device:*. Click *Apply* to save your
        changes, but don't connect yet. In fact, don't try to use the *Connect*
        button you see here. It is for [tethering] and won't work for the connection
        we are setting up here. Instead, we will initiate the connection from the
        EV3 itself later.

        {% include screenshot.html source="/images/Mac-OS-X/Bluetooth/System-Preferences-Network-Bluetooth-PAN.png" %}

    9.  To share our Internet connection with the EV3. Go back to *System
        Preferences* and select *Sharing*.

        {% include screenshot.html source="/images/OSXRNDIS/SystemPreferencesSharing.png" %}

        Click *Internet Connection* on the left, but don't check the box yet. On
        the right, *Share your connection from:* will be *Wi-Fi* (or *Ethernet* if
        you have a wired connection). Then check the box next to *Bluetooth PAN*

        {% include screenshot.html source="/images/Mac-OS-X/Bluetooth/System-Preferences-Sharing-Bluetooth-PAN.png" %}

        Now check the box next to *Internet Connection* on the left to enable it.
        Read the warning and then click *Start*.

        {% include screenshot.html source="/images/OSXRNDIS/Sharing-Internet-Connection-Warning.png" %}

    10. Back on the EV3, you should have a *Network Connection* button. Select it to
        open the network connection settings. (You can also find the connection
        in *Wireless and Networks > All Network Connections*.)

        {% include screenshot.html source="/images/brickman/bluetooth-device-network-connection.png" %}

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

    11. For `ssh` access to the EV3 under OS X, you can use the good old `ssh`
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

*   {: tab="Ubuntu"}

    1.  The default Bluetooth and network settings in Ubuntu do not have support for
        this, so first you need to install `blueman` on your host computer.

            sudo apt-get install blueman

        Additionally, the default Ubuntu Unity desktop does not show the `blueman-applet`
        icon in the notification tray. If you would like to enable this, please see
        [this](http://askubuntu.com/questions/574460/blueman-indicator-missing).

    2.  Run `blueman-services` from a terminal. (Or if you have the tray icon,
        right-click on it and choose "Local Services...")

    3.  Go to network. Ensure you activated *Network Access Point (NAP)* and
        *dnsmasq*. For *PAN support* choose *NetworkManager* but for *DUN-support*
        choose *Blueman*.

        {% include screenshot.html source="/images/Ubuntu-Bluetooth/blueman-services-network.png" %}

        Then click *Close*.

        Note: If your EV3 is already paired, you will need to remove it and pair it
        again so that it will see the new network service.

    4.  On the EV3, first verify that Bluetooth is powered on. In brickman,
        open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
        *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
        status bar also indicates that Bluetooth is powered on.

        {% include screenshot.html source="/images/brickman/bluetooth-powered-no-devices.png" %}

    5.  On your host computer, make sure Bluetooth is powered on and visible.

        {% include screenshot.html source="/images/Ubuntu-Bluetooth/bluetooth-app-indicator-powered-visible.png" %}

    6.  On the EV3, select *Start Scan* on the *Bluetooth* menu. It should find your
        computer.

        {% include screenshot.html source="/images/brickman/bluetooth-powered-my-computer.png" %}

    7.  Select your computer from the menu and then select the *Pair* button.

        {% include screenshot.html source="/images/brickman/bluetooth-my-computer-not-paired.png" %}

    8.  Confirm or enter the passkey if requested. The exact behavior here will
        depend on the Bluetooth adapter on your host computer.

        {% include screenshot.html source="/images/brickman/bluetooth-confirm-passkey.png" %}

    9.  Choose *Network Connection*.

        {% include screenshot.html source="/images/brickman/bluetooth-device-network-connection.png" %}

    10. On the Conn. tab, check the box for Connect automatically. This way you
        don’t have to connect manually after you reboot.

        {% include screenshot.html source="/images/brickman/networking-connect-automatically-selected.png" %}

        Then select Connect. State should change to Online. Go back to the IPv4 tab.
        It will show the IP address of your EV3 (your IP address will be different
        than pictured).

        {% include screenshot.html source="/images/brickman/networking-ipv4-tab-with-mac-defaults.png" %}

    11. Now we are going to connect to the EV3 using ssh. Note: your IP address
        may be different.

            user@host:~$ ssh root@10.25.9.98

        If you have never connected before, you will prompted to confirm the
        authenticity of the host, so type `yes` when prompted.

            The authenticity of host '10.25.9.98 (10.25.9.98)' can't be established.
            ECDSA key fingerprint is be:9e:66:8b:d1:14:b8:8a:ea:4c:6e:07:2d:d9:68:05.
            Are you sure you want to continue connecting (yes/no)? yes
            Warning: Permanently added '10.25.9.98' (ECDSA) to the list of known hosts.

        The default root password is `r00tme`.

            root@10.25.9.98's password: 
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

*   {: tab="Windows"}__HELP WANTED!__ See [issue #287](https://github.com/ev3dev/ev3dev/issues/287).
{: tab-list="os"}