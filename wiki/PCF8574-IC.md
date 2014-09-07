---
title: PCF8574 IC
index: wiki
---

Remote 8-bit I/O expander for I2C bus

### Sensors That Use This IC
* [mindsensors.com Sensor building kit for NXT with PCF8574 IC](http://mindsensors.com/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=71)
* [mindsensors.com Magic Wand Kit](http://mindsensors.com/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=120)([preassembled](http://mindsensors.com/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=128))

### I2C Address
0x38..0x3F (configurable via input pins)

### Usage

Register device:

```
echo pcf8574 0x38 > /sys/bus/i2c/devices/i2c-<port+2>/new_device
```

Finding device class node:

```
for chip in $(find /sys/class/gpio -name gpiochip*)
do
    if [[ "$(cat $chip/label)" == "pcf8547" ]]
    then
        # do whatever
    fi
done
```

### Notes
* GPIOs are active low. There is an attribute to set this if you manually export the GPIOs in sysfs.
* [kernel docs](https://www.kernel.org/doc/Documentation/gpio/)
