---
title: ev3dev Kernel Hackers Notebook
index: wiki
---

This is a technical reference about the things we have learned from working ev3dev kernel. It is mostly information about the hardware and device drivers.

# EV3 Programmable Brick
## Hardware
* Processor/System on Chip(SoC): [Texas Instruments AM1808](EV3 Processor)
    * [16550 UART](EV3 UART)
    * [Serial Peripheral Interface (SPI)](EV3 SPI)
    * [Multimedia/Secure Digital Card Interface (MMC/SD)](EV3 SD Card Reader)
    * [Master/Slave I2C Interfaces](EV3 I2C)
    * [Programmable Realtime Unit (PRU)](EV3 PRU)
    * [USB 1.1 Host Port (OHCI)](EV3 USB Host Port)
    * [USB 2.0 On-The-Go Port (OTG)](EV3 PC USB Port)
    * [Real-Time Clock (RTC)](EV3 RTC)
    * [Pulse Width Modulators (PWM)](EV3 PWM)
* EEPROM: [Microchip 24FC128](EV3 EEPROM)
* Display: [178x128 monochrome LCD](EV3 LCD)
    * [Sitronix ST7586 Controller/Driver](EV3 LCD)
* Analog/Digital Converter: [Texas Instruments ADS7957](EV3 A|D Converter)
* Motor Driver: [Sanyo/ON Semiconductor LB1836M](EV3 Motor Driver)
* Bluetooth: [Panasonic PAN1325A-HCI-85](EV3 Bluetooth)
    * [Texas Instruments CC2560A](EV3 Bluetooth)
* Other:
    * [Buttons](EV3 Buttons)
    * [LEDs](EV3 LEDs)
    * [Speaker](EV3 Sound)

## Software
### Operating System
* [Linux-Davinci Kernel 3.3](ev3dev Linux Kernel)
* [Debian 7 Wheezy](ev3dev Debian Distro)

### Applications
* [fbcat (screen capture)](fbcat)

# Sensors (Input Devices)
* [Sensor Driver Model](EV3 Sensor Driver Model)
* [List of Sensors](List of Sensors)

# Motors (Output Devices)
* [Motor Driver Model](EV3 Motor Driver Model)
* [List of Motors](List of Motors)
