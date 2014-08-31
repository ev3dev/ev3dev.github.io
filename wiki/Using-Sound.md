---
title: Using Sound
index: wiki
---

_Beep. Boop. Dit. Dit. Meep._

Robots like to make sounds. They told me so.

## Introduction

The EV3 uses pulse width modulation (PWM) to drive an amplifier that produces the sounds that you hear through the speaker. It has two modes of operation. The first, we call **Tone** mode (aka **Beep** mode). In Tone mode, the PWM is set to a frequency in the audible range<sup>[1]</sup>. The sound you hear is a square wave. The second mode is called **PCM Playback** mode. In this mode, the PWM is operated at a higher frequency. The high frequencies are (mostly) filtered out and we are able to reproduce a recorded sound.

If you are interested in the science of how this works or want to know more about some of the other neat things we did to improve the sound on the EV3, check out the _[[EV3 Sound]]_ page of the _[[ev3dev Kernel Hackers Notebook]]_

[1]: https://en.wikipedia.org/wiki/Audio_frequency

## Tone Mode

There are a couple of ways to control the speaker in Tone mode. Also worth an honorable mention: if you plug a USB keyboard into the EV3 and press CTRL+G, it will beep!

### ```beep``` command

The [beep man page](http://manpages.debian.net/cgi-bin/man.cgi?query=BEEP&sektion=1&apropos=0&manpath=Debian+7.0+wheezy&locale=) has all you need to know. Be sure to read the IOCTL WACKINESS section on why you have to beep as root from a remote terminal.

Examples:

```
# beep # 440 Hz for 200 ms
# beep -f 200 -l 500 # 220 Hz for 500 ms
# beep -f 262 -l 180 -d 20 -r 2 \
-n -f 392 -l 180 -d 20 -r 2 \
-n -f 440 -l 180 -d 20 -r 2 \
-n -f 392 -l 380 -d 20 \
-n -f 349 -l 180 -d 20 -r 2 \
-n -f 330 -l 180 -d 20 -r 2 \
-n -f 294 -l 180 -d 20 -r 2 \
-n -f 262 -l 400 # twinkle twinkle little star
```
### ```tone``` sysfs Attribute

We have also provided a way to play tones directly using the sysfs attribute ```/sys/devices/platform/snd-legoev3/tone```.

Example:

```
$ cd /sys/devices/platform/snd-legoev3
$ echo 1000 10000 > tone # play a 1 KHz tone for 10 seconds
$ echo 440 > tone # play a 440 Hz tone (endless mode)
$ echo 0 > tone # stop the tone 
```

## PCM Playback Mode

PCM playback is implemented as an ALSA driver. This means that you can use just about any Linux program out there that can play sound. We have found the best compromise between sound quality and CPU usage is to use a sample rate 22050 Hz. 16000 Hz sounds pretty good too. Of course the speaker is so small, the sound quality is just not going to be "high quality" no matter what.

Example: Playing back a .wav file using ```aplay```.

```
$ aplay my-file.wav
Playing WAVE 'my-file.wav' : Signed 16 bit Little Endian, Rate 22050 Hz, Mono
```

## Volume control

Again, there are a number of ways to do this. Currently, there is only a master volume control that controls both Tone mode and PCM Playback mode.

### ```amixer``` Command

Documentation:
* [man page](http://manpages.debian.net/cgi-bin/man.cgi?query=amixer&apropos=0&sektion=0&manpath=Debian+7.0+wheezy&format=html&locale=en)

Example:

```
$ amixer get Playback,0 # get current volume
Simple mixer control 'Playback',0
  Capabilities: volume volume-joined penum
  Playback channels: Mono
  Capture channels: Mono
  Limits: 0 - 256
  Mono: 255 [100%]
$ amixer set Playback,0 50% # set volume to 50%
Simple mixer control 'Playback',0
  Capabilities: volume volume-joined penum
  Playback channels: Mono
  Capture channels: Mono
  Limits: 0 - 256
  Mono: 128 [50%]
```

### ```alsamixer``` Command

Graphical volume controls.

```
┌───────────────────────────── AlsaMixer v1.0.25 ──────────────────────────────┐
│ Card: LEGO Mindstorms EV3 speaker                    F1:  Help               │
│ Chip:                                                F2:  System information │
│ View: F3:[Playback] F4: Capture  F5: All             F6:  Select sound card  │
│ Item: Playback                                       Esc: Exit               │
│                                                                              │
│                                     ┌──┐                                     │
│                                     │  │                                     │
│                                     │  │                                     │
│                                     │  │                                     │
│                                     │  │                                     │
│                                     │  │                                     │
│                                     │  │                                     │
│                                     │  │                                     │
│                                     │▒▒│                                     │
│                                     │▒▒│                                     │
│                                     │▒▒│                                     │
│                                     │▒▒│                                     │
│                                     │▒▒│                                     │
│                                     └──┘                                     │
│                                      40                                      │
│                                  <Playback>                                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### sysfs Attribute

You can also use ```/sys/devices/platform/snd-legoev3/volume```.

## sysfs Attributes and Module Parameters

We have mentioned a couple of the attributes already. They are located at ```/sys/devices/platform/snd-legoev3```.

| Attribute | R/W | Description
|-----------|-----|------------
| mode      | RO  | The current playback mode. Returns ```idle```, ```tone``` or ```pcm```.
| tone      | R/W | Reading returns the frequency of the current tone or ```0``` if no tone is playing. Writing takes one or two values. A single value will cause a tone to play at that frequency until stopped. Values less that 100 and greater than 10000 will be limited to those values. A value of ```0``` stops tone playback. An optional second value is the duration of the tone in milliseconds.
| volume    | R/W | Reading returns the current volume (0-100). Writing sets the volume.

## Battery life considerations

If you are not using rechargeable batteries, you will want to take the CPU usage required by sound playback into consideration. If you are playing back compressed sound files, like ogg or mp3, then you are wasting battery power because of high CPU usage in decompressing the files. It is best to use uncompressed .wav files. Also, higher sample rates result in higher CPU usage. There is not really any noticeable improvement in sound quality above 22050 Hz anyway.

## More Fun!

### Text-To-Speech

```
$ espeak "hello, I am an EV3.
> I like to talk because I am a robot.
> Did you know that robots like to make sounds?
> Beep. Boop. Dit. Dit. Meep.
> I am just such a chatterbox." --stdout | aplay
Playing WAVE 'stdin' : Signed 16 bit Little Endian, Rate 22050 Hz, Mono
```

Tip: Add a function like this to your ```~/.bashrc``` file.

```
speak(){
    espeak -a 200 -s 130 -v la --stdout "$@" | aplay
}
```

Then you can simply use:

```
$ speak "Thanks to GeeKDude for this idea!" # @G33kDude
```

### MP3 player

```
$ sudo apt-get install mpg123 # or mpg321
...
$ mpg123 /home/ev3dev/Music/01-The\ Jumpin\'\ Jive.mp3 
High Performance MPEG 1.0/2.0/2.5 Audio Player for Layers 1, 2 and 3
	version 1.14.4; written and copyright by Michael Hipp and others
	free software (LGPL/GPL) without any warranty but with best wishes

Directory: /home/ev3dev/Music/
Playing MPEG stream 1 of 1: 01-The Jumpin' Jive.mp3 ...

MPEG 1.0 layer III, 128 kbit/s, 44100 Hz joint-stereo
Title:   The Jumpin' Jive                Artist: Cab Calloway
Comment:                                 Album:  Minnie the Moocher [Universal]
Year:    1989                            Genre:  Swing
```

