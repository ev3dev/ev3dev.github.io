---
title: LEGO EV3 Ultrasonic Sensor (45504)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```30``` |
| # Modes      | 7        |
| Connection   | UART     |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
    <th>Mode 2
    <th>Mode 3<sup><a href="#wiki-note1">1</a></sup>
    <th>Mode 4<sup><a href="#wiki-note1">1</a></sup>
    <th>Mode 5
    <th>Mode 6
  <tr>
    <td><code>mode</code>
    <td><code>US-DIST-CM</code>
    <td><code>US-DIST-IN</code>
    <td><code>US-LISTEN</code>
    <td><code>US-SI-CM</code>
    <td><code>US-SI-IN</code>
    <td><code>US-DC-CM</code>
    <td><code>US-DC-IN</code>
  <tr>
    <td>Description
    <td>Continuous measurement
    <td>Continuous measurement
    <td>Listen
    <td>Single measurement
    <td>Single measurement
    <td>???
    <td>???
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
  <tr>
    <td><code>value0</code>
    <td>Distance
    <td>Distance
    <td>Presence of another ultrasonic sensor
    <td>Distance
    <td>Distance
    <td>Distance
    <td>Distance
  <tr>
    <td>&emsp;Min
    <td><code>0</code> (0.0&nbsp;cm)
    <td><code>0</code> (0.0&nbsp;in)
    <td><code>0</code> (no other sensors detected)
    <td><code>0</code> (0.0&nbsp;cm)
    <td><code>0</code> (0.0&nbsp;in)
    <td><code>0</code> (0.0&nbsp;cm)
    <td><code>0</code> (0.0&nbsp;in)
  <tr>
    <td>&emsp;Max
    <td><code>2550</code> (255.0&nbsp;cm)
    <td><code>1003</code> (100.3&nbsp;in)
    <td><code>1</code> (another ultrasonic sensor was detected)
    <td><code>2550</code> (255.0&nbsp;cm)
    <td><code>1003</code> (100.3&nbsp;in)
    <td><code>2550</code> (255.0&nbsp;cm)
    <td><code>1003</code> (100.3&nbsp;in)
  <tr>
    <td><code>units</code>
    <td><code>cm</code> (centimeters)
    <td><code>in</code> (inches)
    <td><i>none</i>
    <td><code>cm</code> (centimeters)
    <td><code>in</code> (inches)
    <td><code>cm</code> (centimeters)
    <td><code>in</code> (inches)
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>1</code>
    <td><code>1</code>
    <td><code>0</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
  <tr>
    <td>LED State
    <td>On, steady
    <td>On, steady
    <td>On, blinking
    <td>On momentarily when mode is set, then off
    <td>On momentarily when mode is set, then off
    <td>On, steady
    <td>On, steady
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

<a name="note1" />[1]: SI means SIngle shot mode. The value is read when the mode is set and does not change. To read a new value, set the mode again (e.g. ```echo US-SI-CM > mode```).
