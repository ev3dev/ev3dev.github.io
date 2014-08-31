---
title: LEGO Energy Display (9668)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|               | Value    |
|:-------------:|:--------:|
| ```type_id``` | ```99``` |
| # Modes       | 8        |
| Connection    | I2C/M    |
| Vendor ID     | LEGO     |
| Product ID    | _none_   |

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
    <td><code>ES-IN-VOLT</code>
    <td><code>ES-IN-AMP</code>
    <td><code>ES-OUT-VOLT</code>
    <td><code>ES-OUT-AMP</code>
    <td><code>ES-JOULE</code>
    <td><code>ES-IN-WATT</code>
    <td><code>ES-OUT-WATT</code>
    <td><code>ES-ALL</code>
  <tr>
    <td>Description
    <td>Input Voltage
    <td>Input Current
    <td>Output Voltage
    <td>Output Current
    <td>Energy
    <td>Input Power
    <td>Output Power
    <td>All measurements
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>7</code>
  <tr>
    <td><code>value0</code>
    <td>Voltage
    <td>Current
    <td>Voltage
    <td>Current
    <td>Energy
    <td>Power
    <td>Power
    <td>Input Voltage
  <tr>
    <td>&emsp;Min
    <td><code>0</code> (0.000&nbsp;V)
    <td><code>0</code> (0.000&nbsp;A)
    <td><code>0</code> (0.000&nbsp;V)
    <td><code>0</code> (0.000&nbsp;A)
    <td><code>0</code> (0&nbsp;J)
    <td><code>0</code> (0.000&nbsp;W)
    <td><code>0</code> (0.000&nbsp;W)
    <td><code>0</code> (0.000&nbsp;V)
  <tr>
    <td>&emsp;Max
    <td><code>10000</code> (10.000&nbsp;V)
    <td><code>10000</code> (10.000&nbsp;A)
    <td><code>10000</code> (10.000&nbsp;V)
    <td><code>10000</code> (10.000&nbsp;A)
    <td><code>100</code> (100&nbsp;J)
    <td><code>10000</code> (10.000&nbsp;W)
    <td><code>10000</code> (10.000&nbsp;W)
    <td><code>10000</code> (10.000&nbsp;V)
  <tr>
    <td><code>value1</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>Input Current
  <tr>
    <td>&emsp;Min
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>0</code> (0.000&nbsp;A)
  <tr>
    <td>&emsp;Max
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>10000</code> (10.000&nbsp;A)
  <tr>
    <td><code>value2</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>Output Voltage
  <tr>
    <td>&emsp;Min
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>0</code> (0.000&nbsp;V)
  <tr>
    <td>&emsp;Max
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>10000</code> (10.000&nbsp;V)
  <tr>
    <td><code>value3</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>Output Current
  <tr>
    <td>&emsp;Min
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>0</code> (0.000&nbsp;A)
  <tr>
    <td>&emsp;Max
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>10000</code> (10.000&nbsp;A)
  <tr>
    <td><code>value4</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>Energy
  <tr>
    <td>&emsp;Min
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>0</code> (0&nbsp;J)
  <tr>
    <td>&emsp;Max
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>10000</code> (100&nbsp;J)
  <tr>
    <td><code>value5</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>Input Power
  <tr>
    <td>&emsp;Min
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>0</code> (0.000&nbsp;W)
  <tr>
    <td>&emsp;Max
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>10000</code> (10.000&nbsp;W)
  <tr>
    <td><code>value6</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>Output Power
  <tr>
    <td>&emsp;Min
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>0</code> (0.000&nbsp;W)
  <tr>
    <td>&emsp;Max
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td><code>10000</code> (10.000&nbsp;W)
  <tr>
    <td><code>units</code>
    <td><code>V</code> (volts)
    <td><code>A</code> (amps)
    <td><code>V</code> (volts)
    <td><code>A</code> (amps)
    <td><code>J</code> (Joules)
    <td><code>W</code> (Watts)
    <td><code>W</code> (Watts)
    <td><i>none</i>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>3</code>
    <td><code>3</code>
    <td><code>3</code>
    <td><code>3</code>
    <td><code>0</code>
    <td><code>3</code>
    <td><code>3</code>
    <td><code>3</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.
