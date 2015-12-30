---
author: "@dlech"
title: "Announcing ev3dev-jessie-12-30 Release"
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
using ev3dev, you need to re-flash your SD card in order to fix these issue.
Don't forget to backup any important files before you re-flash!

### Raspberry Pi

This is the first release that support minsensors.com [PiStorms] out of the box.
**Note:** You will need a USB keyboard or (10-digit keypad with backspace) in
order to use the Brickman user interface.

We've also added a driver for battery indication on BrickPi+.

### Open-Roberta Lab

Thanks to the work of @ensonic, we now have support for <http://lab.open-roberta.org>
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

### Download

So, you want to download this release? Of course you do! [Click here][download].

[support]: http://www.ev3dev.org/support/
[2015-Q4]: https://github.com/ev3dev/ev3dev/milestones/ev3dev-jessie%202015-Q4
[PiStorms]: http://www.mindsensors.com/teaching-stem-with-robotics/13-pistorms-base-kit
[download]: 
