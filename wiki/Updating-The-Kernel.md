---
title: Updating The Kernel
index: wiki
---

## Quick Links

- [Why Do It?](#WhyDoIt)
- [How To Do It?](#HowToDoIt)
- [References](#References) 

## <a name="WhyDoIt"/> Why Do It?

From time to time, we get wonderful code contributions for [`ev3dev`][ev3dev] from other developers. I merge those requests into the main kernel source, and then rebuild the kernel so you don't have to.

These updates are made available at the [`ev3dev` Releases][ev3dev-releases] page. The kernel upgrades are normally just `uImage` files. The are already compressed so `gzip`ping them has very little benefit.

Upgrading your kernel gives you incremental features that are outlined in the descriptive text that goes with each release.

## <a name="HowToDoIt"/> How To Do It

We're assuming that you've got all the steps in the [Getting Started][ev3dev-GettingStarted] section of the wiki going.

Navigate to the [`ev3dev` Releases][ev3dev-releases] page and look for the most recent release that's just a `uImage` file, like this:

![KernelUpgradeRelease](images/KernelUpgradeRelease.png)

Download the `uImage` file and put it somewhere that your EV3 can see it on an NFS share. Then run these steps:

```clean
userid@ev3dev:~$ sudo cp /media/mmc_p1/uImage /media/mmc_p1/uImage.prev
userid@ev3dev:~$ sudo cp nfs/linux/ev3dev-rootfs/uImage /media/mmc_p1/uImage
```

The first line copies the old `uImage` kernel file to a safe place on the root of the microSD card. If the new kernel does not boot, then you just need to put the card in your host computer, rename `uImage.prev` to `uImage`, and you'll be back where you started.

The second line copies the recently downloaded `uImage` to the microSD card so that the next time the EV3 reboots, you get the new kernel.

Let's check to see if all the files are where we expect them to be:

```clean
userid@ev3dev:~$ ls -al /media/mmc_p1/
total 4781
drwxr-xr-x 2 root root   16384 Jan  5 15:52 .
drwxr-xr-x 3 root root    1024 Dec 29 20:53 ..
-rwxr-xr-x 1 root root     809 Jan  3  2000 ev3dev.rc.local
-rwxr-xr-x 1 root root 2467272 Jan  5 14:28 uImage
-rwxr-xr-x 1 root root 2406432 Dec 29 15:53 uImage.prev
```

Yes, they are all there. You can see the newer (and bigger) `uImage` file, and the old `uImage.prev` file is there too.

So now, all we need to do is reboot, and we're done...

```clean
userid@ev3dev:~$ sudo reboot
```

Congratulations, you have just updated the kernel on your EV3 running [`ev3dev`][ev3dev]!

## <a name="References"/> References

- [ev3dev][ev3dev]
- [ev3dev-wiki][ev3dev-wiki]
- [ev3dev-releases][ev3dev-releases]
- [ev3dev-GettingStarted][ev3dev-GettingStarted]

[ev3dev]: https://github.com/mindboards/ev3dev
[ev3dev-wiki]: https://github.com/mindboards/ev3dev/wiki
[ev3dev-releases]: https://github.com/mindboards/ev3dev/releases
[ev3dev-GettingStarted]: https://github.com/mindboards/ev3dev/wiki#getting-started
