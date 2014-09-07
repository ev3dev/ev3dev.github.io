---
title: HiTechnic NXT SuperPro Prototype Board (SPR2010)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|              | Value    |
|:------------:|:--------:|
|```type_id``` | ```60``` |
| # Modes      | 8        |
| Connection   | I2C/M    |
| Vendor ID    | HiTechnc |
| Product ID   | SuperPro |

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
    <td><code>HT-SPRO-AIN</code>
    <td><code>HT-SPRO-DIN</code>
    <td><code>HT-SPRO-DOT</code>
    <td><code>HT-SPRO-DCT</code>
    <td><code>HT-SPRO-STB</code>
    <td><code>HT-SPRO-LED</code>
    <td><code>HT-SPRO-AO0</code>
    <td><code>HT-SPRO-AO1</code>
  <tr>
    <td>Description
    <td>Anlog inputs
    <td>Digital inputs
    <td>Digital outputs
    <td>Digital input/output controls
    <td>Strobe output
    <td>LED control
    <td>Analog output O0
    <td>Analog output O1
  <tr>
    <td><code>num_values</code>
    <td><code>4</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>1</code>
    <td><code>5</code>
    <td><code>5</code>
  <tr>
    <td><code>value0</code>
    <td>Analog input A0 (0-1024)
    <td>Bits (B0-B7)
    <td>Bits (B0-B7)
    <td>Bits (B0-B7)
    <td>Bits (S0-S3)
    <td>LED state<sup><a href="#wiki-note1">1</a></sup>
    <td>Mode
    <td>Mode
  <tr>
    <td><code>value1</code>
    <td>Analog input A1 (0-1024)
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>Frequency, most significant byte
    <td>Frequency, most significant byte
  <tr>
    <td><code>value2</code>
    <td>Analog input A2 (0-1024)
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>Frequency, least significant byte
    <td>Frequency, least significant byte
  <tr>
    <td><code>value3</code>
    <td>Analog input A3 (0-1024)
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>Voltage, most significant byte
    <td>Voltage, most significant byte
  <tr>
    <td><code>value4</code>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>
    <td>Voltage, least significant byte<sup><a href="#wiki-note2">2</a></sup>
    <td>Voltage, least significant byte<sup><a href="#wiki-note2">2</a></sup>
  <tr>
    <td><code>units</code>
    <td><i>none</i>
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

<a name="note1" />[1]: LED states

| Value | Description
|-------|------------
| 0     | None
| 1     | Red
| 2     | Blue
| 3     | Red and blue

<a name="note2" />[2]: Only the 2 most significant bits are used. Actual value is ```MSB << 2 + LSB >> 6``` or ```MSB << 2 + LSB & 0x03``` (can someone confirm which one?).
