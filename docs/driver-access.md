---
title: Low-level driver access
subtitle: Controlling ev3dev devices through the low-level drivers
---

Ev3dev exposes motors, sensors and other EV3-related devices through a set of
drivers that are built into the platform. If you want to access those drivers
directly instead of using [a pre-built library](/docs/libraries), you'll need
to read from and write to the sysfs properties that ev3dev exposes.

**TODO**