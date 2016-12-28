---
# Fill out as many of these as you can, and delete the rest.
author: [ "@BertLindeman" ] # The person(s) who created this project. 
# Any author that starts with "@" will pull information from github.
programming_language: "Bourne shell script" # The programming language used in this project

#youtube_video_id: rrNaLfE9PWA # The video ID of the YouTube video to be displayed with this post

#project_homepage_url: "none yet" # Homepage for this project
source_code_url: "https://github.com/BertLindeman/bert-ev3dev-examples" # Provide a link to your code
#building_instructions_url: "none"
excerpt: "Helpful Bash scripts that test and demonstrate cool ev3dev functionality."
---

### Examples of bits and pieces running at Jessie level 

These shell-scripts are located on my EV3-brick at `/usr/local/bin`
but with some simple edits you can place them where **you** want them.

 1. Supporting script(s) used by other scripts
    * [asciicolor](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/asciicolors) Creates some variables to ease using ANSI colors in shell script. E.G. red blue etc. 
    * [bert_ev3dev_functions](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/bert_ev3dev_functions) Replaces asciicolor and adds some common functions.

 2. Scripts related to managing the EV3-brick
    * [checkpower](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/checkpower) 
    Add this script to a crontab to check for the battery voltage. On lower power the EV3-led on the left will blink green on lower voltage, then amber and eventually red (with one beep). Uses [blinkvoltage](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/blinkvoltage)
    * [showactivity](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showactivity) Makes the right green led blink on I/O activity.
    * [stopmotors](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/stopmotors) Well, stops all motors.

 3. Scripts discovering sensors and / or motors
    * [blinkleds](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/blinkleds) Simply blink the EV3 leds a few times. 
    * [setled](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/setled) Script to set an EV3-led **red** / **green** / **amber** **ON** or **OFF** and set a trigger for it. Do not confuse with the **setleds** program to set keyboard leds.
    * [showleds](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showleds) Provides a very small display of the status of the EV3-leds.
    * [showmotor](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showmotor) Finds the tacho-motor number for attached motors. Displays many fields related to the motor(s). Tested with EV3 (large and mini) and NXT motor. 
    * [showpower](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showpower) Shows various fields related to the EV3-power. 
    * [showsensors](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showsensors) Show data about connected sensors. Only *regular* sensors that are recognized are reported, I assume I2C sensors are not yet supported by the script.
    * [showsound](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showsound) Shows a little info from the snd-legoev3 driver. (Not to be confused with the sound-sensor!)
    * [testmotor](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/testmotor) Test one motor. Too simple script, only uses a fixed suffix on ```/sys/class/tacho-motor/tacho-motor``` The kernel takes the *next* number if a motor is plugged in. Algorithm in [showmotor](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showmotor) is connecting motor port to tacho-motor suffix. You can call testmotor with one parameter: the number of the motor. E.g. ```testmotor 3```
    


### Have your EV3 report the IP-addresses by speach after boot 
**Starting at ev3dev image ev3dev-jessie-2014-10-07**

For this an update is needed to `/etc/rc.local`

Add the next lines near the bottom of `/etc/rc.local`
But **before** the `exit 0`

```
if [ -e /media/mmc_p1/tellIP ]; then
echo "Executing /media/mmc_p1/tellIP"
. /media/mmc_p1/tellIP
fi
```

and place the script [`tellIP`](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/tellIP)
in the directory: `/media/mmc_p1/`

**OLDER ev3dev images (ev3dev-jessie-2014-10-07-12 and before)**

For this an update is needed to `/media/mmc_p1/ev3dev.rc.local`

Add the next lines to the bottom of `/media/mmc_p1/ev3dev.rc.local`

```
if [ -e /media/mmc_p1/tellIP ]; then
echo "Executing /media/mmc_p1/tellIP"
. /media/mmc_p1/tellIP
fi
```

and place the script [`tellIP`](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/tellIP)
in the same directory: `/media/mmc_p1/`
