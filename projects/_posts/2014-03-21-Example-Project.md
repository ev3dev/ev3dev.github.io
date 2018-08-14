---
# Fill out as many of these as you can, and delete the rest.
# Text on a line after a "#" is a comment and is ignored for the published page.

author: [ "@peprolinbot" ] # your GitHub user name
# or make a list if there is more than one author
# author: [ "@person1", "@person2", "person without GitHub account" ]

programming_language: "Python" # The programming language used in this project

youtube_video_id: # The video ID of the YouTube video to be displayed with this post
thumbnail_override: "/images/projects/my-project/my-image.png" # If you don't have a YouTube video (or the video thumbnail isn't good) you can uncomment this line to set your own image for the project. 

project_homepage_url: "https://github.com/peprolinbot/EV3D4-ssh_control" # Homepage for this project
source_code_url: "https://github.com/peprolinbot/EV3D4-ssh_control" # Provide a link to your code
building_instructions_url: "https://www.lego.com/r/www/r/mindstorms/-/media/franchises/mindstorms%202014/downloads/bi/ev3d4.pdf?l.r2=1665046395" # how to build the model out of LEGO (*not* how to build the source code)

excerpt: "This is a Lego EV3 R2D2 copy(EV3D4) remote controll via ssh." # A short summary of your project. This can be a sentence or a paragraph, but it's recommended to keep it under 3 sentences.
---

## Build

First you nedd to build the EV3D4, or other, but the project is based on that model that is on the [EV3's webpage](https://www.lego.com/es-es/mindstorms/build-a-robot/ev3d4)

## Installl

**ev3dev**

For run this python program you will need [ev3dev](https://www.ev3dev.org)(a custom **dual-boot** firmware for your EV3) and a Wifi USB Dongle. Go [here](https://www.ev3dev.org/docs/getting-started/) to install.

**Install and run program**

Then of build your robot and install ev3dev, you need to install the program:

 1. First connect via ssh to your robot, here is a [tutorial](https://www.ev3dev.org/docs/tutorials/connecting-to-ev3dev-with-ssh/)
 2. Then, clone the repository: `git clone https://github.com/peprolinbot/EV3D4-ssh_control`
 3. Go into the directory you recently downloaded:`cd EV3D4-ssh_control`
 4. Run the script, `pyhton3 conbot.py`,and wait for it says *"LOG"*
 
 Here you have the function of all the keys(this list is thinked for view from back or from a camera, like a mobile phone):

|KEY|FUNCTION|
|--|--|
|w|Go forward|
|s|Go back|
| a|  Turn left|
|d|  Turn right|
| g | Move head to left |
| h | Move head to right |
|Space bar|Stop all motors|
|m|Play StarWars imperial march|
|q|Quit the program|

 5. For run the next time repeat the steps 1,3, and 4

- **My name is:** Pedro Rey Anca
- **Feedback:** https://github.com/peprolinbot/EV3D4-ssh_control/issues
