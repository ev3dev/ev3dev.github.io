---
title: LEGO NXT Light Sensor (9844)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value      |
|:------------:|:----------:|
|```type_id``` | ```2```    |
| # Modes      | 2          |
| Connection   | Analog/NXT |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
  <tr>
    <td><code>mode</code>
    <td><code>NXT-REFLECT</code>
    <td><code>NXT-AMBIENT</code>
  <tr>
    <td>Description
    <td>Reflected Light Intensity
    <td>Ambient Light Intensity
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>1</code>
  <tr>
    <td><code>value0</code>
    <td>Intensity
    <td>Intensity
  <tr>
    <td>&emsp;Min
    <td><code>0</code> (no reflected light)
    <td><code>0</code> (no ambient light)
  <tr>
    <td>&emsp;Max
    <td><code>1000</code> (100.0%)
    <td><code>1000</code> (100.0%)
  <tr>
    <td><code>units</code>
    <td><code>pct</code>
    <td><code>pct</code>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>1</code>
    <td><code>1</code>
  <tr>
    <td>LED State
    <td>On
    <td>Off
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.
