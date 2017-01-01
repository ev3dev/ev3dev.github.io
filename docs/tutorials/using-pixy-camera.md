---
title: Using the CMUcam5 Pixy for LEGO Mindstorms
group: hardware-extras
author: "Kees Smit"
---

* Table of Contents
{:toc}

## Intro

The CMUcam5 Pixy camera is available in a version designed for
LEGO MIndstorms. In this tutorial we explain how to use it with ev3dev
and python.
General information about Pixy for LEGO MIndstorms can be found on
Charmed Lab's [wiki-page](http://cmucam.org/projects/cmucam5/wiki/LEGO_Wiki).

## What you need

* LEGO MIndstorms EV3.
* CMUcam5 Pixy for LEGO Mindstorms, connected to the EV3 with the cable
deliverd with your camera. If you have a regular version of CMUcam5 Pixy
you will need a special Pixy adapter for EV3.

**Note:** the Pixy camera comes with it's own tool: PixyMon. This tool helps
you to set the signatures (object you want Pixy to detect). To use this tool
you need to connect the camera directly to your PC by using a mini USB cable.
For this you can use the USB cable of your EV3. Beware that when the camera 
is connected to your PC this way, it's valuesare not updated! So before 
starting your script be sure the camerais disconnected form your computer 
and thus only connected to your EV3.

## Connecting to the camera and reading data

Use the `Sensor` class to connect to the Pixy camera:

    pixy = Sensor(address='in1')
    assert pixy.connected, "Error while connecting Pixy camera to port1"

In this statement it is assumed the camera is connected to input port 1.
It's recommended to use the `assert` statement: when the connection fails
the program ends with a meaningful error message.

Next set the mode for the camera:

    pixy.mode = 'ALL'

The Pixy camera has the following modes:
* ALL: the camera searches for all signatures you've set for it.
* SIGi: the camera searches for signature #i (i=1 to 7).

The data which you can retreive from the camera depends on the camera mode. You
can find detailed information on [this page](http://www.ev3dev.org/docs/sensors/charmed-labs-pixy-cmucam5-for-lego/).
We will explain it to you with some examples.

When mode is set to 'ALL' retreive data the following way:

    sig = pixy.value(1)*256 + pixy.value(0) # Signature of largest object
    x_centroid = pixy.value(2)    # X-centroid of largest SIG1-object
    y_centroid = pixy.value(3)    # Y-centroid of largest SIG1-object
    width = pixy.value(4)         # Width of the largest SIG1-object
    height = pixy.value(5)        # Height of the largest SIG1-object

When mode is set to one of the signatures (e.g. `SIG1`) retreive data
as follows:

    count = pixy.value(0)  # The number of objects that match signature 1
    x = pixy.value(1)      # X-centroid of the largest SIG1-object
    y = pixy.value(2)      # Y-centroid of the largest SIG1-object
    w = pixy.value(3)      # Width of the largest SIG1-object
    h = pixy.value(4)      # Height of the largest SIG1-object

Below are two practical examples. They are tested with the latest version of ev3dev
(as of 21 Dec 2016) and with CMUcam5 Pixy camera for LEGO Mindstorms.

## Example 1 - Display detected object on EV3-LCD

In this example the camera searches for objects with signature SIG1
and displays the data graphically on the LCD of the EV3. It draws a 
rectangle centered at the X and Y centroid coordinates with measured
width and height. End this script by pressing Ctrl+C.

```
#!/usr/bin/env python3
from ev3dev.ev3 import *

lcd = Screen()

# Connect Pixy camera
pixy = Sensor(address='in1')
assert pixy.connected, "Connecting PixyCam"

# Set mode
pixy.mode = 'SIG1'

while True:
  lcd.clear()
  if pixy.value(0) != 0:  # Object with SIG1 detected
    x = pixy.value(1) 
    y = pixy.value(2)
    w = pixy.value(3)
    h = pixy.value(4)
    dx = int(w/2)       # Half of the width of the rectangle
    dy = int(h/2)       # Half of the height of the rectangle
    xb = x + int(w/2)   # X-coordinate of bottom-right corner
    yb = y - int(h/2)   # Y-coordinate of the bottom-right corner
    lcd.draw.rectangle((xa,ya,xb,yb), fill='black')
    lcd.update()
```

The video shows this script running:
{% include /util/youtube-embed.html youtube_video_id="b2LZpY1qbKE" %}

## Example 2 - Following an object

This example uses a EV3 with Pixy camera, two LargeMotors and a TouchSensor.
The robot follows the object with signature SIG1. To stop the program the
user has to press the TouchSensor.
This example uses a simple implementation for a PID-controller. The example
works very well, but finetuning of the PID-constants can make the robot 
react en move smoother.

```
#!/usr/bin/env python3
from ev3dev.ev3 import *

def limit_speed(speed):
  """ Limit speed in range [-900,900] """
  if speed > 900:
    speed = 900
  elif speed < -900:
    speed = -900
  return speed

# Connect Pixy camera and set mode
pixy = Sensor(address = 'in1')
assert pixy.connected, "Error while connecting Pixy camera"
pixy.mode = 'SIG1'

# Connect TouchSensor (to stop script)
ts = TouchSensor('in4')
assert ts.connected, "Error while connecting TouchSensor"

# Connect LargeMotors
rmotor = LargeMotor('outA')
assert rmotor.connected, "Error while connecting right motor"
lmotor = LargeMotor('outD')
assert lmotor.connected, "Error while connecting left motor"

# Defining constants
X_REF = 128  # X-coordinate of referencepoint
Y_REF = 150  # Y-coordinate of referencepoint
KP = 0.4     # Proportional constant PID-controller
KI = 0.01    # Integral constant PID-controller
KD = 0.005   # Derivative constant PID-controller
GAIN = 10   # Gain for motorspeed

# Initializing PID variables
integral_x = 0
derivative_x = 0
last_dx = 0
integral_y = 0
derivative_y = 0
last_dy = 0

while not ts.value():
  if pixy.value(0) > 0:
    x = pixy.value(1)             # X-centroid of largest SIG1-object
    y = pixy.value(2)             # Y-centroid of largest SIG1-object
    dx = X_REF - x                # Error in reference to X_REF
    integral_x = integral_x + dx  # Calculate integral for PID
    derivative_x = dx - last_dx   # Calculate derivative for PID
    speed_x = KP*dx + KI*integral_x + KD*derivative_x  # Speed in X-direction
    dy = Y_REF - y       # Error in reference to Y_REF
    integral_y = integral_y + dy  # Calculate integral for PID
    derivative_y = dy - last_dy   # Calculate derivative for PID
    speed_y = KP*dy + KI*integral_y + KD*derivative_y  # Speed in Y-direction
    # Calculate motorspeed out of speed_x and speed_y
    # Use GAIN otherwise speed will be to slow, but limit in range [-900,900]
    rmotor.run_forever(speed_sp = limit_speed(GAIN*(speed_y + speed_x)))
    lmotor.run_forever(speed_sp = limit_speed(GAIN*(speed_y - speed_x)))
    last_dx = dx     # Set last error for x
    last_dy = dy     # Set last error for y
  else:
    rmotor.stop()    # SIG1 not detected, stop motors
    lmotor.stop()

# End of script, stop motors
rmotor.stop()
lmotor.stop()
```

The video shows this script running:
{% include /util/youtube-embed.html youtube_video_id="cDimWUEDwPU" %}
