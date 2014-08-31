---
title: mindsensors.com Light Sensor Array (LightSensorArray)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```157``` |
| # Modes      | 2        |
| Connection   | I2C/M    |
| Vendor ID    | mndsnsrs |
| Product ID   | LSArray  |

### Modes

<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1
  <tr>
    <td><code>mode</code>
    <td><code>MS-LSA-CAL</code>
    <td><code>MS-LSA-RAW</code>
  <tr>
    <td>Description
    <td>Calibrated values
    <td>Raw values
  <tr>
    <td><code>num_values</code>
    <td><code>8</code>
    <td><code>8</code>
  <tr>
    <td><code>value0</code>
    <td>LED 0
    <td>LED 0
  <tr>
    <td>&emsp;Min
    <td><code>0</code>
    <td><code>0</code>
  <tr>
    <td>&emsp;Max
    <td><code>100</code>
    <td><code>???</code>
  <tr>
    <td><code>value1</code>
    <td>LED 1
    <td>LED 1
  <tr>
    <td><code>value2</code>
    <td>LED 2
    <td>LED 2
  <tr>
    <td><code>value3</code>
    <td>LED 3
    <td>LED 3
  <tr>
    <td><code>value4</code>
    <td>LED 4
    <td>LED 4
  <tr>
    <td><code>value5</code>
    <td>LED 5
    <td>LED 5
  <tr>
    <td><code>value6</code>
    <td>LED 6
    <td>LED 6
  <tr>
    <td><code>value7</code>
    <td>LED 7
    <td>LED 7
  <tr>
    <td><code>units</code>
    <td><code>pct</code> (percent)
    <td><i>none</i>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
    <td><code>0</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

### Commands

Commands are performed by writing the ASCII character value to register 0x41

| Value   | Description
|---------|------------
| ```W``` | Calibrate to white
| ```B``` | Calibrate to black
| ```D``` | Put sensor to sleep (must disable polling or it will immediately wake because of being polled)
| ```P``` | Wake up sensor (will return error if the sensor is sleeping)
| ```A``` | Configure for American region (60 Hz electrical mains)
| ```E``` | Configure for African/Asian/European region (50 Hz electrical mains)
| ```U``` | Configure for universal frequency (default)

Example:

```
$ echo -n -e "\x0x41W" > bin_data # calibrate white
```
