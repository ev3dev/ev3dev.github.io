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
