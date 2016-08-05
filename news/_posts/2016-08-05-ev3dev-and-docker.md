---
author: "@dlech"
title: "Ev3dev and Docker"
---

![Docker logo](/images/news/docker-logo.png)
{: .image-responsive .pull-right}

We are developing [Docker] images for ev3dev. These can be used for a variety
of things. In the near future will be using Docker images to create the SD card
images that we distribute. This will make it easy to create custom versions of
ev3dev, such as ev3dev+ROS.

<!--more-->

These images will also be replacing `brickstrap` for cross-compiling. We have
a new tutorial on [cross-compiling with Docker][tutorial]. The best part about
this is that you don't need to install a full Ubuntu VM anymore
to develop on Windows or Mac. And because we know what you are thinking... no,
the Docker images do not emulate the EV3 hardware any way. Maybe someday.

So, pull some images, write some programs and let us know how it goes. We think
you will have a whale of a good time.

[Docker]: https://www.docker.com/
[tutorial]: /docs/tutorials/using-docker-to-cross-compile
