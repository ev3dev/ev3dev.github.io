---
title: EV3 Sound
---

## Essentials

* Speaker
    * 16&#8486;
    * 0.25W
* Amplifier power is switched using GPIO 6-5
* Driven by pulse with modulation - [EHROWM0B](../ev3-pwm)

## Device Driver

The driver is implemented as an [ALSA](https://www.kernel.org/doc/html/latest/sound/index.html) sound driver. There is an [input](https://www.kernel.org/doc/Documentation/input/input.txt) device that is integrated into the ASLA driver to provide a system beep (e.g. ^G). There are also extra attributes for manually controlling tone mode since the input device required root privileges when used from a remote terminal (i.e. ssh).

## Notes

* We use the PWM in 2 different ways to produce sound. In __Tone__ mode, the PWM is set to an audible frequency (&lt; 20kHz). The sound you hear is the square wave produced by the PWM output. In __PCM Playback__ mode, the PWM is set to a ultrasonic frequency (&gt;20kHz). The output is passed through a low-pass filter, so the input to the amplifier is a voltage proportional to the duty cycle of the PWM.
* There is a Google Summer of Code project where a [student uses PWM to drive a speaker](https://elinux.org/BeagleBoard/GSoC/2010_Projects/Pulse_Width_Modulation).