---
title: Setting Up a Python Development Environment with PyCharm
group: software-languages
author: "@antonvh"
---

* Table of Contents
{:toc}

This tutorial shows how to set up a nice working environment for developing
Python on Ev3dev. The platform used is a BrickPi, but most of it is usable
for regular LEGO EV3 bricks.
{:.lead}

Ev3dev is a lean and modern system to run on the Raspberry Pi that powers the
BrickPi. It's got multiple languages that work in a pretty similar way and
make switching easy. Moreover, if you code in ev3dev on the BrickPi, people
with a regular EV3 and Ev3dev will be able to run your code! Alas, it doesn't
work the other way around as the BrickPi has a more limited set of motor
commands.

For this tutorial, I will suppose you have burned an SD disk, connected your
RPi and BrickPi to an ethernet cable and booted it. If you have an EV3 brick
without ethernet, [set up another networking connection first][network].

[network]: /docs/tutorials

## Log in to ev3dev ##

Now you can either attach a screen and keyboard to it for the setup, or
connect to it via ssh. I prefer the latter. My router has a DNS that registers
hostnames. It allows me to start a Terminal (on Mac) or Putty (on Windows) and
simply do:

`ssh robot@ev3dev`

If you don't have a DNS try: `robot@ev3dev.local` or connect to it's IP
address directly. eg. `robot@192.168.0.2`

The password is `maker` by default. If you used screen and keyboard, you're
automatically logged in.

##Configure the right BrickPi##

You're logged in to the command line. Cool! This step will activate the
BrickPi. Skip it if you have a normal EV3. Now several Mindstorms shields
are available for the RPi, we have to setup the right one first. That is,
if you haven't done so already after burning the image. For this go:

`sudo nano /boot/flash/config.txt` (the password is still `maker`)
Scroll down and uncomment the appropriate lines for your hardware.

{% include /style/icon.html type="info" %}
I have multiple Raspberry Pis and Mindstorms brains. I like to keep
them apart on the network by giving them separate names. I renamed mine like
this:<br />`sudo hostnamectl set-hostname ev3dev-rpi`
{:.alert .alert-info}

Finally do `sudo reboot`.

## Set up development environment ##

I prefer to have a passwordless ssh to the robot. For this I [add a user with
the same login name as on my development computer.][users] Remember to give
yourself sudo rights as explained on that same page. After adding that user,
you can [set up passwordless ssh][passwordless].

{% include /style/icon.html type="danger" %}
This doesn't matter on BrickPi, but on robots with a screen, you will *not* be
able to launch programs using the Brickman interface. For this, you *must* use
the `robot` user! Only set up your own user account if you really know what you
are doing.
{:.alert .alert-danger}

[users]: https://www.raspberrypi.org/documentation/linux/usage/users.md
[passwordless]: https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md

With passwordless ssh and the same username on the ev3dev machine, you can go
`ssh ev3dev` and you're in!

Next we need a versioning system. That's a tool for tracking changes you made
to your code. Coincidentally the same tool is also very handy for transferring
code between computers or sharing it on the web. There are several, but I
prefer git. It's not installed by default so you have to do:

    sudo apt-get update
    sudo apt-get install git
    git config --global user.email "you@example.com"
    git config --global user.name "Your Name"

Now let's make a new project using our versioning system. Just type:

    mkdir myproject.git
    git init --bare myproject.git
    mkdir myproject

Yay! Git is initialised in the new folder we created. We have a new project
repository. Now we can clone this repository on our development machine, but
first we need to do a little more configuring, to automatically deploy our
code when we push it back to the ev3dev brick.

    nano myproject.git/hooks/post-receive

add these lines. If you created a user with your own name, replace `robot`
with that name:

    #!/bin/sh
    git --work-tree=/home/robot/myproject --git-dir=/home/robot/myproject.git checkout -f

and finally do:

    chmod +x myproject.git/hooks/post-receive

## On to PyCharm ##

Now typing code in nano is fine, but it's much nicer to do it inside a real
IDE (Integrated Development Environment). There are many, like Visual Studio,
Eclipse and PyCharm. My favourite is [PyCharm Community Edition][pycharm].
So go grab a copy of that one and start it on your development machine.

[pycharm]: https://www.jetbrains.com/pycharm/

{% include /util/screenshot.html source="/images/osx/PyCharm/welcome.png" %}

What we are going to do now is make a clone of our project on the ev3dev
machine to start working on it on the development machine.
In the Welcome dialog choose: 'Checkout from version control' > 'Git'
Now type the hostname of the ev3dev machine, followed by a semicolon the
projectname. In the other fields choose a nice parent and project directory.
(You might have to add `.local` after `ev3dev` depending on your DNS setup.)

{% include /util/screenshot.html source="/images/osx/PyCharm/clone-repo.png" %}

When all goes well you get a new window with your fresh empty project. If the
'testing' dialog stays on screen for a long time, it might be that your
PyCharm master password is needed for your PyCharm password storage. Cancel
the checkout, type the master password and try again.

So let's add some code. Right click on the 'myproject' folder in the left
column and choose new > python file. Name it `run_motor`. PyCharm will ask
if you want to add it to Git. That's nice! Of course we want that.

Now add the following code:

{% highlight python %}
from ev3dev.auto import OUTPUT_A, Motor 
import time

m = Motor(OUTPUT_A)
m.run_forever(duty_cycle_sp = 100)
time.sleep(1)
m.stop()
{% endhighlight %}

When you're done press cmd-k or choose VCS > Commit Changes...

The commit message is box describing the changes you made to your code. That's
handy later on when you do a lot of changes. For now type: `first commit`.
Then go over the commit button and choose "commit and push" from the dropdown.
In the next dialog click make sure to select the "alternative branch checkbox"
and click "Push". Voila! Our code has arrived on the ev3dev brick. Let's take
a look.

## Running the code ##

It's time to let the first motor run. Plug it into port A on your brick and
ssh to your ev3dev brick. Maybe you have the terminal still open.

Now go

    cd myproject
    python run_motor.py

Tataaa! The motor is running full power for a second.

## Installing ev3dev-python on the development machine ##

Back to the development machine. Maybe you noticed a problem: PyCharm puts
red curly lines under the ev3dev library. 

{% include /util/screenshot.html source="/images/osx/PyCharm/missing-lib.png" %}

And that's logical, because the ev3dev library is missing on the development
machine. If we install it we won't be able to run motors, but the documentation
and autocomplete will be active. So on your development machine start a
terminal and do:

    git clone https://github.com/rhempel/ev3dev-lang-python.git
    python ev3dev-lang-python/setup.py install
    rm -r ev3dev-lang-python/ # Optional to remove the downloaded files. It's installed now anyway.

## Using the power of the IDE ##

With the IDE (PyCharm) set up and the library installed you can code much
faster. PyCharm will highlight most coding errors and typos. It will also
suggest to autocomplete your code and show documentation. You can start
typing `m.` and pycharm will suggest all possible methods and properties.
Choose one. Now you can put your cursor inside the property and press F1 to
see the docs. Or press cmd-down arrow to look inside the library where this
property is defined. Neat huh? Happy coding.

## Setting up a remote interpreter ##

The Professional version of PyCharm (which can be obtained for free for 
educational institutions and OSS projects) can support remote debugging, which
maked development even easier. When creating a new project in PyCharm, rather than 
using the default interpreter, click on the gear icon and select `add remote`.
Enter the hostname of the ev3 (likely ev3dev.local), username and password
(robot/maker if you haven't changed the defaults). The path to python  will be 
/usr/bin/python for Python 2 or /usr/bin/python3 for Python 3 (unless you want to
use a virtualenv). Once set up, PyCharm will install some helper info to the ev3,
and will index the existing files on the ev3 which takes a while, so you can do
something else for a little while. Once it's finished, you'll need to set up a 
deployment mapping as per https://www.jetbrains.com/help/pycharm/2016.1/creating-a-remote-server-configuration.html
Set `Automatic upload` to make things a bit easier as well. 

 Now you should be able
to run and debug code on the ev3, but using PyCharm as the interface.
