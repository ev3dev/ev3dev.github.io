---
title: Bluetooth PS3 gamepad in Python
group: hardware-extras
author: "@antonvh"
---

* Table of Contents
{:toc}

The cool thing about the PS3 gamepad is that it's a normal Bluetooth device and
connects directly to the EV3. You can easily run programs in Brickman and use
the gamepad without another computer or laptop.

# What you need
- A PS3 gamepad (also known as Sixaxis controller or Dualshock 3)
- A USB mini-B to USB A cable (like the one that comes with the EV3)
- A working ssh and internet connection to the EV3 (or other ev3dev device)
- ev3-ev3dev-jessie-2016-12-21.img or later

# Connection
The PS3 pairing process in Brickman is a little strange, but works fine. Stick
exactly to these steps: 

1. On the EV3 brick go to 'Wireless and Networks' > 'Bluetooth'
2. Make sure Bluetooth is Powered and the brick is Visible. 
3. Connect the gamepad via a mini USB cable to the EV3. I used the large USB
   port next to the microSD slot.
4. Under Devices a 'PLAYSTATION(R) 3 controller' should show up. But don't pair!
4. Remove the USB cable again.
5. Press the PS3 button on the gamepad.
6. The brick now asks "Authorize service HID?" Press "Accept" 

You're done! Whenever you press the PS3 button on the gamepad now, it will try
to connect to the EV3 brick. Nice!

If Brickman doesn't work or if you don't have a display, like on a BrickPi,
`bluetoothctl` is the way to go. The Gentoo Linux guys wrote [a nice tutorial][gentoo].

[gentoo]: https://wiki.gentoo.org/wiki/Sony_DualShock


# Running motors with a PS3 sixaxis controller
Now on to Python. In python we need the `evdev` module (without a 3) to read gamepad
events. Here's a quick program that will take the right stick Y axis and use it
to set the speed of a motor in port A. Note that motor control is in a separate
thread. That's because controlling the motors is much slower than reading the
gamepad. Multithreading synchronizes both.

```python
#!/usr/bin/env python3
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

    example: print(scale(99, (0.0, 99.0), (-1.0, +1.0)))
    """
    return (float(val - src[0]) / (src[1] - src[0])) * (dst[1] - dst[0]) + dst[0]

def scale_stick(value):
    return scale(value,(0,255),(-100,100))

## Initializing ##
print("Finding ps3 controller...")
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
        print("Engine running!")
        while running:
            self.motor.run_direct(duty_cycle_sp=speed)

        self.motor.stop()

motor_thread = MotorThread()
motor_thread.setDaemon(True)
motor_thread.start()


for event in gamepad.read_loop():   #this loops infinitely
    if event.type == 3:             #A stick is moved
        if event.code == 5:         #Y axis on right stick
            speed = scale_stick(event.value)

    if event.type == 1 and event.code == 302 and event.value == 1:
        print("X button is pressed. Stopping.")
        running = False
        break
```

Copy this code into a file on the EV3 brick to run it. If you do
`chmod +x your_file_name.py`, you can even run it from the Brickman interface!

# The complete event type and code mapping of the PS3 controller
I mapped out all codes for you! Here they are:
{% include /util/screenshot.html source="/images/Website/sixaxis_event_codes.png" %}

# The result: a remote controlled robot
How cool! No computer needed. Just a gamepad and the EV3 brick.

{% include /util/youtube-embed.html youtube_video_id="brfgF3D5c4k" %}
