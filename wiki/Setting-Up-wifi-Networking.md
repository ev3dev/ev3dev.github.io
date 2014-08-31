---
title: Setting Up wifi Networking
index: wiki
---

## How to Do It

In my original README text for these repos, I mistakenly suggest that it's a good idea to update the `/etc/network/interfaces` file with your wifi details. That's actually a bad idea. It works if you're only ever connected to one wifi network, but if you want to take your EV3 to school or the office then you'll want a more general solution.

Come to think of it, make sure that you get the USB-Ethernet described in the Getting Started wiki page][ev3dev-GettingStarted] working. Even if you have WiFi working flawlessly, someday it will break, or you'll be a t a location with a hotspot your EV3 knows nothing about, and you'll need to resort to USB-Ethernet to sort things out again.

Thanks to [Xander](http://botbench.com/) for setting me straight on the right way to do it!

Edit `/etc/network/interfaces` to look like this:

```
root@ev3dev:~# cat /etc/network/interfaces
auto lo
iface lo inet loopback
 
auto wlan0
allow-hotplug wlan0
iface wlan0 inet dhcp
    wpa-conf /etc/wpa_supplicant.conf
```

Note, if you have multiple WiFi dongles (because you are testing stuff all the time) you may need to add multiple `wlanx` stanzas to `/etc/network/interfaces`.

Then edit `/etc/wpa-supplicant.conf` to look like this:

```
root@ev3dev:~# cat /etc/wpa_supplicant.conf
ctrl_interface=/var/run/wpa_supplicant
network={
       ssid="Your SSID Here"
       scan_ssid=1
       proto=WPA RSN
       key_mgmt=WPA-PSK
       pairwise=CCMP TKIP
       group=CCMP TKIP
       psk="Your text key here"
}
```

If you don't like the idea of having your WiFi key in plain text (and you shouldn't) then the `psk` can be generated for you - on the EV3 itself if you like - using:

```
$ wpa_passphrase "Your SSID Here"
$ reading passphrase from stdin
Your text key here
network={
	ssid="Your SSID Here"
	#psk="Your text key here"
	psk=93e2cd309c779e91927ac3e12d5f78ad60504621de354fa5c3c1af4686f9d4e6
}
```

If your SSID has spaces, like this sample, then the SSID must be enclosed in quotes. The passphrase is read from the keyboard and echoe'd back as you type - that's a bit insecure!

The `wpa_passphrase` command will generate part of the `network` stanza for the `/etc/wpa-supplicant.conf` above. Of course, you'll remove the comment line with the plaintext `psk` - since that was the point of using `wpa_passphrase` in the first place.

Just add another copy of the "network" section for every new network, and fill in the SSID and psk details. Yeah, it's that easy!

Of course, that's much easier to do when you can ssh into your EV3 already! It's handy to have your [Hacked](http://botbench.com/blog/2013/08/15/ev3-creating-console-cable/) or [purchased](http://botbench.com/blog/2013/08/05/mindsensors-ev3-usb-console-adapter/) serial interface adapter just in case. And of course the USB-Ethernet networking is another way in.

## References

[Main wpa-supplicant page](http://w1.fi/wpa_supplicant/) - Go to the section on "Configuration File" for samples

[ev3dev][ev3dev]
[ev3dev-wiki][ev3dev-wiki]
[ev3dev-releases][ev3dev-releases]
[ev3dev-GettingStarted][ev3dev-GettingStarted]

[ev3dev]: https://github.com/mindboards/ev3dev
[ev3dev-wiki]: https://github.com/mindboards/ev3dev/wiki
[ev3dev-releases]: https://github.com/mindboards/ev3dev/releases
[ev3dev-GettingStarted]: https://github.com/mindboards/ev3dev/wiki#getting-started
