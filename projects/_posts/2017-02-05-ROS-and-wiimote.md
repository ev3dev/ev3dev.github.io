---
# Fill out as many of these as you can, and delete the rest.
# Text on a line after a "#" is a comment and is ignored for the published page.

author: [ "@osmado" ] # your GitHub user name
# or make a list if there is more than one author
# author: [ "@person1", "@person2", "person without GitHub account" ]

programming_language: "C++" # The programming language used in this project

youtube_video_id: hYIwFs74DBc # The video ID of the YouTube video to be displayed with this post
# thumbnail_override: "/images/projects/my-project/my-image.png" # If you don't have a YouTube video (or the video thumbnail isn't good) you can uncomment this line to set your own image for the project. 

project_homepage_url: "https://github.com/osmado/ev3_wiimote" # Homepage for this project
source_code_url: "https://github.com/osmado/ev3_wiimote" # Provide a link to your code
# building_instructions_url: "http://example.com/building-instructions.pdf" # how to build the model out of LEGO (*not* how to build the source code)

excerpt: "A wiimote controlled robot using ROS and ev3dev." # A short summary of your project. This can be a sentence or a paragraph, but it's recommended to keep it under 3 sentences.
---
Overview
--------

This project has two diffent parts:
- ev3dev_ros_distribution
- ev3_wiimote

ev3dev_ros_distribution
-----------------------

Create a Robot Operating System (ROS) Jade distribution into Ev3dev software "https://github.com/osmado/ev3dev_ros_distribution".
This project describes how to create a docker container that includes ev3dev and ROS. Beside, It explians howto use the dcoker image to compile ROS software.
  
ev3_wiimote
-----------

ROS node to drive a Lego robot from a wiimote controller "https://github.com/osmado/ev3_wiimote".
This example project combines ROS and wiimote (libcwiid). It is only a basic functionality project (turn right, turn left and go ahead).
