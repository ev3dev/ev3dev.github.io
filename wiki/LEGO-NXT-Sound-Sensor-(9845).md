---
title: LEGO NXT Sound Sensor (9845)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value      |
|:------------:|:----------:|
|```type_id``` | ```3```*   |
| # Modes      | 2          |
| Connection   | Analog/NXT |
\* Not unique

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
  <tr>
    <td><code>mode</code>
    <td><code>NXT-ANALOG-0</code>
    <td><code>NXT-ANALOG-1</code>
  <tr>
    <td>Description
    <td>Sound Intensity - Flat
    <td>Sound Intensity - A-weighting
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
    <td><code>0</code>
    <td><code>0</code>
  <tr>
    <td>&emsp;Max
    <td><code>5000</code> (5.000 V)
    <td><code>5000</code> (5.000 V)
  <tr>
    <td><code>units</code>
    <td><code>V</code>
    <td><code>V</code>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>3</code>
    <td><code>3</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.
