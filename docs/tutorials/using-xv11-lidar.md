---
title: Using the XV11 LIDAR
subject: Hardware - Other
---

## Interfacing the LIDAR

XV11 LIDAR communicates using UART, 8N1 at 3.3V with baud rate 115200.

EV3 has all the required hardware to communicate with the LIDAR and ev3dev has the software.

<div class="alert alert-warning">
    <span class="glyphicon glyphicon-alert"></span>
    The instructions on this page apply to EV3.
	You can also get it working with Raspberry PI and BrickPI but BrickPI doesn't support other-uart mode for sensor port and dedicated Raspberry Pi UART GPIO pins are already taken by BrickPI.
	You have to figure out some other way to get the UART. USB to UART bridge could be one option. 
</div>

To interface the LIDAR one has to:

1. Solder the connector for LIDAR motor
2. Solder the connector for LIDAR data and power
3. Put the EV3 input port in other-uart mode
4. Spin the LIDAR motor CCW between 200 and 300 RPM
5. Read LIDAR data using UART 

For the details, follow video tutorial:

{% include youtube-embed.html youtube_video_id="G6uVg34VzHw" %}

See <http://xv11hacking.wikispaces.com/LIDAR+Sensor> for more information on LIDAR.

## Motor Connector

The part with resistors is optional. It allows EV3 to autodetect the motor but in ev3dev you can load the driver manually. 
If you decide not to solder the resistors you only have to make two connections (PWM0 and PWM1).

{% include screenshot.html source="/images/xv11-tutorial/lidar_motor_scheme.png" %}

## Data and Power Connector

{% include screenshot.html source="/images/xv11-tutorial/lidar_data_scheme.png" %}

## LIDAR Rotational Geometry

If you assume that XV11 LIDAR returns you the distance to the object you will have it *almost* right. To do it correctly take into account the rotational geometry of the LIDAR.

{% include screenshot.html source="/images/xv11-tutorial/lidar_rotational_geometry.png" %}

## Mechanical Integration

At some point you will want to install the LIDAR on the robot. You can make inexpensive stand compatible with LEGO from polycarbonate, acrylic plastic or even wood.
I choose polycarbonate. Make a plate 120 mm x 104 mm (this corresponds to 15 and 13 thick technic beams. I did it a bit too thick - 8 mm but if you connect it to your construction from only one side this doesn't matter.
Order same spacers (25 mm high for M3 screws are ok). Drill the holes for spacers and technic pins. My XV11 plate below was meant as first experiment but ended in the robot. A lot of technic pin holes are out of place but there were just enough made right to fix the plate to the robot.

Everything for just a few € or $. 

{% include screenshot.html source="/images/xv11-tutorial/mechanical_integration.JPG" %}