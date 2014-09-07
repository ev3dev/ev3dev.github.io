---
title: Writing A microSD Card
index: wiki
---

1. Introduction
2. Download the Latest `ev3dev.img.gz`
3. Extract `ev3dev.img` From `ev3dev.img.gz`
4. Write the `ev3dev.img` File To Your microSD Card
5. Update the `ev3dev.rc.local` File
6. PowerUp!

## 1. Introduction

This tutorial covers downloading the latest ev3dev.img.gz realease file and then writing it to a microSD Card. 

The image file is just under 70 MB, and expands to just over 500MB. It can be written to any microSD card that's at least 512MB - I'm not sure you can even buy one that small anymore.

This procedure is dead-easy to do on Linux, straightforward on OSX, and occasionally tricky on Windows machines.

*If you are unsure of what you are doing, please find someone to coach you through it. Do not blindly follow these guidelines. Why? Because drive letter assignments vary between machines and my G: drive on Windows could be your external USB drive with the entire Firefly DVD collection. Yeah, I didn't think you'd want to accidentally format that.*

## 2. Download the Latest `ev3dev.img.gz`

Go to the [Releases](https://github.com/mindboards/ev3dev/releases) section of the ev3dev repository and grab the latest version with an `ev3dev.img.gz` download button. Click it, and download the file.

## 3. Extract `ev3dev.img` From `ev3dev.img.gz`

On Linux and Mac it's as easy as `gunzip ev3dev.img.gz` on your terminal. On Windows, you'll need to use something like 7-zip to extract the image file.

## 4. Write the `ev3dev.img` File To Your microSD Card

Rather than re-invent the wheel,I'm going to point you to the fantastic [RPi Easy SD Card Setup](http://elinux.org/RPi_Easy_SD_Card_Setup) page and let you figure out the best way to write the `ev3dev.img` file to your microSD card.

On Windows I've had success with WinDiskImager, on OSX and Linux I prefer using `dd`. Keep in mind that on OSX, the [writing using the rdisk path is 20 times faster](http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_card_using_Mac_OSX).

The write can take up to 5 minutes depending on the speed of your computer.

## 5. Update the `ev3dev.rc.local` File

You're almost ready to power up, but first you need to edit a file on the FAT32 partition of the microSD card. The file you're looking for it `ev3dev.rc.local`. Bear with me while I explain what that file is doing there.

What I was looking for was an easy way to provide a file that could control the final stage of the Linux startup process. Normally, that's done by a file called `/etc/rc.local` on a Linux machine. However, that file is usually in a Linux specific `ext3` or `ext4` filesystem, and guess what, you can't easily mount those filesystems on either OSX or Windows.

So the compromise is a file that lives in the FAT32 partition, and that can be easily edited on OSX, Linux, or Windows - and that's where `ev3dev.rc.local` comes in.

Look for the text near the top like this:

```
# ---------------------------------------------------------------------------
# Here is where you customize which device you want to use for connecting
# to the host computer via USB

# Uncomment this line for connecting to a Windows or Linux machine
# export EV3_GADGET="g_ether"

# Uncomment this line for connecting to an OSX machine
# export EV3_GADGET="g_cdc"
```

And uncomment (remove the `#`) for the line appropriate to your host computer. When you're done, just save the file.

## 6. PowerUp

Unmount (or eject) your microSD card from the host computer, then remove the card and plug it into the EV3. Press the center switch and watch the blinkenlights!

[Here's a video of the boot process](http://www.youtube.com/watch?feature=player_detailpage&v=rrNaLfE9PWA)

Eventually, you'll see the `ev3dev` signon screen on the LCD. If not, go back to step 4 or write up an [Issue](https://github.com/mindboards/ev3dev/issues).
