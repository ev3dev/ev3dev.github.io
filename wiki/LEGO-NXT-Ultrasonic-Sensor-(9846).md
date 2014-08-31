---
title: LEGO NXT Ultrasonic Sensor (9846)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|`type_id`     | `5`      |
| # Modes      | 5        |
| Connection   | I2C/M    |
| Vendor ID    | LEGO     |
| Product ID   | Sonar    |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
    <th>Mode 2
    <th>Mode 3
    <th>Mode 4
  <tr>
    <td><code>mode</code>
    <td><code>NXT-US-CM</code>
    <td><code>NXT-US-IN</code>
    <td><code>NXT-US-SI-CM</code>
    <td><code>NXT-US-SI-IN</code>
    <td><code>NXT-US-LIST</code>
  <tr>
    <td>Description
    <td>Continuous measurement
    <td>Continuous measurement
    <td>Single measurement
    <td>Single measurement
    <td>Listen
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
  <tr>
    <td><code>value0</code>
    <td>Distance
    <td>Distance
    <td>Distance<sup><a href="#wiki-note1">1</a></sup>
    <td>Distance<sup><a href="#wiki-note1">1</a></sup>
    <td>Presence of another ultrasonic sensor
  <tr>
    <td>&emsp;Min
    <td><code>0</code> (0&nbsp;cm)
    <td><code>0</code> (0.0&nbsp;in)
    <td><code>0</code> (0&nbsp;cm)
    <td><code>0</code> (0.0&nbsp;in)
    <td><code>0</code> (no other sensors detected)
  <tr>
    <td>&emsp;Max
    <td><code>255</code> (255&nbsp;cm)
    <td><code>1000</code> (100.0&nbsp;in)
    <td><code>255</code> (255&nbsp;cm)
    <td><code>1000</code> (100.0&nbsp;in)
    <td><code>1</code> (another ultrasonic sensor was detected)
  <tr>
    <td><code>units</code>
    <td><code>cm</code> (centimeters)
    <td><code>in</code> (inches)
    <td><code>cm</code> (centimeters)
    <td><code>in</code> (inches)
    <td><i>none</i>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
    <td><code>1</code>
    <td><code>0</code>
    <td><code>1</code>
    <td><code>0</code>
</table>
Values in the tables that look like `this` are the names of sysfs attributes or values returned by said attributes.

<a name="note1" />[1]: The value is read when the mode is set and does not change - even when polling is enabled. To read a new value, set the mode again (e.g. `echo NXT-US-SI-CM > mode`).
