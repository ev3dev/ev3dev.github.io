---
title: Setting Up Bluetooth audio with PulseAudio - A2DP only
subject: Bluetooth
---

### Overview

Debian jessie is using BlueZ 5 and PluseAudio 5, which are fairly new.
There were major breaking changes in these versions.
Most stuff you find on the Internet will be for BlueZ 4 and PulseAudio 4,
so watch out, those configurations may not work.


[PulseAudio 5 only supports the A2DP profile][PA5-relnotes] and not Headset profile (HSP) or Hands-free profile (HFP),
although it is [under development][basic support for HEADSET profiles].

PulseAudio provides these two profiles:

    UUID: Audio Source
    UUID: Audio Sink

The remote device we are connecting to needs to have at least one of these profiles.

### How to get PulseAudio working with Bluetooth

**This should almost all be done as root**

1. Install pulseaudio:

        apt-get install --no-install-recommends pulseaudio pulseaudio-module-bluetooth

2. Create a systemd service for running pulseaudio as the pulse user.
Save the following lines as `/etc/systemd/system/pulseaudio.service`

        [Unit]
        Description=Pulse Audio
        
        [Service]
        Type=simple
        ExecStart=/usr/bin/pulseaudio --system --disallow-exit --disable-shm

    and reload systemd with
    
        systemctl daemon-reload

3. Give the `pulse` user permission to use Bluetooth.
Save the following lines to `/etc/dbus-1/system.d/pulseaudio-bluetooth.conf`

        <busconfig>
      
          <policy user="pulse">
            <allow send_destination="org.bluez"/> 
          </policy>
      
        </busconfig>

4. Paste the following lines to the **end** of `/etc/pulse/system.pa`:

        ### Automatically load driver modules for Bluetooth hardware
        .ifexists module-bluetooth-policy.so
        load-module module-bluetooth-policy
        .endif
        .ifexists module-bluetooth-discover.so
        load-module module-bluetooth-discover
        .endif

5. Start the systemd service: `systemctl start pulseaudio.service`

6. Connect the device, example using brickman on the EV3 screen.
You only need to do the pairing stuff once.

    Actions to do:

    On the brickman main screen scroll to the `Bluetooth` option:
    
    {% include screenshot.html source="/images/brickman/main-menu-incl-bluetooth.png" scale="50" %}
    
    Press the EV3 "ENTER" button (the center button). 
    Scroll with the up or down button to `Start Scan` and press "ENTER"
    
    {% include screenshot.html source="/images/brickman/bluetooth-start-scan.png" scale="50" %}

    Did you set the target device "discoverable"? If not, better do that now.
    
    Scroll down (or up if you like) to the device you want to use.
    Press "ENTER" to select:
    
    {% include screenshot.html source="/images/brickman/bluetooth-select-device.png" scale="50" %}

    On the brickman device page:
    Select `Pair` and press "ENTER"
    
    {% include screenshot.html source="/images/brickman/bluetooth-before-pair.png" scale="50" %}

    On the remote device you also need to accept the pairing.

    Select `Accept` and press "ENTER"

    {% include screenshot.html source="/images/brickman/bluetooth-accept-pairing.png" scale="50" %}

    After successful pairing select `Connect` and press "ENTER":

    {% include screenshot.html source="/images/brickman/bluetooth-after-pair.png" scale="50" %}

    If all went well (no error seen on the EV3) the screen looks like:

    {% include screenshot.html source="/images/brickman/bluetooth-after-connect.png" scale="50" %}

7. Now, you should be able to play sound from a remote device on your EV3 without any further configuration.

8. To play sound from the EV3 on a remote device, there are a few more steps.
    * add your own non-root user(s) to the `audio` and `pulse-access` groups:
  
            usermod -a -G pulse-access,audio myuser
      
    * **Starting here** run the commands as `myuser`: 

            pactl list cards

        The end of the output should look something like this:

            Card #2
                    Name: bluez_card.B4_74_9F_D1_51_A1
                    Driver: module-bluez5-device.c
                    Owner Module: 16
                    Properties:
                            device.description = "MUMBA"
                            device.string = "B4:74:9F:D1:51:A1"
                            device.api = "bluez"
                            device.class = "sound"
                            device.bus = "bluetooth"
                            bluez.path = "/org/bluez/hci0/dev_B4_74_9F_D1_51_A1"
                            bluez.class = "0x3e010c"
                            bluez.alias = "MUMBA"
                            device.icon_name = "audio-card-bluetooth"
                    Profiles:
                            a2dp_source: High Fidelity Capture (A2DP Source) (sinks: 0, sources: 1, priority: 10, available: yes)
                            a2dp: High Fidelity Playback (A2DP Sink) (sinks: 1, sources: 0, priority: 10, available: yes)
                            off: Off (sinks: 0, sources: 0, priority: 0, available: yes)
                    Active Profile: off
                    Ports:
                            unknown-output: Bluetooth Output (priority: 0, latency offset: 0 usec)
                                    Part of profile(s): a2dp
                            unknown-input: Bluetooth Input (priority: 0, latency offset: 0 usec, not available)
                                    Part of profile(s): a2dp_source

    The active profile probably doesn't say `a2dp`.
    So set it by running:

            pactl set-card-profile 2 a2dp

    The "2" in this command is the number of the BT card from the output above.

9. Now you can play sound using paplay.
Look at the name of the sink with:
        
        pactl list sinks

    Playback example:
 
        paplay -d bluez_sink.B4_74_9F_D1_51_A1 /usr/share/sounds/alsa/Front_Center.wav

    Using my simple non-root user I get messages that are not yet explained:

        xcb_connection_has_error() returned true
        Failed to create secure directory (/run/user/0/pulse): Permission denied

    but playback **does** work.
    There seems to be no ill effect on BT audio.



[PA5-relnotes]: http://www.freedesktop.org/wiki/Software/PulseAudio/Notes/5.0/
[basic support for HEADSET profiles]: http://cgit.freedesktop.org/pulseaudio/pulseaudio/commit/?id=1f0de01bfc85f92785fcd2f0e863e471af7e6ace
    