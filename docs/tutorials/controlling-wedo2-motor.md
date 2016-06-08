---
title: Controlling a WeDo 2.0 motor
subject: Hardware - WeDO
author: "@JorgePe"
---

* Table of Contents
{:toc}

## Intro

LEGO Education released the second version of WeDO in the beginning of 2016.
We'll show how to use the bluez, the linux bluetooth stack, to wireless control a
WeDo 2.0 motor.

The first WeDO version uses USB so every robot needs to be tethered to a *host*
(usually a computer but can also be a Mindstorms EV3 running ev3dev)
The second WeDO version uses [BLE](https://en.wikipedia.org/wiki/Bluetooth_low_energy) (Bluetooth Low Energy, a sub-set of the Bluetooth
4.0 standard) so robots can now be totally autonomous.

## Requirements

The EV3 internal bluetooth is to old, just 2.1 compliant. To use BLE we need an
USB Bluetooth 4.0 dongle supported by ev3dev. If it works with Ubuntu or with a
Raspberry Pi then most probably will also work with ev3dev.

Since we'll probably use Wi-Fi, an USB hub will be required aswell. Most (but not
all) USB 2.0 hubs work fine with ev3dev.

If ev3dev recognizes our Bluetooth 4.0 dongle, we'll have two hci devices - the
internal bluetooth and the new USB one:

    robot@ev3dev:~# hciconfig -a
    hci1:   Type: BR/EDR  Bus: UART
	    BD Address: 00:17:EC:48:44:6B  ACL MTU: 1021:4  SCO MTU: 180:4
       	    UP RUNNING 
            RX bytes:863 acl:0 sco:0 events:32 errors:0
    	    TX bytes:1396 acl:0 sco:0 commands:32 errors:0
	    Features: 0xff 0xff 0x2d 0xfe 0x9b 0xff 0x79 0x83
	    Packet type: DM1 DM3 DM5 DH1 DH3 DH5 HV1 HV2 HV3 
	    Link policy: RSWITCH HOLD SNIFF PARK 
	    Link mode: SLAVE ACCEPT 
	    Name: 'ev3dev'
	    Class: 0x000000
	    Service Classes: Unspecified
	    Device Class: Miscellaneous, 
	    HCI Version: 2.1 (0x4)  Revision: 0x0
	    LMP Version: 2.1 (0x4)  Subversion: 0x191f
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

In the above situation, `hci0` is our Bluetooth 4.0 BLE device (note "BUS: USB" and
"HCI version: 4.0"). If you don't see status "UP RUNNING" you need to activate
Bluetooth first (one easy way is using the Brickman User Interface: choose "Wireless
and Networks" at the main screen then "Bluetooth")

We also need a recent bluez version for BLE support. Most recent builds of ev3dev
will have it already (checked with "ev3-ev3dev-jessie-2015-12-30.img.xz").

Now we need to find the bluetooth address of our WeDO 2.0 hub.
For that we press it's button to put it in descovery mode and run this
command:

    robot@ev3dev:~# sudo hcitool -i hci0 lescan
    LE Scan ...
    A0:E6:F8:1E:58:57 (unknown)
    A0:E6:F8:1E:58:57 	

In the example above, `A0:E6:F8:1E:58:57` is the bluetooth address of our WeDO 2.0
hub. We can use other tools, including a smartphone with BLE support - the WeDO 2.0
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
handler (0x003d). The WeDO 2.0 has several handlers but until LEGO Education releases
the promised SDK this is the only handler we "know" how to use:

This is meaning of those 4 bytes:
* the first byte defines the port (01 or 02)
* the second byte defines the command (01 = motor speed)
* the third byte defines the length of the following argument(s) (01)
* the fouth byte is the argument, in this case the speed percentage

To spin in one direction we send a positive value from 1 to 100 (or 01 to 64 in
hexadecimal).
To spin in the opposite direction we send a "negative" value from
255 to 156 (or FF to 9C in hexadecimal).
To stop the motor we set the speed as zero (00).
Please note that for small speed values (less than 20%) the motor will not respond.


## Python example

To use pyhton with the WeDO 2.0 we need a BLE library. Unfortunately BLE
support in python is still quite imature but there is at least one library that
works in ev3dev - [gattlib](https://bitbucket.org/OscarAcena/pygattlib)

    sudo apt-get install pkg-config libboost-python-dev libboost-thread-dev \
     libbluetooth-dev libglib2.0-dev python-dev

    sudo pip install gattlib

This library is also used as an extension for a more known library, [pybluez](https://pypi.python.org/pypi/PyBluez)
so if you want a library for both bluetooth "Classic" and BLE this would be better:

    pip install pybluez
    pip install pybluez[ble]

Unfortunately I couldn't make it work in my ev3dev system.

Please note that it takes **a lot** of memory and around 2 hours to install gattlib.
After some failures ("virtual memory exhausted: Cannot allocate memory") I finally
succeeded extending my ev3dev swapfile to almost 1 GB (please first check if you have
enough free space in your SD card):

    robot@ev3dev:~$ sudo dd if=/dev/zero of=/swapfile1 bs=1024 count=917504
    917504+0 records in
    917504+0 records out
    939524096 bytes (940 MB) copied, 442.332 s, 2.1 MB/s

it will take 5 to 10 minutes to allocate space for such a big file

    robot@ev3dev:~$ sudo mkswap /swapfile1
    Setting up swapspace version 1, size = 917500 KiB
    no label, UUID=55fcb430-451b-4699-955c-5754bf65999b

    robot@ev3dev:~$ sudo swapon /swapfile1
    swapon: /swapfile1: insecure permissions 0644, 0600 suggested.

this is a temporary measure so we'll skip security warning

    robot@ev3dev:~$ sudo swapon -s
    Filename				Type		Size	Used	Priority
    /dev/zram0                             	partition	98300	8188	16383
    /swapfile1                             	file    	917500	0	-1

We don't want to use the swapfile in memory (it will overflow) so we disable it:

    sudo systemctl stop zram_swap.service

After installation completes we reset the swapfile configuration:

    sudo systemctl start zram_swap.service
    sudo swapoff /swapfile1
    sudo rm /swapfile1

This short python script makes the motor spin 2 second in each direction then stop:

{% highlight python %}
#!/usr/bin/python
from gattlib import GATTRequester
from time import sleep

req = GATTRequester("A0:E6:F8:1E:58:57",True,"hci0")
req.write_by_handle(0x3d, "\x01\x01\x01\x64")
sleep(2)
req.write_by_handle(0x3d, "\x01\x01\x01\x9C")
sleep(2)
req.write_by_handle(0x3d, "\x01\x01\x01\x00")
{% endhighlight %}

## A more practical example

A BLE connection is not permanent - it drops after a few seconds. And the WeDO 2.0
hub also enters in sleep mode a few seconds after the connection drops so we need
to assure this never happens.

We will use an EV3 touch sensor to control the direction of the WeDO 2.0 motor and
periodically refresh the connection.

{% highlight python %}
#!/usr/bin/python
    
from ev3dev.auto import *
from gattlib import GATTRequester
from time import sleep
    
address    = "A0:E6:F8:1E:58:57"
HANDLE     = 0x3d
SPIN_LEFT  = "\x01\x01\x01\x64"
SPIN_RIGHT = "\x01\x01\x01\x9C"
SPIN_STOP  = "\x01\x01\x01\x00"
DELAY      = 0.3   # this is empiric - the WeDO seems to need this delay
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
{% endhighlight %}

This video shows the script in action:
{% include youtube-embed.html youtube_video_id="0d3MdZuDOTc" %}

## Final notes

We still need to find how to read WeDO 2.0 sensors. But at least for now there
is a "purist" way to extend the number of motors available to the EV3. And if
rumours are true, the next generation of LEGO Power Functions and Mindstorms
will both share some components with the WeDO 2.0 (the Hub is already announcing
itself as "LEGO Power Functions 2" device) so this might be just the start.
