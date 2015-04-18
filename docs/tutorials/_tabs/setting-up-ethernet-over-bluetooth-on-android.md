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