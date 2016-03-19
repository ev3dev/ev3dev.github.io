---
title: Using the XV11 LIDAR
subject: Hardware - Other
---

## Interfacing the LIDAR

XV11 LIDAR communicates using UART, 8N1 at 3.3V with baud rate 115200.

EV3 has all the required hardware to communicate with the LIDAR and ev3dev has the software.


{% include icon.html type="warning" %}
The instructions on this page apply to EV3.
You can also get it working with Raspberry PI and BrickPI but BrickPI doesn't support
other-uart mode for sensor port and dedicated Raspberry Pi UART GPIO pins are already taken by BrickPI.
You have to figure out some other way to get the UART. USB to UART bridge could be one option.
{: .alert .alert-warning}

To interface the LIDAR one has to:

1. Solder the connector for LIDAR motor
2. Solder the connector for LIDAR data and power
3. Put the EV3 input port in other-uart mode
4. Spin the LIDAR motor CCW with speed around 300 RPM
5. Read LIDAR data using UART 

For the details, follow video tutorial:

{% include youtube-embed.html youtube_video_id="G6uVg34VzHw" %}

## Motor Connector

The part with resistors is optional. It allows EV3 to autodetect the motor but in ev3dev you can load the driver manually. 
If you decide not to solder the resistors you only have to make two connections (PWM0-PWR and PWM1-Ground).

{% include screenshot.html source="/images/xv11-tutorial/lidar_motor_scheme.png" %}

In both cases (w/o resistors) you are limited to unregulated motor control.
	
## Data and Power Connector

{% include screenshot.html source="/images/xv11-tutorial/lidar_data_scheme.png" %}

## Sensor Port Mode

I am assuming your data connector is connected to `port 1` (adjust commands otherwise).

You will have to put the sensor port in `other-uart` mode:

    echo other-uart > /sys/class/lego-port/port0/mode
	
You can read and write to or from LIDAR at:

    /dev/tty_in1
	
It is binary tty communication. More information in `Testing the LIDAR` section.
	
## Motor Port Mode
	
I am assuming your motor connector is connected to `port A` and it is the only motor.	

With auto-detection (resistors) your motor interface is available at:

    /sys/class/tacho-motor/motor0
	
If you decided to not solder the resistors in motor connector, you have to put the motor port in `dc-motor` mode:

    echo dc-motor > /sys/class/lego-port/port4/mode
	
Then your motor interface will be available at:

    /sys/class/dc-motor/motor0
	
In both cases (w/o resistors) you are limited to unregulated motor control.	
   
## LIDAR Rotational Geometry

If you assume that XV11 LIDAR returns you the distance to the object you will have it *almost* right. To do it correctly take into account the rotational geometry of the LIDAR.

{% include screenshot.html source="/images/xv11-tutorial/lidar_rotational_geometry.png" %}

You may ignore the above and the reported distance will still be approximately correct. 
You will introduce systematic error, dependent on angle, bounded by 25 mm on x and y.
Regardless, the LIDAR has also random error with variance dependent on distance, surface and reflection angle.

## Testing the LIDAR

You can use [xv11test] from the github repository to:

- test the LIDAR
- plot the LIDAR scan 
- get idea how to communicate with the LIDAR
- get idea how to interpret the LIDAR output and apply geometric correction
- use `xv11lidar.h` and `xv11lidar.c` as a simple C library to communicate with the LIDAR
- run `xv11test` with `-raw` argument and pipe LIDAR data to your program (C, C# and Java examples)

Go to repository and follow readme.md instructions.

## Mechanical Integration

At some point you will want to install the LIDAR on the robot. You can make inexpensive stand compatible with LEGO from polycarbonate, acrylic plastic or even wood.
I choose polycarbonate. Make a plate 120 mm x 104 mm (this corresponds to 15 and 13 thick technic beams). I did it a bit too thick - 8 mm but if you connect it to your construction from only one side this doesn't matter.
Order same spacers (25 mm high for M3 screws are ok). Drill the holes for spacers and technic pins. My XV11 LIDAR plate below was meant as first experiment but ended right in the robot. A lot of technic pin holes are out of place but there were just enough made right to fix the plate to the robot.

Everything for just a few € or $.

{% include screenshot.html source="/images/xv11-tutorial/mechanical_integration.JPG" %}

## References

[xv11hacking] - for more information on LIDAR integration

[Revo LDS Whitepaper] - for an article describing Revo LDS, written by the engineers from Neato Robotics. XV11 LIDAR is not exactly Revo LDS but they share a lot of design

[xv11test]: https://github.com/bmegli/ev3dev-mapping
[xv11hacking]: http://xv11hacking.wikispaces.com/LIDAR+Sensor
[Revo LDS Whitepaper]: http://www.robotshop.com/media/files/PDF/revolds-whitepaper.pdf
