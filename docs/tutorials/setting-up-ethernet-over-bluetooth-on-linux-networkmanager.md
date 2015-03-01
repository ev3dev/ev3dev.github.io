---
title: Setting Up Ethernet Over Bluetooth on Linux with NetworkManager
subject: Ethernet Over Bluetooth
---

NETWORK MANAGER IN UBUNTU 14.10 DOES NOT WORK WITH BLUETOOTH, SO THIS PAGE IS INCOMPLETE!
USE TETHERING VIA BLUETOOH INSTEAD.

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
