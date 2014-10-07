---
title: Setting Up Ethernet Over USB on Mac OS X
subject: Ethernet Over USB
---

1.  On the EV3, first verify that the CDC driver is enabled. In brickman,
    open the *USB* settings and make sure *CDC* is selected and active.

    {% include screenshot.html source="/images/brickman/usb-cdc-active.png" %}

2.  Then, in *Networking*, make sure *Gadget* is enabled.

    {% include screenshot.html source="/images/brickman/networking-technologies-gadget-selected.png" %}

3.  On your Mac, open up *System Preferences* and select *Network*.

    {% include screenshot.html source="/images/OSXRNDIS/SystemPreferencesNetwork.png" %}

4.  Once you get the *Network* dialog, click on the `+` icon in the lower left
    area to add a new network device. You'll need to select the CDC Composite
    Gadget in the drop down box. The name will be similar to what is shown
    below. I have renamed the service "ev3dev" so it's easier to keep track of
    later. Click *Create* when you are done.

    {% include screenshot.html source="/images/OSXRNDIS/AddNewDevice.png" %}

5.  Click *Apply* to save your changes. After a short time, the ev3dev entry
    (or whatever you named it) should show connected and have a Self-Assigned
    IP address

    {% include screenshot.html source="/images/OSXRNDIS/CDC-Connected.png" %}

6. If you don't need to access the Internet from your EV3 over this
    connection, manually configure the IP address to `192.168.2.1`. Note:
    you won't be able to update packages without an Internet connection.

    TODO: Need detailed description with screenshots.

    Then skip to step 8.

    If you do want to be able to connect to the Internet from the EV3, continue
    with the next step.

7.  To share our internet connection with the EV3. Go back to *System
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

8.  Now, we need to assign an IP address to our EV3. In brickman, go to
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

9.  For `ssh` access to the EV3 under OS X, you can use the good old `ssh`
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
        
        Debian GNU/Linux 7 on LEGO MINDSTORMS EV3!
        
        The programs included with the Debian GNU/Linux system are free software;
        the exact distribution terms for each program are described in the
        individual files in /usr/share/doc/*/copyright.
        
        Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
        permitted by applicable law.
        root@ev3dev:~# 
