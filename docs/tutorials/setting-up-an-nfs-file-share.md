---
title: Setting Up an NFS File Share
group: advanced-networking
author: [ "@antonvh","@rhempel","JNFitzgerald" ]
---

* Table of Contents
{:toc}

## Why Do It?

If you quickly want to change a little code and then run it on the robot, it's nice to have a file shared between your development pc and the ev3dev robot. That's what this tutorial accomplishes with NFS. It's also a fast and easy way to tune parameters or access log files.

{% include /style/icon.html type="info" %}
This requires editing some config files and getting addresses and filenames straight. For more advanced users.
{: .alert .alert-info}

The NFS protocol is the standard Linux way to share files between computers, and since you're running Linux on the EV3, and there's nfs support built-in, you can share files between your computer and the EV3.

More uses for a shared folder:

 * Loading and unloading modules that are under development. That saves time and is less error prone than swapping SD Cards and rebooting all the time.
 * Upgrade your SD Cards with known good modules, new kernel `uImage` files, and other updates to config files. 
 * Backup your SD card. 
 * Edit files on your host machine, then run them on the EV3 without having to actually copy files anywhere!

{% include /util/screenshot.html source="/images/Website/nfs_on_ev3dev.png" %}

The instructions here are for all three platforms Linux, Windows, and OSX - just pick the one you need 

## How To Do It - Linux

On your Linux box, you'll need to edit a file called `/etc/exports`. If you don't have this file, then you need to install `nfs-common` or a similar package. 

Open the file and add the following line:

    /home/youruserid/nfs/ev3dev   192.168.254.*(rw,sync,no_subtree_check,root_squash)

All you need to do is tell nfs which directory you want to share (`/home/youruserid/nfs/ev3dev`) and who you want to share it with (`192.168.254.*`). 

Note that `192.168.254.*` is my personal wifi subnet. For those of you that are trying to set up nfs over USB Ethernet, the default subnet that `ev3dev` expects is `192.168.2.*`.

The options, enclosed in parenthesis, tell nfs to:

 - Allow read/write access
 - Don't process a write request until the previous write is committed to disk
 - Disables subtree checks, more reliable but mild security risk
 - Do not let root on the EV3 to be like root on the host, good idea!

So update the file on your host machine, then run `sudo exportfs -rv` which will update the directories that nfs exports.

Now update the fstab on the EV3 (see below). 

## How To Do It - Windows

Download and Extract WinNFSd. You will have a folder with an executable, license, and readme file.
Open notepad, and enter this line.

    winnfsd.exe -id 0 0 -log off [directory]

Where [directory] is the full path to the folder as it shows in the file explorer. For example, mine is

    winnfsd.exe -id 0 0 -log off E:\Users\James\Dropbox\ev3dev

Save it as all files, name it launch.bat

Now launch launch.bat and the server is running. 

Time to update the fstab on the EV3 (see below). 

## How To Do It - OS X

Setting up an NFS share on a Mac running 10.5 (Leopard) or later is very similar to setting it up in Linux.

On your Mac, simply edit (or create) the `/etc/exports` file (as root), adding a line for each path on your Mac that you wish to share. Here's a simple example:


    #/etc/exports
    /path/to/shared/folder                    -network 192.168.0.0 -mask 255.255.0.0
    /path/to/read_only/shared/folder -ro      -network 192.168.0.0 -mask 255.255.0.0
    /path/to/shared/tree             -alldirs -network 192.168.0.0 -mask 255.255.0.0


The `-network` and `-mask` options limit access to the shared directory to those on the 192.168 subnet. The `-ro` option limits access to read-only, while the `-alldirs` option provides access to all subdirectories of the specified path. 

For this example, I'm going to share the `Public` folder under my userid (of course your userid will be different) and the subnet will be `192.168.2.0` for the case of the USB over Ethernet connection.

    #/etc/exports
    /Users/youruserid/Public -maproot=root:wheel -network 192.168.2.0 -mask 255.255.255.0

Wait, what's that goofy `-maproot=root:wheel` doing there? Well, it's the little hint that Barry has on his page that maps the nfs client's `root` user to the `root` user on the OSX host, and it also maps the `root` group to the OSX `wheel` group. Because BSD has to be, you know, different!

After creating the file, the `nfsd` daemon [should automatically start up][OSXServerNFSExport]. If necessary it can be enabled permanently using `nfsd enable`. You can check to see if it's working with `showmount -e`, which will give you a list of the active NFS shares, like this:

    Exports list on localhost:
    /Users/youruserid/Public                     192.168.2.0

If you make changes to `/etc/exports`, activate them with `nfsd update`.

Now update the fstab on the EV3.  

## How To Do It - EV3

On the EV3 we first need to enable and start NFS modules. Type these commands on the command line:

    systemctl enable nfs-common.service
    systemctl start nfs-common.service
    systemctl enable rpcbind.service
    systemctl start rpcbind.service

Next you'll need to update a file (as root) called `/etc/fstab`. You should have already set up USB Networking, so `ssh` to the EV3 and run an editor like `vi` or `nano` to edit the file. Here's the line you want to add to `/etc/fstab` - DO NOT TOUCH ANYTHING ELSE IN THERE!


    # NOTE - the following examples all use the same IP address for the host, in practice, there would
    #        be separate addresses for each host!

    # For the Linux example, it would look like:
    192.168.2.1:/home/hostuserid/nfs/ev3dev /home/robot/nfs/linux   nfs users,noauto,rw,vers=3  0 0

    # For the Windows Hanewin example, it would look like:
    192.168.0.199:\E\Users\James\Dropbox\ev3dev                       /home/robot/nfs/windows nfs users,noauto,rw,vers=3  0 0

    # For the OSX example, it would look like:
    192.168.2.1:/Users/youruserid/Public    /home/robot/nfs/osx     nfs users,noauto,rw,vers=3  0 0


It's not too hard to figure out what's going on here. The host machine with the nfs mount is at `192.168.2.1` and we added `/home/hostuserid/nfs/ev3dev` (or whatever the host is exporting the directory as) to the `/etc/exports` file on that machine. The next section of the line says we want to mount it locally at `/home/ev3userid/nfs/linux`, or whatever directory you choose.

The options tell `mount` that:

- this is an nfs share
- we do not want to automatically mount it at boot time (in case the host is not connected)
- general users are allowed to mount the share
- we want read/write access
- we are using nfs V3 on the host

Once you've updated the `/etc/fstab` file, you will need to create the mount points. Since I test `ev3dev` o n all three major platforms, I have separate directories for each nfs host. You probably only need to create one of these, but this script creates all three for me:

    mkdir -p ~/nfs/linux
    mkdir -p ~/nfs/windows
    mkdir -p ~/nfs/osx

Then all you need to do is mount the share, like this: 

    mount ~/nfs/linux
    
...or whichever of the above three directories you want to mount.

And then you should be able to see the files on your host computer when you do `ls /home/ev3userid/nfs/ev3dev`!

## References

- [OS X Server: How to configure NFS Exports][OSXServerNFSExport]
- [Barry O'Donavan's NFS Tutorial][BarryODonavanNFS]
- The [Linux `exports`][linuxexports5] manpage
- The [Linux `exportfs`][linuxexportfs8] manpage
- The [OS X `exports`][OSXexports5] manpage
- The [OS X `nfsd`][OSXnfsd] manpage
- The [OS X `showmount`][OSXshowmount] manpage

[OSXServerNFSExport]: http://support.apple.com/kb/HT4695
[BarryODonavanNFS]: https://www.barryodonovan.com/2012/12/12/apple-os-x-as-an-nfs-server-with-linux-clients
[linuxexports5]:  https://linux.die.net/man/5/exports
[linuxexportfs8]: https://linux.die.net/man/8/exportfs
[OSXexports5]: http://www.manpages.info/macosx/exports.5.html
[OSXnfsd]: http://www.manpages.info/macosx/nfsd.8.html 
[OSXshowmount]: http://www.manpages.info/macosx/showmount.8.html
