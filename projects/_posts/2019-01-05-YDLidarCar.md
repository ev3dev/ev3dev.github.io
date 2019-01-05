---
author: [ "oliver.schwaneberg@gmail.com" ] # your GitHub user name" ]

programming_language: "C++" # The programming language used in this project

youtube_video_id: NyMrNpszMj8
# thumbnail_override: "/images/projects/my-project/my-image.png" # If you don't have a YouTube video (or the video thumbnail isn't good) you can uncomment this line to set your own image for the project. 

#project_homepage_url: "http://example.com/my-super-cool-project" # Homepage for this project
source_code_url: "https://github.com/Schwaneberg/YDLidarCar"
#building_instructions_url: "http://example.com/building-instructions.pdf" # how to build the model out of LEGO (*not* how to build the source code)

excerpt: "This project demonstrates how to use an YDLidar X4 to control a car. Unlike the lidars by Neato, the YDLidar products are intended for teaching and research."
---

There is an awesome demonstration on how to use the [Neato X11 lidar](https://www.ev3dev.org/docs/tutorials/using-xv11-lidar/) with ev3dev by @bmegli.
However, the X11 lidar has some disadvantages:

* Electric and mechanical integration is relatively difficult
* The X11 is a deprecated vacuum robot and the availability of the part may go down soon

The YDLidar X4 is very similar in size, shape, performance and price, but it is intended for teaching and research projects.
The X4 comes with an adapter board to interface and supply it using a single USB port.
ev3dev directly supports this adapter as a virtual serial port.
The device is well documented and an [YDLidar SDK](https://github.com/yangfuyuan/sdk) is also available.
However, I had some performance issues with the original SDK running under ev3dev, as the brick was not able to process the data buffer as fast as it is filled.
Therefor, I created a modified version of the SDK and integrated it into an example project: YDLidarCar.


It is a EV3 based car with front steering and rear wheel drive.

![Image](https://github.com/Schwaneberg/YDLidarCar/blob/master/LDD-CAD/LidarCar.png)

The project basically contains two C++ classes: One to control the car and one to obtain data from an YDLidar X4.
A third class *CruiseControl* is provided as a proof of concept.
CruiseControl is not navigating anywhere, it just tries not to hit anything.

[![Demonstration of YDLidarCar with CruiseControl](https://img.youtube.com/vi/NyMrNpszMj8/0.jpg)](https://www.youtube.com/watch?v=NyMrNpszMj8)

The project is rather young and I didn't try to integrate [ev3dev-mapping](https://github.com/bmegli/ev3dev-mapping) yet.

You are welcome to send me your feedback and suggestions via e-mail.
