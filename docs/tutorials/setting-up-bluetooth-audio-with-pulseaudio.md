---
title: Setting Up Bluetooth audio with PulseAudio - A2DP only
subject: Bluetooth
---

### Overview
Debian jessie is using BlueZ 5 and PluseAudio 5, which are fairly new.  
There were major breaking changes in these versions.  
Most stuff you find on the Internet will be for BlueZ 4 and PulseAudio 4,  
so watch out, those configurations may not work.  
 
[PulseAudio 5 only supports the A2DP profile](http://www.freedesktop.org/wiki/Software/PulseAudio/Notes/5.0/) and not Headset profile (HSP) or Hands-free profile (HFP),
although it is [under development](http://cgit.freedesktop.org/pulseaudio/pulseaudio/commit/?id=1f0de01bfc85f92785fcd2f0e863e471af7e6ace).  
  
The A2DP profile provides these two profiles:  

    UUID: Audio Source  
    UUID: Audio Sink  
    
The remote device we are connecting to needs to have at least one of these profiles.  
  
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
Be sure to substitute the address of the actual device your are connecting to.  
Actions to do:  

    On the brickman main screen scroll to the `Bluetooth` option:  
    ![brickman mainscreen](https://cloud.githubusercontent.com/assets/8142081/5093619/612eb254-6f5a-11e4-86a6-213b31526856.png)  
    
    Press the EV3 "ENTER" button (the center button)  
    Scroll with the up or down button to `Start Scan` and press "ENTER"  
    ![brinkman bt scan](https://cloud.githubusercontent.com/assets/8142081/5094570/4f8fa23a-6f62-11e4-9999-ef5773092735.png)

    Did you set the target device "discoverable"? If not, better do that now.  
    Scroll down (or up if you like) to the device you want to use.  
    Press "ENTER" to select:  
    ![brickman select device](https://cloud.githubusercontent.com/assets/8142081/5094436/3843f302-6f61-11e4-9f8f-16444abc6959.png)  

    On the brickman device page:  
    Select `Pair` and press "ENTER"  
    ![brickman device page](https://cloud.githubusercontent.com/assets/8142081/5094449/4d0f485e-6f61-11e4-998c-0e77ca95a5d9.png)  
    
    On the remote device you also need to accept the pairing.  
    Select `Accept` and press "ENTER"  
    ![brickman pairing](https://cloud.githubusercontent.com/assets/8142081/5094463/730e0e64-6f61-11e4-8137-0bf35a10c6bb.png)  

    After successful pairing select `Connect` and press "ENTER":  
    ![brickman after pair device](https://cloud.githubusercontent.com/assets/8142081/5094470/809a64b0-6f61-11e4-9d02-7c95b8e838ef.png)  

7. Now, you should be able to play sound from a remote device on your EV3 without any further configuration.
 
8. To play sound from the EV3 on a remote device, there are a few more steps.  
    * add your own non-root user(s) to the `audio` and `pulse-access` groups:  
    
        usermod -a -G pulse-access,audio myuser  
        
    * Run `pactl list cards`  
  The end of the output should look something like this:  

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
