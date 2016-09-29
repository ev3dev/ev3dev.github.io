---
title: Low-level driver access
subtitle: Controlling ev3dev devices through the low-level drivers
---

Ev3dev exposes motors, sensors and other EV3-related devices through a set of
drivers that are built into the platform. If you want to access those drivers
directly instead of using [a pre-built library](/docs/libraries), you'll need
to read from and write to the sysfs properties that ev3dev exposes. Here are
some resources to get you started.

- **[Input and output ports](/docs/ports)**: The input and output ports on the
  EV3 and other ev3dev-supported hardware.

- **[Supported Sensors and Other Input Devices](/docs/sensors)**: The drivers and
  interfaces that operate sensors and other input devices.

- **[Supported Motors and Other Output Devices](/docs/motors)**: The drivers and
  interfaces that operate motors and other output devices. The most common
  motor interface on ev3dev is the [`tacho-motor` class](/docs/drivers/tacho-motor-class/),
  so it is important to read through the documentation for it when writing motor
  code. You can also read through our [tacho motor tutorial](/docs/tutorials/tacho-motors)
  to learn how to use the motor interface.

- **[ev3dev kernel drivers](/docs/drivers)**: An index of all the special
  hardware drivers that ev3dev ships with.