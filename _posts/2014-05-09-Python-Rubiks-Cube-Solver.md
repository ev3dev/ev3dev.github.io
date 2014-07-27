---
author: "@cavenel"
layout: project
category: projects
---

You can find a demo of the robot using the rubiks cube example here:

<iframe width="560" height="315" src="//www.youtube.com/embed/HuKsfp19yF0" frameborder="0" allowfullscreen="1" > </iframe><br />


The model is based on [mindcub3r](http://www.mindcuber.com/mindcub3r/mindcub3r.html), from David Gilday.

I have two different solving algorithms, one is running on the brick and gives a solution in around 60 steps ([source](http://cubex.sourceforge.net/)). The other one gives a solution in around 20 steps, but takes around 500 MB of memory, so I need to run it on a computer ([source](http://www.cube20.org/src/)).

You can find the code in my [git repository](https://github.com/cavenel/ev3dev_examples).

