---
author: [ "@freezed-or-frozen" ] # your GitHub user name
programming_language: "Golang" # The programming language used in this project
project_homepage_url: "https://github.com/freezed-or-frozen/lego-workshop" # Homepage for this project
source_code_url: "https://github.com/freezed-or-frozen/lego-workshop" # Provide a link to your code
thumbnail_override: "/images/projects/2020-07-09-Lego-Workshop-IDE/legoworkshop1.png"
---

## What ?

**LEGO Workshop** is a web IDE to develop Python program for the Lego Mindstorm EV3 robot.


## Why ?

Because as a teacher I need a tool that allow multiple students to work remotely (wifi) with one robot. During Python class around 20 students work with 10 robots thanks to a Raspberry PI converted in a Wifi router. 
Before this solution I used to work with ipython, but it is too slow regarding EV3 performances.


## Is there a screenhot ?
![Alt text](/images/projects/2020-07-09-Lego-Workshop-IDE/legoworkshop1.png?raw=true "Lego Workshop web IDE")


## What I can find inside ?
Lego workshop is composed of two parts :
  * **server side** written in Golang to start and stop Python scripts remotely
  * **client side** written in HTML, CSS, Javascript to edit Python code
Both communicates with websockets over a wifi link.


## What can I do ?
  - [x] edit Python code in a web page (lines number, color syntax)
  - [x] execute Python code remotely
  - [x] stop execution
  - [X] init robot state after stopping execution (motors...)
  - [x] tell every clients about robot's state (execution, clients connected)
  - [ ] add an help page with code example and documentation


# How to install ?
Steps :
  1. download the github repository
  2. copy the repository inside the robot (with scp)
  3. start the server from brickman, file manager, start_lego-workshop.sh
  4. go to http://1.2.3.4:1337 with your web broser
  5. enjoy !


## Who ?
- **Your name:** David SALLE (@freezed-or-frozen)
- **Location:** France, Niort, Saint-André highschool
- **Feedback:** visit the github project repository
