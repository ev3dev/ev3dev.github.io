---
title: Using Sensors
index: wiki
---

## Overview

One of the goals of ev3dev is to support as many sensors as possible. If you have a sensor that does not work, let us know about it.

When dealing with sensors in ev3dev, it is useful to know how it communicates with the EV3 brick. This influences what you need to do to read data from your sensor.

### Analog Sensors

These are the simplest type of sensor. The measured value is converted to a voltage (0-5VDC) that is read by the EV3. There are actually two types of analog sensors. We call the first **Analog/EV3**. These are sensors that were designed specifically for the EV3 and will not work on the NXT. They contain an ID resistor so that the EV3 can tell different types of sensors apart. The second type is **Analog/NXT**. These sensors are designed for the NXT, but also work on the EV3. The EV3 cannot differentiate between most of these sensors though, so you have to tell it which one your have or just use a generic interface.

RCX sensors also fall into this category, but do not work with the EV3 - at least not with the converter cable described in the NXT Hardware Developers kit. This is due to a difference in the input port pins between the EV3 and the NXT. If someone wants to research the [LEGO 8528](http://shop.lego.com/en-US/Converter-Cables-for-LEGO-MINDSTORMS-NXT-8528/?domainredir=www.shop.lego.com) cable or design a new converter cable, we could probably make them work.

### LEGO NXT Color Sensor

The LEGO NXT Color Sensor is in a class of its own. We don't have a driver for it yet.

### I2C Sensors

I2C sensors are sensors that communicate with the intelligent brick via the [I2C protocol](https://en.wikipedia.org/wiki/I2c). In the NXT documentation, they are referred to a "digital" sensors.

These sensors can be sorted into two categories as well: those that were designed using LEGO's guidelines and those that use an off the shelf I2C chip. ev3dev supports both kind of sensors, but only the first type is auto-detected. We will refer to the former as **I2C/M** (for Mindstorms) and the latter as **I2C/S** (for Standard).

### UART Sensors

These are a new type of sensor designed for the EV3 (they don't work with the NXT). They use an [UART](https://en.wikipedia.org/wiki/Uart) to send data to the brick. These sensors are a bit "smarter" in that in addition to sending the data of what they measure, they also send information about their capabilities. This means that any new UART sensors should "just work" without us having to write new drivers.

## Usage

### The Mindstorms Sensor class

Most sensors are accessed using a device driver class especially for Mindstorms sensors. When you plug a sensor in (assuming it is the auto-detectable type) a sysfs node will be added to `/sys/class/msensor`. The name of the node will be `sensorN` where N is incremented for each sensor that is plugged in.

For full details, see [[Using the Mindstorms Sensor Device Class]]. For the basics, keep going.

For an example, I will be using the EV3 Color Sensor. If we plug the sensor into any input port, a new device will be added to the `msensor` class.

```
root@ev3dev:/sys/class/msensor/sensor0# ls
bin_data	 dp	num_values  type_id  value0  value3  value6
bin_data_format  mode	port_name   uevent   value1  value4  value7
device		 modes	subsystem   units    value2  value5
```

Each sensor has a number of modes in which in can operate. You can view the available modes with the `modes` attribute and view/change the current mode using the `mode` attribute.

```
root@ev3dev:/sys/class/msensor/sensor0# cat modes
COL-REFLECT COL-AMBIENT COL-COLOR REF-RAW RGB-RAW COL-CAL
root@ev3dev:/sys/class/msensor/sensor0# cat mode
COL-REFLECT
root@ev3dev:/sys/class/msensor/sensor0# echo COL-COLOR > mode
root@ev3dev:/sys/class/msensor/sensor0# cat mode
COL-COLOR
```

The values measured by the sensor are read through the ```valueN``` attributes. The ```num_values``` attributes will tell you how many values there are. Values with an index >= num_values will return an error.

```bash
root@ev3dev:/sys/class/msensor/sensor0# cat num_values # mode is still COL-COLOR
1
root@ev3dev:/sys/class/msensor/sensor0# cat value*
0
cat: value1: No such device or address
cat: value2: No such device or address
cat: value3: No such device or address
cat: value4: No such device or address
cat: value5: No such device or address
cat: value6: No such device or address
cat: value7: No such device or address
root@ev3dev:/sys/class/msensor/sensor0# echo RGB-RAW > mode
root@ev3dev:/sys/class/msensor/sensor0# cat num_values
3
root@ev3dev:/sys/class/msensor/sensor0# cat value*
4
6
2
cat: value3: No such device or address
cat: value4: No such device or address
cat: value5: No such device or address
cat: value6: No such device or address
cat: value7: No such device or address
```

### Analog Sensor Considerations

NXT Analog sensors, for the most part, cannot be autodetected. The exceptions are the LEGO NXT Light Sensor and the LEGO NXT Touch Sensor. The remaining sensors use a common `msensor` interface. There are two modes `NXT-ANALOG-0` and `NXT-ANALOG-1`. The only difference between the two is that when you set the mode to `NXT-ANALOG-1`, the GPIO connected to pin 5 will be set high. Some sensors use this to measure a different value. See the individual sensor documentation below to see if a sensor supports more than one mode.

The sensor value is read using the `value0` attribute. It reads the voltage from the analog/digital converter (0..5V). User programs will have to be told what sensor is attached and how to scale the voltage to a usable value.

### I2C Sensor Considerations

I2C/M sensors should be auto-detected. They will show up in `/sys/class/msensors` and have the same interface as other sensors.

Example: If we connect an NXT Ultrasonic Sensor to another input port, we should see something like this:

```
root@ev3dev:/sys/class/msensor# ls
sensor0 sensor1
root@ev3dev:/sys/class/msensor# cd sensor1
root@ev3dev:/sys/class/msensor/sensor1# cat modes
NXT-US-CM NXT-US-IN NXT-US-SI-CM NXT-US-SI-IN NXT-US-LIST
```

I2C/S sensors are not autodetected because there is no standard way to detect them. There are just too many possibilities. But, they are easy to load manually and you can write udev rules to load them automatically if you want. Most of these types of sensors do not use `/sys/class/msensors` because there are already existing drivers in the Linux kernel for many standard I2C chips.

To learn how to manually load I2C devices and many more interesting things about I2C sensors, see [[Using I2C Sensors]]. Also be sure to look at the individual sensor documentation using the links in the table below.

## List of Sensors

<table>
  <tr>
    <th>Manufacturer
    <th>Mfg. P/N
    <th>Name
    <th>Connection Type
    <th>Auto-<br>detected
    <th>Driver (Module)
  <tr>
    <td rowspan="1"><a href="http://www.codatex.com//">CODATEX</a>
    <td>
    <td>Codatex RFID Sensor
    <td>
    <td>
    <td>
  <tr>
    <td rowspan="1"><a href="http://www.dexterindustries.com/">Dexter Industries</a>
    <td>
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td rowspan="17"><a href="http://www.hitechnic.com/">HiTechnic</a>
    <td>NAA1030
    <td>[[NXT Angle Sensor|HiTechnic NXT Angle Sensor (NAA1030)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;naa1030 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>NAC1040
    <td>[[NXT Acceleration / Tilt Sensor|HiTechnic NXT Acceleration / Tilt Sensor (NAC1040)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;nac1040 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>NBR1036
    <td>[[NXT Barometric Sensor|HiTechnic NXT Barometric Sensor (NBR1036)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;nbr1036 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>NCO1038
    <td>[[NXT Color Sensor V2|HiTechnic NXT Color Sensor V2 (NCO1038)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;nco1038 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>NEO1048
    <td>[[NXT EOPD|HiTechnic NXT EOPD (NEO1048)]]
    <td>Analog/NXT
    <td>Y*
    <td>(nxt&#8209;analog&#8209;sensor)
  <tr>
    <td>NFS1074
    <td>[[NXT Force Sensor|HiTechnic NXT Force Sensor (NFS1074)]]
    <td>Analog/NXT
    <td>Y*
    <td>(nxt&#8209;analog&#8209;sensor)
  <tr>
    <td>NGY1044
    <td>[[NXT Gyro Sensor|HiTechnic NXT Gyro Sensor (NGY1044)]]
    <td>Analog/NXT
    <td>Y*
    <td>(nxt&#8209;analog&#8209;sensor)
  <tr>
    <td>NIL1046
    <td>[[NXT IRLink Sensor|HiTechnic NXT IRLink Sensor (NIL1046)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;nil1046 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>NIS1070
    <td>[[NXT PIR Sensor|HiTechnic NXT PIR Sensor (NIS1070)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;nis1070 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>NIR1032
    <td>[[NXT IRReceiver Sensor|HiTechnic NXT IRReceiver Sensor (NIR1032)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;nir1032 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>NMC1034
    <td>[[NXT Compass Sensor|HiTechnic NXT Compass Sensor (NMC1034)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;nmc1034 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>NMS1035
    <td>[[NXT Magnetic Sensor|HiTechnic NXT Magnetic Sensor (NM1035)]]
    <td>Analog/NXT
    <td>Y*
    <td>(nxt&#8209;analog&#8209;sensor)
  <tr>
    <td>NSK1042
    <td>[[NXT IRSeeker V2|HiTechnic NXT IRSeeker V2 (NSK1042)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;nsk1042 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>NSX2020
    <td>[[NXT Sensor Multiplexer|HiTechnic NXT Sensor Multiplexer (NSX2020)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;nsx2020 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>NTX1060
    <td>[[NXT Touch Sensor Multiplexer|HiTechnic NXT Touch Sensor Multiplexer (NTX1060)]]
    <td>Analog/NXT
    <td>Y*
    <td>
  <tr>
    <td>SPR2010
    <td>[[NXT SuperPro Prototype Board|HiTechnic NXT SuperPro Prototype Board (SPR2010)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;spr2010 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>???
    <td>[[NXT Color Sensor (v1)|HiTechnic NXT Color Sensor (v1)]]
    <td>I2C/M
    <td>Y
    <td>ht&#8209;nco (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td rowspan="12"><a href="http://lego.com">LEGO</a> / <a href="http://education.lego.com">LEGO&nbsp;Education</a>
    <td>9668
    <td>[[Energy Display| LEGO Energy Display (9668)]]
    <td>I2C/M
    <td>Y
    <td>lego&#8209;9668 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>9694
    <td>[[NXT Color Sensor|LEGO NXT Color Sensor (9694)]]
    <td>Special
    <td>Y
    <td>nxt&#8209;color&#8209;sensor
  <tr>
    <td>9749
    <td>[[NXT Temperature Sensor|LEGO NXT Temperature Sensor (9749)]]
    <td>I2C/S
    <td>N
    <td>tmp275 (lm75)
  <tr>
    <td>9843
    <td>[[NXT Touch Sensor|LEGO NXT Touch Sensor (9843)]]
    <td>Analog/NXT
    <td>Y
    <td>nxt&#8209;analog&#8209;sensor (touch&#8209;sensor)
  <tr>
    <td>9844
    <td>[[NXT Light Sensor|LEGO NXT Light Sensor (9844)]]
    <td>Analog/NXT
    <td>Y
    <td>nxt&#8209;analog&#8209;sensor (nxt&#8209;light&#8209;sensor)
  <tr>
    <td>9845
    <td>[[NXT Sound Sensor|LEGO NXT Sound Sensor (9845)]]
    <td>Analog/NXT
    <td>Y*
    <td>(nxt&#8209;analog&#8209;sensor)
  <tr>
    <td>9846
    <td>[[NXT Ultrasonic Sensor|LEGO NXT Ultrasonic Sensor (9846)]]
    <td>I2C/M
    <td>Y
    <td>lego&#8209;9846 (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>45504
    <td>[[EV3 Ultrasonic Sensor|LEGO EV3 Ultrasonic Sensor (45504)]]
    <td>UART
    <td>Y
    <td>
  <tr>
    <td>45505
    <td>[[EV3 Gyro Sensor|LEGO EV3 Gyro Sensor (45505)]]
    <td>UART
    <td>Y
    <td>
  <tr>
    <td>45506
    <td>[[EV3 Color Sensor|LEGO EV3 Color Sensor (45506)]]
    <td>UART
    <td>Y
    <td>
  <tr>
    <td>45507
    <td>[[EV3 Touch Sensor|LEGO EV3 Touch Sensor (45507)]]
    <td>Analog/EV3
    <td>Y
    <td>ev3&#8209;analog&#8209;sensor (touch&#8209;sensor)
  <tr>
    <td>45509
    <td>[[EV3 Infrared Sensor|LEGO EV3 Infrared Sensor (45509)]]
    <td>UART
    <td>Y
    <td>
  <tr>
    <td rowspan="1"><a href="http://www.LogITNXT.com">LogIT</a>
    <td>
    <td>NXT Sensor Adapter
    <td>
    <td>
    <td>
  <tr>
    <td rowspan="5"><a href="http://www.mindsensors.com">mindsensors.com</a>
    <td>LightSensorArray
    <td>[[Light Sensor Array|mindsensors.com Light Sensor Array (LightSensorArray)]]
    <td>I2C/M
    <td>Y
    <td>ms&#8209;light&#8209;array (nxt&#8209;i2c&#8209;sensor)
  <tr>
    <td>MagicWand
    <td>[[Magic Wand Kit|PCF8574 IC]]
    <td>I2C/S
    <td>N
    <td>pcf8574 (gpio&#8209;pcf857x)
  <tr>
    <td>PCF8574-Nx
    <td>[[Sensor building kit for NXT with PCF8574 IC|PCF8574 IC]]
    <td>I2C/S
    <td>N
    <td>pcf8574 (gpio&#8209;pcf857x)
  <tr>
    <td>PCF8591-Nx
    <td>[[Sensor building kit for NXT with PCF8591 IC|PCF8591 IC]]
    <td>I2C/S
    <td>N
    <td>pcf8591 (pcf8591)
  <tr>
    <td>RTC-Nx-v3
    <td>[[Realtime Clock for NXT|DS1307 IC]]
    <td>I2C/S
    <td>N
    <td>ds1307 (rtc&#8209;ds1307)
  <tr>
    <td rowspan="1"><a href="http://www.vernier.com">Vernier</a>
    <td>
    <td>NXT Sensor Adapter
    <td>
    <td>
    <td>
</table>
\* Analog/NXT sensors are detected but cannot be differentiated, so a generic interface is provided. Additional drivers may be required (although none exist yet).
