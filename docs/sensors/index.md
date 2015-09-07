---
title: Sensors
subtitle: and everything else that plugs into input ports on the EV3
---

* Table of Contents
{:toc}

The EV3 has four input ports for connecting sensors and other devices (like
sensor multiplexers or motor controllers). If you are trying to use something
that plugs into one of those ports, you are in the right place.

## Types of Sensors

When dealing with sensors in ev3dev, it is useful to know how it communicates
with the EV3 brick. There are four basic kinds of communication that the input
ports can use to get information from the sensor: analog, NXT Color Sensor, I2C
and UART.

### Analog Sensors

These are the simplest type of sensor. The measured value is converted to a
voltage (0-5VDC) that is read by the EV3. There are actually two types of
analog sensors. We call the first **EV3/Analog**. These are sensors that were
designed specifically for the EV3 and will not work on the NXT because the
pinout is different. They contain an ID resistor so that the EV3 can tell
different types of sensors apart. The second type is **NXT/Analog**. These
sensors are designed for the NXT, but also work on the EV3. The EV3 cannot
differentiate between most of these sensors though, so you have to tell it
which one your have or just use the generic driver.

WeDo sensors, referred to as **WeDo/Analog**, are also analog sensors. They are
actually electrically similar to EV3/Analog sensors (require 5V power and have
ID resistor). Currently, we only support WeDo sensors attached to a WeDo hub,
but if someone would like to design a cable and modify the `wedo-sensor` and
`lego-ports` drivers, we could easily make them work with the input ports on
the EV3.

RCX sensors also fall into this category, but do not work with the EV3 - at
least not with the converter cable described in the NXT Hardware Developers
kit. This is due to a difference in the input port pins between the EV3 and
the NXT. If someone wants design a new converter cable, we could make them work.

### LEGO NXT Color Sensor

The LEGO NXT Color Sensor is in a class of its own. It uses a hybrid of analog
and (non-standard) digital communications. The NXT Color Sensor is not usable
at this point in time. We can detect it with the auto-detect, but we don't
have a driver for it yet.


### I2C Sensors

I2C sensors are sensors that communicate with the intelligent brick via the
[I2C protocol]. In the NXT documentation, they are referred to a "digital"
sensors. These sensors can be sorted into two categories as well: those that
were designed using LEGO's guidelines and those that use an off the shelf I2C
chip. ev3dev supports both kind of sensors, but only the first type is
auto-detected. We will refer to the former as **NXT/I2C** and the latter as
**Other/I2C**

### UART Sensors

These is a new type of sensor that is designed specifically for the EV3 (they
don't work with the NXT). They use an [UART] to send data to the brick. These
sensors are a bit "smarter" in that in addition to sending the data of what
they measure, they also send information about their capabilities. This means
that any new **EV3/UART** sensors should "just work" without us having to write
new drivers. Since the 'U' in UART means universal, this also means that
[EV3/UART sensors can connect to any UART device][using-uart-sensors-on-any-linux],
not just the input ports.

## Using Sensors

General resources:

* [Sensor Tutorial]
* [The LEGO Sensor (lego-sensor) Class][lego-sensor class]
* [EV3 Input Port Driver]

I2C sensor resources (applies to both NXT/I2C and Other/I2C):

* [I2C Sensor Addressing]
* [Using I2C Sensors]

Sensor-specific resources:

* Follow the links in the [Supported Sensors] table below

## Unsupported Sensors

One of the goals of ev3dev is to support as many sensors as possible. In fact,
**even if a manufacturer's documentation says that a device does not work with
the EV3, chances are it _will_ work with ev3dev.**

If you have a sensor that is not supported let, let us know about it by
[opening an issue] on GitHub. For many sensors adding a driver is trivial -
even if you are not a "kernel hacker" or a "c programmer". For the non-trivial
sensors, see the [contributing page] for information on how to write a driver
or how to donate hardware to someone who will.

## Supported Sensors

This is a list of sensors that currently have drivers available in the ev3dev
kernel.

<table>
    <tr>
    <th>Manufacturer</th>
    <th>P/N</th>
    <th>Name</th>
    <th>Connection</th>
    <th>Auto-<br />detected</th>
    <th>Driver (Module)</th>
    </tr>
{% assign prev_vendor_name = 'dummy' %}
{% for sensor_data in site.data.sensors %}
    {% assign sensor = sensor_data %}
    {% include sensor-connection.html %}
    <tr>
    {% if sensor.vendor_name != prev_vendor_name %}
        {% assign vendor_name_rowspan = 0 %}
        {% for sensor_data2 in site.data.sensors %}
            {% assign sensor2 = sensor_data2 %}
            {% if sensor2.vendor_name == sensor.vendor_name %}
                {% assign vendor_name_rowspan = vendor_name_rowspan | plus: 1 %}
            {% endif %}
        {% endfor %}
        <td rowspan="{{ vendor_name_rowspan }}">{{ sensor.vendor_name }}</td>
    {% endif %}
        <td>{{ sensor.vendor_part_number }}</td>
        <td><a href="{{ sensor.url_name }}">{{ sensor.vendor_part_name }}</a></td>
        <td>{{ connection }}</td>
        <td><span style="white-space:nowrap;" markdown="span">{{ autodetect }}</span></td>
        <td>
            <span style="white-space:nowrap;">{{ sensor.name }}</span><!--
            {% if connection == 'EV3/UART' %}
                --><span markdown="1">[^ev3-uart-driver]</span><!--
            {% endif %}
            {% if sensor.name == 'ev3-analog-XX' %}
                --><span markdown="1">[^ev3-analog-driver]</span><!--
            {% endif %}
            -->
            {% if sensor.module %}
            <span style="white-space:nowrap;">({{ sensor.module }})</span>
            {% else %}
            <span style="white-space:nowrap;">({{ sensor.sensor_type }})</span>
            {% endif %}
        </td>
    </tr>
    {% assign prev_vendor_name = sensor.vendor_name %}
{% endfor %}
</table>


[^lego-nxt-touch]: Only touch sensors that shipped with the NXT 2.0 set can be
    automatically detected. Older touch sensors that shipped with the original
    NXT sets are missing an electrical connection (pin 2 is not internally
    connected to pin 3).

[^nxt-analog]: The auto-detection algorithm detects this sensor as an NXT/Analog
    type sensor but it cannot determine the exact sensor type. The generic
    analog driver (nxt-analog) will be loaded by default for this sensor. See the
    [lego-port class] for information on how to manually load the
    correct driver.

[^standard-i2c]: The auto-detection algorithm detects this sensor as an I2C
    sensor and the port is automatically put into I2C mode. However, the sensor
    does not follow the LEGO MINDSTORMS convention for I2C sensors, so the
    exact type of sensor cannot be determined. See [Using I2C Sensors]
    for information on how to manually load the correct driver.

[^lm75]: Temperature sensors using the lm75 module can be auto-detected.
    You must run `modprobe lm75` for this to happen. You can also make the
    lm75 module load automatically on boot by adding it to `/etc/modules`.

[^ev3-analog-driver]: The `XX` in `ev3-analog-XX` is replaced with the type id
    of the sensor (`01` to `14`). Type id `02` is the LEGO EV3 Touch sensor,
    so `ev3-analog-02` does not exist.

[^ev3-uart-driver]: When EV3/UART sensors are connected to an EV3 input port
    (or any other tty device for that matter), they actually use the
    `ev3-uart-sensor-ld` driver, which is a tty line discipline. The
    `ev3-uart-sensor` module is currently only used with the mindsensors.com
    EV3 Sensor Multiplexer.

[^mi-xg1300l]: The auto-detection algorithm detects this sensor as an I2C
    sensor and the port is automatically put into I2C mode. However, this sensor
    only partially follows the LEGO MINDSTORMS convention for I2C sensors, so the
    driver must be loaded manually. See the sensor's page for more information.

[^di-dflex]: The Dexter Industries dFlex sensor cannot be automatically detected
    (because pin 2 is not connected to pin 3). In order to use this sensor, you
    must manually set the port to `nxt-analog` mode and then set the driver to
    `di-dflex`.

[LEGO 8528]: http://www.bricklink.com/catalogItem.asp?S=8528-1
[I2C protocol]: https://en.wikipedia.org/wiki/I2c
[I2C Sensor Addressing]: i2c-sensor-addressing
[lego-port class]: http://www.ev3dev.org/docs/drivers/lego-port-class
[Using I2C Sensors]: using-i2c-sensors
[UART]: https://en.wikipedia.org/wiki/Uart
[using-uart-sensors-on-any-linux]: http://lechnology.com/2014/09/using-uart-sensors-on-any-linux/
[opening an issue]: https://github.com/ev3dev/ev3dev/issues
[contributing page]: http://www.ev3dev.org/contributing/
[lego-sensor class]: /docs/drivers/lego-sensor-class
[EV3 Input Port Driver]: /docs/ports/legoev3-input-port
[Supported Sensors]: #supported-sensors
