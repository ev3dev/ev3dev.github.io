---
title: HiTechnic NXT Barometric Sensor (NBR1036)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```51``` |
| # Modes      | 2        |
| Connection   | I2C/M    |
| Vendor ID    | HiTechnc |
| Product ID   | Barometr |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
  <tr>
    <td><code>mode</code>
    <td><code>HT-BAR-PRES</code>
    <td><code>HT-BAR-TEMP</code>
  <tr>
    <td>Description
    <td>Barometric Pressure
    <td>Temperature
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>1</code>
  <tr>
    <td><code>value0</code>
    <td>Absolute Pressure
    <td>Temperature
  <tr>
    <td>&emsp;Min
    <td><code>0</code> (0.0 ???)
    <td><code>0</code> (0.0 &deg;C)
  <tr>
    <td>&emsp;Max
    <td><code>3000</code> (300.0 ???)
    <td><code>1000</code> (100.0 &deg;C)
  <tr>
    <td><code>units</code>
    <td><code>m</code> (???)
    <td><code>C</code> (degrees Celsius)
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>1</code>
    <td><code>1</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.
