---
title: HiTechnic NXT IRReceiver Sensor (NIR1032)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```57``` |
| # Modes      | 2        |
| Connection   | I2C/M    |
| Vendor ID    | HiTechnc |
| Product ID   | IRRecv   |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
  <tr>
    <td><code>mode</code>
    <td><code>HT-IRRECV</code>
    <td><code>HT-IRRECV-8</code>
  <tr>
    <td>Description
    <td>Single Motor Control
    <td>Eight Motor Controls
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>8</code>
  <tr>
    <td><code>value0</code>
    <td>Motor 1A Speed (channel 1, left/red control)
    <td>Motor 1A Speed (channel 1, left/red control)
  <tr>
    <td>&emsp;Min
    <td><code>-100</code><sup><a href="#wiki-note1">1</a></sup>
    <td><code>-100</code><sup><a href="#wiki-note1">1</a></sup>
  <tr>
    <td>&emsp;Max
    <td><code>100</code>
    <td><code>100</code>
  <tr>
    <td><code>value1</code>
    <td>
    <td>Motor 1B Speed (channel 1, right/blue control)
  <tr>
    <td><code>value2</code>
    <td>
    <td>Motor 2A Speed (channel 2, left/red control)
  <tr>
    <td><code>value3</code>
    <td>
    <td>Motor 2B Speed (channel 2, right/blue control)
  <tr>
    <td><code>value4</code>
    <td>
    <td>Motor 3A Speed (channel 3, left/red control)
  <tr>
    <td><code>value5</code>
    <td>
    <td>Motor 3B Speed (channel 3, right/blue control)
  <tr>
    <td><code>value6</code>
    <td>
    <td>Motor 4A Speed (channel 4, left/red control)
  <tr>
    <td><code>value7</code>
    <td>
    <td>Motor 4B Speed (channel 4, right/blue control)
  <tr>
    <td><code>units</code>
    <td><code>pct</code> (percent)
    <td><code>pct</code> (percent)
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
    <td><code>0</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

<a name="note1" />[1]: Value of ```-128``` is brake. Values only occur in discrete steps (-100, -86, -72, -58, -44, -30, -16, 0, 16, 30, 44, 58, 72, 86 and 100).
