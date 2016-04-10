---
title: Setting Up an NFS Fileshare
subject: Networking
author: Anton Vanhoucke, Ralph Hempel
---

* Table of Contents
{:toc}

## Why Do It?

The nfs protocol is the standard Linux way to share files between computers, and since you're running Linux on the EV3, and there's nfs support built-in, you can share files between your computer and the EV3.

Using a file share method like nfs makes it easier for folks like me to load and unload modules that are under development. That saves time and is less error prone than swapping SD Cards and rebooting all the time.

For general users, it makes it easy to upgrade their SD Cards with known good modules, new kernel `uImage` files, and other updates to config files. It also makes it easier to backup your SD card. Finally, it allows you to edit files on your host machine, then run them on the EV3 without having to actually copy files anywhere!

![nfs_on_ev3dev](Images/Website/nfs_on_ev3dev.png)

It's relatively easy, you just need to keep the addresses and filenames straight. All you have to do is modify one file on the EV3 and one on your host computer. Let's start with getting the computer set up.

The instructions here are for all three platforms Linux, Windows, and OSX - just pick the one you need 

## How To Do It - Linux

On your Linux box, you'll need to edit a file called `/etc/exports`. If you don't have this file, then you need to install `nfs-common` or a similar package. Update the file to look like this:

```
# /etc/exports: the access control list for filesystems which may be exported
#		to NFS clients.  See exports(5).
#
# Example for NFSv2 and NFSv3:
# /srv/homes       hostname1(rw,sync,no_subtree_check) hostname2(ro,sync,no_subtree_check)
#
# Example for NFSv4:
# /srv/nfs4        gss/krb5i(rw,sync,fsid=0,crossmnt,no_subtree_check)
# /srv/nfs4/homes  gss/krb5i(rw,sync,no_subtree_check)
#

# Share the /home/youruserid/nfs/ev3dev directory on this computer with anyone (*)
# on the local 192.168.254.* network that asks. If your wifi network assigns a
# constant IP address to the EV3, then replace the * with the specific address...
#
/home/youruserid/nfs/ev3dev   192.168.254.*(rw,sync,no_subtree_check,root_squash)
```

There may be more lines, of course. All you need to do is tell nfs which directory you want to share (`/home/youruserid/nfs/ev3dev`) and who you want to share it with (`192.168.254.*`). 

Note that `192.168.254.*` is my personal wifi subnet. For those of you that are trying to set up nfs over USB Ethernet, the default subnet that `ev3dev` expects is `192.168.2.*`.

The options, enclosed in parenthesis, tell nfs to:

- Allow read/write access
- Don't process a write request until the previous write is committed to disk
- Disables subtree checks, more reliable but mild security risk
- Do not let root on the EV3 to be like root on the host, good idea!

So update the file on your host machine, then run `sudo exportfs -rv` which will update the directories that nfs exports.

Now update the fstab on the EV3 (see below). 

## How To Do It - Windows

We're in luck! You can download [haneWin NFS](http://www.hanewin.net/nfs-e.htm) which is an nfs server that works on Windows 200x/XP/Vista/7 - hopefully on Windows 8. I have it running on Windows 7 and it's great. The haneWin server has built-in help for setting up the Windows side of the share, and if you get stuck there are [other users on the net that have it working][stmlabshanewin]. 

Run the installer and he process monitor as administrator (Right click and choose run as admin). Here is the contents of my `exports` file:

```clean
# exports example

# C:\ftp -range 192.168.1.1 192.168.1.10
# c:\public -public -readonly
# c:\tools -readonly 192.168.1.4

C:\Users\youruserid\Documents\ev3 -public -name:ev3
```

One thing to note is that it's Shareware - after 30 days you'll need to pay 19 Euros for non-commercial use. I have tried FreeNFS and WinNFSd but neither one works for me. If you get either of them working, please let me know!

Now update the fstab on the EV3 (see below). 

## How To Do It - OS X

Setting up an NFS share on a Mac running 10.5 (Leopard) or later is very similar to setting it up in Linux.

Based on the brevity of the [OS X Server: How to configure NFS Exports][OSXServerNFSExport], you'd think that there was no problem, but BSD is just different enough from Linux to be irritating. Thanks to [Barry O'Donavan's NFS Tutorial][BarryODonavanNFS] the differences are made clear.

On your Mac, simply edit (or create) the `/etc/exports` file (as root), adding a line for each path on your Mac that you wish to share. Here's a simple example:

```clean
#/etc/exports
/path/to/shared/folder                    -network 192.168.0.0 -mask 255.255.0.0
/path/to/read_only/shared/folder -ro      -network 192.168.0.0 -mask 255.255.0.0
/path/to/shared/tree             -alldirs -network 192.168.0.0 -mask 255.255.0.0
```

The `-network` and `-mask` options limit access to the shared directory to those on the 192.168 subnet. The `-ro` option limits access to read-only, while the `-alldirs` option provides access to all subdirectories of the specified path. 

For this example, I'm going to share the `Public` folder under my userid (of course your userid will be different) and the subnet will be `192.168.2.0` for the case of the USB over Ethernet connection.

```clean
#/etc/exports
/Users/youruserid/Public -maproot=root:wheel -network 192.168.2.0 -mask 255.255.255.0
```

Wait, what's that goofy `-maproot=root:wheel` doing there? Well, it's the little hint that Barry has on his page that maps the nfs client's `root` user to the `root` user on the OSX host, and it also maps the `root` group to the OSX `wheel` group. Because BSD has to be, you know, different!

After creating the file, the `nfsd` daemon [should automatically start up][OSXServerNFSExport]. If necessary it can be enabled permanently using `nfsd enable`. You can check to see if it's working with `showmount -e`, which will give you a list of the active NFS shares, like this:

```clean
Exports list on localhost:
/Users/youruserid/Public                     192.168.2.0
```

If you make changes to `/etc/exports`, activate them with `nfsd update`.

Now update the fstab on the EV3.  

## How To Do It - EV3

On the EV3, you'll need to update a file (as root) called `/etc/fstab`. You should have already set up USB Networking, so `ssh` to the EV3 and run an editor like `vi` or `nano` to edit the file. Here's the line you want to add to `/etc/fstab` - DO NOT TOUCH ANYTHING ELSE IN THERE!

```clean
/dev/mmcblk0p1 /media/mmc_p1 vfat noatime  0 0
/dev/mmcblk0p2 /             ext3 noatime  0 0
proc           /proc         proc defaults 0 0

# NOTE - the following examples all use the same IP address for the host, in practice, there would
#        be separate addresses for each host!

# For the Linux example, it would look like:
192.168.2.1:/home/hostuserid/nfs/ev3dev /home/robot/nfs/linux   nfs users,noauto,rw,vers=3  0 0

# For the Windows Hanewin example, it would look like:
192.168.2.1:/ev3                        /home/robot/nfs/windows nfs users,noauto,rw,vers=3  0 0

# For the OSX example, it would look like:
192.168.2.1:/Users/youruserid/Public    /home/robot/nfs/osx     nfs users,noauto,rw,vers=3  0 0
```

It's not too hard to figure out what's going on here. The host machine with the nfs mount is at `192.168.2.1` and we added `/home/hostuserid/nfs/ev3dev` (or whatever the host is exporting the directory as) to the `/etc/exports` file on that machine. The next section of the line says we want to mount it locally at `/home/ev3userid/nfs/linux`, or whatever directory you choose.

The options tell `mount` that:

- this is an nfs share
- we do not want to automatically mount it at boot time (in case the host is not connected)
- general users are allowed to mount the share
- we want read/write access
- we are using nfs V3 on the host

Once you've updated the `/etc/fstab` file, you will need to create the mount points. Since I test `ev3dev` o n all three major platforms, I have separate directories for each nfs host. You probably only need to create one of these, but this script creates all three for me:

```clean
mkdir -p ~/nfs/linux
mkdir -p ~/nfs/windows
mkdir -p ~/nfs/osx
```

Then all you need to do is mount the share, like this: `sudo mount -o nolock ~/nfs/linux`, or whichever of the above three directories you want to mount.

And then you should be able to see the files on your host computer when you do `ls /home/ev3userid/nfs/ev3dev`!

## References

- The [Linux `exports`][linuxexports5] manpage
- The [Linux `exportfs`][linuxexportfs8] manpage
- The [OS X `exports`][OSXexports5] manpage
- The [OS X `nfsd`][OSXnfsd] manpage
- The [OS X `showmount`][OSXshowmount] manpage


[stmlabshanewin]: [http://forum.stmlabs.com/showthread.php?tid=6285

[OSXServerNFSExport]: http://support.apple.com/kb/HT4695
[BarryODonavanNFS]: http://www.barryodonovan.com/index.php/2012/12/12/apple-os-x-as-an-nfs-server-with-linux-clients
[linuxexports5]:  http://linux.die.net/man/5/exports
[linuxexportfs8]: http://linux.die.net/man/8/exportfs
[OSXexports5]: https://developer.apple.com/library/mac/documentation/Darwin/Reference/Manpages/man5/exports.5.html
[OSXnfsd]: https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man8/nfsd.8.html 
[OSXshowmount]: https://developer.apple.com/library/mac/documentation/Darwin/Reference/Manpages/man8/showmount.8.html
