---
title: EV3 A/DC
subtitle: Analog to Digital Converter
---

The EV3 uses a Texas Instruments ADS7957 chip. It is connected to the CPU via an [SPI](./ev3-spi). 

## Essentials

* 16 channels
* 10-bit resolution
* 20kHz max clock rate
* Using the 5V input mode (i.e. 1024 == 5.00V)

## Documentation

* [Datasheet (pdf)](http://www.ti.com/lit/ds/symlink/ads7957.pdf)

## Channel Usage

<table class="table table-striped table-bordered">
    <tr>
        <th>Ch.</th>
        <th>Connection</th>
        <th>Notes</th>
    </tr>
    <tr>
        <td>0</td>
        <td>Output port B pin 5</td>
        <td></td>
    </tr>
    <tr>
        <td>1</td>
        <td>Output port A pin 5</td>
        <td></td>
    </tr>
    <tr>
        <td>2</td>
        <td>N/C</td>
        <td>Was battery temperature on pre-release hardware</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Battery current</td>
        <td>Uses 0.05&#8486; shunt resistor, value read is 15x actual voltage</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Battery voltage</td>
        <td>Value read is 1/2 actual voltage</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Input port 1 pin 6</td>
        <td></td>
    </tr>
    <tr>
        <td>6</td>
        <td>Input port 1 pin 1</td>
        <td></td>
    </tr>
    <tr>
        <td>7</td>
        <td>Input port 2 pin 6</td>
        <td></td>
    </tr>
    <tr>
        <td>8</td>
        <td>Input port 2 pin 1</td>
        <td></td>
    </tr>
    <tr>
        <td>9</td>
        <td>Input port 3 pin 6</td>
        <td></td>
    </tr>
    <tr>
        <td>10</td>
        <td>Input port 3 pin 1</td>
        <td></td>
    </tr>
    <tr>
        <td>11</td>
        <td>Input port 4 pin 6</td>
        <td></td>
    </tr>
    <tr>
        <td>12</td>
        <td>Input port 4 pin 1</td>
        <td></td>
    </tr>
    <tr>
        <td>13</td>
        <td>Output port C pin 5</td>
        <td></td>
    </tr>
    <tr>
        <td>14</td>
        <td>Output port D pin 5</td>
        <td></td>
    </tr>
    <tr>
        <td>15</td>
        <td>N/C<td>Was motor current on pre-release hardware</td>
        <td></td>
    </tr>
</table>

## Notes

* In lsm2012, you will see scaling of the value read from the ADC by 4096 (12-bits) instead of by 1024 (10-bits). This is because they are not shifting the value read to the right 2 bits. Since this is a 10-bit chip, the 2 least significant bits read will always be 0.
* A TI employee wrote a [hwmon](https://www.kernel.org/doc/Documentation/hwmon/) driver for the ADS7957 ([source](https://github.com/nmenon/linux-2.6-playground/blob/devel/beaglebone/base/drivers/hwmon/ads79xx.c)) which is used by [lm-sensors](http://www.lm-sensors.org/). This interface is generally for low-speed (on the order of 1Hz) polling of fan speeds, temperatures, voltages, etc. This does not really fit our needs for ev3dev, so we borrowed some code and wrote our own driver.