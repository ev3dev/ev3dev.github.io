---
author: [ "@dlech" ]
programming_language: "Python"
youtube_video_id: ttOf0V9l1ag
source_code_url: "https://gist.github.com/dlech/f7c8313606c75968e259"
---

Starting with kernel version 3.16.1-1-ev3dev, the brightness attribute now works for the LEDs.

By combining the red and green LEDs in different amounts, you can create yellow and orange and every color in between.

The flicker is due to interrupts not being handled when they are suppoesed to. We should be able to fix this in the future.

