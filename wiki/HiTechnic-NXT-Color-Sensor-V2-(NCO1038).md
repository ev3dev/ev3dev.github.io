---
title: HiTechnic NXT Color Sensor V2 (NCO1038)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```54``` |
| # Modes      | 8        |
| Connection   | I2C/M    |
| Vendor ID    | HiTechnc |
| Product ID   | ColorPD  |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
    <th>Mode 2
    <th>Mode 3
    <th>Mode 4
    <th>Mode 5
    <th>Mode 6
    <th>Mode 7
  <tr>
    <td><code>mode</code>
    <td><code>HT-COL2-COL</code>
    <td><code>HT-COL2-RED</code>
    <td><code>HT-COL2-GRN</code>
    <td><code>HT-COL2-BLU</code>
    <td><code>HT-COL2-WHT</code>
    <td><code>HT-COL2-RAW</code>
    <td><code>HT-COL2-NRM</code>
    <td><code>HT-COL2-ALL</code>
  <tr>
    <td>Description
    <td>Color
    <td>Red component
    <td>Green component
    <td>Blue component
    <td>White component
    <td>Raw values
    <td>Normalized values
    <td>All values
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>4</code>
    <td><code>4</code>
    <td><code>5</code>
  <tr>
    <td><code>value0</code>
    <td>Color
    <td>Reflected light intensity
    <td>Reflected light intensity
    <td>Reflected light intensity
    <td>Reflected light intensity
    <td>???
    <td>???
    <td>???
  <tr>
    <td>&emsp;Min
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
  <tr>
    <td>&emsp;Max
    <td><code>17</code>
    <td><code>255???</code>
    <td><code>255???</code>
    <td><code>255???</code>
    <td><code>255???</code>
    <td><code>65535</code>
    <td><code>255???</code>
    <td><code>255???</code>
  <tr>
    <td><code>value1</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>???
    <td>???
    <td>???
  <tr>
    <td><code>value2</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>???
    <td>???
    <td>???
  <tr>
    <td><code>value3</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>???
    <td>???
    <td>???
  <tr>
    <td><code>value3</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>???
  <tr>
    <td><code>units</code>
    <td><i>none</i><sup><a href="#wiki-note1">1</a></sup>
    <td><i>none</i>
    <td><i>none</i>
    <td><i>none</i>
    <td><i>none</i>
    <td><i>none</i>
    <td><i>none</i>
    <td><i>none</i>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

<a name="note1" />[1] Color Values:

|![Color chart](http://www.hitechnic.com/contents/media/Color%20Number.jpg)
