---
title: Installing the ev3dev Archive
subject: Development Setup
---

We host a package archive that contains some packages we use for developing
ev3dev itself. If you want to create your own ev3dev image files or work
on one of our debian packages, you will need some packages from this archive.

If you just want to write programs for the EV3 itself, you don't need this.

Adding it is quite simple. Save the following as `/etc/apt/sources.list.d/ev3dev.list`.

    deb http://archive.ev3dev.org/ubuntu trusty main
    #deb-src http://archive.ev3dev.org/ubuntu trusty main

Then trust the keyring by running...

    sudo apt-key adv --keyserver pgp.mit.edu --recv-keys D57D95AF93178A7C

Now, lets try it out...

    sudo apt-get update
    sudo apt-get install ev3dev-archive-keyring

If the package installs, then you are good to go.
