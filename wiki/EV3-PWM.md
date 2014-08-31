---
title: EV3 PWM
index: wiki
---

The [AM1808 SoC](EV3 Processor) has 2 Enhanced High Resolution Pulse Width
Modulators (eHRPWMs) and 3 Enhanced Capture Modules (eCAPs) that can be configured as PWMs.

The EHRPWMs actually have 2 PWM outputs (A/B) per device for a total of 4 EHRPWMs.

##Usage
Device | Connection
-------|-----------
EHRPWM0A | Not used/connected
EHROWM0B | Drives the EV3 [speaker](EV3 Sound) to produce sound
EHRPWM1A | Output port B motor driver
EHRPWM1B | Output port A motor driver
ECAP0 | Output port C motor driver
ECAP1 | Output port D motor driver
ECAP2 | Bluetooth "slow clock" @ 32.767kHz
