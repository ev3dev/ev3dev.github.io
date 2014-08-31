---
title: LEGO EV3 Color Sensor (45506)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```29``` |
| # Modes      | 6        |
| Connection   | UART     |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
    <th>Mode 2
    <th>Mode 3
    <th>Mode 4
    <th>Mode 5<sup><a href="#wiki-note1">1</a></sup>
  <tr>
    <td><code>mode</code>
    <td><code>COL-REFLECT</code>
    <td><code>COL-AMBIENT</code>
    <td><code>COL-COLOR</code>
    <td><code>REF-RAW</code>
    <td><code>RGB-RAW</code>
    <td><code>COL-CAL</code>
  <tr>
    <td>Description
    <td>Reflected
    <td>Ambient
    <td>Color
    <td>Raw Reflected
    <td>Raw Color Components
    <td>Calibration???
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>2</code>
    <td><code>3</code>
    <td><code>4</code>
  <tr>
    <td><code>value0</code>
    <td>Reflected light intensity
    <td>Ambient light intensity
    <td>Detected color<sup><a href="#wiki-note2">2</a></sup>
    <td>Reflected/Ambient light intensity???
    <td>Reflected red light intensity???
    <td>
  <tr>
    <td>&emsp;Min
    <td><code>0</code> (no reflected light detected)
    <td><code>0</code> (no ambient light detected)
    <td><code>0</code> (none)
    <td><code>0</code> (???)
    <td><code>0</code> (???)
    <td>
  <tr>
    <td>&emsp;Max
    <td><code>100</code> (maximum reflected light detected)
    <td><code>100</code> (maximum ambient light detected)
    <td><code>7</code> (brown)
    <td><code>1020</code> (???)
    <td><code>1020</code> (???)
    <td>
  <tr>
    <td><code>value1</code>
    <td>
    <td>
    <td>
    <td>Reflected/Ambient light intensity???
    <td>Reflected green light intensity???
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td>
    <td>
    <td><code>0</code> (???)
    <td><code>0</code> (???)
    <td>
  <tr>
    <td>&emsp;Max
    <td>
    <td>
    <td>
    <td><code>1020</code> (???)
    <td><code>1020</code> (???)
    <td>
  <tr>
    <td><code>value2</code>
    <td>
    <td>
    <td>
    <td>
    <td>Reflected blue light intensity???
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td>
    <td>
    <td>
    <td><code>0</code> (???)
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td>
    <td>
    <td>
    <td><code>1020</code> (???)
    <td>
  <tr>
    <td><code>units</code>
    <td><code>pct</code> (percentage)
    <td><code>pct</code> (percentage)
    <td><code>col</code> (color<sup><a href="#wiki-note2">2</a></sup>)
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
  <tr>
    <td>LED State
    <td>Red LED on
    <td>Blue LED on
    <td>Rapidly cycles red green and blue. Appears white or "rainbow"
    <td>Red LED on
    <td>Rapidly cycles red green and blue. Appears white or "rainbow"
    <td>Rapidly cycles red green and blue. Appears white or "rainbow"
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

<a name="note1" />[1]: When in COL-CAL mode, the color sensor does not respond to the keep-alive sent from the EV3 brick. As a result, the sensor will time out and reset after 1-2 seconds in COL-CAL mode. When using this mode, you should set the mode, do what you need to and change back to another mode within 1 second. Of course, LMS2012 does not appear to use this mode when "calibrating" the color sensor, so it may prove to be useless anyway.

<a name="note2" />[2]: Color values:

| Value | Color
|-------|------
| 0     | none - sensor too close to object
| 1     | black
| 2     | blue
| 3     | green
| 4     | yellow
| 5     | red
| 6     | white
| 7     | brown
