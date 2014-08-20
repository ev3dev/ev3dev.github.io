---
# Fill out as many of these as you can, and delete the rest.
author: [ "@BertLindeman" ] # The person(s) who created this project. 
# Any author that starts with "@" will pull information from github.
programming_language: "Bourne shell script" # The programming language used in this project

#youtube_video_id: rrNaLfE9PWA # The video ID of the YouTube video to be displayed with this post

#project_homepage_url: "none yet" # Homepage for this project
source_code_url: "https://github.com/BertLindeman/bert-ev3dev-examples" # Provide a link to your code
#building_instructions_url: "none"
---

### Examples of bits and pieces running at Jessie level 

These shell-scripts are located on my EV3-brick at `/usr/local/bin`
but with some simple edits you can place them where **you** want them.

 1. Supporting script(s) used by other scripts
    * [asciicolor](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/asciicolors)

 2. Scripts related to managing the EV3-brick
    * [checkpower](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/checkpower)
    * [showactivity](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showactivity)
    * [stopmotors](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/stopmotors)

 3. Scripts discovering sensors and / or motors
    * [blinkleds](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/blinkleds)
    * [setled](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/setled)
    * [showleds](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showleds)
    * [showmotor](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showmotor)
    * [showpower](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showpower)
    * [showsensors](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showsensors)
    * [showsound](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/showsound)
    * [testmotor](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/testmotor)

### Have your EV3 report it's IP-address by speach after boot
For this an update is needed to 
[`/media/mmc_p1/ev3dev.rc.local`](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/rc.local)

Add the next lines to the bottom of `/media/mmc_p1/ev3dev.rc.local`

```
#
# use speach to tell the available network IP addresses
#
if [ -e /media/mmc_p1/tellIP ]; then
echo "Executing /media/mmc_p1/tellIP"
. /media/mmc_p1/tellIP
fi
```


and an extra script [`tellIP`](https://github.com/BertLindeman/bert-ev3dev-examples/blob/master/tellIP)
in the same directory
