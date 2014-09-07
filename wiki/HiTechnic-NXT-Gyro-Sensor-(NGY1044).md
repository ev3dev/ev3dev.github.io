---
title: HiTechnic NXT Gyro Sensor (NGY1044)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value      |
|:------------:|:----------:|
|```type_id``` | ```3```*   |
| # Modes      | 1          |
| Connection   | Analog/NXT |
\* Not unique.

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
  <tr>
    <td><code>mode</code>
    <td><code>NXT-ANALOG-0</code>
  <tr>
    <td>Description
    <td>Rotational speed
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
  <tr>
    <td><code>value0</code>
    <td>Raw sensor voltage
  <tr>
    <td>&emsp;Min
    <td><code>0</code>
  <tr>
    <td>&emsp;Max
    <td><code>4883</code> (4.882 V)
  <tr>
    <td><code>units</code>
    <td><code>V</code>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>3</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

### Scaling

Since this is an NXT Analog sensor and the exact type cannot be autodetected, we have to use a generic sensor interface. This sensor measures rotational speed in degrees/second. Nominally, 0.00V == -540 deg/sec and 4.88V == 400 deg/sec. However, depending on temperature, there is a small offset, so we have to calibrate the sensor to accommodate this.

Sample usage:

```bash
#!/bin/bash

# Sample the raw sensor voltage 10 times and get an average value.
# Sensor should be held perfectly still for this.
total=0
for i in {1..10}
do
        total=$(($total + $(cat value0)))
        # if you are using a compiled language, you will want a delay here (~10msec is good)
done
average=$(($total / $i))

# Set scaling that includes offset from average
# 1.953V is proportional to 400 deg/sec
raw_min=$average
raw_max=$(($average + 1953))
scaled_min=0
scaled_max=400

# Now move the sensor around
watch -n 0.1 echo '$((($(cat value0) - '$raw_min')
* ('$scaled_max' - '$scaled_min')
/ ('$raw_max' - '$raw_min') + '$scaled_min'))'
```
