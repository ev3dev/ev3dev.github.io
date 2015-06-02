---
title: Share
---

Do you like ev3dev? Show your support by:

* Giving us a star [on GitHub](https://github.com/ev3dev/ev3dev).
* Voting for ev3dev in the [mindsensor.com] poll (it's about half way down the page).

ev3dev.org Projects Page
------------------------

We currently have a [projects page] where you can browse projects that have been
built using ev3dev. You can add your own too!

{% assign project = site.categories.projects | last %}
Here is the sample project ([more about this project...]({{ site.github.url }}{{ project.url}})).

###{{ project.title }}

{{ project.content }}

[mindsensor.com]: http://mindsensors.com/
[projects page]: {{ site.github.url }}/projects
