---
# Fill out as many of these as you can, and delete the rest.
# Text on a line after a "#" is a comment and is ignored for the published page.

author: [ "@riddy8051" ] # your GitHub user name
# or make a list if there is more than one author
# author: [ "@person1", "@person2", "person without GitHub account" ]

programming_language: "Shell script" # The programming language used in this project

youtube_video_id: ShmbfrEXyME # The video ID of the YouTube video to be displayed with this post
# thumbnail_override: "/images/projects/my-project/my-image.png" # If you don't have a YouTube video (or the video thumbnail isn't good) you can uncomment this line to set your own image for the project. 

#project_homepage_url: "http://example.com/my-super-cool-project" # Homepage for this project
source_code_url: "https://github.com/riddy8051/riddy8051.github.io/blob/master/ev3dev_clock" # Provide a link to your code
building_instructions_url: "https://github.com/riddy8051/riddy8051.github.io/blob/master/Lego_EV3_Clock.pdf" # how to build the model out of LEGO (*not* how to build the source code)

excerpt: "An Internet-enabled analog clock." # A short summary of your project. This can be a sentence or a paragraph, but it's recommended to keep it under 3 sentences.
---
This project is written in shell script on a lego EV3 brick running Debian EV3dev Linux. On boot the EV3 brick gets the current time from the internet via WiFi. When the clock script is started the EV3 brick finds the hands of the clock with a colour sensor and sets the clock hands to the current time. It keeps reading the current time and moves the clock hands accordingly. A medium motor is geared down 3:1 to drive the minute hand then a further 12:1 (36:1 total) to drive the hour hand. Enjoy!
