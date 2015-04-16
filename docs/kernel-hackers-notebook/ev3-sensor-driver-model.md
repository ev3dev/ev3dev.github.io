---
tile: EV3 Sensor Driver Model
---

Sensors drivers are implemented using the Linux [driver model](https://www.kernel.org/doc/Documentation/driver-model/). There are basically four compontents to this: devices, drivers, busses and classes.

## Devices

Devices are a data structure that represents the physical device.

* It stores information on how to communicate with the physical device, such as what GPIO to use or what memory address to look at.
* It stores informative information, like a unique name and id.
* It stores relational information such as the parent device and the bus it is registred.