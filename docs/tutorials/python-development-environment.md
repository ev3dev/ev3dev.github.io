---
title: Setting up a Python development environment
subject: Software
---
By Anton Vanhoucke

* Table of Contents
{:toc}

This tutorial shows how to set up a nice working environment for developing Python on Ev3dev. The platform used is a BrickPi, but most of it is usable for regular Lego Ev3 bricks.

Ev3dev is a lean and modern system to run on the raspberry pi that powers the brickpi. It's got multiple languages that work in a pretty similar way and make switching easy. Moreover, if you code in ev3dev on the brickpi, people with a regular Ev3 and Ev3dev will be able to run your code! Alas, it doesn't work the other way around as the BrickPi has a more limited set of motor commands.

For this tutorial, I will suppose you have burned an SD disk, connected your RPi and BrickPi to an ethernet cable and booted it. If you have an Ev3 brick I without ethernet, [set up another networking connection first]().

## Log in to ev3dev ##
Now you can either attach a screen and keyboard to it for the setup, or connect to it via ssh. I prefer the latter. My router has a dns that registers hostnames. It allows me to start a Terminal (on Mac) or Putty (on Windows) and simply do:

`ssh robot@ev3dev`

the password is `maker` by default. If you used screen and keyboard, you're automatically logged in.

##Configure the right BrickPi##
You're logged in to the command line. Cool! This step will activate the BrickPi. Skip it if you have a normal Ev3. Now several Mindstorms shields are available for the RPi, we have to setup the right one first. That is, if you haven't done so already after burning the image. For this go:

`sudo nano /boot/flash/config.txt` (the password is still `maker`)
Scroll down and uncomment the appropriate lines for your hardware.

**TIP:** I have multiple Raspberry Pis and Mindstorms brains. I like to keep them apart on the network by giving them separate names. I renamed mine like this: `sudo hostnamectl set-hostname ev3dev-rpi`

Finally do `sudo reboot`.

## Set up wifi ##
Next I like to setup wireless networking. Robots should go untethered! Here is how. It's easy in an interactive tool call `connmanctl`. You connect once, and next time you boot, it's all configured. On my ev3dev machine it went like this:

    anton@ev3dev:~$ connmanctl
    Error getting VPN connections: The name net.connman.vpn was not provided by any
    connmanctl> enable wifi
    Enabled wifi
    connmanctl> scan wifi
    Scan completed for wifi
    connmanctl> services
    *AO Wired                ethernet_b827ebbde13c_cable
                             wifi_e8de27077de3_hidden_managed_none
        AH04044914           wifi_e8de27077de3_41483034303434393134_managed_psk
        Frissie              wifi_e8de27077de3_46726973736965_managed_psk
        ruijgt gast          wifi_e8de27077de3_7275696a67742067617374_managed_psk
        schuur               wifi_e8de27077de3_736368757572_managed_psk
    connmanctl> agent on
    Agent registered
    connmanctl> connect wifi_e8de27077de3_41      # You can use the TAB key at this point to autocomplete the name
    connmanctl> connect wifi_e8de27077de3_41483034303434393134_managed_psk
    Agent RequestInput wifi_e8de27077de3_41483034303434393134_managed_psk
      Passphrase = [ Type=psk, Requirement=mandatory ]
    Passphrase? *************

    Connected wifi_e8de27077de3_41483034303434393134_managed_psk
    connmanctl> quit


## Set up development environment ##
I prefer to have a passwordless ssh to the robot. For this I [add a user with the same login name as on my development computer.](https://www.raspberrypi.org/documentation/linux/usage/users.md) Remember to give yourself sudo rights as explained on that same page.
After adding that user, you can [set up passwordless ssh](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md).

With passwordless ssh and the same username on the ev3dev machine, you can go `ssh ev3dev` and you're in!

Next we need a versioning system. That's a tool for tracking changes you made to your code. Coincidentally the same tool is also very handy for transferring code between computers or sharing it on the web. There are several, but I prefer git. It's not installed by default so you have to do:

    sudo apt-get update
    sudo apt-get install git
    git config --global user.email "you@example.com"
    git config --global user.name "Your Name"

Now let's make a new project using our versioning system. Just type:

    mkdir myproject
    cd myproject/
    git init

Yay! We have a new project. It's empty though. So let's add some code. Start a text editor like this:
`nano run_motor.py`


Now add the following code:

{% highlight python %}
from ev3dev.auto import OUTPUT_A, Motor 
import time

m = Motor(OUTPUT_A)
m.run_forever(duty_cycle_sp = 100)
time.sleep(1)
m.stop()
{% endhighlight %}

Press ctrl-X and `y` to save. It's time to let the first motor run. Plug it into port A on your brick and go: `python run_motor.py`. Tataaa! The motor is running full power for a second.

Now typing code in nano is fine, but it's much nicer to do it inside a real IDE (Integrated Development Environment). There are many, like Visual Studio, Eclipse and PyCharm. My Favourite is PyCharm Community Edition. So go grab a copy of that one and start it on your development machine.

{% include inline-screenshot.html source="/images/osx/PyCharm/welcome.png" caption="The 'Welcome' dialog in PyCharm"%}

What we are going to do now is make a clone of our project on the ev3dev machine to start working on it on the development machine.
In the Welcome dialog choose: 'Checkout from version control' > 'Git'
Now type the hostname of the ev3dev machine, followed by a semicolon the projectname. In the other fields choose a nice parent and project directory.

Now you can continue where you left of on the ev3dev machine, but with a larger screen, better keyboard and more tools! There is one problem, though: PyCharm puts red curly lines under the ev3dev library. 

![Curly red lines](/images/osx/PyCharm/missing-lib.png")

And that's logical, because the ev3dev library is missing on the development machine. If we install it we won't be able to run motors, but the documentation and autocomplete will be active. So on your development machine start a terminal and do:

    git clone https://github.com/rhempel/ev3dev-lang-python.git
    cd ev3dev-lang-python/
    python setup.py install
    cd ..                     # Optional
    rm -r ev3dev-lang-python/ # Optional to remove the downloaded files. It's installed now anyway.
