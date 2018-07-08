---
# Fill out as many of these as you can, and delete the rest.
# Text on a line after a "#" is a comment and is ignored for the published page.

author: [ "@obo" ] # your GitHub user name
# or make a list if there is more than one author
# author: [ "@person1", "@person2", "person without GitHub account" ]

programming_language: "Python" # The programming language used in this project

# youtube_video_id: rrNaLfE9PWA # The video ID of the YouTube video to be displayed with this post
thumbnail_override: "/images/projects/2018-07-07-LoEV3go-LOGO-Interpreter/loev3go-banner.png" # If you don't have a YouTube video (or the video thumbnail isn't good) you can uncomment this line to set your own image for the project. 

# project_homepage_url: "http://example.com/my-super-cool-project" # Homepage for this project
source_code_url: "https://github.com/obo/loev3go" # Provide a link to your code
# building_instructions_url: "http://example.com/building-instructions.pdf" # how to build the model out of LEGO (*not* how to build the source code)

excerpt: "LOGO language interpreter running on a turtle EV3 robot." # A short summary of your project. This can be a sentence or a paragraph, but it's recommended to keep it under 3 sentences.
---

51 years after the [LOGO language](https://en.wikipedia.org/wiki/Logo_(programming_language))
was designed, a physical LOGO turtle finally arrives: [LoEV3go](https://github.com/obo/loev3go)!

Build your turtle (building instructions will hopefully come one day), run LoEV3go, open a web browser,
write your LOGO code and watch the turtle draw on the ground.

<img width="150" align="right" src="https://raw.github.com/obo/loev3go/master/screenshots/loev3go-in-action.jpg"/>

Features:
- Only 31313 EV3 Mindstorms Basic Set is needed (and an SD card for EV3).
- Two felt-tip pens supported, to choose from two colors as you go.
- IR controlled, if you want to "draw by hand".
- On-board web server to interpret, preview and execute your LOGO code.
- Dry-run mode on by default, to help you preserve your carpets.

Needed:
- Global positioning.

![LoEV3go web frontend screenshot](https://raw.github.com/obo/loev3go/master/screenshots/web-server.png){: .img-responsive}
