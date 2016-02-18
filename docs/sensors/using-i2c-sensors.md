---
title: Using I2C Sensors
---

* Table of Contents
{:toc}

The I2C standards only specify how data is sent from device to device. It does
not specify the layout of the registers of a device. LEGO, however, has
guidelines for 3rd party manufactures so that they can providpe sensors with
a (fairly) uniform register layout.

We call sensors that were designed following LEGO's guidelines **NXT/I2C**
sensors. This common register layout lets us autodetect the type of sensor
and proves access to the sensor via the [lego-sensor] class.

We refer to sensors that do not conform to LEGO's specifications as
**Other/I2C** sensors. There are so many types of I2C chips in the wild
that are already supported on Linux that we do not attempt to autodetect
them. To use them, we just need to find a compatible driver and manually
load it.

This page discusses both types of I2C sensors.

## Addressing

The I2C address that is used in ev3dev is different from the other EV3/NXT
programming languages/environments. See [I2C Sensor Addressing] to find out
how and why. Since most sensors are autodetected, you don't usually have to
worry about the address. However, for manually loading devices, you need to
know what the address is. Also, if you had multiple sensors connected to a
single port using a port splitter, you would need to know the address to
make sure your are using the correct `sensor<N>` device node. NOTE: A
[port splitter] is not the same as a [sensor MUX].

## Using NXT/I2C Sensors

See the page on [The MINDSTORMS Sensor Device Class][lego-sensor] for general usage.
This page only covers the I2C specifics.

### Polling

When we say "polled", we just mean that the EV3 brick initiates a read command
to read data from the sensor. The data that is read depends on the current
mode that is selected. You can change the polling rate using the `poll_ms`
attribute (of the `lego-sensor` device). You can also disable polling by setting
`poll_ms` to `0`. When polling is disabled, you can initiate a data read by
setting the mode again. By default, NXT/I2C sensors are polled every 100
milliseconds. The default value can be changed via a module parameter.
See the [NXT I2C Sensor Driver][nxt-i2c-sensor] for details.

### Direct Reading and Writing of the Sensor

**WARNING!** Be very careful when reading from or writing to your sensors. It
is theoretically possible to break them if you read or write to the wrong register.

In most cases, setting the mode of a sensor will write the proper data if
necessary, so you don't actually need to write data using this method. However,
it is possible to write arbitrary data to I2C sensors using the `direct`
attribute. Use `seek` to specify the register to read or write from and always
specify the number of bytes to read or write.

Example: Reading the white calibration data from the mindsensors.com Light Sensor
Array. This reads 8 bytes from register 0x5A.

    $ hd -s $(( 0x5A )) -n 8 direct

Example: Sending a "calibrate white" command to the mindsensor.com Light
Sensor Array. This just writes the ascii character `W` to register 0x41.

    $ echo -e -n "W" | dd bs=1 of=direct seek=$(( 0x41 ))


### Manually Loading Devices

If you have autodetection disabled or if you have managed to change the I2C
address of your sensor to something other than the default, you will have to
manually load a device in order to be able to use your sensor. We just have to
tell the I2C adapter which driver to use and the address of the device. (You
read the [addressing](./#addressing) section didn't you?)

The I2C adapter device nodes are at `/sys/bus/i2c/devices/i2c-N` where N is the
number of the input port plus 2. To load a device, we write to the `new_device`
attribute. NOTE: These nodes only exist when you have an I2C sensor plugged
into an input port.

Example:

    # echo nxt-i2c-sensor 0x0B > /sys/bus/i2c/devices/i2c-5/new_device

## Using Other/I2C Sensors

As we already discussed, Other/I2C sensors generally have an existing Linux
driver that you can use. This means that each sensor will work a bit
differently. You can load a device just like for manually loading an NXT/I2C
device, except we use a different driver name. You can find the names of
drivers [here](../#supported-sensors).

Example: Using the mindsensors.com Realtime Clock Sensor on input port 2.

    $ echo ds1307 0x68 > /sys/bus/i2c/devices/i2c-4/new_device
    $ dmesg | tail
    ...
    i2c-legoev3 i2c-legoev3.4: registered on input port 2
    i2c i2c-4: new_device: Instantiated device ds1307 at 0x68
    rtc-ds1307 4-0068: SET TIME!
    rtc-ds1307 4-0068: rtc core: registered ds1307 as rtc1
    rtc-ds1307 4-0068: 56 bytes nvram
    $ cd /sys/class/rtc
    $ ls
    rtc0    rtc1
    $ cd rtc1
    $ ls
    date  device   max_user_freq  since_epoch  time
    dev   hctosys  name           subsystem    uevent

Now, I just need to figure out what to do with TWO realtime clocks!

## Direct I2C Communication (Going Driverless)

You actually don't need a driver to use your I2C sensors. Drivers do make it
much safer and easier, but if you really want full control, it is yours for
the taking. There are symlinks for each I2C adapter to make finding them easy.

NOTE: The symlinks and the underlying I2C device are only present when an I2C
sensor is plugged into a port. Also, if a driver is loaded for a particular
I2C device, you will get an error that it is in use. You should disable probing
in the [nxt-i2c-sensor] module (or blacklist the driver in `/etc/modprobe/d`).

    $ ls /dev/i2c-in*
    /dev/i2c-in2  /dev/i2c-in3

You can use the `i2c-tools` package or an I2C library in your programming
language of choice to communicate with I2C devices this way. You don't want
to do this if a device is already loaded so you will want to disable
autodetection first if the sensor is the autodetected type. Beware that many
sensors, including the NXT Ultrasonic Sensor use an address of 0x01, which is
illegal according to the I2C standards. `i2c-tools` and any library that does
some error checking may prevent you from accessing the sensor. In ev3dev-jessie,
the `i2c-tools` package has been patched to work around this.

## Practical examples

### Changing the Polling Rate

Using the NXT Ultrasonic Sensor:

    $ cat poll_ms
    100
    $ while true; do cat value0; done
    22
    23
    26
    27
    30
    25
    ...
    22
    24
    26
    26
    22
    22
    ^C
    $ echo 1000 > poll_ms
    $ while true; do cat value0; done
    22
    22
    22
    22
    22
    22
    22
    25
    25
    25
    25
    25
    25
    25
    25
    ...
    ^C
    $ echo 0 > poll_ms
    $ cat value0 # value0 will be last value measured before polling stopped
    23
    $ cat value 0 # move the sensor and try again
    23
    $ cat mode
    [NXT-US-CM] NXT-US-IN NXT-US-SI-CM NXT-US-SI-IN NXT-US-LIST
    $ echo NXT-US-CM > mode # reads data
    $ cat value0
    29
    $ cat value0 # move the sensor and try again
    29

`^C` means you have to press CTRL+C to make the loop stop.

### Sample /etc/modprobe.d/nxt-i2c-sensor.conf

    # Module configuration for nxt-i2c-sensor
    
    # Uncomment this line to disable polling
    #options nxt-i2c-sensor default_poll_ms=0
    
    # Uncomment this line to disable autodetection
    #options nxt-i2c-sensor allow_autodetect=N

### How to find the I2C adapter node without adding 2

    $ IN2_I2C_ADAP=$(udevadm info -q path -n /dev/i2c-in2)"/../.."
    $ echo $IN2_I2C_ADAP
    /devices/platform/legoev3-ports/in2/in2:nxt-i2c-host/i2c-legoev3.4/i2c-4/i2c-dev/i2c-4/../..

### Using i2c-tools

With the mindsensors.com Realtime Clock Sensor on input port 2.

    & i2cdump 4 0x68
    No size specified (using byte-data access)
    WARNING! This program can confuse your I2C bus, cause data loss and worse!
    I will probe file /dev/i2c-4, address 0x68, mode byte
    Continue? [Y/n] y
         0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f    0123456789abcdef
    00: 11 35 00 01 01 01 00 03 50 71 48 60 f5 01 6b 0c    ?5.???.?PqH`??k?
    10: 78 e3 2d 4e 92 6e c7 69 25 61 6b 5b 04 34 15 05    x?-N?n?i%ak[?4??
    20: cc 3e 4e 4b 41 8a 59 09 1b f3 1a 2a 7c 47 a7 90    ?>NKA?Y????*|G??
    30: 20 6a 95 7a 3b da 5b de 73 31 a2 3a 6e 59 ed f8     j?z;?[?s1?:nY??
    40: 11 35 00 01 01 01 00 03 50 71 48 60 f5 01 6b 0c    ?5.???.?PqH`??k?
    50: 78 e3 2d 4e 92 6e c7 69 25 61 6b 5b 04 34 15 05    x?-N?n?i%ak[?4??
    60: cc 3e 4e 4b 41 8a 59 09 1b f3 1a 2a 7c 47 a7 90    ?>NKA?Y????*|G??
    70: 20 6a 95 7a 3b da 5b de 73 31 a2 3a 6e 59 ed f8     j?z;?[?s1?:nY??
    80: 11 35 00 01 01 01 00 03 50 71 48 60 f5 01 6b 0c    ?5.???.?PqH`??k?
    90: 78 e3 2d 4e 92 6e c7 69 25 61 6b 5b 04 34 15 05    x?-N?n?i%ak[?4??
    a0: cc 3e 4e 4b 41 8a 59 09 1b f3 1a 2a 7c 47 a7 90    ?>NKA?Y????*|G??
    b0: 20 6a 95 7a 3b da 5b de 73 31 a2 3a 6e 59 ed f8     j?z;?[?s1?:nY??
    c0: 12 35 00 01 01 01 00 03 50 71 48 60 f5 01 6b 0c    ?5.???.?PqH`??k?
    d0: 78 e3 2d 4e 92 6e c7 69 25 61 6b 5b 04 34 15 05    x?-N?n?i%ak[?4??
    e0: cc 3e 4e 4b 41 8a 59 09 1b f3 1a 2a 7c 47 a7 90    ?>NKA?Y????*|G??
    f0: 20 6a 95 7a 3b da 5b de 73 31 a2 3a 6e 59 ed f8     j?z;?[?s1?:nY??
    $ i2cget -y 4 0x68 0x01 | sed s/0x// # read minutes
    35
    $ i2cset -y 4 0x68 0x08 0x46 0x72 0x65 0x65 0x20 0x72 0x61 0x6d 0x20 0x73 0x70 0x61 0x63 0x65 0x21 i
    $ i2cdump -y -r 0x08-0x16 4 0x68
    No size specified (using byte-data access)
         0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f    0123456789abcdef
    00:                         46 72 65 65 20 72 61 6d            Free ram
    10: 20 73 70 61 63 65 21                                space!

[lego-sensor]: /docs/drivers/lego-sensor-class
[I2C Sensor Addressing]: ../i2c-sensor-addressing
[port splitter]: http://mindsensors.com/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=79
[sensor MUX]: http://mindsensors.com/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=179
[nxt-i2c-sensor]: /docs/drivers/nxt-i2c-sensor
