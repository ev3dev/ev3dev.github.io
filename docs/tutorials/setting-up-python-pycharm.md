---
title: Setting Up a Python Development Environment with PyCharm
group: software-languages
author: "@antonvh, @fisherds"
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

{% include icon.html type="info" %}
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

{% include icon.html type="danger" %}
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

{% include screenshot.html source="/images/osx/PyCharm/welcome.png" %}

What we are going to do now is make a clone of our project on the ev3dev
machine to start working on it on the development machine.
In the Welcome dialog choose: 'Checkout from version control' > 'Git'
Now type the hostname of the ev3dev machine, followed by a semicolon the
projectname. In the other fields choose a nice parent and project directory.
(You might have to add `.local` after `ev3dev` depending on your DNS setup.)

{% include screenshot.html source="/images/osx/PyCharm/clone-repo.png" %}

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

{% include screenshot.html source="/images/osx/PyCharm/missing-lib.png" %}

And that's logical, because the ev3dev library is missing on the development
machine. If we install it we won't be able to run motors, but the documentation
and autocomplete will be active. So on your development machine start a
terminal and do:

    pip install python-ev3dev

or

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

## Additional features for the PyCharm Professional version ##

The Professional version of PyCharm (which can be obtained for free for educational institutions and OSS projects) has a few more features to make your development environment much smoother. If you are a student (or anyone that can confirm a .edu email), then visit [this link](https://www.jetbrains.com/student/) to apply for the free version of PyCharm professional.  If you are an open source developer you can visit [this link](https://www.jetbrains.com/buy/opensource/) to see if you qualify for a free version of PyCharm professional.

Here is a list of the tools you can use with PyCharm professional to make your Python development easier.

Tool + link | Purpose
--- | ---
[SFTP Remote Server](https://www.jetbrains.com/help/pycharm/2016.3/creating-a-remote-server-configuration.html) | An alternative to the approach used above to transfer files from your host computer to the EV3 pretty instantly when the file is saved on your host computer.
[SSH Terminal](https://www.jetbrains.com/help/pycharm/2016.3/ssh-terminal.html) | Lets you make the SSH connection directly within PyCharm instead of using a separate tool (like PuTTY)
[Remote Interpreter](https://www.jetbrains.com/help/pycharm/2016.3/configuring-remote-interpreters-via-ssh.html) | Let's you avoid needing an SSH terminal since you just hit play within PyCharm to run programs.  Allows debugging, logs, etc. all within your host computer PyCharm IDE (but it can be SLOW!)

With these tools and installing ev3dev-lang-python on your host computer, you can really make the Python development process pretty user friendly.

## Setting up an SFTP Remote Server ##

This is an alternative to the myproject git, post-receive solution that is shown earlier in this tutorial.  If you have access to the Professional version of PyCharm, then this solution is a bit more elegant.  It works about the same in that it instantly transfers files, but it also allows you to have some other git remote (say github) instead of using the ev3 as your git remote.  Here are the steps necessary to setup your file transfer mechanism using a PyCharm Remote Server.
- Within PyCharm choose File | Settings for Windows and Linux (or PyCharm | Preferences for OS X)
- Expand Build, Execution, Deployment
- Click Deployment
- Click the + icon to add a new remote server, name it whatever you like (EV3 for example)
- Select SFTP, then set the following parameters:
  - SFTP host: ev3dev.local (or other name if renamed or use the IP address)
  - Port: 22 (don't change it)
  - Root path: / (don't bother change it as we'll set the full path later)
  - User name: robot
  - Password: maker (hopefully you change this at some point using the passwd command btw)
  - Save password: Yeah check it (just easier)
- Click the Mappings tab (if blank, hit OK the come back to this spot, sometimes it requires you to save it first)
  - Select the path for your files on the EV3, for example:
    - Deployment path on server: /home/robot/myfolderpath
  - Click the button at the top that says "Use this server as default"
  - Hit OK
- Reopen the File | Settings for Windows and Linux (or PyCharm | Preferences for OS X) area  (note we had to save the earlier step first)
- Visit Build, Execution, Deployment --> Deployment --> Options
- For the Upload changed files automatically to the default server select:
   - On explicit save action
  
You can test this setup without executing any code.  Just make a change, save the file, and see if the file is in sync on your EV3.  Note, in order to run that test you need an SSH terminal, which you can also do from within PyCharm (see next instruction).

## Setting up an SSH Terminal within PyCharm ##

This tool is really just a convenience.  Instead of using a separate program, like PuTTY, MobaXterm, or a Mac Terminal, just do it from within PyCharm. To start an SSH session just use the menu option Tools --> Start SSH Session...

It should prompt you for what remote server you want to use and then open an SSH connection in a new tab to your EV3.  Assuming you have completed the step above, you will see your already configured remote all ready to go.  You can even skip that selection step by setting the default Deployment server.
- Choose File | Settings for Windows and Linux (or PyCharm | Preferences for OS X)
- Expand Tools
- Select SSH Terminal
- Change Deployment server from Select server on every run to your configured server (for example EV3 if you named it that)

Done! Now both of the important steps are all within PyCharm.  You write code using your host computer, getting code completion help from your local install of ev3dev-lang--python, you load your files onto the board via the Remote Server, and then run them via an SSH Terminal that is within PyCharm.  You are ready to go!

## Setting up a Remote Interpreter ##

This step is optional.  You already have an SSH terminal in PyCharm to run your program.  However wouldn't it be nice to just be able to hit the PyCharm play button, use the PyCharm debugger, and see logs in the normal PyCharm console window.  It'd feel like the program was just running on your own computer.  Well you can!  Well you "should be" able to.  In my testing this approach was so slow it was unusable.  You can try it out though.  Maybe you'll have better luck.

- Choose File | Settings for Windows and Linux (or PyCharm | Preferences for OS X)
- Expand your project
- Select Python Interpreter
- Click the three little dots to add a new interpreter and select Add Remote
- Select SSH Credentials
- Add the host, username, and password just like you did for the Remote Server setup steps above
- Change the Python interpreter path to /usr/bin/python3

Once set up, PyCharm will install some helper info to the ev3, and will index the existing files on the ev3 which takes a long time (2-3 minutes), so you can do something else for a little while.  When it's done you can use the PyCharm IDE play button to run your code on ev3.  It's a slick idea if it worked better.  Good luck!
