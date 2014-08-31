---
title: HiTechnic NXT PIR Sensor (NIS1070)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```50``` |
| # Modes      | 1        |
| Connection   | I2C/M    |
| Vendor ID    | HITECHNC |
| Product ID   | PIR      |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
  <tr>
    <td><code>mode</code>
    <td><code>HT-PIR</code>
  <tr>
    <td>Description
    <td>IR Proximity
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
  <tr>
    <td><code>value0</code>
    <td>Proximity
  <tr>
    <td>&emsp;Min
    <td><code>-100</code>
  <tr>
    <td>&emsp;Max
    <td><code>100</code>
  <tr>
    <td><code>units</code>
    <td><code>pct</code> (percent)
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.
