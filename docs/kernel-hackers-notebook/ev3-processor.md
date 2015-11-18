---
title: EV3 Processor
---

## Essentials

* Texas Instruments AM1808 ARM Microporcessor
* 32-bit
* ARM9
* All internal pullup/pulldown resistors are disabled

## Documentation

* [Official Website](http://www.ti.com/product/am1808)
* [AM1808 ARM® Microprocessor Datasheet (pdf)](http://www.ti.com/lit/ds/symlink/am1808.pdf)
* [AM1808 Technical Reference Manual (pdf)](http://www.ti.com/lit/ug/spruh82a/spruh82a.pdf)
- [AM1808 Pinmux Utility (pdf)](http://www.ti.com/lit/an/spraba2a/spraba2a.pdf)

## System Components

### Used by EV3

* 3 - [16550-Type UART Modules](../ev3-uart)
* 2 - [Serial Peripheral Interfaces (SPI)](../ev3-spi)
* 2 - [Multimedia Card (MMC)/Secure Digital (SD) Card Interfaces](../ev3-sd-card-reader) (using one)
* 2 - [Master/Slave I2C Interfaces](../ev3-i2c) (using one)
* [Programmable Real-Time Unit Subsystem (PRUSS)](../ev3-pru)
* [USB 1.1 Host Port (OHCI)](../ev3-usb-host-port)
* [USB 2.0 On-The-Go Port (OTG)](../ev3-usb-otg-port)
* [Real-Time Clock (RTC)](../ev3-rtc)
* 1 - [64-bit General-Purpose or Watchdog Timer](../ev3-timers)
* 2 - [Enhanced High-Resolution Pulse Width Modulators (eHRPWM)](../ev3-pwm)
* 3 - [32-bit Enhanced Capture Modules (ePCAP)](../ev3-pwm)

### Not used by EV3

* LCD Controller (EV3 uses an [external controller](../ev3-lcd))
* 1 - Host Port Interface (HPI)
* 1 - Multichannel Audio Serial Port (EV3 uses [PWM for sound](../ev3-pwm))
* 2 - Multichannel Buffered Serial Ports
* 10/100 Mbps Ethernet MAC (EMAC)
* Video Port Interface (VPIF)
* Universal Parallel Port (uPP)
* Serial ATA (SATA) Controller

### Not sure yet

* Enhanced Direct Memory Access Controller 3 (EDMA3)
* 3 - 64-bit General-Purpose Timers

## Pin Assignments

There are 400 pins on the chip. The pins are multiplexed so that each pin can perform multiple functions. This is how the EV3 uses each pin. See section 10.4.9 in the AM1808 technical reference manual to see where this came from.

This is based on the lms2012 code and hardware schematic revision J. Both are not 100% reliable representations of the mass produced hardware, so there could be inaccurate information here. You have been warned.

<table class="table table-striped table-bordered">
  <tr>
    <th colspan="2">MUX</th>
    <th>Function</th>
    <th>Schematic Cross-<br>reference</th>
    <th>Usage</th>
  </tr>
  <tr>
    <td rowspan="8">0</td>
    <td>28</td>
    <td>UART2&nbsp;CTS</td>
    <td>CTSMCU_RTSBT</td>
    <td>Bluetooth</td>
  </tr>
  <tr>
    <td>24</td>
    <td>UART2&nbsp;RTS</td>
    <td>RTSMCU_CTSBT</td>
    <td>Bluetooth</td>
  </tr>
  <tr>
    <td>20</td>
    <td>AHCLKX</td>
    <td>PRUCLK</td>
    <td>PRU clock for soft UARTs</td>
  </tr>
  <tr>
    <td>16</td>
    <td>AHCLKR</td>
    <td>PRUCLK</td>
    <td>PRU clock for soft UARTs</td>
  </tr>
  <tr>
    <td>12</td>
    <td>GPIO&nbsp;0-12</td>
    <td>DIGIC0</td>
    <td>Input Port 3 Pin 5 I/O</td>
  </tr>
  <tr>
    <td>8</td>
    <td>GPIO&nbsp;0-13</td>
    <td>DIGIB1</td>
    <td>Input Port 2 Pin 6 I/O / I2C Data</td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;0-14</td>
    <td>DIGIB0</td>
    <td>Input Port 2 Pin 5 I/O</td>
  </tr>
  <tr>
    <td>0</td>
    <td>GPIO&nbsp;0-15</td>
    <td>DIGIA1</td>
    <td>Input Port 1 Pin 6 I/O / I2C Data</td>
  </tr>
  <tr>
    <td rowspan="8">1</td>
    <td>28</td>
    <td>ECAP1&nbsp;APWM1</td>
    <td>MDPWM</td>
    <td>Output Port D Motor Driver</td>
  </tr>
  <tr>
    <td>24</td>
    <td>GPIO&nbsp;0-1</td>
    <td>DIGID0</td>
    <td>Input Port 4 Pin 5 I/O</td>
  </tr>
  <tr>
    <td>20</td>
    <td>GPIO&nbsp;0-2</td>
    <td>DIGIA0</td>
    <td>Input Port 1 Pin 5 I/O</td>
  </tr>
  <tr>
    <td>16</td>
    <td>GPIO&nbsp;0-3</td>
    <td>MBIN0</td>
    <td>Output Port B Pin 2</td>
  </tr>
  <tr>
    <td>12</td>
    <td>GPIO&nbsp;0-4</td>
    <td>DIRA</td>
    <td>Output Port A Pin 6 In</td>
  </tr>
  <tr>
    <td>8</td>
    <td>GPIO&nbsp;0-5</td>
    <td>BTCLKDIS</td>
    <td>Pull down bluetooth "slow clock" signal</td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;0-6</td>
    <td>ADCBATEN</td>
    <td>A/D Converter Battery Enable (switches battery voltage to ADC channel 4)</td>
  </tr>
  <tr>
    <td>0</td>
    <td>ECAP2&nbsp;APWM2</td>
    <td>BTSLOWCLK</td>
    <td>Bluetooth "slow" clock</td>
  </tr>
  <tr>
    <td rowspan="8">2</td>
    <td>28</td>
    <td>ECAP0&nbsp;APWM0</td>
    <td>MCPWM</td>
    <td>Output Port C Motor Driver</td>
  </tr>
  <tr>
    <td>24</td>
    <td>AXR1</td>
    <td>RXIND</td>
    <td>Input Port 4 Pin 6 UART RXD</td>
  </tr>
  <tr>
    <td>20</td>
    <td>AXR2</td>
    <td>RXINC</td>
    <td>Input Port 3 Pin 6 UART RXD</td>
  </tr>
  <tr>
    <td>16</td>
    <td>AXR3/<br>GPIO&nbsp;1-11</td>
    <td>TXIND</td>
    <td>Input Port 4 Pin 5 UART TXD / I2C Clock</td>
  </tr>
  <tr>
    <td>12</td>
    <td>AXR4/<br>GPIO&nbsp;1-12</td>
    <td>TXINC</td>
    <td>Input Port 3 Pin 5 UART TXD / I2C Clock</td>
  </tr>
  <tr>
    <td>8</td>
    <td>GPIO&nbsp;1-13</td>
    <td>BUT1</td>
    <td>Button 1 (Enter)</td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;1-14</td>
    <td>DIGIC1</td>
    <td>Input Port 3 Pin 6 I/O / I2C Data</td>
  </tr>
  <tr>
    <td>0</td>
    <td>GPIO&nbsp;1-15</td>
    <td>DIGID1</td>
    <td>Input Port 4 Pin 6 I/O / I2C Data</td>
  </tr>
  <tr>
    <td rowspan="8">3</td>
    <td>28</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>24</td>
    <td>SPI0&nbsp;CS</td>
    <td>ADCCS</td>
    <td>SPI chip select to analog/digital converter</td>
  </tr>
  <tr>
    <td>20</td>
    <td>UART0&nbsp;TXD/<br>GPIO&nbsp;8-3</td>
    <td>TXINB</td>
    <td>Input Port 2 Pin 5 UART TXD / I2C Clock</td>
  </tr>
  <tr>
    <td>16</td>
    <td>UART0&nbsp;RXD</td>
    <td>RXINB</td>
    <td>Input Port 2 Pin 6 UART RXD</td>
  </tr>
  <tr>
    <td>12</td>
    <td>SPI0&nbsp;SIMO</td>
    <td>ADCMOSI<br>FMOSI</td>
    <td>SPI data from analog/digital converter</td>
  </tr>
  <tr>
    <td>8</td>
    <td>SPI0&nbsp;SOMI</td>
    <td>ADCMISO<br>FMISO</td>
    <td>SPI data to analog/digital converter</td>
  </tr>
  <tr>
    <td>4</td>
    <td>EPWM0B</td>
    <td>SOUND_ARMA</td>
    <td>PWM to speaker amplifier</td>
  </tr>
  <tr>
    <td>0</td>
    <td>SPI0&nbsp;CLK</td>
    <td>SPI0_CLK</td>
    <td>SPI Clock to analog/digital converter</td>
  </tr>
  <tr>
    <td rowspan="8">4</td>
    <td>28</td>
    <td>UART1&nbsp;TXD/<br>GPIO&nbsp;1-0</td>
    <td>TXINA</td>
    <td>Input Port 1 Pin 5 UART TXD / I2C Clock</td>
  </tr>
  <tr>
    <td>24</td>
    <td>UART1&nbsp;RXD</td>
    <td>RXINA</td>
    <td>Input Port 1 Pin 5 UART RXD</td>
  </tr>
  <tr>
    <td>20</td>
    <td>UART2&nbsp;TXD</td>
    <td>TXMCU_RXBT</td>
    <td>Bluetooth</td>
  </tr>
  <tr>
    <td>16</td>
    <td>UART2&nbsp;RXD</td>
    <td>RXMCU_TXBT</td>
    <td>Bluetooth</td>
  </tr>
  <tr>
    <td>12</td>
    <td>I2C0&nbsp;SDA</td>
    <td>I2C0_SDA</td>
    <td>EEPROM I2C data</td>
  </tr>
  <tr>
    <td>8</td>
    <td>I2C0&nbsp;SCL</td>
    <td>I2C0_SCL</td>
    <td>EEPROM I2C clock</td>
  </tr>
  <tr>
    <td>4</td>
    <td>SPI0&nbsp;SCS0</td>
    <td>NPCS0</td>
    <td>Flash memory SPI chip select</td>
  </tr>
  <tr>
    <td>0</td>
    <td>?</td>
    <td>PRU_CLK</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="8">5</td>
    <td>28</td>
    <td>GPIO&nbsp;2-8</td>
    <td>DIRD</td>
    <td>Output Port D Pin 6 In</td>
  </tr>
  <tr>
    <td>24</td>
    <td>GPIO&nbsp;2-9</td>
    <td>DIRB</td>
    <td>Output Port B Pin 6 In</td>
  </tr>
  <tr>
    <td>20</td>
    <td>SPI1&nbsp;SIMO</td>
    <td>MOSIDIS</td>
    <td>LCD SPI data</td>
  </tr>
  <tr>
    <td>16</td>
    <td>GPIO&nbsp;2-11</td>
    <td>MISODIS</td>
    <td>LCD A0 display data/command selector</td>
  </tr>
  <tr>
    <td>12</td>
    <td>GPIO&nbsp;2-12</td>
    <td>CSDIS</td>
    <td>LCD chip select (active low)</td>
  </tr>
  <tr>
    <td>8</td>
    <td>SPI1&nbsp;CLK</td>
    <td>SCKDIS</td>
    <td>LCD SPI Clock</td>
  </tr>
  <tr>
    <td>4</td>
    <td>EPWM1B</td>
    <td>MAPWM</td>
    <td>Output Port A Motor Driver</td>
  </tr>
  <tr>
    <td>0</td>
    <td>EPWM1A</td>
    <td>MBPWM</td>
    <td>Output Port A Motor Driver</td>
  </tr>
  <tr>
    <td rowspan="8">6</td>
    <td>28</td>
    <td>GPIO&nbsp;2-0</td>
    <td>FHOLD</td>
    <td>Flash memory hold (active low)</td>
  </tr>
  <tr>
    <td>24</td>
    <td>GPIO&nbsp;2-1</td>
    <td>MBIN1</td>
    <td>Output Port B Pin 1</td>
  </tr>
  <tr>
    <td>20</td>
    <td>GPIO&nbsp;2-2</td>
    <td>LEGDETA</td>
    <td>Input Port 1 Pin 2 In</td>
  </tr>
  <tr>
    <td>16</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>12</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>8</td>
    <td>GPIO&nbsp;2-5</td>
    <td>DETB0</td>
    <td>Output Port B Pin 5 In</td>
  </tr>
  <tr>
    <td>4</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>0</td>
    <td>GPIO&nbsp;2-7</td>
    <td><i>N/C</i></td>
    <td>FIQ shadowing (*was TP4 on pre-release hardware)</td>
  </tr>
  <tr>
    <td rowspan="8">7</td>
    <td>28</td>
    <td>GPIO&nbsp;3-8</td>
    <td>DETC0</td>
    <td>Output Port C Pin 5 In</td>
  </tr>
  <tr>
    <td>24</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>20</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>16</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>12</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>8</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;3-14</td>
    <td>DIRC</td>
    <td>Output Port C Pin 6 In</td>
  </tr>
  <tr>
    <td>0</td>
    <td>GPIO&nbsp;3-15</td>
    <td>MAIN0</td>
    <td>Output Port A Pin 1</td>
  </tr>
  <tr>
    <td rowspan="8">8</td>
    <td>28</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>24</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>20</td>
    <td>GPIO&nbsp;3-2</td>
    <td>HWID2</td>
    <td>Hardware ID (not used)</td>
  </tr>
  <tr>
    <td>16</td>
    <td>GPIO&nbsp;3-3</td>
    <td>PIC_EN</td>
    <td>Bluetooth PIC enable</td>
  </tr>
  <tr>
    <td>12</td>
    <td>GPIO&nbsp;3-4</td>
    <td>HWID1</td>
    <td>Hardware ID (not used)</td>
  </tr>
  <tr>
    <td>8</td>
    <td>GPIO&nbsp;3-5</td>
    <td>HWID0</td>
    <td>Hardware ID (not used)</td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;3-6</td>
    <td>MAIN1</td>
    <td>Output Port A Pin 2</td>
  </tr>
  <tr>
    <td>0</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="8">9</td>
    <td>28</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>24</td>
    <td>GPIO&nbsp;4-9</td>
    <td>BTnSHUTD</td>
    <td>Bluetooth enable (active low)</td>
  </tr>
  <tr>
    <td>20</td>
    <td>GPIO&nbsp;4-10</td>
    <td>HWID3</td>
    <td>Hardware ID (not used) </td>
  </tr>
  <tr>
    <td>16</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>12</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>8</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;4-14</td>
    <td>PIC_RST</td>
    <td>Bluetooth PIC reset</td>
  </tr>
  <tr>
    <td>0</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="8">10</td>
    <td>28</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>24</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>20</td>
    <td>MMCSD0&nbsp;DAT3</td>
    <td>MCI0_DA3</td>
    <td>SD Card Reader</td>
  </tr>
  <tr>
    <td>16</td>
    <td>MMCSD0&nbsp;DAT2</td>
    <td>MCI0_DA2</td>
    <td>SD Card Reader</td>
  </tr>
  <tr>
    <td>12</td>
    <td>MMCSD0&nbsp;DAT1</td>
    <td>MCI0_DA1</td>
    <td>SD Card Reader</td>
  </tr>
  <tr>
    <td>8</td>
    <td>MMCSD0&nbsp;DAT0</td>
    <td>MCI0_DA0</td>
    <td>SD Card Reader</td>
  </tr>
  <tr>
    <td>4</td>
    <td>MMCSD0&nbsp;CMD</td>
    <td>MCI0_CDA</td>
    <td>SD Card Reader</td>
  </tr>
  <tr>
    <td>0</td>
    <td>MMCSD0&nbsp;CLK</td>
    <td>MCI0_CK</td>
    <td>SD Card Reader</td>
  </tr>
  <tr>
    <td rowspan="8">11</td>
    <td>28</td>
    <td>GPIO&nbsp;5-8</td>
    <td>INTB0</td>
    <td>Output Port B Pin 5 In</td>
  </tr>
  <tr>
    <td>24</td>
    <td>GPIO&nbsp;5-9</td>
    <td>MCIN1</td>
    <td>Output Port C Pin 2</td>
  </tr>
  <tr>
    <td>20</td>
    <td>GPIO&nbsp;5-10</td>
    <td>MDIN0</td>
    <td>Output Port D Pin 2</td>
  </tr>
  <tr>
    <td>16</td>
    <td>GPIO&nbsp;5-11</td>
    <td>INTA0</td>
    <td>Output Port A Pin 5 In</td>
  </tr>
  <tr>
    <td>12</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>8</td>
    <td>GPIO&nbsp;5-13</td>
    <td>INTC0</td>
    <td>Output Port C Pin 5 In</td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;5-14</td>
    <td>SD_SW</td>
    <td>SD card detect switch</td>
  </tr>
  <tr>
    <td>0</td>
    <td>GPIO&nbsp;5-15</td>
    <td>DETD0</td>
    <td>Output Port D Pin 5 In</td>
  </tr>
  <tr>
    <td rowspan="8">12</td>
    <td>28</td>
    <td>GPIO&nbsp;5-0</td>
    <td>RSTDIS</td>
    <td>LCD reset (active low)</td>
  </tr>
  <tr>
    <td>24</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>20</td>
    <td>GPIO&nbsp;5-2</td>
    <td>FWP</td>
    <td>Flash memory write protection (active low)</td>
  </tr>
  <tr>
    <td>16</td>
    <td>GPIO&nbsp;5-3</td>
    <td>MDIN1</td>
    <td>Output Port D Pin 1</td>
  </tr>
  <tr>
    <td>12</td>
    <td>GPIO&nbsp;5-4</td>
    <td>DETA0</td>
    <td>Output Port A Pin 1 In</td>
  </tr>
  <tr>
    <td>8</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>4</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>0</td>
    <td>GPIO&nbsp;5-7</td>
    <td>CTS_PIC</td>
    <td>Bluetooth CTS</td>
  </tr>
  <tr>
    <td rowspan="8">13</td>
    <td>28</td>
    <td>GPIO&nbsp;6-8</td>
    <td>MCIN0</td>
    <td>Output Port C Pin 1</td>
  </tr>
  <tr>
    <td>24</td>
    <td>GPIO&nbsp;6-9</td>
    <td>INTD0</td>
    <td>Output Port D Pin 5 In</td>
  </tr>
  <tr>
    <td>20</td>
    <td>GPIO&nbsp;6-10</td>
    <td>BUT5</td>
    <td>Button 5 (Back)</td>
  </tr>
  <tr>
    <td>16</td>
    <td>GPIO&nbsp;6-11</td>
    <td>5VPENON</td>
    <td>System 5V Power (used to turn off EV3)</td>
  </tr>
  <tr>
    <td>12</td>
    <td>GPIO&nbsp;6-12</td>
    <td>DIODE3</td>
    <td>LED 3 (right, red)</td>
  </tr>
  <tr>
    <td>8</td>
    <td>GPIO&nbsp;6-13</td>
    <td>DIODE0</td>
    <td>LED 0 (left, red)</td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;6-14</td>
    <td>DIODE2</td>
    <td>LED 2 (right, green)</td>
  </tr>
  <tr>
    <td>0</td>
    <td>GPIO&nbsp;6-15</td>
    <td>SOUNDEN</td>
    <td>Speaker amplifier enable</td>
  </tr>
  <tr>
    <td rowspan="8">14</td>
    <td>28</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>24</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>20</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>16</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>12</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>8</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;6-6</td>
    <td>BUT4</td>
    <td>Button 4 (left)</td>
  </tr>
  <tr>
    <td>0</td>
    <td>GPIO&nbsp;6-7</td>
    <td>DIODE1</td>
    <td>LED 1 (left, green)</td>
  </tr>
  <tr>
    <td rowspan="8">15</td>
    <td>28</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>24</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>20</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>16</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>12</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>8</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>4</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>0</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="8">16</td>
    <td>28</td>
    <td>GPIO&nbsp;7-10</td>
    <td>RXIND_EN<br>TXIND_EN</td>
    <td>Input Port 4 buffer enable (active low)</td>
  </tr>
  <tr>
    <td>24</td>
    <td>GPIO&nbsp;7-11</td>
    <td>LEGDETC</td>
    <td>Input Port 3 Pin 2 In</td>
  </tr>
  <tr>
    <td>20</td>
    <td>GPIO&nbsp;7-12</td>
    <td>BUT3</td>
    <td>Button 3 (right)</td>
  </tr>
  <tr>
    <td>16</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>12</td>
    <td>GPIO&nbsp;7-14</td>
    <td>BUT2</td>
    <td>Button 2 (down)</td>
  </tr>
  <tr>
    <td>8</td>
    <td>GPIO&nbsp;7-15</td>
    <td>BUT0</td>
    <td>Button 0 (up)</td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;6-5</td>
    <td>P_EN</td>
    <td>System power enable</td>
  </tr>
  </td>
    <td>0</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="8">17</td>
    <td>28</td>
    <td>BOOT2</td>
    <td>BOOT2</td>
    <td>Select boot device</td>
  </tr>
  <tr>
    <td>24</td>
    <td>BOOT3</td>
    <td>BOOT3</td>
    <td>Select boot device</td>
  </tr>
  <tr>
    <td>20</td>
    <td>BOOT4</td>
    <td>BOOT4</td>
    <td>Select boot device</td>
  </tr>
  <tr>
    <td>16</td>
    <td>BOOT5</td>
    <td>BOOT5</td>
    <td>Select boot device</td>
  </tr>
  <tr>
    <td>12</td>
    <td>BOOT6</td>
    <td>BOOT6</td>
    <td>Select boot device</td>
  </tr>
  <tr>
    <td>8</td>
    <td>BOOT7</td>
    <td>BOOT7</td>
    <td>Select boot device</td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;7-8</td>
    <td>LEGDETD</td>
    <td>Input Port 4 Pin 2 In</td>
  </tr>
  <tr>
    <td>0</td>
    <td>GPIO&nbsp;7-9</td>
    <td>RXINC_EN<br>TXINC_EN</td>
    <td>Input Port 3 buffer enable (active low)</td>
  </tr>
  <tr>
    <td rowspan="8">18</td>
    <td>28</td>
    <td>GPIO&nbsp;8-10</td>
    <td>I_ONA</td>
    <td>Input Port 1 Pin 1 Out</td>
  </tr>
  <tr>
    <td>24</td>
    <td>GPIO&nbsp;8-11</td>
    <td>RXINA_EN<br>TXINA_EN</td>
    <td>Input Port 1 buffer enable (active low)</td>
  </tr>
  <tr>
    <td>20</td>
    <td>GPIO&nbsp;8-12</td>
    <td>I_ONB</td>
    <td>Input Port 2 Pin 1 Out</td>
  </tr>
  <tr>
    <td>16</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>12</td>
    <td>GPIO&nbsp;8-14</td>
    <td>RXINB_EN<br>TXINB_EN</td>
    <td>Input Port 2 buffer enable (active low)</td>
  </tr>
  <tr>
    <td>8</td>
    <td>GPIO&nbsp;8-15</td>
    <td>LEGDETB</td>
    <td>Input Port 2 Pin 2 In</td>
  </tr>
  <tr>
    <td>4</td>
    <td>BOOT0</td>
    <td>BOOT0</td>
    <td>Select boot device</td>
  </tr>
  <tr>
    <td>0</td>
    <td>BOOT1</td>
    <td>BOOT1</td>
    <td>Select boot device</td>
  </tr>
  <tr>
    <td rowspan="8">19</td>
    <td>28</td>
    <td>RTCK</td>
    <td>RTCK1</td>
    <td>Realtime clock output</td>
  </tr>
  <tr>
    <td>24</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>20</td>
    <td></td>
    <td><i>N/C</i></td>
    <td></td>
  </tr>
  <tr>
    <td>16</td>
    <td>GPIO&nbsp;6-2</td>
    <td>ADCACK</td>
    <td>Analog/Digital converter GPIO0</td>
  </tr>
  <tr>
    <td>12</td>
    <td>GPIO&nbsp;6-3</td>
    <td>OC5V</td>
    <td>USB1 overcurrent</td>
  </tr>
  <tr>
    <td>8</td>
    <td>GPIO&nbsp;6-4</td>
    <td>I_OND</td>
    <td>Input Port 4 Pin 1 Out</td>
  </tr>
  <tr>
    <td>4</td>
    <td>GPIO&nbsp;8-8</td>
    <td>SW_RECHARGE</td>
    <td>Rechargeable battery indicator</td>
  </tr>
  <tr>
    <td>0</td>
    <td>GPIO&nbsp;8-9</td>
    <td>I_ONC</td>
    <td>Input Port 3 Pin 1 Out</td>
  </tr>
</table>
