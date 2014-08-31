---
title: HiTechnic NXT Acceleration   Tilt Sensor (NAC1040)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```58``` |
| # Modes      | 2        |
| Connection   | I2C/M    |
| Vendor ID    | HITECHNC |
| Product ID   | Accel.   |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
  <tr>
    <td><code>mode</code>
    <td><code>HT-ACCL</code>
    <td><code>HT-ACCL-ALL</code>
  <tr>
    <td>Description
    <td>Single axis acceleration
    <td>Three axis acceleration
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>6</code>
  <tr>
    <td><code>value0</code>
    <td>Acceleration (coarse value<sup><a href="#wiki-note1">1</a></sup>)
    <td>X-axis acceleration (most significant byte)
  <tr>
    <td>&emsp;Min
    <td>???
    <td>???
  <tr>
    <td>&emsp;Max
    <td>???
    <td>???
  <tr>
    <td><code>value1</code>
    <td>
    <td>Y-axis acceleration (most significant byte)
  <tr>
    <td><code>value2</code>
    <td>
    <td>Z-axis acceleration (most significant byte)
  <tr>
    <td><code>value3</code>
    <td>
    <td>X-axis acceleration (least significant byte<sup><a href="#wiki-note2">2</a></sup>)
  <tr>
    <td><code>value4</code>
    <td>
    <td>Y-axis acceleration (least significant byte<sup><a href="#wiki-note2">2</a></sup>)
  <tr>
    <td><code>value5</code>
    <td>
    <td>Z-axis acceleration (least significant byte<sup><a href="#wiki-note2">2</a></sup>)
  <tr>
    <td><code>units</code>
    <td><i>none</i>
    <td><i>none</i>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
    <td><code>0</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

<a name="note1" />[1]: Value is 8-bit out of 10-bit total resolution.

<a name="note2" />[2]: Only the 2 most significant bits are used. Actual value is ```MSB << 2 + LSB >> 6``` or ```MSB << 2 + LSB & 0x03``` (can someone confirm which one?).
