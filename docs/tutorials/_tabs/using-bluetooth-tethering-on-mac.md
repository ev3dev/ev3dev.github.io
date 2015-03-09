1.  On the EV3, first verify that Bluetooth is powered on. In brickman,
    open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
    *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
    status bar also indicates that Bluetooth is powered on.

    {% include screenshot.html source="/images/brickman/bluetooth-powered-no-devices.png" %}

2.  Go back to *Wireless and Networks* and select *Tethering*. Enable tethering
    via Bluetooth by checking the box next to *Bluetooth*.

    {% include screenshot.html source="/images/brickman/tethering-bluetooth-enabled.png" %}

3.  On your host computer, open *System Preferences* and go to *Bluetooth*. This
    will make your host computer discoverable.

    {% include screenshot.html source="/images/Mac-OS-X/Bluetooth/System-Preferences-Bluetooth.png" %}

4.  On the EV3, go back to *Wireless and Networks* and select *Bluetooth* again,
    then select *Start Scan*. It should find your computer.

    {% include screenshot.html source="/images/brickman/bluetooth-powered-my-computer.png" %}

5.  Select your computer from the menu and then select the *Pair* button.

    {% include screenshot.html source="/images/brickman/bluetooth-my-computer-not-paired.png" %}

    __Note:__ If you have already paired your EV3 with your host computer, you
    will need to select *Remove* and then re-pair in order for the host computer
    to see the new tethering network connection.

6.  Confirm the passkey on both devices when requested.

    {% include screenshot.html source="/images/brickman/bluetooth-confirm-passkey.png" %}
    {% include screenshot.html source="/images/Mac-OS-X/Bluetooth/Pairing-Request.png" %}

7.  On your Mac, open up *System Preferences* and select *Network*.

    {% include screenshot.html source="/images/OSXRNDIS/SystemPreferencesNetwork.png" %}

8.  If you do not already have a Bluetooth PAN device, click on the `+`
    icon in the lower left area to add a new network device. You'll need to
    select *Bluetooth PAN* in the drop down box. Click *Create* when you are done.

    {% include screenshot.html source="/images/Mac-OS-X/Bluetooth/System-Preferences-Network-Add-PAN.png" %}

9.  Click *Apply* first to save your changes, then select your EV3 next to
    *Device:* and click *Connect*.

    {% include screenshot.html source="/images/Mac-OS-X/Bluetooth/System-Preferences-Network-Bluetooth-PAN.png" %}

10. Here, you can see that the EV3 assigned us the address *192.168.1.2*. The
    last two numbers may be different for you. The IP address of your EV3 will
    be the same as the number you see here with the last number replaced by *1*.
    So, in the case, the EV3 is at *192.168.1.1*.

    {% include screenshot.html source="/images/Mac-OS-X/Bluetooth/System-Preferences-Network-Bluetooth-PAN-Connected.png" %}

11. For `ssh` access to the EV3 under OS X, you can use the good old `ssh`
    program from the terminal window. I'm sure there are other solutions, and
    if you send me your suggestions I'll add them to a list.

    In a terminal, run the following command.

        host:~ user$ ssh root@192.168.1.1

    If you have never connected before, you will prompted to confirm the
    authenticity of the host, so type `yes` when prompted.

        The authenticity of host '192.168.1.1 (192.168.1.1)' can't be established.
        RSA key fingerprint is xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx.
        Are you sure you want to continue connecting (yes/no)? yes
        Warning: Permanently added '192.168.1.1' (RSA) to the list of known hosts.

    The default root password is `r00tme`.

        root@192.168.1.1's password: 
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
