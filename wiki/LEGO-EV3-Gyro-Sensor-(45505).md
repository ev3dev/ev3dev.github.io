---
title: LEGO EV3 Gyro Sensor (45505)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|               | Value    |
|:-------------:|:--------:|
| ```type_id``` | ```32``` |
| # Modes       | 5        |
| Connection    | UART     |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
    <th>Mode 2
    <th>Mode 3
    <th>Mode 4
  <tr>
    <td><code>mode</code>
    <td><code>GYRO-ANG</code>
    <td><code>GYRO-RATE</code>
    <td><code>GYRO-FAS</code>
    <td><code>GYRO-G&A</code>
    <td><code>GYRO-CAL</code>
  <tr>
    <td>Description
    <td>Angle
    <td>Rotational Speed
    <td>Raw sensor value ???
    <td>Angle and Rotational Speed
    <td>Calibration ???
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>2</code>
    <td><code>4</code>
  <tr>
    <td><code>value0</code>
    <td>Angle
    <td>Rotational Speed
    <td>???
    <td>Angle
    <td>
  <tr>
    <td>&emsp;Min
    <td><code>-32768</code>
    <td><code>-440</code>
    <td><code>-1464</code>???
    <td><code>-32768</code>
    <td>
  <tr>
    <td>&emsp;Max
    <td><code>32767</code>
    <td><code>440</code>
    <td><code>1535</code>???
    <td><code>32767</code>
    <td>
  <tr>
    <td><code>value1</code>
    <td>
    <td>
    <td>
    <td>Rotational Speed
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td>
    <td>
    <td><code>-440</code>
    <td>
  <tr>
    <td>&emsp;Max
    <td>
    <td>
    <td>
    <td><code>440</code>
    <td>
  <tr>
    <td><code>units</code>
    <td><code>deg</code> (degrees)
    <td><code>d/s</code> (degrees/second)
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
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

### Notes

* Clockwise is positive when looking at the side of the sensor with the arrows.
* If the sensor is moving when changing modes, the calibration will be off.
* If you spin around too many times in GYRO-ANG or GYRO-G&A mode, it will get stuck at 32767.
* The angle in GYRO-ANG or GYRO-G&A modes can be reset by changing to a different mode and changing back.
