---
title: Installing the ev3dev Archive
subject: Development Setup
---

We host a package archive that contains some packages we use for developing
ev3dev itself. If you want to create your own ev3dev image files or work
on one of our debian packages, you will need some packages from this archive.

If you just want to write programs for the EV3 itself, you don't need this.

Only Ubuntu Trusty (for Travis CI) and the latest Ubuntu LTS are supported
(the latest Ubuntu Stable might work).

{% include /style/icon.html type="info" %}
This package archive was move from `archive.ev3dev.org` to a PPA in mid-2017.
If you are using `archive.ev3dev.org`, you should delete it from `/etc/apt/lists.d/`
and set up the new PPA instead.
{: .alert .alert-info}

Adding it is quite simple. Just run the following command.

    sudo apt-add-repository ppa:ev3dev/tools

Now, lets try it out...

    sudo apt-get update
    sudo apt-get install ev3dev-archive-keyring

If the package installs, then you are good to go.
