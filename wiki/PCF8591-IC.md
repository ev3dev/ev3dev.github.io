---
title: PCF8591 IC
index: wiki
---

8-bit A/D and D/A converter

### Sensors That Use This IC
* [mindsensors.com Sensor building kit for NXT with PCF8591 IC](http://mindsensors.com/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=92)

### I2C Address
0x48..0x4F (configurable via input pins)

### Usage

Register device:

```
echo pcf8591 0x48 > /sys/bus/i2c/devices/i2c-<port+2>/new_device
```

Finding device class node:

```
for chip in $(find /sys/class/hwmon -name hwmon*)
do
    if [[ "$(cat $chip/device/name)" == "pcf8591" ]]
    then
        # do whatever
    fi
done
```

### Notes
* Use [lm-sensors](http://www.lm-sensors.org/) to interface with hwmon devices.
