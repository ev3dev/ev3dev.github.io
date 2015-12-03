---
title: Using the XV11 LIDAR
subject: Hardware - UART
---

* Table of Contents
{:toc}

## Interfacing the LIDAR

XV11 LIDAR communicates using UART, 8N1 at 3.3V with baud rate 115200.

EV3 has all the required hardware to communicate with the LIDAR and ev3dev has the software.

To interface the LIDAR one has to:

1. Solder the connector for LIDAR motor
2. Solder the connector for LIDAR data and power
3. Put the EV3 input port in other-uart mode
4. Spin the LIDAR motor CCW between 200 and 300 RPM
5. Read LIDAR data from UART 

See <http://www.youtube.com/watch?v=G6uVg34VzHw> for video tutorial.

See <http://xv11hacking.wikispaces.com/LIDAR+Sensor> for more information on LIDAR.



