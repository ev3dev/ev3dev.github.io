---
title: Setting Up Bluetooth audio with PulseAudio - A2DP only
subject: Bluetooth
---

### Overview
Debian jessie is using BlueZ 5 and PluseAudio 5, which are fairly new.  
There were major breaking changes in these versions.  
Most stuff you find on the Internet will be for BlueZ 4 and PulseAudio 4,  
so watch out, those configurations may not work.  
 
[PulseAudio 5 only supports the A2DP profile and not Headset profile (HSP) or Hands-free profile (HFP)](http://www.freedesktop.org/wiki/Software/PulseAudio/Notes/5.0/),
although it is under development see [note 2].  
  
The A2DP profile supports:  
`UUID: Audio Source`  
`UUID: Audio Sink`  

### How to get PulseAudio working with Bluetooth 
**This should all be done as root**  
  
1. Install pulseaudio:  
    apt-get install --no-install-recommends pulseaudio pulseaudio-module-bluetooth  

2. Create a systemd service for running pulseaudio as the pulse user.  
Save the following lines as `/etc/systemd/system/pulseaudio.service`  
        [Unit]  
        Description=Pulse Audio  
        [Service]  
        Type=simple  
        ExecStart=/usr/bin/pulseaudio --system --disallow-exit --disable-shm  
and reload systemd with `systemctl daemon-reload`
  
3. Give the `pulse` user permission to use Bluetooth.  
Save [this file: pulseaudio-bluetooth.conf](https://gist.github.com/dlech/7e9d28bccac9632cbc50#file-pulseaudio-bluetooth-conf) to `/etc/dbus-1/system.d/pulseaudio-bluetooth.conf`  

4. Paste the following lines to the **end** of `/etc/pulse/system.pa`:  
        ### Automatically load driver modules for Bluetooth hardware  
        .ifexists module-bluetooth-policy.so  
        load-module module-bluetooth-policy  
        .endif  
        .ifexists module-bluetooth-discover.so  
        load-module module-bluetooth-discover  
        .endif  

5. Start the systemd service: `systemctl start pulseaudio.service`

6. Run `bluetoothctl` to connect the device.  
You only need to do the pairing stuff once.  
Be sure to substitute the address of the actual device your are connecting to.  
Here are the commands:  
        agent on  
        default-agent  
        scan on  
        pair 11:11:11:11:11:11  
        trust 11:11:11:11:11:11  
        connect 11:11:11:11:11:11  

7. Now, you should be able to play sound from a remote device on your EV3 without any further configuration.
 
8. To play sound from the EV3 on a remote device, there are a few more steps.  
* add `root` and your own non-root user(s) to the `audio` and `pulse-access` groups:  
    usermod -a -G pulse-access,audio root  
    usermod -a -G pulse-access,audio myuser  
* Run `pactl list cards`.  
The end of the output should look something like this:  

```  
Card #1
    Name: bluez_card.00_17_E7_BD_1C_8E
    Driver: module-bluez5-device.c
    Owner Module: 14
    Properties:
        device.description = "BlueZ 5.23"
        device.string = "00:17:E7:BD:1C:8E"
        device.api = "bluez"
        device.class = "sound"
        device.bus = "bluetooth"
        bluez.path = "/org/bluez/hci0/dev_00_17_E7_BD_1C_8E"
        bluez.class = "0x0c0000"
        bluez.alias = "BlueZ 5.23"
        device.icon_name = "audio-card-bluetooth"
    Profiles:
        a2dp_source: High Fidelity Capture (A2DP Source) (sinks: 0, sources: 1, priority: 10, available: yes)
        a2dp: High Fidelity Playback (A2DP Sink) (sinks: 1, sources: 0, priority: 10, available: yes)
        off: Off (sinks: 0, sources: 0, priority: 0, available: yes)
    Active Profile: a2dp
    Ports:
        unknown-output: Bluetooth Output (priority: 0, latency offset: 0 usec)
            Part of profile(s): a2dp
        unknown-input: Bluetooth Input (priority: 0, latency offset: 0 usec)
            Part of profile(s): a2dp_source
```

The active profile probably doesn't say `a2dp`, although in the output above it already has been set.  
So set it by running: `pactl set-card-profile 1 a2dp`  
The "1" in this command is the number of the BT card from the output above.  
  
9. Now you can play sound using paplay.  
Example: `paplay -d bluez_sink.00_17_E7_BD_1C_8E /usr/share/sounds/alsa/Front_Center.wav`  
Possibly error messages like `xcb_connection_has_error() returned true` have been seen and not explained.  
There seems to be no ill effect on BT audio.  
Using my simple non-root user I get:  
    Failed to create secure directory (/run/user/0/pulse): Permission denied  
but playback **does** work.  





[note 1]: http://git.kernel.org/cgit/bluetooth/bluez.git/commit/?id=4ff9b99292eca193dc0c149722328cb0b1ab0818
[note 2]: http://cgit.freedesktop.org/pulseaudio/pulseaudio/commit/?id=1f0de01bfc85f92785fcd2f0e863e471af7e6ace
