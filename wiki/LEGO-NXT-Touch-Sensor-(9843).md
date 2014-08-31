---
title: LEGO NXT Touch Sensor (9843)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value      |
|:------------:|:----------:|
|```type_id``` | ```1```    |
| # Modes      | 1          |
| Connection   | Analog/NXT |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
  <tr>
    <td><code>mode</code>
    <td><code>TOUCH</code>
  <tr>
    <td>Description
    <td>Key switch state
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
  <tr>
    <td><code>value0</code>
    <td>State
  <tr>
    <td>&emsp;Min
    <td><code>0</code> (released)
  <tr>
    <td>&emsp;Max
    <td><code>1</code> (pressed)
  <tr>
    <td><code>units</code>
    <td><i>none</i>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.
