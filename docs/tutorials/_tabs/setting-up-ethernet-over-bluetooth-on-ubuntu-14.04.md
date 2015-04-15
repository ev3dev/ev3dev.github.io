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
        
        Debian GNU/Linux 7 on LEGO MINDSTORMS EV3!
        
        The programs included with the Debian GNU/Linux system are free software;
        the exact distribution terms for each program are described in the
        individual files in /usr/share/doc/*/copyright.
        
        Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
        permitted by applicable law.
        root@ev3dev:~# 
