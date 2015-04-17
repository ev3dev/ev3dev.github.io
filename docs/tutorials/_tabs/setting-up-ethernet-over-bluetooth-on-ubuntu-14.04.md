NetworkManager in Ubuntu 14.10 does not work with bluetooth, so this page uses blueman instead. If you don't want to use this use tethering via bluetooth instead.

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

These instructions use blueman. Install it with `sudo apt-get install blueman`. Blueman should work parallel to Network Manager, too. I assume you have already paired your PC with your EV3 brick using the discreption above. However you can use blueman for this too, especially if you are not using Unity.

Using blueman it is quite easy to establish an ethernet connection with internet.

1.  Start blueman (if not already started). It should be called "Bluetooth Manager" in the Dash / Menu. Alternatively you can start the manager in a terminal with `blueman-applet`.

2.  You should see a bluetooth icon in the task bar. Left click on it and choose "local services". If you don't have such an icon start `blueman-services` from a terminal to get to the necessary window.

3.  Go to network. Ensure you activated "Network Access Point (NAP)" and "dnsmasq". For "PAN support" choose "NetworkManager" but for DUN-support "Blueman".

    {% include screenshot.html source="/images/Ubuntu-Bluetooth/bluetooth-blueman-services-window.png" %}
    
    Ignore the German. The interesting parts (the checke radio boxes) are English.
    
4.  Now open the devices window of blueman with clicking on the icon and choosing "devices". Again if this doesn't work, start the window manual with `blueman-manager` in the terminal. There you should see your already paired EV3 brick:

    {% include screenshot.html source="/images/Ubuntu-Bluetooth/bluetooth-blueman-manager-window-1.png" %}
    
    If it isn't shown, try to pair the EV3 brick with your PC again using blueman. Do this also if it doesn't work at some later point in the tutorial. If you need to pair again, you have to hit "search" in the window above ("Suche" in the German screenshot) for finding unpaired devices.
    If the pairing worked make sure to enable "Trust" for the EV3 brick using the button with the yellow star. Afterwards your paired device should have such a star, too:
    
    {% include screenshot.html source="/images/Ubuntu-Bluetooth/bluetooth-blueman-manager-window-2.png" %}
    
5.  Close this window, and grab you EV3 brick.

6.  Go to the bluetooth menu entry again and choose your PC device (in this case named Aerodactyl):
	
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-1.png" %}
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-2.png" %}
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-3.png" %}
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-4.png" %}
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-5.png" %}
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-6.png" %}
	
7.  Choose Network connection
	
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-7.png" %}
	
8.  Now go one down and click "Connect". It should need some time and in the end it should state "Disconnect". In that case you are done. If not, try again with re-pairing with blueman as stated in 4.
	
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-8.png" %}
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-9.png" %}
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-10.png" %}
	{% include screenshot.html source="/images/brickman/bluetooth-blueman-11.png" %}
	
9.  As you can see now another (the bluetooth) IP adress is shown in the window title:

	{% include screenshot.html source="/images/brickman/bluetooth-blueman-12.png" %}
