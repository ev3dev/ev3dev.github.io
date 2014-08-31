---
title: LEGO EV3 Infrared Sensor (45509)
index: wiki
---

### General

This sensor uses the [[msensor|Using the Mindstorms Sensor Device Class]] device class.

|               | Value    |
|:-------------:|:--------:|
| ```type_id``` | ```33``` |
| # Modes       | 6        |
| Connection    | UART     |

### Mode 0
<table>
  <tr>
    <th>
    <th>Mode 0
    <th>Mode 1<sup>
    <th>Mode 2<sup>
    <th>Mode 3<sup>
    <th>Mode 4<sup><a href="#wiki-note4">4</a></sup>
    <th>Mode 5<sup><a href="#wiki-note5">5</a></sup>
  <tr>
    <td><code>mode</code>
    <td><code>IR-PROX</code>
    <td><code>IR-SEEK</code>
    <td><code>IR-REMOTE</code>
    <td><code>IR-REM-A</code>
    <td><code>IR-S-ALT</code>
    <td><code>IR-CAL</code>
  <tr>
    <td>Description
    <td>Proximity
    <td>IR Seeker<sup><a href="#wiki-note1">1</a></sup>
    <td>IR Remote Control<sup><a href="#wiki-note2">2</a></sup>
    <td>Alternate IR Remote Control
    <td>Alternate IR Seeker
    <td>Calibration???
  <tr>
    <td><code>num_values</code>
    <td><code>1</code>
    <td><code>8</code>
    <td><code>4</code>
    <td><code>1</code>
    <td><code>4</code>
    <td><code>2</code>
  <tr>
    <td><code>value0</code>
    <td>Proximity (distance)
    <td>Channel 1 Heading
    <td>Channel 1
    <td>Channel 1<sup><a href="#wiki-note3">3</a></sup>
    <td>???
    <td>
  <tr>
    <td>&emsp;Min
    <td><code>0</code> (very close)
    <td><code>-25</code> (far left)
    <td><code>0</code> (none)
    <td>
    <td>0 (???)
    <td>0 (???)
  <tr>
    <td>&emsp;Max
    <td><code>100</code> (far away - approx. 70cm/27in)
    <td><code>25</code> (far right)
    <td><code>11</code> (blue up and blue down)
    <td>
    <td>100 (???)
    <td>1023 (???)
  <tr>
    <td><code>value1</code>
    <td>
    <td>Channel 1 Proximity
    <td>Channel 2
    <td>
    <td>???
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td><code>0</code> (close)
    <td><code>0</code> (none)
    <td>
    <td>0 (???)
    <td>0 (???)
  <tr>
    <td>&emsp;Max
    <td>
    <td><code>100</code> (far away - approx. 200cm/79in)
    <td><code>11</code> (blue up and blue down)
    <td>
    <td>100 (???)
    <td>1023 (???)
  <tr>
    <td><code>value2</code>
    <td>
    <td>Channel 2 Heading
    <td>Channel 3
    <td>
    <td>???
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td><code>-25</code>
    <td><code>0</code> (none)
    <td>
    <td>0 (???)
    <td>
  <tr>
    <td>&emsp;Max
    <td>
    <td><code>25</code>
    <td><code>11</code> (blue up and blue down)
    <td>
    <td>100 (???)
    <td>
  <tr>
    <td><code>value3</code>
    <td>
    <td>Channel 2 Proximity
    <td>Channel 4
    <td>
    <td>???
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td><code>0</code>
    <td><code>0</code> (none)
    <td>
    <td>0 (???)
    <td>
  <tr>
    <td>&emsp;Max
    <td>
    <td><code>100</code>
    <td><code>11</code> (blue up and blue down)
    <td>
    <td>100 (???)
    <td>
  <tr>
    <td><code>value4</code>
    <td>
    <td>Channel 3 Heading
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td><code>-25</code>
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td>&emsp;Max
    <td>
    <td><code>25</code>
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td><code>value5</code>
    <td>
    <td>Channel 3 Proximity
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td><code>0</code>
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td>&emsp;Max
    <td>
    <td><code>100</code>
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td><code>value6</code>
    <td>
    <td>Channel 4 Heading
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td><code>-25</code>
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td>&emsp;Max
    <td>
    <td><code>25</code>
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td><code>value7</code>
    <td>
    <td>Channel 4 Proximity
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td>&emsp;Min
    <td>
    <td><code>0</code>
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td>&emsp;Max
    <td>
    <td><code>100</code>
    <td>
    <td>
    <td>
    <td>
  <tr>
    <td><code>units</code>
    <td><code>pct</code> (percentage)
    <td><code>pct</code> (percentage)
    <td><code>btn</code> (button<sup><a href="#wiki-note2-table">2</a></sup>)
    <td><i>none<sup><a href="#wiki-note3-table">3</a></sup></i>
    <td><code>pct</code> (percentage)
    <td><i>none<sup>
  <tr>
    <td><code>dp</code> (decimal places)
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
    <td><code>0</code>
</table>
Values in the tables that look like ```this``` are the names of sysfs attributes or values returned by said attributes.

<a name="note1" />[1]: The absence of a beacon on a channel can be detected when Proximity == -128 (and heading == 0).

<a name="note2" />[2]: Pressing more that 2 buttons at one time is not supported. It will usually read 0. Pressing an up/down button while beacon mode is activated with turn off beacon mode.

<a name="note2-table" />Button values:

| Value | Description 
|-------|------------
| 0     | none
| 1     | red up
| 2     | red down
| 3     | blue up
| 4     | blue down
| 5     | red up and blue up
| 6     | red up and blue down
| 7     | red down and blue up
| 8     | red down and blue down
| 9     | beacon mode on
| 10    | red up and red down
| 11    | blue up and blue down

<a name="note3" />[3]: The most significant byte is always 0x01. In the least significant byte, the 4 most significant bits represent each button. Bit 7 is the blue down button, bit 6 is the blue up button, bit 5 is the red down button, bit 4 is the red up button. Beware that when no buttons are pressed, bit 7 is set (value == 384). You can test that bits 0-3 are all 0 to check this.

```C
if ((value & 0x0F) == 0) {
    // no buttons are pressed
} else {
    if (value & 0x80)
        // blue down button is pressed
    if (value & 0x40)
        // blue up button is pressed
    if (value & 0x20)
        // red down button is pressed
    if (value & 0x10)
        // red up button is pressed
}
```

Bits 0-3 seem to be some sort of checksum or parity check. Bit 0 = bit 4, bit 1 = ~(bit 5), bit 2 = ~(bit 6), bit 3 = 0 if bits 0-2 are even or 1 if bits 0-2 are odd.

Also, when the beacon mode is active or for about 1 second after any button is released the value is 262. This mode only works with the remote on channel 1.

<a name="note3-table" />Values:

| Value   | Blue Down | Blue Up | Red Down | Red Up |
|:-------:|:---------:|:-------:|:--------:|:------:|
| 262/384 |           |         |          |        |
| 287     |           |         |          | X      |
| 300     |           |         | X        |        |
| 309     |           |         | X        | X      |
| 330     |           | X       |          |        |
| 339     |           | X       |          | X      |
| 352     |           | X       | X        |        |
| 377     |           | X       | X        | X      |
| 390     | X         |         |          |        |
| 415     | X         |         |          | X      |
| 428     | X         |         | X        |        |
| 437     | X         |         | X        | X      |
| 458     | X         | X       |          |        |
| 467     | X         | X       |          | X      |
| 480     | X         | X       | X        |        |
| 505     | X         | X       | X        | X      |
X = Button pressed

<a name="note4" />[4] IR-S-ALT mode does not seem to be usable. When switching to this mode, the sensor quits responding to the keep-alive messages and the sensor resets.

<a name="note5" />[5] Not sure how this IR-CAL mode is supposed to work. Probably have to write some data to the sensor. Values return 0.
