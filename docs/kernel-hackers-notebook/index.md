---
title: The Kernel Hacker's Notebook
---

* Table of Contents
{:toc}

This is a technical reference about the things we have learned from working on
the ev3dev kernel. It is mostly information about the hardware and device drivers.

# EV3 Programmable Brick

## Hardware

### EV3 Intelligent Brick

* Processor/System on Chip(SoC): [Texas Instruments AM1808](ev3-processor)
    * [16550 UART](ev3-uart)
    * [Serial Peripheral Interface (SPI)](ev3-spi)
    * [Multimedia/Secure Digital Card Interface (MMC/SD)](ev3-sd-card-reader)
    * [Master/Slave I2C Interfaces](ev3-i2c)
    * [Programmable Realtime Unit (PRU)](ev3-pru)
    * [USB 1.1 Host Port (OHCI)](ev3-usb-host-port)
    * [USB 2.0 On-The-Go Port (OTG)](ev3-usb-otg-port)
    * [Real-Time Clock (RTC)](ev3-rtc)
    * [Pulse Width Modulators (PWM)](ev3-pwm)
* EEPROM: [Microchip 24FC128](ev3-eeprom)
* Display: [178x128 monochrome LCD](ev3-lcd)
    * [Sitronix ST7586 Controller/Driver](ev3-lcd)
* Analog/Digital Converter: [Texas Instruments ADS7957](ev3-adc)
* Motor Driver: [Sanyo/ON Semiconductor LB1836M](ev3-motor-driver)
* Bluetooth: [Panasonic PAN1325A-HCI-85](ev3-bluetooth)
    * [Texas Instruments CC2560A](ev3-bluetooth)
* Other:
    * [Buttons](ev3-buttons)
    * [LEDs](ev3-leds)
    * [Speaker](ev3-sound)

### Sensors (Input Devices)

* [Sensor Driver Model](ev3-sensor-driver-model)
* [List of Sensors](list-of-sensors)

### Motors (Output Devices)

* [Motor Driver Model](ev3-motor-driver-model)
* [List of Motors](list-of-motors)


## Software

### Operating System

* [Kernel v3.16](ev3dev-linux-kernel)
* [Debian 8 Jessie](ev3dev-debian-distro)

### Applications

* [fbcat (screen capture)](fbcat)
