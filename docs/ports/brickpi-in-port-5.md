---
title: Dexter Industries BrickPi Input Port 5
---

{% include icon.html type="warning" %}
Some devices behave erratically if baudrate is changed while they are plugged in. 
If needed unplug your sensor, change the baudrate and plug the sensor again.
{: .alert .alert-warning}

BrickPi Input Port 5 is RaspberryPi I2C physically wired to the port pins and supported by i2c_bcm2708 kernel module. Port 5 is not present in BrickPi+. Only I2C/NXT and I2C/Other sensors work with port 5. You have to make sure
that correct baudrate for the sensor is set and load the driver manually.

I2C/NXT sensors should work with slow 9600 baudrate used originally in Mindstorms NXT.

Example of setting RaspberryPi I2C baudrate:

    modprobe -r i2c_bcm2708 #remove module
    modprobe i2c_bcm2708 baudrate=9600 #load module specifying baudrate


Alternatively add `dtparam=i2c_baudrate=9600` to the end of `/boot/flash/config.txt` and reboot.


Example of loading Microinfinity CruizCore XG1300L I2C/NXT driver manually:

    echo mi-xg1300l 0x01 > /sys/bus/i2c/devices/i2c-1/new_device 


