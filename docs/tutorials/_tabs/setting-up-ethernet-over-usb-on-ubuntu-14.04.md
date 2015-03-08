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
        
        Debian GNU/Linux 7 on LEGO MINDSTORMS EV3!
        
        The programs included with the Debian GNU/Linux system are free software;
        the exact distribution terms for each program are described in the
        individual files in /usr/share/doc/*/copyright.
        
        Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
        permitted by applicable law.
        root@ev3dev:~# 
