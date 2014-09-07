---
title: HiTechnic NXT Compass Sensor (NMC1034)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```56``` |
| # Modes      | 1        |
| Connection   | I2C/M    |
| Vendor ID    | HiTechnc |
| Product ID   | Compass  |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
  <tr>
    <td><code>mode</code>
    <td><code>HT-CMP-DEG2</code>
  <tr>
    <td>Description
    <td>Compass Direction
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
  <tr>
    <td><code>value0</code>
    <td>Direction
  <tr>
    <td>&emsp;Min
    <td><code>-180</code>
  <tr>
    <td>&emsp;Max
    <td><code>180</code>
  <tr>
    <td><code>units</code>
    <td><code>deg</code> (degrees)
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.
