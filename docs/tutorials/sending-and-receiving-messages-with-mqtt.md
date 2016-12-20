---
title: Sending and Receiving Messages with MQTT
group: advanced-networking
author: "@JorgePe"
---

* Table of Contents
{:toc}

## Intro

[MQTT](https://en.wikipedia.org/wiki/MQTT) (Message Queue Telemetry Transport) is an ISO standard (ISO/IEC PRF 20922)
publish-subscribe based "light weight" messaging protocol for use on top of the
TCP/IP protocol. It is designed for connections with remote locations where a
"small code footprint" is required or the network bandwidth is limited.

It's very easy to use the MQTT protocol to exchange small messages between several
devices.

## Basics

* A `message` has a `topic` and a `payload`, like the subject and the content of an
e-mail.
* The `Publisher` sends a message to the network.
* The `Subscriber` listens for messages with a particular topic.
* The `Broker` is responsible for coordinating the communication between publishers and
  subscribers. It can also store messages while subscribers are offline (a feature not
  used in this tutorial).


## Requirements

We need a broker that is always available. Just one for the whole network.
It can be a PC, a Raspberry Pi or even an EV3. If it is a Debian-based linux
system we can use `mosquitto`

    sudo apt-get install mosquitto

This installs and also starts the mosquitto daemon. You can check if it is
working:

    robot@ev3dev:~# service mosquitto status
    ● mosquitto.service - LSB: mosquitto MQTT v3.1 message broker
       Loaded: loaded (/etc/init.d/mosquitto)
       Active: active (running) since Wed 2016-05-11 07:40:51 WEST; 7min ago
       CGroup: /system.slice/mosquitto.service
               └─685 /usr/sbin/mosquitto -c /etc/mosquitto/mosquitto.conf
           
Now we are able to send and receive messages through the broker (by default
mosquitto uses port 1883). 

This tutorial uses python scripts so we need to install one python library:

    sudo easy_install paho-mqtt

All scripts were tested successully on a EV3 running the latest ev3dev version
(as of 12 May 2016) and also on a Raspberry Pi 3 with a BrickPi running the same
ev3dev version and a laptop running Ubuntu 16.04.

## Publisher example

A very simple script to publish a message:

    #!/usr/bin/env python

    import paho.mqtt.client as mqtt

    # This is the Publisher
    
    client = mqtt.Client()
    client.connect("localhost",1883,60)
    client.publish("topic/test", "Hello world!");
    client.disconnect();

Note: if using an external broker (i.e. the mosquitto deamon is not running in the
EV3 that publishes messages) replace `localhost` with the IP address of the device
that hosts the broker.

## Subscriber example

Any MQTT client that is connected to our broker and has subscribed for "topic/test"
will receive a MQTT message with "Hello world!" as the payload. We can test it with
a mobile phone (there are several free MQTT client apps available) but we can also
test it on our PC or on another EV3:

    #!/usr/bin/env python

    import paho.mqtt.client as mqtt

    # This is the Subscriber
    
    def on_connect(client, userdata, flags, rc):
      print("Connected with result code "+str(rc))
      client.subscribe("topic/test")

    def on_message(client, userdata, msg):
      if (msg.payload == "Hello world!"):
        print("Yes!")
        client.disconnect()
        
    client = mqtt.Client()
    client.connect("THE_IP_ADDRESS_OF_OUR_BROKER",1883,60)

    client.on_connect = on_connect
    client.on_message = on_message

    client.loop_forever()

Note: the second EV3 (the "Subscriber") just needs the "paho-mqtt" library,
there is no need to install the "mosquitto" daemon.

## A more practical example

We will use MQTT messages to control the speed of an EV3 motor on port A.
We will do this by changing just one motor attribute: `duty_cycle_sp`
so we define a topic for this purpose and susbcribe to it: `topic/motor-A/dt`

    #!/usr/bin/env python
    
    import paho.mqtt.client as mqtt
    from ev3dev.auto import *
    
    # This is the Subscriber

    m = MediumMotor(OUTPUT_A)

    def on_connect(client, userdata, flags, rc):
        print("Connected with result code "+str(rc))
        client.subscribe("topic/motor-A/dt")
    
    def on_message(client, userdata, msg):
        if (msg.payload == 'Q'):
          m.stop()
          client.disconnect()
        elif (-100 <= int(msg.payload) <= 100):
          m.duty_cycle_sp=msg.payload
    
    client = mqtt.Client()
    client.connect("THE_IP_ADDRESS_OF_OUR_BROKER",1883,60)
    
    client.on_connect = on_connect
    client.on_message = on_message
    
    m.run_direct()
    m.duty_cycle_sp=0
    
    client.loop_forever()


So whenever a device on our network publishes a message with topic `topic/motor-A/dt`
our Subscriber will receive it and if the payload is a proper integer value it will
change the motor speed. It will also stop the motor and quit if the payload is just
`Q`.

This video shows a demonstration of both Publisher and Suscriber scripts running,
with just a few improvements on the Publisher side to allow using EV3 buttons:
{% include /util/youtube-embed.html youtube_video_id="RmoC-vybW10" %}

## Final notes

This is just a very basic example - one Publisher (probably also the Broker) and
one Subscriber, but it is very easy to extend (and don't forget that the same
device can play all roles).

Since we can connect several clients to the same broker we can also send
messages to the EV3 "Subscriber" not just from the EV3 "Publisher" but also
from anything that can publish MQTT messages like a PC, a mobile phone, a
Raspberry Pi or an Arduino. Welcome to the Internet of Things!

One interesting possibility is running `node-red` on our PC as it offers two
built-in MQTT nodes ("mqtt in" and "mqtt out"). With just a few clicks we can
create a flow that connects our EV3's to the internet. Of course, we can also run
`node-red` on our EV3 but will probably exceed our little fellow resources (but
a Raspberry Pi and a BrickPi can run `node-red` and `mosquitto` easily).

