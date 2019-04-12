---
author: "@dlech"
title: "Announcing ev3dev-jessie-2015-12-30 Release"
---

We have reached the [2015-Q4] milestone (and just barely in time). There are
significant changes in this release, so even if you are an experienced ev3dev
user, read on...

### Reporting Issues

Since there are so many changes with this release, we expect there to be new
issues. If you have trouble, check out the [support] page and let us know
about it. Just a friendly reminder... Please don't comment on a closed issue
(unless you are asking to re-open the issue or confirming that it is indeed fixed).
It's always best to open a new issue. It also keeps @dlech happy and sane.

### Default User

We are no longer using `root:r00tme` as the default user:password. The new default
user name is `robot` and the password is `maker`. Only files in `/home/robot/`
will show up in the File Browser in the Brickman user interface.

### File Permission Issues

We discovered that the method we were previously using to create image files
was fundamentally flawed with regard to file permissions. Basically, every file
on the image was owned by `root:root` even if it was supposed to be owned by
someone else. This caused problems with programs that relied on these file
permissions.

This issue has been fixed, but unfortunately that means that if you are already
using ev3dev, you need to re-flash your SD card in order to fix these issues.
Don't forget to backup any important files before you re-flash!

### Raspberry Pi

This is the first release that supports mindsensors.com [PiStorms] out of the box.
**Note:** You will need a USB keyboard or (10-digit keypad with backspace) in
order to use the Brickman user interface.

We've also added a driver for battery indication on BrickPi+.

### Open-Roberta Lab

Thanks to the work of @ensonic, we now have support for <https://lab.open-roberta.org>
out-of-the-box. It is prevented from running by default, so you do have to start
it manually...

    sudo systemctl unmask openrobertalab.service
    sudo systemctl start openrobertalab.service

After running the commands above, it will start automatically after a reboot.
You can turn it back off by running...

    sudo systemctl stop openrobertalab.service
    sudo systemctl mask openrobertalab.service

### Bigger Font

One of the most noticeable changes is that we are using a bigger font in the
Brickman user interface. This font looks big on the EV3 but is actually kind
of small on the PiStorms.

Changing the font size broke lots of screens in Brickman. We have fixed most of
them, but if you find something that doesn't look right, let us know.

### Faster Swap

Linux uses what is called a swapfile for virtual memory. This means when your
computer (or EV3) starts to run out of RAM, it moves some of the information
to the swapfile to free up some RAM.

Conventionally, the swapfile is a file or partition on your hard drive. Hard drives
are much slower than RAM, so when you are using too much memory your computer
starts running really slow because it is moving memory back and forth between
the fast RAM and the slow hard drive.

With ev3dev, we are running on an SD card, which is even way slower than a hard
drive. The EV3 also only has 64MB of RAM, so it can run out of RAM rather
quickly. In the past, we have had the swapfile on the SD card in various forms,
but this is not so good for two reasons. 1) It makes the EV3 super slow when
memory is swapped and 2) it will wear out your SD card faster because of writing
to it all of the time.

So, what can we do to make this better? In this release, we are using zram instead.
[Zram] is a relatively new Linux kernel feature that stores information compressed
in RAM. We use this to create a compressed RAM disk for the swapfile. This way
when the memory starts getting full, it is compressed to free up space.

The processor has to do extra work to compress the information, so it still
makes the EV3 run slower, but it is actually still faster than writing to the SD
card. So, hopefully this release should run a little faster and your SD card will
last a little longer.

**Note:** ZRAM is currently only enabled on the EV3. The Raspberry Pi images
do not have any swapfile enabled since they have plenty of RAM.

### Download

So, you want to download this release? Of course you do! [Click here][download].

[support]: /support/
[2015-Q4]: https://github.com/ev3dev/ev3dev/milestones/ev3dev-jessie%202015-Q4
[PiStorms]: http://www.mindsensors.com/teaching-stem-with-robotics/13-pistorms-base-kit
[zram]: https://en.wikipedia.org/wiki/Zram
[download]: https://github.com/ev3dev/ev3dev/releases/tag/ev3dev-jessie-2015-12-30
