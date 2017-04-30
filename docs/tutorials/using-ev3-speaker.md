---
title: Using the EV3 Speaker
group: hardware-standard
---

* Table of Contents
{:toc}


## Introduction

The EV3 uses pulse-width modulation (PWM) to drive an amplifier that produces the
sounds that you hear through the speaker. It has two modes of operation. The first,
we call **Tone** mode (aka **Beep** mode). In Tone mode, the PWM is set to a
frequency in the [audible range][1]. The sound you hear is a square wave.
The second mode is called **PCM Playback** mode. In this mode, the PWM is operated
at a higher frequency. The high frequencies are (mostly) filtered out and we are
able to reproduce a recorded sound.

[1]: https://en.wikipedia.org/wiki/Audio_frequency


## Tone Mode

There are a couple of ways to control the speaker in Tone mode. Also worth an
honorable mention: if you plug a USB keyboard into the EV3 and press
<kbd>CTRL</kbd>+<kbd>G</kbd>, it will beep!


### beep command

The [beep man page][2] has all you need to know.

[2]: https://manpages.debian.org/jessie/beep/beep.1.en.html

Examples:

```bash
$ beep # 440 Hz for 200 ms
$ beep -f 200 -l 500 # 220 Hz for 500 ms
$ beep -f 262 -l 180 -d 20 -r 2 \
-n -f 392 -l 180 -d 20 -r 2 \
-n -f 440 -l 180 -d 20 -r 2 \
-n -f 392 -l 380 -d 20 \
-n -f 349 -l 180 -d 20 -r 2 \
-n -f 330 -l 180 -d 20 -r 2 \
-n -f 294 -l 180 -d 20 -r 2 \
-n -f 262 -l 400 # twinkle twinkle little star
```


### tone sysfs Attribute

TODO: using the `tone` attribute is not really recommended. This needs to be
updated with an example on how to use the Linux input subsystem instead.

We have also provided a way to play tones directly using the sysfs attribute
`/sys/devices/platform/snd-legoev3/tone`.

Example:

```bash
$ cd /sys/devices/platform/snd-legoev3
$ echo 1000 10000 > tone # play a 1 KHz tone for 10 seconds
$ echo 440 > tone # play a 440 Hz tone (endless mode)
$ echo 0 > tone # stop the tone 
```


## PCM Playback Mode

PCM playback is implemented as an ALSA driver. This means that you can use just
about any Linux program out there that can play sound. We have found the best
compromise between sound quality and CPU usage is to use a sample rate 22050 Hz.
16000 Hz sounds pretty good too. Of course the speaker is so small, the sound
quality is just not going to be "high quality" no matter what.

Example: Playing back a .wav file using `aplay`.

```bash
$ aplay my-file.wav
Playing WAVE 'my-file.wav' : Signed 16 bit Little Endian, Rate 22050 Hz, Mono
```

{% include /style/icon.html type="info" %}
You must be a member of the `audio` group in order to use the sound driver.
{: .alert .alert-info}


## Volume control

Again, there are a number of ways to do this. Currently, there is only a master
volume control that controls both Tone mode and PCM Playback mode.

### amixer Command

Documentation:
* [man page](https://manpages.debian.org/jessie/alsa-utils/amixer.1.en.html)

Example:

```bash
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

### alsamixer Command

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


## More Fun!

### Text-To-Speech

```bash
$ espeak "hello, I am an EV3.
> I like to talk because I am a robot.
> Did you know that robots like to make sounds?
> Beep. Boop. Dit. Dit. Meep.
> I am just such a chatterbox." --stdout | aplay
Playing WAVE 'stdin' : Signed 16 bit Little Endian, Rate 22050 Hz, Mono
```

{% include /style/begin-panel.html type="info" heading="Tip" %}
 Add a function like this to your `~/.bashrc` file.

```bash
speak(){
    espeak -a 200 -s 130 -v la --stdout "$@" | aplay --quiet
}
```

Then you can simply use:

```bash
$ speak "Thanks to GeekDude for this idea!" # @G33kDude
```
{% include /style/end-panel.html %}


### MP3 player

```bash
$ sudo apt-get update
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
