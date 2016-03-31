---
title: Using Bluetooth Tethering
subject: Networking
---

{% include icon.html type="info" %}
When using tethering, the EV3 brick will act as a network server. This
means there is little to no configuration that needs to be done on your host
computer which makes it easy to setup and use. However, you __cannot access the
Internet from your EV3 using tethering__. If you want to be able to update
packages or do anything else that requires an Internet connection, you will need
to set up another connection instead of or in addition to a tethering connection.
{: .alert .alert-info}

---

{% include icon.html type="warning" %}
These instructions are for [brickman v0.7.0](/news/2015/12/15/Package-Release/){: .alert-link}.
If you are using an older version, please upgrade.
{: .alert .alert-warning}

*   {: tab="Mac OSX"}
    1.  On the EV3, first verify that Bluetooth is powered on. In brickman,
        open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
        *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
        status bar also indicates that Bluetooth is powered on.

        {% include screenshot.html source="/images/brickman/bluetooth-powered-visible-no-devices.png" %}

    2.  Go back to *Wireless and Networks* and select *Tethering*. Enable tethering
        via Bluetooth by checking the box next to *Bluetooth*.

        {% include screenshot.html source="/images/brickman/tethering-bluetooth-enabled.png" %}

    3.  On your host computer, open *System Preferences* and go to *Bluetooth*. This
        will make your host computer discoverable.

        {% include screenshot.html source="/images/osx/10.10/System-Preferences-Bluetooth.png" %}

    4.  On the EV3, go back to *Wireless and Networks* and select *Bluetooth* again,
        then select *Start Scan*. It should find your computer.

        {% include screenshot.html source="/images/brickman/bluetooth-powered-my-computer.png" %}

    5.  Select your computer from the menu and then select the *Pair* button.

        {% include screenshot.html source="/images/brickman/bluetooth-my-computer-not-paired.png" %}

        {% include icon.html type="info" %}
        If you have already paired your EV3 with your host computer, you
        will need to select *Remove* and then re-pair in order for the host computer
        to see the new tethering network connection.
        {: .alert .alert-info}

    6.  Confirm the passkey on both devices when requested.

        {% include screenshot.html source="/images/brickman/bluetooth-confirm-passkey.png" %}
        {% include screenshot.html source="/images/osx/10.10/Pairing-Request.png" %}

    7.  On your Mac, open up *System Preferences* and select *Network*.

        {% include screenshot.html source="/images/osx/10.9/SystemPreferencesNetwork.png" %}

    8.  If you do not already have a Bluetooth PAN device, click on the `+`
        icon in the lower left area to add a new network device. You'll need to
        select *Bluetooth PAN* in the drop down box. Click *Create* when you are done.

        {% include screenshot.html source="/images/osx/10.10/System-Preferences-Network-Add-PAN.png" %}

    9.  Click *Apply* first to save your changes, then select your EV3 next to
        *Device:* and click *Connect*.

        {% include screenshot.html source="/images/osx/10.10/System-Preferences-Network-Bluetooth-PAN.png" %}

    10. Here, you can see that the EV3 assigned us the address *192.168.1.2*. The
        last two numbers may be different for you. The IP address of your EV3 will
        be the same as the number you see here with the last number replaced by *1*.
        So, in the case, the EV3 is at *192.168.1.1*.

        {% include screenshot.html source="/images/osx/10.10/System-Preferences-Network-Bluetooth-PAN-Connected.png" %}

    11. For `ssh` access to the EV3 under OS X, you can use the good old `ssh`
        program from the terminal window. In a terminal, run the following command.

            ssh robot@ev3dev.local

        <div class="panel panel-info">
        <div class="panel-heading">
        {% include icon.html type="info" %}
        If you have never connected before, you will prompted to confirm the
        authenticity of the host, so type `yes` when prompted.
        </div>
        <div class="panel-body">
        <pre>
            The authenticity of host '192.168.1.1 (192.168.1.1)' can't be established.
            RSA key fingerprint is xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx.
            Are you sure you want to continue connecting (yes/no)? yes
            Warning: Permanently added '192.168.1.1' (RSA) to the list of known hosts.
        </pre>
        </div>
        </div>

    12. Enter your password when prompted. The default password is `maker`.

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

*   {: tab="Ubuntu"}
    {% include icon.html type="warning" %}
    HELP WANTED! See [issue #287](https://github.com/ev3dev/ev3dev/issues/287){: .alert-link}.
    {: .alert .alert-warning}

*   {: tab="Windows"}

    *   {: tab="7"}
        {% include icon.html type="warning" %}
        HELP WANTED! See [issue #287](https://github.com/ev3dev/ev3dev/issues/287){: .alert-link}.
        {: .alert .alert-warning}

        This is mostly figured out for Windows 8 [here](https://github.com/ev3dev/ev3dev/issues/232#issuecomment-69801370).
        Windows 7 looks a bit different, so it needs its own instructions.

    *   {: tab="8"}
        1.  On the EV3, first verify that Bluetooth is powered on. In brickman,
            open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
            *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
            status bar also indicates that Bluetooth is powered on.
    
            {% include screenshot.html source="/images/brickman/bluetooth-powered-visible-no-devices.png" %}
    
        2.  Go back to *Wireless and Networks* and select *Tethering*. Enable tethering
            via Bluetooth by checking the box next to *Bluetooth*.
    
            {% include screenshot.html source="/images/brickman/tethering-bluetooth-enabled.png" %}
        
        3.  Go to the charms menu and search for *Bluetooth Settings*. Click on the one that will take you to PC Settings.
        
        4.  Your PC will search for Bluetooth devices. Connect to the device called *ev3dev*. Hit *Pair* on either your PC or the EV3                after verifying that the passcode is the same on both machines. It may take a while to connect.
        
        5.  Once the *ev3dev* device is connected, go back to your desktop and look in your tray (bottom right, near the clock) for               the Bluetooth icon. It might be hidden under the little up arrow. Right click on the icon and select *Join a Personal Area             Network* 
        
        6.  In the window that appears, select the *ev3dev* icon and click *Connect Using > Access Point*. A pop-up will appear,                  saying that the connection was sucessful
        
        7.  Your ev3 is now connected! Use PuTTY or your favourite ssh tool to connect to the ev3 using hostname *ev3dev*. The default             username is *robot* and the password is *maker*
    {: tab-list="os-version"}
{: tab-list="os"}
