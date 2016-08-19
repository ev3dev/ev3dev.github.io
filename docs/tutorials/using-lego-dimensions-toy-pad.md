---
title: Using the LEGO Dimensions Toy Pad
subject: Hardware - Other
author: "@JorgePe"
---

* Table of Contents
{:toc}

## Intro

The [LEGO Dimensions game](http://www.lego.com/en-us/dimensions/support) makes
use of NFC technology to allow some interaction between physical LEGO creations
(characters, vehicles and gadgets) and the videogame.

The LEGO Toy Pad is in fact just a custom USB triple NFC reader that can read
NFC tags (not only the LEGO Toy Tags but also several other tags including those
used in other games like Disney Infinity) and change the color of the RGB light
associated to each reader.

## Credits

Since the beginning of 2015 several people have been reverse engineering the
LEGO Toy Pad.
This tutorial is strongly based on @woodenphone [work](https://github.com/woodenphone/lego_dimensions_protocol) available at GitHub.


## Requirements

You will need:

* a proper LEGO Dimensions Toy Pad
* a Mindstorms EV3
* an available USB port
* python and pysub
* udev rule
 
Several people reported a difference between PS3/PS4/Wii devices and Xbox so
this tutorial most probaly will not work with the Xbox type.

You don't really need a Mindstorms EV3 as this tutorial can be used on almost any
recent linux system (like my Ubuntu laptop or my Raspberry Pi). If using ev3dev,
just be sure to use a recent version - this tutorial was tested with kernel
`4.4.15-13-ev3dev-ev3`.

Of course, you need an available USB port so if you're already using the Mindstorms
EV3 with an USB Wi-Fi dongle you will also need an USB Hub.

After you connect the LEGO Toy Pad it should be recognized as an HID device:

    robot@ev3dev:~# dmesg
    ...
    usb 2-1.2: new full-speed USB device number 8 using ehci-pci
    usb 2-1.2: New USB device found, idVendor=0e6f, idProduct=0241
    usb 2-1.2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
    usb 2-1.2: Product: LEGO READER V2.10
    usb 2-1.2: Manufacturer: PDP LIMITED. 
    usb 2-1.2: SerialNumber: P.D.P.000000
    hid-generic 0003:0E6F:0241.0006: hiddev0,hidraw3: USB HID v1.00 Device
    [PDP LIMITED.  LEGO READER V2.10] on usb-0000:00:1d.0-1.2/input0

You can also check with lsusb:

    robot@ev3dev:~# lsusb
    ...
    Bus 002 Device 008: ID 0e6f:0241 Logic3
    ...


You also need **python** and **pyusb**. Most linux distributions already
include python as default so you probably only need to install the pyusb library
with:

    sudo apt-get update
    sudo apt-get install python-usb

To allow python script to access USB without running with root privileges we need
to add an udev rule:

    sudo nano /etc/udev/rules.d/99-dimensions.rules

with the following rule inside:

    SUBSYSTEM=="usb", ATTR{idVendor}=="0e6f", ATTR{idProduct}=="0241", MODE="0666"

then unplug and replug the LEGO Toy Pad again.

## Initializing

The following script will check for the presence of a LEGO Toy Pad and initializes
it, turning the middle (round) pad red for one second:

{% highlight python %}

#!/usr/bin/python

import usb.core
import usb.util
from time import sleep

TOYPAD_INIT = [0x55, 0x0f, 0xb0, 0x01, 0x28, 0x63, 0x29, 0x20, 0x4c, 0x45, 0x47, 0x4f, 0x20, 0x32, 0x30, 0x31, 0x34, 0xf7, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

PAD1_RED = [0x55, 0x0e, 0xc8, 0x06, 0x01, 0xff, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 51, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

PADS_OFF = [0x55, 0x06, 0xc0, 0x02, 0x00, 0x00, 0x00, 0x00, 29, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

def init_usb():
    global dev

    dev = usb.core.find(idVendor=0x0e6f, idProduct=0x0241)

    if dev is None:
        print 'Device not found'
    else:
        if dev.is_kernel_driver_active(0):
            dev.detach_kernel_driver(0)

        print usb.util.get_string(dev, dev.iProduct)

        dev.set_configuration()
        dev.write(1,TOYPAD_INIT)

    return dev

def main():
    init_usb()
    dev.write(1,PAD1_RED)
    sleep(1)
    dev.write(1,PADS_OFF)
    return

{% endhighlight %}

If everything OK the output should be:

    LEGO READER V2.10

and of course the center pad should stay red for one second.

## Changing pad colors

In the above script we've seen that all commands sent to the LEGO Toy Pad have
the same size: 32 bytes.

The first bytes define the command, some other bytes the arguments and the
remaing bytes are just for assure proper communication (checksum).

I'll show just how to change the color of each pad but there are some other
commands available (switch on/off, fade, flash...). You can see these commands
in woodenphone's [lego_dimensions_gateway.py](https://github.com/woodenphone/lego_dimensions_protocol/blob/master/lego_dimensions_gateway.py) script.

{% highlight python %}

#!/usr/bin/python

import usb.core
import usb.util
from time import sleep

TOYPAD_INIT = [0x55, 0x0f, 0xb0, 0x01, 0x28, 0x63, 0x29, 0x20, 0x4c, 0x45, 0x47, 0x4f, 0x20, 0x32, 0x30, 0x31, 0x34, 0xf7, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

OFF   = [0,0,0]
RED   = [255,0,0]
GREEN = [0,255,0]
BLUE  = [0,0,255]

ALL_PADS   = 0
CENTER_PAD = 1
LEFT_PAD   = 2
RIGHT_PAD  = 3

def init_usb():
    global dev

    dev = usb.core.find(idVendor=0x0e6f, idProduct=0x0241)

    if dev is None:
        print 'Device not found'
    else:
        if dev.is_kernel_driver_active(0):
            dev.detach_kernel_driver(0)

        print usb.util.get_string(dev, dev.iProduct)

        dev.set_configuration()
        dev.write(1,TOYPAD_INIT)

    return dev

def send_command(dev,command):

    # calculate checksum
    checksum = 0
    for word in command:
        checksum = checksum + word
        if checksum >= 256:
            checksum -= 256
    message = command+[checksum]

    # pad message
    while(len(message) < 32):
        message.append(0x00)

    # send message
    dev.write(1, message)

    return

def switch_pad(pad, colour):
    send_command(dev,[0x55, 0x06, 0xc0, 0x02, pad, colour[0], colour[1], colour[2],])
    return

def main():
    init_usb()
    switch_pad(ALL_PADS,RED)
    sleep(1)
    switch_pad(ALL_PADS,GREEN)
    sleep(1)
    switch_pad(ALL_PADS,BLUE)
    sleep(1)
    switch_pad(ALL_PADS,OFF)
    return

if __name__ == '__main__':
    main()
  
{% endhighlight %}

## Reading tags

Whenever a tag is inserted or removed the LEGO Toy Pad sends a 32-byte message
starting with 0x56. The message also contains:
- the number of the pad affected
- the UID of the tag inserted or removed
- the action itself (tag was inserted or removed)

So if we already know the UID of a tag we can track it with the LEGO Toy Pad (I
use my Android phone to read my tags but we can also use the LEGO Toy Pad).
For the next script we'll track Darth Vader from Disney Infinity 3.0 (a Mifare
Classic Mini tag) but we can track several types of NFC tags - LEGO Toy Tags are
Mifare Ultralight C (also known as NTAG213) and Nintendo amiibo are also Mifare
Ultralight (but not C, so NTAG215).

The script also tracks unknown UIDs. So:
- if it recognizes Darth Vader, it turns the corresponding pad RED;
- if it doesn't recognize the tag, it turns the pad GREEN;
- whenever a tag is removed it turns the pad OFF;


{% highlight python %}

#!/usr/bin/python

import usb.core
import usb.util
from time import sleep

TOYPAD_INIT = [0x55, 0x0f, 0xb0, 0x01, 0x28, 0x63, 0x29, 0x20, 0x4c, 0x45, 0x47, 0x4f, 0x20, 0x32, 0x30, 0x31, 0x34, 0xf7, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

OFF   = [0,0,0]
RED   = [255,0,0]
GREEN = [0,255,0]
BLUE  = [0,0,255]

ALL_PADS   = 0
CENTER_PAD = 1
LEFT_PAD   = 2
RIGHT_PAD  = 3

# Actions
TAG_INSERTED = 0
TAG_REMOVED  = 1

# UIDs can be retrieved with Android App (most probably in hexadecimal)
uidDarthVader = (4, 161, 158, 210, 227, 64 , 128) # Darth Vader from Disney Infinity 3.0


def init_usb():
    global dev

    dev = usb.core.find(idVendor=0x0e6f, idProduct=0x0241)

    if dev is None:
        print 'Device not found'
    else:
        if dev.is_kernel_driver_active(0):
            dev.detach_kernel_driver(0)

        print usb.util.get_string(dev, dev.iProduct)

        dev.set_configuration()
        dev.write(1,TOYPAD_INIT)

    return dev


def send_command(dev,command):

    # calculate checksum
    checksum = 0
    for word in command:
        checksum = checksum + word
        if checksum >= 256:
            checksum -= 256
        message = command+[checksum]

    # pad message
    while(len(message) < 32):
        message.append(0x00)

    # send message
    dev.write(1, message)

    return


def switch_pad(pad, colour):
    send_command(dev,[0x55, 0x06, 0xc0, 0x02, pad, colour[0], colour[1], colour[2],])
    return


def uid_compare(uid1, uid2):
    match = True
    for i in range(0,7):
        if (uid1[i] != uid2[i]) :
            match = False
    return match 


def main():
    init_usb()
    if dev != None :
        while True:
            try:
                in_packet = dev.read(0x81, 32, timeout = 10)
                bytelist = list(in_packet)

                if not bytelist:
                    pass
                elif bytelist[0] != 0x56: # NFC packets start with 0x56
                    pass
                else:
                    pad_num = bytelist[2]
                    uid_bytes = bytelist[6:13]
                    match = uid_compare(uid_bytes, uidDarthVader)
                    action = bytelist[5]
                    if action == TAG_INSERTED :
                        if match:
                            # Darth Vader
                            switch_pad(pad_num, RED)
                        else:
                            # some other tag
                            switch_pad(pad_num, GREEN)
                    else:
                        # some tag removed
                        switch_pad(pad_num, OFF)

            except usb.USBError, err:
                pass

        switch_pad(ALL_PADS,OFF)
    return

if __name__ == '__main__':
    main()
  
{% endhighlight %}

