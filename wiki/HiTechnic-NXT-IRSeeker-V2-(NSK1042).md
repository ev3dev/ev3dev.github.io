---
title: HiTechnic NXT IRSeeker V2 (NSK1042)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```52``` |
| # Modes      | 4        |
| Connection   | I2C/M    |
| Vendor ID    | HiTechnc |
| Product ID   | NewIRDir |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
    <th>Mode 2
    <th>Mode 3
  <tr>
    <td><code>mode</code>
    <td><code>HT-DIR-DC</code>
    <td><code>HT-DIR-AC</code>
    <td><code>HT-DIR-DALL</code>
    <td><code>HT-DIR-AALL</code>
  <tr>
    <td>Description
    <td>Direction (unmodulated)
    <td>Direction (modulated)
    <td>All values (unmodulated)
    <td>All values (modulated)
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>7</code>
    <td><code>6</code>
  <tr>
    <td><code>value0</code>
    <td>Direction
    <td>Direction
    <td>Direction
    <td>Direction
  <tr>
    <td>&emsp;Min
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
  <tr>
    <td>&emsp;Max
    <td><code>9</code>
    <td><code>9</code>
    <td><code>9</code>
    <td><code>9</code>
  <tr>
    <td><code>value1</code>
    <td>
    <td>
    <td>Sensor 1 signal strength
    <td>Sensor 1 signal strength
  <tr>
    <td><code>value2</code>
    <td>
    <td>
    <td>Sensor 2 signal strength
    <td>Sensor 2 signal strength
  <tr>
    <td><code>value3</code>
    <td>
    <td>
    <td>Sensor 3 signal strength
    <td>Sensor 3 signal strength
  <tr>
    <td><code>value4</code>
    <td>
    <td>
    <td>Sensor 4 signal strength
    <td>Sensor 4 signal strength
  <tr>
    <td><code>value5</code>
    <td>
    <td>
    <td>Sensor 5 signal strength
    <td>Sensor 5 signal strength
  <tr>
    <td><code>value1</code>
    <td>
    <td>
    <td>Sensor mean
    <td>
  <tr>
    <td><code>units</code>
    <td><i>none</i><sup><a href="#wiki-note1">1</a></sup>
    <td><i>none</i><sup><a href="#wiki-note1">1</a></sup>
    <td><i>none</i><sup><a href="#wiki-note1">1</a></sup>
    <td><i>none</i><sup><a href="#wiki-note1">1</a></sup>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

<a name="note1" />[1]: Direction values:

| Value | Description
|-------|------------
| 0     | No signal
| 1     | Far left
| ...   |
| 5     | Center
| ...   |
| 9     | Far right
