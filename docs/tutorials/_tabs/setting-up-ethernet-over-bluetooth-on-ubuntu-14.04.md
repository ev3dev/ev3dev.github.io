NETWORK MANAGER IN UBUNTU 14.10 DOES NOT WORK WITH BLUETOOTH, SO THIS PAGE USES BLUEMAN INSTEAD. IF YOU DON'T WANT TO USE THIS USE TETHERING VIA BLUETOOH INSTEAD.

---

These instructions are for [brickman v0.5.0](http://www.ev3dev.org/news/2015/02/24/Package-Release/).
If you are using an older version, please upgrade.

1.  On the EV3, first verify that Bluetooth is powered on. In brickman,
    open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
    *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
    status bar also indicates that Bluetooth is powered on.

    {% include screenshot.html source="/images/brickman/bluetooth-powered-no-devices.png" %}

2.  On your host computer, make sure Bluetooth is powered on and visible.

    {% include screenshot.html source="/images/Ubuntu-Bluetooth/bluetooth-app-indicator-powered-visible.png" %}

3.  On the EV3, select *Start Scan* on the *Bluetooth* menu. It should find your
    computer.

    {% include screenshot.html source="/images/brickman/bluetooth-powered-my-computer.png" %}

4.  Select your computer from the menu and then select the *Pair* button.

    {% include screenshot.html source="/images/brickman/bluetooth-my-computer-not-paired.png" %}

5.  Confirm or enter the passkey if requested. The exact behavior here will
    depend on the Bluetooth adapter on your host computer.

    {% include screenshot.html source="/images/brickman/bluetooth-confirm-passkey.png" %}

---

These instructions use blueman. Install it with sudo apt-get install blueman. Blueman should work parallel to Network Manager, too. I assume you have already paired your PC with your EV3 brick using the discreption above.

Using blueman it is quite easy to establish an ethernet connection with internet.

1.  Start blueman (if not already started)
2.  You should see a bluetooth icon in the task bar. Left click on it and choose "local services"
3.  Go to network. Ensure you activated "Network Access Point (NAP)" and "dnsmasq". For "PAN support" choose "NetworkManager" but for DUN-support "Blueman".
4.  Close this window, and grab you EV3 brick.
5.  In the Bluetooth menu entry choose your PC under "Devices" and click "Connect".
6.  It should need some time, but in the very end it should have connected your EV3 brick to the internet and you should be able to connect via SSH using the IP address in the window title.
