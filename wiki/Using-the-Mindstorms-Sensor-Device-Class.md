---
title: Using the Mindstorms Sensor Device Class
index: wiki
---

## Introduction

Device classes are the hardware abstraction layer used by Linux to separate the useful parts of hardware from the underlying low level implementation. For example, you have a keyboard that is probably USB, but could be bluetooth or maybe even PS/2. They both implement the Linux ```input``` class. Programs that read information from the keyboard only have to know about the ```input``` class. They don't have to know about how to speak USB an bluetooth and PS/2 and every other type of keyboard ever made.

There are so many sensors for the EV3 that it seems natural to do the same thing for ev3dev. Most sensors made for LEGO Mindstorms are very similar in how they work, so as a result, we have the ```msensor``` class.

## sysfs Interface

All device classes in Linux are found at ```/sys/class```. There are quite a few.

```bash
$ cd /sys/class
$ ls
bdi        i2c-adapter  misc          pwm           sound       vc
block      i2c-dev      mmc_host      rtc           spi_master  vtconsole
bluetooth  ieee80211    msensor       scsi_device   tty
firmware   input        mtd           scsi_disk     udc
gpio       leds         net           scsi_generic  uio
graphics   mem          power_supply  scsi_host     usbmon
```

Whenever you connect a sensor, assuming that it is autodetected and that it implements the ```msensor``` class, it will show up in ```/sys/class/msensor```. See the [individual sensor documentation](Using-Sensors#wiki-list-of-sensors) to find out if a sensor works with the ```msensor``` class.

### Naming

Sensors are enumerated as ```sensorN``` where N is incremented each time a sensor is attached. This means that if plug a sensor into input port 4 first, it will be named ```sensor0```. Then if you plug a sensor into input port 1, it will be named ```sensor1```. If you unplug the sensor from port 4 and plug it back in to the same port it will now be named ```sensor2```.

### Attributes

| Name                  | R/W | Description |
|-----------------------|-----|-------------|
| ```bin_data```        | R/W | Reading the file will give the same values in the ```valueN``` attributes. Use ```bin_data_format``` and ```num_values``` to determine how to interpret the data. Writing will write data to the sensor (I2C, UART and NXT Color sensors only).
| ```bin_data_format``` | RO  | The format of the values in ```bin_data``` for the current mode.<ul><li>```u8```: Unsigned 8-bit integer (byte)</li><li>```s8```: Signed 8-bit integer (sbyte)<li>```u16```: Unsigned 16-bit integer (ushort)</li></li><li>```s16```: Signed 16-bit integer (short)</li><li>```s16_be```: Signed 16-bit integer, big endian</li><li>```s32```: Signed 32-bit integer (int)</li><li>```float```: IEEE 754 32-bit floating point (float)</li></ul>
| ```dp```              | RO  | The number of decimal places for the values in the ```valueN``` attributes of the current mode.
| ```fw_version```      | RO  | I2C/M sensors only. The firmware version of the sensor.
| ```i2c_addr```        | RO  | I2C sensors only. The I2C address of the sensor. See [[I2C Sensor Addressing]].
| ```mode```            | R/W | Reading lists the available modes and indicates the current mode by surrounding it with brackets (```[...]```). Writing one of the listed values sets the mode.
| ```num_values```      | RO  | Number of ```valueN``` attributes that will return a valid value for the current mode.
| ```poll_ms```         | R/W | I2C sensors only. Polling period of the sensor in milliseconds. Set to 0 to disable polling. Minimum value is hard coded as 50 msec.
| ```port_name```       | RO  | The name of the port that the sensor is connected to.
| ```units```           | RO  | The units of the measured value for the current mode.
| ```type_id```         | RO  | A unique identifier for the type of sensor. See the [individual sensor documentation](Using-Sensors#wiki-list-of-sensors) for what this should be.
| ```value0``` ... ```value7``` | RO | The value or values measured by the sensor. Check ```num_values``` to see how many values there are. Values with N >= num_values will return an error. The values are fixed point numbers, so check ```dp``` to see if you need to divide to get the actual value.
__R/W__: read/write, __RO__: read only, __WO__: write only

## Practical Examples

Also see [[Using I2C Sensors]]

### Viewing and Setting the Mode

```bash
$ cat mode
[NXT-US-CM] NXT-US-IN NXT-US-SI-CM NXT-US-SI-IN NXT-US-LIST
$ echo NXT-US-IN > mode
$ cat mode
NXT-US-CM [NXT-US-IN] NXT-US-SI-CM NXT-US-SI-IN NXT-US-LIST
```

### Reading values

```bash
$ cat num_values
1
$ cat dp
1
$ cat units
in
$ cat value0
101
$ cat value1
cat: value1: No such device or address
```
Actual value is 10.1 inches.

### Viewing Binary Data

```bash
$ cat bin_data_format
u8
$ hexdump -e '8/1 "%02X " "\n"' < bin_data
19 00 00 00 00 00 00 00
00 00 00 00 00 00 00 00
*
```

### Find Sensor Connected to Input Port 3

```bash
$ echo '#!/bin/bash
for f in /sys/class/msensor/*
do
    if [ `cat $f/port_name` == "$1" ]
    then
        echo $f
        exit 0
    fi
   done
   exit 1
' > get_sensor_on_port
$ chmod +x get_sensor_on_port
$ ./get_sensor_on_port in3
/sys/class/msensor/sensor2
```

### Find First EV3 Color Sensor on Any Port

```bash
$ echo '#!/bin/bash
for f in /sys/class/msensor/*
do
    if [ `cat $f/type_id` == "$1" ]
    then
        echo $f
        exit 0
    fi
   done
   exit 1
' > get_sensor_with_type
$ chmod +x get_sensor_with_type
$ ./get_sensor_with_type 29
/sys/class/msensor/sensor1
```
