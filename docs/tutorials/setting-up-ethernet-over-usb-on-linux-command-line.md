---
title: Setting Up Ethernet Over USB on Linux with Command Line
subject: Ethernet Over USB
---

1.  On the EV3, first verify that the CDC driver is enabled. In brickman,
    open the *USB* settings and make sure *CDC* is selected and active.

    {% include screenshot.html source="/images/brickman/usb-cdc-active.png" %}

2.  Then, in *Networking*, make sure *Gadget* is enabled.

    {% include screenshot.html source="/images/brickman/networking-technologies-gadget-selected.png" %}

3.  On your host computer, with the Ev3 connected via USB, open a *Terminal* and run

        user@host:~$ ifconfig | grep usb
  
    Assuming there is only ```usb0``` the output should look like:
  
        usb0      Link encap:Ethernet  HWaddr 12:16:53:46:2e:42 
  
    Now set the ip address of ```usb0``` to ```10.42.0.1``` with the following command. The ```/24``` lets the host computer know the range of ip addresses connected to this interface.
  
        user@host:~$ sudo ip ad add 10.42.0.1/24 dev usb0

4.  Now, we need to assign an IP address to our EV3. In brickman, go to
    *Networking* and select *Manage connections...*, then select the *Wired*
    connection.

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

5.  Now we are going to connect to the EV3 using ssh.

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
