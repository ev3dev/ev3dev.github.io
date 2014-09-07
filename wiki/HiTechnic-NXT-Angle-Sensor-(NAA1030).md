---
title: HiTechnic NXT Angle Sensor (NAA1030)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```55``` |
| # Modes      | 4        |
| Connection   | I2C/M    |
| Vendor ID    | HITECHNC |
| Product ID   | AnglSnsr |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
    <th>Mode 2
    <th>Mode 3<sup><a href="#wiki-note1">1</a></sup>
  <tr>
    <td><code>mode</code>
    <td><code>HT-ANG-DEG2</code>
    <td><code>HT-ANG-ACC</code>
    <td><code>HT-ANG-RPM</code>
    <td><code>HT-ANG-RSET</code>
  <tr>
    <td>Description
    <td>Angle
    <td>Accumulated angle
    <td>Rotational speed
    <td>Reset Angle
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
  <tr>
    <td><code>value0</code>
    <td>Angle
    <td>Angle
    <td>Rotational speed
    <td>Angle
  <tr>
    <td>&emsp;Min
    <td><code>0</code>
    <td><code>-2147483648</code>
    <td><code>-32768</code>
    <td><code>0</code>
  <tr>
    <td>&emsp;Max
    <td><code>180</code>
    <td><code>2147483647</code>
    <td><code>32767</code>
    <td><code>180</code>
  <tr>
    <td><code>units</code>
    <td><code>deg</code> (degrees)
    <td><code>deg</code> (degrees)
    <td><code>RPM</code> (revolutions per minute)
    <td><code>deg</code> (degrees)
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

<a name="note1" />[1]: HT-ANG-RSET mode is exactly the same as HT-ANG-DEG2 except that the angle is reset each time the mode is set to HT-ANG-RSET.
