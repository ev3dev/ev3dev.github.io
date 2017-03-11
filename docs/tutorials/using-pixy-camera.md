---
title: Using the CMUcam5 Pixy for LEGO Mindstorms
group: hardware-extras
author: "@KWSmit"
---

* Table of Contents
{:toc}

## Intro

The CMUcam5 Pixy camera is available in a version designed for
LEGO Mindstorms. In this tutorial we explain how to use it with ev3dev
and python.

General information about Pixy for LEGO Mindstorms can be found on
Charmed Lab's [wiki-page](http://cmucam.org/projects/cmucam5/wiki/LEGO_Wiki).

## What you need

* LEGO Mindstorms EV3.
* CMUcam5 Pixy for LEGO Mindstorms, connected to the EV3 with the cable
delivered with your camera. If you have a regular version of CMUcam5 Pixy
you will need a special Pixy adapter for EV3.

{% include /style/begin-panel.html type="info" heading="Note" %}
The Pixy camera comes with its own tool: PixyMon. This tool helps
you to set the signatures (objects you want Pixy to detect). To use this tool
you need to connect the camera directly to your PC by using a mini USB cable.
For this you can use the USB cable of your EV3. Beware that when PixyMon
is running on your PC (and the camera is plugged in to your PC), its values
are not updated to the EV3. So before starting your script be sure PixyMon
is not running!{% include /style/end-panel.html %}

## Connecting to the camera and reading data

In python use the `Sensor` class to connect to the Pixy camera:

```python
from ev3dev.ev3 import *
pixy = Sensor(address=INPUT_1)
assert pixy.connected, "Error while connecting Pixy camera to port1"
```

In this statement it is assumed the camera is connected to input port 1.
It's recommended to use the ```assert``` statement: when the connection fails
the program ends with a meaningful error message.

Next set the mode for the camera:

```python
pixy.mode = 'ALL'
```

The Pixy camera has the following modes:

* ALL: the camera searches for all signatures you've set for it.
* SIGn: the camera searches for signature #n (n=1 to 7).

The data which you retrieve from the camera depends on the camera mode. You
can find detailed information on [this page](http://docs.ev3dev.org/projects/lego-linux-drivers/en/ev3dev-jessie/sensor_data.html#pixy-lego).
We will explain it to you with some examples.

When the mode is set to ```ALL```, you can retrieve data as follows:

```python
sig = pixy.value(1)*256 + pixy.value(0) # Signature of largest object
x_centroid = pixy.value(2)    # X-centroid of largest SIG1-object
y_centroid = pixy.value(3)    # Y-centroid of largest SIG1-object
width = pixy.value(4)         # Width of the largest SIG1-object
height = pixy.value(5)        # Height of the largest SIG1-object
```

When mode is set to one of the signatures (e.g. `SIG1`), retrieve data
as follows:

```python
count = pixy.value(0)  # The number of objects that match signature 1
x = pixy.value(1)      # X-centroid of the largest SIG1-object
y = pixy.value(2)      # Y-centroid of the largest SIG1-object
w = pixy.value(3)      # Width of the largest SIG1-object
h = pixy.value(4)      # Height of the largest SIG1-object
```

Below are two practical examples. They are tested with the latest version of 
ev3dev (as of 21 Dec 2016) and with CMUcam5 Pixy camera for LEGO Mindstorms.

{% include /style/begin-panel.html type="info" heading="Note" %}
To run the scripts form Brickman, be sure it's executable. To make it
executable run ```chmod +x <file>``` once in the terminal. Also don't forget
the shebang ```#!/usr/bin/env python3``` in the first line of your script.
{% include /style/end-panel.html %}

## Example 1 - Display detected object on EV3-LCD

This example uses an EV3 with a Pixy camera and a TouchSenor plugged in.
In this example the camera searches for objects with signature SIG1
and displays the data graphically on the LCD of the EV3. It draws a 
rectangle centered at the X and Y centroid coordinates with measured
width and height. End this script by pressing the TouchSensor.

{% include /style/begin-panel.html type="info" heading="Note" %}
When running this script from the SSH terminal, the Brickman display may
reappear at any time, momentarily or permanently. Furthermore, when the script
stops it may take a while to before the screen reverts back to the Brickman
interface. To prevent this, follow these instructions:

* Run ```sudo chvt 6``` before starting the script. This will clear the display.
For this command you need the password for robot, which is 'maker' by default.
* Run your script (once or several times).
* Run ```sudo chvt 1``` to bring back the interface of Brickman.
{% include /style/end-panel.html %}

```
#!/usr/bin/env python3
from ev3dev.ev3 import *

lcd = Screen()

# Connect Pixy camera
pixy = Sensor(address=INPUT_1)
assert pixy.connected, "Connecting PixyCam"

# Connect TouchSensor
ts = TouchSensor(address=INPUT_4)
assert ts.connected, "Connecting TouchSensor"

# Set mode
pixy.mode = 'SIG1'

while not ts.value():
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

This video shows this script running:
{% include /util/youtube-embed.html youtube_video_id="b2LZpY1qbKE" %}

## Example 2 - Following an object

This example uses an EV3 with Pixy camera, two LargeMotors and a TouchSensor.
The robot follows the object with signature SIG1. To stop the program the
user has to press the TouchSensor.

This example uses a simple implementation for a PID-controller. The example
works very well, but fine tuning of the PID-constants can make the robot 
react and move smoother.

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
pixy = Sensor(address = INPUT_1)
assert pixy.connected, "Error while connecting Pixy camera"
pixy.mode = 'SIG1'

# Connect TouchSensor (to stop script)
ts = TouchSensor(INPUT_4)
assert ts.connected, "Error while connecting TouchSensor"

# Connect LargeMotors
rmotor = LargeMotor(OUTPUT_A)
assert rmotor.connected, "Error while connecting right motor"
lmotor = LargeMotor(OUTPUT_D)
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

This video shows this script running:
{% include /util/youtube-embed.html youtube_video_id="cDimWUEDwPU" %}
