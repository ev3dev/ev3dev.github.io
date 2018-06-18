---
title: Using the Raspberry Pi Camera
group: hardware-extras
---

* Table of Contents
{:toc}

## Enabling the Camera Module

Since we don't have `raspi-config` you have to do this manually. Edit
`/boot/flash/config.txt` using `nano` or `vi`. Look for the section:

    # uncomment if you want to use the camera module
    #start_x=1
    #gpu_mem=128
    #disable_camera_led=1

Remove the comment (`#`) before `start_x=1` and `gpu_mem=128` (and optionally
`disable_camera_led=1`).

See <https://elinux.org/RPiconfig#Camera> for slightly more info on these options.

Save the changes, then reboot the Raspberry Pi.

    sudo reboot


## Installing the Python Module

We don't have a debian package for this, but you can still get it by running

    sudo easy_install picamera

If you get an error that `easy_install` does not exist, install it with

    sudo apt-get install python-setuptools
