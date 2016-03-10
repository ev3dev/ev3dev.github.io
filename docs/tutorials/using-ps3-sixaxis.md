---
title: Using the EV3 Buttons
subject: Hardware - PS3 Sixaxis bluetooth gamepad
author: Anton Vanhoucke
---

* Table of Contents
{:toc}

# What you need
A PS3 gamepad (also known as Sixaxis controller or Dualshock 3)
A mini-usb / usb cable
A working ssh and internet connection to the Ev3 (or other ev3dev device).

# Connection
The PS3 controller pairs more or less like a normal bluetooth device in brickman. First make sure bluetooth is on in Ev3dev and the brick is visible. Next you have to connect the gamepad via a mini usb cable to the Ev3. Next press the PS3 button on the gamepad. The controller should now show up in brickman under wireless > bluetooth. Connect, pair and remove the USB cable. Whenever you press the PS3 button on the gamepad now, it will try to connect to the ev3 brick. Nice!

If brickman doesn't work or if you don't have a display, like on a BrickPi, bluetoothectl is the way to go. A nice tutorial is here: https://wiki.gentoo.org/wiki/Sony_DualShock


# Installing the necessary python libraries
To read gamepad values into our python program we need to the evdev library. (This is not a typo. There is no 3 in evdev) Depending on your ev3dev image it might already be installed. Try this to check that:

    python
    >>> import evdev

If that doesn't return an error, you're fine. Otherwise install it like so:

    sudo apt-get update
    sudo apt-get install python-dev python-pip gcc
    sudo apt-get install linux-headers-$(uname -r)
    sudo pip install evdev

The last command will take a long time and won't show much response. Be patient!

# Running motors with a PS3 sixaxis controller
Here's a quick program that will take the right stick Y axis and use it to set the speed of a motor in port A. Note that motor control is in a separate thread. That's because controlling the motors is much slower than reading the gamepad. Multithreading synchronizes both.

{% highlight python %}
__author__ = 'Anton Vanhoucke'

import evdev
import ev3dev.auto as ev3
import threading

## Some helpers ##
def scale(val, src, dst):
    """
    Scale the given value from the scale of src to the scale of dst.

    val: float or int
    src: tuple
    dst: tuple

    example: print scale(99, (0.0, 99.0), (-1.0, +1.0))
    """
    return (float(val - src[0]) / (src[1] - src[0])) * (dst[1] - dst[0]) + dst[0]

def scale_stick(value):
    return scale(value,(0,255),(-100,100))

## Initializing ##
print "Finding ps3 controller..."
devices = [evdev.InputDevice(fn) for fn in evdev.list_devices()]
for device in devices:
    if device.name == 'PLAYSTATION(R)3 Controller':
        ps3dev = device.fn

gamepad = evdev.InputDevice(ps3dev)

speed = 0
running = True

class MotorThread(threading.Thread):
    def __init__(self):
        self.motor = ev3.LargeMotor(ev3.OUTPUT_A)
        threading.Thread.__init__(self)

    def run(self):
        print "Engine running!"
        while running:
            self.motor.run_forever(duty_cycle_sp=speed)

        self.motor.stop()

motor_thread = MotorThread()
motor_thread.setDaemon(True)
motor_thread.start()


for event in gamepad.read_loop():   #this loops infinitely
    if event.type == 3:             #A stick is moved
        if event.code == 5:         #Y axis on right stick
            speed = scale_stick(event.value)

    if event.type == 1 and event.code == 302 and event.value == 1:
        print "X button is pressed. Stopping."
        running = False
        break
{% endhighlight %}

# The complete event type and code mapping of the ps3 controller
I mapped out all codes for you! Here they are:
{% include screenshot.html source="/images/Website/sixaxis_event_codes.png" %}

# The result: a remote controle robot. 
How cool! No computer needed. Just a gamepad and the ev3 brick. 

{% include youtube-embed.html youtube_video_id="brfgF3D5c4k" %}
