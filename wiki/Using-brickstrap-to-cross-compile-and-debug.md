---
title: Using brickstrap to cross compile and debug
index: wiki
---

`brickstrap` is the tool we use to create the SD card images for ev3dev. But, it turns out that it is super-useful for working with compiled languages on the EV3!

## Getting brickstrap

`brickstrap` is available as a .deb package from the ev3dev.org package repository. To help preserve our sanity, we are only going to officially support using brickstrap on one OS, namely Ubuntu trusty (or maybe Debian wheezy - we haven't decided for sure yet). So, if you are not already running [trusty](http://www.ubuntu.com/download/server), you will need to install it in a [virtual machine](https://www.virtualbox.org/wiki/Downloads). We recommend installing the server version because it requires less memory and you don't need a graphical desktop for what we are doing.

TODO: Need to create a page for setting up a VM and move this info there because it applies to more than just brickstrap. For now, there is plenty of documentation on setting up a VM floating around the web - just do a search.

Also, you will find it easier to ssh into the VM so that you can have multiple terminals open at once rather than trying to use the console in VirtualBox. To do this, you will want to change the network adapter from NAT (default) to bridged in the VirtualBox settings before starting the VM.

Once you have trusty up and running, run the following commands to install the `brickstrap` package.

    user@host:~$ sudo apt-key adv --keyserver pgp.mit.edu --recv-keys 2B210565
    user@host:~$ sudo apt-add-repository http://ev3dev.org/debian
    user@host:~$ sudo apt-get update
    user@host:~$ sudo apt-get install brickstrap

Next, there are a few things we need to take care of. `brickstrap` uses a library called `libguestfs` to build the disk image. There is some setup required to use this.

    # create a supermin appliance
    sudo update-guestfs-appliance
    # add yourself to the kvm group
    # need to log out and back in for this to take effect
    sudo usermod -a -G kvm <username>
    # fix permissions on /boot/vmlinuz*
    sudo chmod +r /boot/vmlinuz*

**Note:** The official `libguestfs` package in trusty is broken. We have a patached version in the ev3dev.org package repository. Please make some noise on [this bug](https://bugs.launchpad.net/ubuntu/+source/libguestfs/+bug/1320590) by clicking the link that says "Does this affect you too?" (or leave a comment if you have something useful to say, besides "me too"). Same thing with the official `multistrap` package in ubuntu. It is broken too and we have our own version. So, make some noise on [this bug](https://bugs.launchpad.net/ubuntu/+source/multistrap/+bug/1313787) too. If we can get ubuntu folks to update the packages, then there are 2 less packages that we have to maintain.

Now, create an empty directory to work in. You can name it whatever you like. I am calling it `work`.

    user@host:~$ mkdir work
    user@host:~$ cd work

Then, build an image. Right now there are 2 *flavors* of ev3dev - ev3dev (wheezy) and ev3dev-next (jessie). The `-b` option is the "board" definition that is used to build the image. It should either be `ev3dev-wheezy` or `ev3dev-jessie` (default). You need to pick the one that matches what you have installed on your EV3. The `-d` option is the name of the directory that will be created. The `all` command tells brickstrap to build a complete image. This will take 20 to 30 minutes or longer depending on the speed of your machine.

    user@host:~/work$ brickstrap -b ev3dev-jessie -d ev3dev-work all

## Working in the brickstrap shell

Once brickstrap has finished, you can get a bash shell inside of the directory that was created. This is almost like working in a virtual machine except that qemu is used to run individual commands instead of the whole thing being run inside of a virtual environment.

    user@host:~/work$ brickstrap -b ev3dev-jessie -d ev3dev-work shell

Now, you can install packages and run programs almost just as if you were on the actual EV3. For starters, you will want to install `build-essential`. If you want to use any extra libraries, most have `-dev` packages that you will need to install. We should probably setup a non-root user, but for now, we are going to do everything as (fake)root.

    root@host:~# apt-get install build-essential

There is a magical folder called `host-rootfs` inside the brickstrap shell that that gives you access to he filesystem of your host machine. You will want to work there so that you can access the files that create from outside of the brickstrap shell. This is important because some things, like ssh, will not work inside the brickstrap shell.

    root@host:~# cd /host-rootfs/home/user

## Sample program

Let's build the classic hello world.

    root@host:/host-rootfs/home/user# mkdir hello
    root@host:/host-rootfs/home/user# cd hello
    root@host:/host-rootfs/home/user/hello# cat > hello.c << EOF
    #include <stdio.h>
    
    int main(void) {
        printf("Hello World!\n");
        return 0;
    }
    EOF
    root@host:/host-rootfs/home/user/hello# gcc -o hello hello.c
    root@host:/host-rootfs/home/user/hello# ./hello

Nice. It works inside the brickstrap shell. Now, lets get it onto the EV3. You need to open a new terminal (or exit the brickstrap shell) to do this. You may need to use an IP address instead of `ev3dev` in order to connect.

    user@host:~$ cd ~/hello
    user@host:~/hello$ scp hello user@ev3dev:~/
    user@host:~/hello$ ssh user@ev3dev
    user@ev3dev:~$ ./hello

## Mounting a remote file system

Of course, you are not going to want to copy your program like this every time you build it. So, in order to get around this, you can mount part of the filesystem of your host computer on the EV3.

You have a couple of options to do this:
* [Use nfs](https://github.com/mindboards/ev3dev/wiki/Set-Up-An-nfs-FileShare)
* [Use sshfs]()

Both of these options essentially do the same thing, just using a different network protocol. They make files that physically exist on your host computer available on the EV3 as if they were real files.

Now, you just need two terminals open. One running the brickstrap shell where you build your program and one connected to the EV3 so that you can run the program.

## Using gdb

`gdb` is the GNU debugger. TODO: need to find a good link for intro to gdb.

Although it is possible to run gdb directly on the EV3, you will quickly run out of memory. To get around this, we will do remote debugging.

On your EV3, install `gdbserver`.

    user@ev3dev:~$ sudo apt-get install gdbserver

And in your brickstrap shell, install `gdb`

    user@host:~$ sudo apt-get install gdb

Now, let's debug our hello program. First, we need to make sure we compile with debugging symbols (thats the `-g` flag). You will need to copy the new executable to the EV3 too if you haven't done the *mounting a remote file system* thing yet.

    user@host:~/hello$ gcc -g -o hello hello.c

On the EV3, run `gdbserver`. `host` is the name or IP address of your host computer (or VM) and `3333` is an arbitrary TCP port.

    user@ev3dev:~$ gdbserver host:3333 hello

Then back in the brickstrap shell run gdb. `target remote` tells gdb to connect to your EV3. Host name resolution seems to have issues in the brickstrap shell, so you are better off using the IP address of your EV3 (192.168.0.100 in this example). And of course, the port number needs to match what you used with gdbserver.

    user@host:~/hello$ gdb hello
    ...
    Reading symbols from /host-rootfs/home/david/work/brickdm/build/hello...done.
    ...
    (gdb) target remote 192.168.0.100:3333
    Remote debugging using 192.168.0.144:1234
    ...
    (gdb) break hello.c:4
    Breakpoint 1 at 0x8428: file hello.c, line 4.
    (gdb) c
    Continuing.
    
    Breakpoint 1, main () at hello.c:4
    4	            printf("Hello World!\n");
    (gdb) c
    Continuing.
    [Inferior 1 (process 1821) exited normally]
    qemu: Unsupported syscall: 26
    (gdb) q

Since gdb is running in an emulated environment using qemu, you will occasionally see errors like the unsupported syscall above. Most errors don't seem to cause any problems, but it may limit the use of some features of gdb.
