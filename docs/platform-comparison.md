---
title: Platform Comparison
---

This table provides a detailed comparison of all of the ev3dev-supported
platforms and their features.

<div class="table-responsive">
    <table class="table table-striped table-bordered table-left-header">
        <tbody>
            <tr>
                <th colspan="2">Manufacturer</th>
                <td>LEGO</td>
                <td colspan="2">Dexter Industries</td>
                <td>mindsensors.com</td>
                <td>FatcatLab</td>
                <td>Quest Institute</td>
            </tr>
            <tr>
                <th colspan="2">Website</th>
                <td><a href="http://mindstorms.lego.com" target="_blank">mindstorms.lego.com</a></td>
                <td colspan="2"><a href="http://www.dexterindustries.com/BrickPi" target="_blank">dexterindustries.com</a></td>
                <td><a href="http://www.mindsensors.com/content/78-pistorms-lego-interface" target="_blank">mindsensors.com</a></td>
                <td><a href="http://fatcatlab.com/product/evb/" target="_blank">fatcatlab.com</a></td>
                <td><a href="http://questforspace.com/" target="_blank">questforspace.com</a></td>
            </tr>
            <tr>
                <th colspan="2">Model Name</th>
                <td>EV3</td>
                <td>BrickPi</td>
                <td>BrickPi+</td>
                <td>PiStorms</td>
                <td>EVB</td>
                <td>QuestCape</td>
            </tr>
            <tr>
                <th colspan="2">Model Number(s)</th>
                <td>31313 (Retail set)<br>45544 (Education Core set)<br>45500 (EV3 Intelligent Brick)</td>
                <td>BrickPi v1.7.3<span markdown="1">[^brickpi-1-version]</span></td>
                <td>BrickPi v2.8</td>
                <td>PiStorms<br>PiStorms-v2</td>
                <td>EVB v1.0</td>
                <td>QuestCape v1.4</td>
            </tr>
            <tr>
                <th colspan="2">Compatible CPU Board</th>
                <td>N/A</td>
                <td colspan="3">Raspberry Pi Zero<br>Raspberry Pi Model A/A+/B/B+<br>Raspberry Pi 2 Model B<br>Raspberry Pi 3 Model B</td>
                <td colspan="2">BeagleBone (White)<br>BeagleBone Black<br>BeagleBone Green<span markdown="1">[^beaglebone-green]</span><sup>,</sup><span markdown="1">[^beaglebone-green-wireless]</span></td>
            </tr>
            <tr>
                <th rowspan="5">Display</th>
                <th>Resolution</th>
                <td>178x128 pixels<span markdown="1">[^ev3-color-display]</span></td>
                <td colspan="2" rowspan="5">N/A<span markdown="1">[^brickpi-display]</span></td>
                <td>320x240 pixels</td>
                <td>220x176 pixels</td>
                <td>220x176 pixels</td>
            </tr>
            <tr>
                <th>Color Depth</th>
                <td>1 bpp</td>
                <td>16 bpp</td>
                <td>16 bpp</td>
                <td>16 bpp</td>
            </tr>
            <tr>
                <th>Backlight</th>
                <td>No</td>
                <td>Yes, always on</td>
                <td>Yes, always on</td>
                <td>Yes, adjustable</td>
            </tr>
            <tr>
                <th>Touchscreen</th>
                <td>No</td>
                <td>Yes</td>
                <td>No</td>
                <td>No</td>
            </tr>
            <tr>
                <th>fbdev</th>
                <td><code>/dev/fb0</code></td>
                <td><code>/dev/fb1</code></td>
                <td><code>/dev/fb0</code></td>
                <td><code>/dev/fb0</code></td>
            </tr>
            <tr>
                <th rowspan="7">Buttons</th>
                <th>Count</th>
                <td>6</td>
                <td colspan="2">0</td>
                <td>1</td>
                <td>6<span markdown="1">[^evb-buttons]</span></td>
                <td>6<span markdown="1">[^evb-buttons]</span></td>
            </tr>
            <tr>
                <th>Enter</th>
                <td>Yes</td>
                <td colspan="2">No</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
            </tr>
            <tr>
                <th>Up</th>
                <td>Yes</td>
                <td colspan="2">No</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
            </tr>
            <tr>
                <th>Down</th>
                <td>Yes</td>
                <td colspan="2">No</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
            </tr>
            <tr>
                <th>Left</th>
                <td>Yes</td>
                <td colspan="2">No</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
            </tr>
            <tr>
                <th>Right</th>
                <td>Yes</td>
                <td colspan="2">No</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
            </tr>
            <tr>
                <th>Back (Backspace)</th>
                <td>Yes</td>
                <td colspan="2">No</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
            </tr>
            <tr>
                <th colspan="2">LEDs</th>
                <td>2 - Red/Green</td>
                <td colspan="2">2 - Blue</td>
                <td>2 - Red/Green/Blue</td>
                <td>None</td>
                <td>None</td>
            </tr>
            <tr>
                <th colspan="2">Speaker</th>
                <td>Yes</td>
                <td colspan="2">No<span markdown="1">[^raspberry-pi-sound]</span></td>
                <td>No<span markdown="1">[^raspberry-pi-sound]</span></td>
                <td>Yes</td>
                <td>No</td>
            </tr>
            <tr>
                <th rowspan="5">Input Ports</th>
                <th>Count</th>
                <td>4</td>
                <td>4 + 1 I2C only</td>
                <td>4</td>
                <td>4</td>
                <td>4</td>
                <td>4</td>
            </tr>
            <tr>
                <th>Automatic Detection</th>
                <td>Yes</td>
                <td colspan="2">No</td>
                <td>No</td>
                <td>Yes<span markdown="1">[^evb-sensors]</span></td>
                <td>Yes</td>
            </tr>
            <tr>
                <th>EV3 Sensors</th>
                <td>Yes</td>
                <td colspan="2">Yes<span markdown="1">[^brickpi-ev3-sensors]</span></td>
                <td>Yes<span markdown="1">[^pistorms-ev3-sensors]</span></td>
                <td>Yes</td>
                <td>Yes</td>
            </tr>
            <tr>
                <th>NXT Sensors</th>
                <td>Yes</td>
                <td colspan="2">Yes<span markdown="1">[^brickpi-nxt-sensors]</span></td>
                <td>Yes<span markdown="1">[^pistorms-nxt-sensors]</span></td>
                <td>Yes</td>
                <td>Yes</td>
            </tr>
            <tr>
                <th>Port Addresses</th>
                <td><code>in1</code><br><code>in2</code><br><code>in3</code><br><code>in4</code></td>
                <td colspan="2"><code>ttyAMA0:S1</code><br><code>ttyAMA0:S2</code><br><code>ttyAMA0:S3</code><br><code>ttyAMA0:S4</code></td>
                <td><code>pistorms:BAS1</code><br><code>pistorms:BAS2</code><br><code>pistorms:BBS1</code><br><code>pistorms:BBS2</code></td>
                <td colspan="2"><code>evb:in1</code><br><code>evb:in2</code><br><code>evb:in3</code><br><code>evb:in4</code></td>
            </tr>
            <tr>
                <th rowspan="3">Output Ports</th>
                <th>Count</th>
                <td>4</td>
                <td colspan="2">4</td>
                <td>4</td>
                <td>4</td>
                <td>4</td>
            </tr>
            <tr>
                <th>Automatic Detection</th>
                <td>Yes</td>
                <td colspan="2">No</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
            </tr>
            <tr>
                <th>Port Addresses</th>
                <td><code>outA</code><br><code>outB</code><br><code>outC</code><br><code>outD</code></td>
                <td colspan="2"><code>ttyAMA0:M1</code><br><code>ttyAMA0:M2</code><br><code>ttyAMA0:M3</code><br><code>ttyAMA0:M4</code></td>
                <td><code>pistorms:BAM1</code><br><code>pistorms:BAM2</code><br><code>pistorms:BBM1</code><br><code>pistorms:BBM2</code></td>
                <td colspan="2"><code>evb:outA</code><br><code>evb:outB</code><br><code>evb:outC</code><br><code>evb:outD</code></td>
            </tr>
            <tr>
                <th rowspan="2">Battery Indication</th>
                <th>Voltage</th>
                <td>Yes</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>No</td>
            </tr>
            <tr>
                <th>Current</th>
                <td>Yes</td>
                <td colspan="2">No</td>
                <td>No</td>
                <td>Yes</td>
                <td>No</td>
            </tr>
        </tbody>
    </table>
</div>


[^brickpi-1-version]: The version number is not actually printed on the BrickPi
    circuit board.

[^beaglebone-green]: The Grove sensor ports are not usable with EVB or QuestCape
    because of shared pins.

[^beaglebone-green-wireless]: BeagleBone Green Wireless is not supported because
    of I/O pin conflicts.

[^ev3-color-display]: It is possible to replace the display in the EV3.
    [Video.](https://youtu.be/gPNJC5Uz9HY) The color screen is 160x128 pixels,
    16 bpp, with adjustable backlight.

[^brickpi-display]: It is possible to stack a display on top of BrickPi.
    [Blog.](http://lechnology.com/2016/05/adding-a-display-to-brickpi)

[^evb-buttons]: EVB and QuestCape cannot detect simultaneous button presses.

[^raspberry-pi-sound]: The headphone jack on Raspberry Pi can be used for sound.

[^evb-sensors]: The EVB cannot automatically detect some NXT sensors. NXT sensors
    can still be used, but the input port must be manually configured for them.

[^brickpi-ev3-sensors]: BrickPi only supports the LEGO EV3 sensors (Color,
    Infrared, Ultrasonic, Gyro, Touch). [The UART sensor implementation is buggy
    in the BrickPi firmware.](https://github.com/DexterInd/BrickPi/issues/24)

[^pistorms-ev3-sensors]: PiStorms only supports the LEGO EV3 sensors (Color,
    Infrared, Ultrasonic, Gyro, Touch).

[^brickpi-nxt-sensors]: BrickPi has limited I2C sensor support. Most sensors
    do work, but there may be some limitations.

[^pistorms-nxt-sensors]: PiStorms shares the I2C communication bus with all four
    input ports, so each sensor must have a different I2C address.
