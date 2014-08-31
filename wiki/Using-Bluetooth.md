---
title: Using Bluetooth
index: wiki
---

Have you ever wanted to use the Bluetooth capabilities of your EV3 to their fullest capabilties? Ever wanted to set up a serial console, or stream audio to an external speaker for better sound? What about using a Bluetooth mouse to control your bot, or adding keyboard input. Read on to find out how to do these things ...

### Table of Contents

- [Overview](#Overview)
- [Pairing](#Pairing)
- [ALSA](#ALSA)
- [Playing Audio](#PlayingAudio)


### <a name="Overview"/> Overview

The Bluetooth module in the EV3 is as fully capable as the one in your laptop or desktop - we just need to work a little harder to get it to do what we want.

This section of the document goes ove basic steps like pairing and adding a Bluetooth device to the set of trusted devices.

### <a name="Pairing"/> Pairing

The default distribution of [`ev3dev`][ev3dev] comes with the `bluez-tools` package pre-installed, so we're ready to pair, connect, and add devices to our trusted list.

Put the new device in discoverable and/or pairing mode. Each device is a little different, but the manual should tell you how to do this. Then run the following command to scan for your new device. I'm going to use my new Sony SRS-X5 speaker in this example. 

Don't worry, you only need to do this stuff once, and then the EV3 will connect automatically!

```
root@ev3dev:~# bt-adapter -d
Searching...

[00:1D:DF:AF:96:8C]
  Name: SONY:SRS-X5
  Alias: SONY:SRS-X5
  Address: 00:1D:DF:AF:96:8C
  Icon: audio-card
  Class: 0x240414
  LegacyPairing: 0
  Paired: 0
  RSSI: -47

Done
```

Now pair your EV3 with the device - you'll want to use the `Address` field like this:

```
root@ev3dev:~# bt-device -c 00:1D:DF:AF:96:8C
Connecting to: 00:1D:DF:AF:96:8C
Agent registered
Agent released
Done
```

Now check to make sure we're connected:

```
root@ev3dev:~# bt-device -l
Added devices:
Go (10:B7:F6:03:39:68)
SONY:SRS-X5 (00:1D:DF:AF:96:8C)
```

You can see that I've also got a SimpleAudio Go speaker (great little unit) in the device list. Now we connect the audio service to the speaker:

```
root@ev3dev:~# bt-audio -c 00:1D:DF:AF:96:8C
Connecting to an audio service
Audio service is connected
```

If you're curious, do an inquiry to see where we are so far...

```
root@ev3dev:~# bt-device -i SONY:SRS-X5
[00:1D:DF:AF:96:8C]
  Name: SONY:SRS-X5
  Alias: SONY:SRS-X5 [rw]
  Address: 00:1D:DF:AF:96:8C
  Icon: audio-card
  Class: 0x240414
  Paired: 1
  Trusted: 0 [rw]
  Blocked: 0 [rw]
  Connected: 1
  UUIDs: [Headset, AudioSink, AVRemoteControlTarget, AVRemoteControl, Handsfree]
```

Cool, we're connected, we-re an audio card, we're just not trusted yet, so let's look after that too:

```
root@ev3dev:~# bt-device --set SONY:SRS-X5 Trusted 1
Trusted: 0 -> 1
```

Nice! Now we can work on gettig ALSA set up!

### <a name="ALSA"/> ALSA

Setting up ALSA to handle Bluetooth Audio is really pretty simple. You need to edit two files, the first is `/etc/asound.conf`. It should have a stanza like this:

```  
pcm._SRS-X5_ {
   type bluetooth
        device "00:1D:DF:AF:96:8C"
        profile "auto"
}
pcm.SRS-X5 {
    type plug
    slave {
        pcm _SRS-X5_
    }
}
```
  
You can, of course have multiple stanzas for Bluetooth speakers, just make sure they
have unique names. You'll need to restart the ALSA system after updating the file...

Then edit `/etc/bluetooth/audio.conf` and make sure the `[General]` section has these two lines:

```
Enable=Source,Sink,Media,Headset,Socket
```

Make sure you comment out any additional `Enable/Disable` lines in that section!

That's it. You can restart the Bluetooth service, the ALSA service does not need a restart. If you have trouble, a reboot can help, but that's a last resort.

`serice bluetooth restart`

### <a name="PlayingAudio"/> Playing Audio

Playing audio is dead easy - note that Bluetooth speakers ttry to conserve energy, so it might be a second or two before your audio stream starts playing. Experiment a bit, and you'll soon figure out how much blank audio to add to you clips.

Here's how to get the EV3 to send out a simple audio test message:

```
root@ev3dev:~# aplay -D SRS-X5 /usr/share/sounds/alsa/Front_Center.wav
```

Note that the `-D SRS-X5` tells `aplay` which device to use, in our case it matches the name that we gave the device in `asound.conf`!

Of course, the next step is to have the EV3 say our catchphrase, like this:

```
espeak -g 5  "Test, 1 2 3 - E V 3 is awesome!" --stdout | aplay -D SRS-X5
```

We added the `Test, 1 2 3` to give the text some time to turn on the speaker...


## References

[ev3dev][ev3dev]
[ev3dev-wiki][ev3dev-wiki]
[ev3dev-releases][ev3dev-releases]
[bt-speaker-connect][bt-speaker-connect]

[ev3dev]: http://www.ev3dev.org/
[ev3dev-wiki]: https://github.com/ev3dev/ev3dev/wiki
[ev3dev-releases]: https://github.com/ev3dev/ev3dev/releases
[bt-speaker-connect]: http://linuxcommando.blogspot.ca/2013/11/how-to-connect-to-bluetooth.html

