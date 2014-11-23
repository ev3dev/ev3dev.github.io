---
title: Setting Up Bluetooth keyboard
subject: Bluetooth
---

### Connect a bluetooth keyboard to the EV3

1.  Prepare the EV3 bluetooth controller:
    As `root` on an ssh session to the EV3:

            bluetoothctl
            power on
            agent on
            default-agent
            pairable on
            
2.  Set your keyboard discoverable / pairable, how this is done differs per type of keyboard. See the documentation of your keyboard.
    
3.  Pair the keyboard using brickman. This only needs to be done once.

    On the brickman main screen (on the EV3 screen), scroll to the `Bluetooth` option:
    
    {% include screenshot.html source="/images/brickman/main-menu.png" %}
    
    Press the EV3 "ENTER" button (the center button). 
    Scroll with the up or down button to `Start Scan` and press "ENTER"
    
    {% include screenshot.html source="/images/brickman/bluetooth-start-scan.png" %}

    Scroll down to the keyboard device.
    Press "ENTER" to select:
    
    {% include screenshot.html source="/images/brickman/bluetooth-select-device.png" %}

    On the brickman device page:
    Select `Pair` and press "ENTER"
    
    {% include screenshot.html source="/images/brickman/bluetooth-before-pair.png" %}

    Select `Accept` and press "ENTER"

    {% include screenshot.html source="/images/brickman/bluetooth-accept-pairing.png" %}

4.  Connect the keyboard using brickman.
    Select `Connect` and press "ENTER":

    {% include screenshot.html source="/images/brickman/bluetooth-after-pair.png" %}

    If all went well (no error seen on the EV3) the screen looks like:

    {% include screenshot.html source="/images/brickman/bluetooth-after-connect.png" %}

5.  Ready.

If needed: for debugging see [Archlinux page]




[Archlinux page]: https://wiki.archlinux.org/index.php/bluetooth_keyboard
