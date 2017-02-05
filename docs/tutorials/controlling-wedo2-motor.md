---
title: Controlling a WeDo 2.0 motor
group: hardware-extras
author: "@JorgePe"
---

* Table of Contents
{:toc}

## Intro

LEGO Education released the second version of WeDo in the beginning of 2016.
We'll show how to use the bluez, the linux bluetooth stack, to wireless control a
WeDo 2.0 motor.

The first WeDo version uses USB so every robot needs to be tethered to a *host*
(usually a computer but can also be a Mindstorms EV3 running ev3dev)
The second WeDo version uses [BLE](https://en.wikipedia.org/wiki/Bluetooth_low_energy) (Bluetooth Low Energy, a sub-set of the Bluetooth
4.0 standard) so robots can now be totally autonomous.

## Requirements

The EV3 internal bluetooth isn't compliant with the BT 4.0 BLE subset so we need an
USB Bluetooth 4.0 dongle supported by ev3dev. If it works with Ubuntu or with a
Raspberry Pi then most probably will also work with ev3dev.

Since we'll probably use Wi-Fi, an USB hub will be required aswell. Most (but not
all) USB 2.0 hubs work fine with ev3dev.

If ev3dev recognizes our Bluetooth 4.0 dongle, we'll have two hci devices - the
internal bluetooth and the new USB one:

    robot@ev3dev:~# hciconfig -a
    hci1:	Type: BR/EDR  Bus: UART
    	    BD Address: 24:71:89:28:F0:D3  ACL MTU: 1021:4  SCO MTU: 180:4
	    UP RUNNING 
	    RX bytes:1139 acl:0 sco:0 events:54 errors:0
	    TX bytes:2011 acl:0 sco:0 commands:54 errors:0
	    Features: 0xff 0xfe 0x2d 0xfe 0x9b 0xff 0x79 0x87
	    Packet type: DM1 DM3 DM5 DH1 DH3 DH5 HV1 HV2 HV3 
	    Link policy: RSWITCH HOLD SNIFF 
	    Link mode: SLAVE ACCEPT 
	    Name: 'ev3dev'
	    Class: 0x000100
	    Service Classes: Unspecified
	    Device Class: Computer, Uncategorized
	    HCI Version: 4.0 (0x6)  Revision: 0x0
	    LMP Version: 4.0 (0x6)  Subversion: 0x1b55
	    Manufacturer: Texas Instruments Inc. (13)

    hci0:   Type: BR/EDR  Bus: USB
   	    BD Address: 00:19:0E:16:3F:EA  ACL MTU: 1021:8  SCO MTU: 64:1
	    UP RUNNING 
	    RX bytes:11809 acl:120 sco:0 events:872 errors:0
	    TX bytes:8004 acl:120 sco:0 commands:470 errors:0
	    Features: 0xbf 0xfe 0xcf 0xfe 0xdb 0xff 0x7b 0x87
	    Packet type: DM1 DM3 DM5 DH1 DH3 DH5 HV1 HV2 HV3 
	    Link policy: RSWITCH SNIFF 
	    Link mode: SLAVE ACCEPT 
	    Name: 'ev3dev #1'
	    Class: 0x000000
	    Service Classes: Unspecified
	    Device Class: Miscellaneous, 
	    HCI Version: 4.0 (0x6)  Revision: 0x1000
	    LMP Version: 4.0 (0x6)  Subversion: 0x220e
	    Manufacturer: Broadcom Corporation (15)

In the above situation, `hci0` is our Bluetooth 4.0 BLE device (note "BUS: USB").
Initial releases of EV3 bricks will show older HCI/LMP versions for the internal
USB device (`hci1` here) but it always be shown with `BUS: UART`. Although the
newer releases show a HCI/LMP 4.0 version this new chipset doesn't include the
Bluetooth Low Energy subset of the BT 4.0 standard.

If you don't see status "UP RUNNING" you will need to activate Bluetooth 
first - one easy way is using the Brickman User Interface: choose "Wireless and 
Networks" at the main screen then "Bluetooth" but you can also run

    connmanctl enable bluetooth

from a command line as well.

We also need a recent bluez version for BLE support. Most recent builds of ev3dev
will have it already (checked with "ev3-ev3dev-jessie-2015-12-30.img.xz").

Now we need to find the bluetooth address of our WeDo 2.0 hub.
For that we press it's button to put it in descovery mode and run this
command:

    robot@ev3dev:~# sudo hcitool -i hci0 lescan
    LE Scan ...
    A0:E6:F8:1E:58:57 (unknown)
    A0:E6:F8:1E:58:57 	

In the example above, `A0:E6:F8:1E:58:57` is the bluetooth address of our WeDo 2.0
hub. We can use other tools, including a smartphone with BLE support - the WeDo 2.0
will probably show up as `LPF2 Smart Hub 2 I/O`, just look for the address in its
properties.


## Shell script example

This short shell script makes a motor connected to the first port spin for one second
then stop:

    #!/bin/bash
    gatttool -i hci0 -b A0:E6:F8:1E:58:57 --char-write -a 0x003d -n 01010164
    sleep 1
    gatttool -i hci0 -b A0:E6:F8:1E:58:57 --char-write -a 0x003d -n 01010100

(You need to run this script with sudo, unless you already have root previleges)

We see that it uses the gatttool command to send a sequence of 4 bytes to one specific
handler (0x003d). This is the meaning of those 4 bytes:
* the first byte defines the port (01 or 02)
* the second byte defines the command (01 = motor speed)
* the third byte defines the length of the following argument(s) (01)
* the fourth byte is the argument, in this case the speed percentage

To spin in one direction we send a positive value from 1 to 100 (or 01 to 64 in
hexadecimal).
To spin in the opposite direction we send a "negative" value from
255 to 156 (or FF to 9C in hexadecimal).
To stop the motor we set the speed as zero (00).
Please note that for small speed values (less than 20%) the motor will not respond,
this is normal as we're not giving enough power to overcome it's inertia.


## Python example

To use pyhton with the WeDo 2.0 we need a BLE library. Unfortunately BLE
support in python is still quite imature but there is at least one library that
works in ev3dev - [gattlib](https://bitbucket.org/OscarAcena/pygattlib).

Since the beginning of 2017 (snapshot-ev3dev-jessie-ev3-generic-2017-01-16) this
library is already included in the ev3dev image. You can check the version of the
installed package with:

    dpkg -s python3-gattlib | grep "Version:"
    Version: 0.20150805-1ev3dev1

If version is older (or nonexistent) you should update/install it:

    sudo apt update
    sudo apt install python3-gattlib

This short python script makes the motor spin 2 seconds in each direction then stop:

```python
#!/usr/bin/env python3
from gattlib import GATTRequester
from time import sleep

req = GATTRequester("A0:E6:F8:1E:58:57",True,"hci0")
req.write_by_handle(0x3d, "\x01\x01\x01\x64")
sleep(2)
req.write_by_handle(0x3d, "\x01\x01\x01\x9C")
sleep(2)
req.write_by_handle(0x3d, "\x01\x01\x01\x00")
```

## A more practical example

A BLE connection is not permanent - it drops after a few seconds. And the WeDO 2.0
hub also enters in sleep mode a few seconds after the connection drops so we need
to assure this never happens.

We will use an EV3 touch sensor to control the direction of the WeDo 2.0 motor and
periodically refresh the connection.

```python
#!/usr/bin/env python3
    
from ev3dev.auto import *
from gattlib import GATTRequester
from time import sleep
    
address    = "A0:E6:F8:1E:58:57"
HANDLE     = 0x3d
SPIN_LEFT  = "\x01\x01\x01\x64"
SPIN_RIGHT = "\x01\x01\x01\x9C"
SPIN_STOP  = "\x01\x01\x01\x00"
DELAY      = 0.3   # this is empiric - the WeDo seems to need this delay
                   # between each command

ts = TouchSensor();
    
req = GATTRequester(address,True,"hci0")
sleep(DELAY)
    
command = SPIN_LEFT
while True:
  if ts.value():
    if(req.is_connected() == True):
      print("Already connected")
      sleep(DELAY)
    else:
      print("Connecting...")
      req.connect(True)
      print("OK")
      sleep(DELAY)
    
    req.write_by_handle(HANDLE, command)
    
    if (command == SPIN_LEFT):
      command = SPIN_RIGHT
    else:
      command = SPIN_LEFT
    sleep(DELAY)
    
  if(req.is_connected() == True):
    print("Still connected")
  else:
    print("Reconnecting...")
    req.connect(True)
    print("OK")
    sleep(DELAY)
```

This video shows the script in action:
{% include /util/youtube-embed.html youtube_video_id="0d3MdZuDOTc" %}

## Final notes

This is just an introduction to the WeDo 2.0 BLE protocol. LEGO has released
a ["Communication Software Development Kit"](https://education.lego.com/en-us/support/wedo-2/developer-kits) with some information about
the several BLE services (not just the motor but also sensors, RGB Light, 
piezzo buzzer, battery...).

If rumours are true, the next generation of LEGO Power Functions and Mindstorms
will both share some components with the WeDo 2.0 (the Hub is already announcing
itself as "LEGO Power Functions 2" device) so this might be just the start.

Also in January 2017 LEGO announced the [LEGO BOOST](https://www.lego.com/en-us/boost) line, a kind of
WeDo 2.0 update for general users (the WeDo 2.0 is intended for Educational) that will
bring us a BOOST Move Hub (similar to the WeDo 2.0 Smart Hub but with 2 motors
and a tilt sensor already included), a new motor and 2 new sensors. Most
probably the contents of this tutorial could also be used with Boost.
