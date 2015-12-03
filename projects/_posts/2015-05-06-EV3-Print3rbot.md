---
author: "@cavenel"
programming_language: Python
youtube_video_id: 9pjpQoZoW6E
source_code_url: "https://github.com/cavenel/ev3-print3rbot/"
building_instructions_url: "https://www.dropbox.com/s/5jtnpaf18ibalj0/ev3_Print3rbot.pdf?dl=1"
excerpt: "An EV3 robot that draws with a pen. Can draw directly from SVG images, or with a mouse."
---

The EV3 Print3rbot can be built using the EV3 Home Edition set, plus a [3D printed pen holder](http://www.thingiverse.com/thing:409421), 2 [LEGO Gear Wheel 40T](http://www.thingiverse.com/thing:409421) (ref. 4285634) and an additional push button sensor (EV3 or NXT). The additional push button and the 2 gears are included in the EV3 education set.

The robot can draw simple svg files (as long as it only contains non transformed paths). See images/template.svg. You can as well use a mouse as input.

The python code is using the [Python API](https://github.com/ddemidov/ev3dev-lang-python) from @ddemidov. To install it:

*   Prerequisites:

        apt-get install libboost-python-dev python-setuptools python-pil

*   Now, the actual module installation:

        easy_install -U python-ev3dev

The ev3dev version must be at least [ev3dev-jessie-2015-05-01](https://github.com/ev3dev/ev3dev/releases/tag/ev3dev-jessie-2015-05-01).

## Example of extension for the EV3 Print3rbot:

{% include youtube-embed.html youtube_video_id="UwpghsdmDsE" %}
