---
title: Connecting to the Internet via Bluetooth
group: basic-networking
---

{% include /style/icon.html type="warning" %}
These instructions are for [brickman v0.7.0](/news/2015/12/15/Package-Release/){: .alert-link}.
If you are using an older version, please upgrade.
{: .alert .alert-warning}

*   {: tab="Android"}{% include /style/icon.html type="info" %}
    These instructions were written using Android 4.1.2 but they should work for
    other versions as well.
    {: .alert .alert-info}

    1.  On the EV3, first verify that Bluetooth is powered on. In brickman,
        open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
        *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
        status bar also indicates that Bluetooth is powered on. Furthermore, make sure
        the *Visible* box is checked to make the EV3 discoverable.

        {% include /util/screenshot.html source="/images/brickman/bluetooth-powered-visible-no-devices.png" %}

    2.  On your Android device, open *System settings* and make sure *Bluetooth* is
        turned on.

        {% include /util/screenshot.html source="/images/android/4.1.2/settings-bluetooth-on.png" %}

    3.  Then go to *Tethering & Mobile Hotspot* and turn on *Bluetooth tethering*

        {% include /util/screenshot.html source="/images/android/4.1.2/tethering-enabled.png" %}

    4.  Go back to *Settings* and open *Bluetooth* and select your EV3 to pair it.

        {% include /util/screenshot.html source="/images/android/4.1.2/searching.png" %}

    5.  Confirm the passkey on both devices when requested.

        {% include /util/screenshot.html source="/images/android/4.1.2/pairing-request.png" %}
        {% include /util/screenshot.html source="/images/brickman/bluetooth-droid4-confirm-passkey.png" %}

    6.  On the EV3, find your Android in the list of Bluetooth devices and and select it.

        {% include /util/screenshot.html source="/images/brickman/bluetooth-droid4-selected.png" %}

    7.  You should have a *Network Connection* button. Select it to
        open the network connection settings. (You can also find the connection
        in *Wireless and Networks > All Network Connections*.)

        {% include /util/screenshot.html source="/images/brickman/bluetooth-droid4-network-connection-selected.png" %}

        {% include /style/icon.html type="info" %}
        The *Connect* button pictured above is used to connect other Bluetooth
        services. It **will not** connect the network connection. We need to use
        *Connect* on the *Network Connection* screen below instead.
        {: .alert .alert-info}

    8.  Then select *Connect*.

        {% include /util/screenshot.html source="/images/brickman/networking-droid4-connect-selected.png" %}

    9.  *State* should change to *Online*. The Bluetooth icon will also indicate
        that you are connected and the IP address will be displayed at the top
        of the screen.

        {% include /util/screenshot.html source="/images/brickman/networking-droid4-connect-selected-online.png" %}

    10. For `ssh` access to the EV3 on Android, you can use an app called [ConnectBot].

        Run ConnectBot and start a new connection. Do this by entering `robot@<ip-address>`
        where `<ip-address>` is the one seen on the EV3. Then press Enter on the keyboard
        to connect.

        {% include /style/icon.html type="info" %}
        Ignore `root` in the screenshot. It is from an older version of ev3dev.
        `robot` is the correct user name.
        {: .alert .alert-info}

        {% include /util/screenshot.html source="/images/android/4.1.2/connectbot-1.png" %}

        {% include /style/icon.html type="info" %}
        If you have never connected before, you will prompted to confirm the
        authenticity of the host, so select *Yes* when prompted.
        {% include /util/screenshot.html source="/images/android/4.1.2/connectbot-2.png" %}
        {: .alert .alert-info}

    11. Enter your password. The default password is `maker`.

        {% include /util/screenshot.html source="/images/android/4.1.2/connectbot-3.png" %}

    12. And you should be connected.

        {% include /util/screenshot.html source="/images/android/4.1.2/connectbot-4.png" %}


    [ConnectBot]: https://connectbot.org/

*   {: tab="Mac OSX"}{% include /style/icon.html type="info" %}
    These instructions were written using OS X 10.10 but should work for other versions as well.
    {: .alert .alert-info}

    1.  On the EV3, first verify that Bluetooth is powered on. In brickman,
        open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
        *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
        status bar also indicates that Bluetooth is powered on. (*Visible* doesn't
        actually matter here.)

        {% include /util/screenshot.html source="/images/brickman/bluetooth-powered-visible-no-devices.png" %}

    2.  On your host computer, open *System Preferences* and go to *Bluetooth*. This
        will make your host computer discoverable.

        {% include /util/screenshot.html source="/images/osx/10.10/System-Preferences-Bluetooth.png" %}

    3.  On the EV3, select *Start Scan* on the *Bluetooth* menu. It should find your
        computer.

        {% include /util/screenshot.html source="/images/brickman/bluetooth-powered-my-computer.png" %}

    4.  Select your computer from the menu and then select the *Pair* button.

        {% include /util/screenshot.html source="/images/brickman/bluetooth-my-computer-not-paired.png" %}

    5.  Confirm the passkey on both devices when requested.

        {% include /util/screenshot.html source="/images/brickman/bluetooth-confirm-passkey.png" %}
        {% include /util/screenshot.html source="/images/osx/10.10/Pairing-Request.png" %}

    6.  On your Mac, in *System Preferences*, go back and select *Network*.

        {% include /util/screenshot.html source="/images/osx/10.9/SystemPreferencesNetwork.png" %}

    7.  If you do not already have a Bluetooth PAN device, click on the `+`
        icon in the lower left area to add a new network device. You'll need to
        select *Bluetooth PAN* in the drop down box. Click *Create* when you are done.

        {% include /util/screenshot.html source="/images/osx/10.10/System-Preferences-Network-Add-PAN.png" %}

    8.  You may or may not see your EV3 listed next to *Device:* as shown. If you don't
        see it, don't worry, that is normal. Click *Apply* to save your
        changes, but don't connect yet. In fact, don't try to use the *Connect*
        button you see here. It is for [tethering] and won't work for the connection
        we are setting up here. Instead, we will initiate the connection from the
        EV3 itself later.

        {% include /util/screenshot.html source="/images/osx/10.10/System-Preferences-Network-Bluetooth-PAN.png" %}

    9.  To share our Internet connection with the EV3. Go back to *System
        Preferences* and select *Sharing*.

        {% include /util/screenshot.html source="/images/osx/10.9/SystemPreferencesSharing.png" %}

    10. Click *Internet Connection* on the left, but don't check the box yet. On
        the right, *Share your connection from:* will be *Wi-Fi* (or *Ethernet* if
        you have a wired connection). Then check the box next to *Bluetooth PAN*

        {% include /util/screenshot.html source="/images/osx/10.10/System-Preferences-Sharing-Bluetooth-PAN.png" %}

    11. Now check the box next to *Internet Connection* on the left to enable it.
        Read the warning and then click *Start*.

        {% include /util/screenshot.html source="/images/osx/10.9/Sharing-Internet-Connection-Warning.png" %}

    12. Back on the EV3, you should have a *Network Connection* button. Select it to
        open the network connection settings. (You can also find the connection
        in *Wireless and Networks > All Network Connections*.)

        {% include /util/screenshot.html source="/images/brickman/bluetooth-my-computer-0-network-connection-selected.png" %}

        {% include /style/icon.html type="info" %}
        The *Connect* button pictured above is used to connect other Bluetooth
        services. It **will not** connect the network connection. We need to use
        *Connect* on the *Network Connection* screen below instead.
        {: .alert .alert-info}

    13. Select *Connect* here. You can also check the box for *Connect automatically*.
        This way you don't have to connect manually after you reboot.

        {% include /util/screenshot.html source="/images/brickman/networking-my-computer-0-connect-selected.png" %}

    14. *State* should change to *Online* to indicate that the EV3 has an Internet
        connection.

        {% include /util/screenshot.html source="/images/brickman/networking-my-computer-0-disconnect-selected-online.png" %}

*   {: tab="Ubuntu"}{% include /style/icon.html type="info" %}
    These instructions were written using Ubuntu 16.04 and the default desktop.
    It should work for other versions of Ubuntu, derivatives of Ubuntu and
    desktop environments as well.
    {: .alert .alert-info}

    1.  The default Bluetooth and network settings in Ubuntu do not have support for
        this, so first you need to install `blueman` on your host computer.

            sudo apt-get install blueman

    2.  Run the Blueman *Bluetooth Manager*.

        {% include /util/screenshot.html source="/images/ubuntu/16.04/blueman-manager-icon.png" %}

    3.  On the *View* menu, select *Local Services...*.

        {% include /util/screenshot.html source="/images/ubuntu/16.04/blueman-manager-view-local-services.png" %}

    4.  Go to *Network*. Check *Network Access Point (NAP)* and *dnsmasq*. Change
        the IP address to `10.42.0.1` (this matches the old default from Ubuntu
        14.04). For *PAN support* choose *NetworkManager*. *DUN-support* does not
        matter, we are not using it. Then click *Apply* and *Close*.

        {% include /util/screenshot.html source="/images/ubuntu/16.04/blueman-services-network.png" %}


    5.  On the EV3, first verify that Bluetooth is powered on. In brickman,
        open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
        *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
        status bar also indicates that Bluetooth is powered on.

        {% include /util/screenshot.html source="/images/brickman/bluetooth-powered-visible-no-devices.png" %}

    5.  Back on your host computer, Click *Search* (1) to search for your EV3. Once
        it appears, click the pair icon (2) to pair it. You will be asked to confirm
        on both the EV3 and the host computer. Finally, after you have paired,
        click the trust icon (3) to allow the EV3 to automatically connect.

        {% include /util/screenshot.html source="/images/ubuntu/16.04/blueman-manager-search-pair-trust.png" %}

        {% include /util/screenshot.html source="/images/ubuntu/16.04/bluetooth-pairing-request.png" %}

        {% include /util/screenshot.html source="/images/brickman/bluetooth-confirm-passkey.png" %}

        {% include /style/icon.html type="info" %}
        If your EV3 is already paired, you will need to remove it and pair it
        again so that it will see the new network service.
        {: .alert .alert-info}

    6.  You should now have a *Network Connection* button. Select it to
        open the network connection settings. (You can also find the connection
        in *Wireless and Networks > All Network Connections*.)

        {% include /util/screenshot.html source="/images/brickman/bluetooth-my-computer-0-network-connection-selected.png" %}

        {% include /style/icon.html type="info" %}
        The *Connect* button pictured above is used to connect other Bluetooth
        services. It **will not** connect the network connection. We need to use
        *Connect* on the *Network Connection* screen below instead.
        {: .alert .alert-info}

    7.  Select *Connect* here. You can also check the box for *Connect automatically*.
        This way you don't have to connect manually after you reboot.

        {% include /util/screenshot.html source="/images/brickman/networking-my-computer-0-connect-selected.png" %}

    8.  *State* should change to *Online* to indicate that the EV3 has an Internet
        connection.

        {% include /util/screenshot.html source="/images/brickman/networking-my-computer-0-disconnect-selected-online.png" %}

*   {: tab="Windows"}{% include /style/icon.html type="info" %}
    These instructions were written using Windows 10 Enterprise.
    It should work for other versions of Windows 10 as well.
    {: .alert .alert-info}

    1.  On the EV3, first verify that Bluetooth is powered on. In brickman 
        open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
        *Powered* checkbox is checked. (The *Visible* checkbox doesn't matter)
        The Bluetooth icon next to the battery in the status bar also indicates that Bluetooth is powered on.

        {% include /util/screenshot.html source="/images/brickman/bluetooth-powered-visible-no-devices.png" %}

   2.   On your host computer, go to: *Start* > *Settings* > *Devices* > *Bluetooth*. Turn Bluethooth *On*.
        It should look like this:
        
        {% include /util/screenshot.html source="/images/windows/10/bluethooth-settings.PNG" %}

   3.   On the EV3, select *Start Scan* on the *Bluetooth* menu. It should find your
        computer. (This could take a while)

        {% include /util/screenshot.html source="/images/brickman/bluetooth-powered-my-computer.png" %}

   4.   Select your computer from the menu and then select the *Pair* button. (If you don't know how your computer is named,
        click on *Home* > *System* > *About*. Here your *PC name* should be listed) On the your host computer click on 
        ev3dev and then select the *Pair*

        {% include /util/screenshot.html source="/images/brickman/bluetooth-my-computer-not-paired.png" %}

   5.   Confirm the passkey on both devices when requested.
        
        {% include /util/screenshot.html source="/images/windows/10/bluethooth-confirm-passkey-pc.PNG" %}
        {% include /util/screenshot.html source="/images/brickman/bluetooth-confirm-passkey.png" %}
	
   6.   On the EV3, you should have a *Network Connection* button. Select it to
        open the network connection settings. (You can also find the connection
        in *Wireless and Networks > All Network Connections*)

        {% include /util/screenshot.html source="/images/brickman/bluetooth-my-computer-0-network-connection-selected.png" %}

   7.   Select *Connect* here. You can also check the box for *Connect automatically*.
        This way you don't have to connect manually after you reboot.
        On the host computer it should look like this:
        
        {% include /util/screenshot.html source="/images/windows/10/bluethooth-connected-ev3dev.PNG" %}	
        {% include /util/screenshot.html source="/images/brickman/networking-my-computer-0-connect-selected.png" %}

   8.   *State* should change to *Connected* to indicate that the EV3 has an Internet connection.
        (This could take a little bit longer)
        Now you can see the IP-address of the EV3 in the status bar. It should be something like *192.164.137.3*.
        If it isn't or you like to change it: (*Wireless and Networks > All Network Connections* > 
        *Your-PC-Name* >) *IPv4* > *Change* > *Load Windows defaults*
       
        {% include /util/screenshot.html source="/images/brickman/networking-my-computer-0-disconnect-selected-online.png" %}
	
{: tab-list="os"}

Now that you have a network connection, you should
[connect to your EV3 with SSH](/docs/tutorials/connecting-to-ev3dev-with-ssh)
if you haven't done so already.
