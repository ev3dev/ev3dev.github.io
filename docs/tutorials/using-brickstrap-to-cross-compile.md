---
title: "Using Brickstrap to Cross-Compile"
subject: "Cross-Compiling"
author: "@dlech"
---

* Table of Contents
{:toc}

Brickstrap is the tool that we use to create the SD card images for ev3dev. But,
it turns out that it is super-useful for working with compiled languages on
the EV3!
{: .lead .clearfix}

## Getting Brickstrap

<div class="panel panel-info">
    <div class="panel-heading">
        <h2 class="panel-title">Official OS Support</h2>
    </div>
<div class="panel-body" markdown="1">
To help preserve our sanity, we are only going to officially
support using brickstrap on one OS, namely Ubuntu trusty. Also, we only
support 64-bit host machines (there are some unresolved issues that prevent
brickstrap from working correctly on 32-bit). So, if you are not already
running [trusty](http://www.ubuntu.com/download/server){: .alert-link},
you will need to install it in a
[virtual machine](https://www.virtualbox.org/wiki/Downloads){: .alert-link}.
We recommend installing the server version because it requires less memory
and you don't need a graphical desktop for what we are doing.

TODO: Need to create a page for setting up a VM and move this info there
because it applies to more than just brickstrap. For now, there is plenty
of documentation on setting up a VM floating around the web - just do a search.

Also, you will find it easier to ssh into the VM so that you can have multiple
terminals open at once rather than trying to use the console in VirtualBox.
To do this, you will want to change the network adapter from NAT (default)
to bridged in the VirtualBox settings before starting the VM.
</div>
</div>

Brickstrap is available as a .deb package from the ev3dev.org package repository.
Once you have trusty up and running, run the following commands to install the
`brickstrap` package.

    sudo apt-key adv --keyserver pgp.mit.edu --recv-keys 2B210565
    sudo apt-add-repository "deb http://archive.ev3dev.org/ubuntu trusty main"
    sudo apt-get update
    sudo apt-get install brickstrap

Next, there are a few things we need to take care of. `brickstrap` uses a
library called `libguestfs` to build the disk image. There is some setup
required to use this.

    # create a supermin appliance
    sudo update-guestfs-appliance
    # add yourself to the kvm group
    # need to log out and back in for this to take effect
    sudo usermod -a -G kvm <username>
    # fix permissions on /boot/vmlinuz*
    sudo chmod +r /boot/vmlinuz*

And you need to add yourself to `/etc/subuid` and `/etc/subgid` to be able to
use uid/gid mapping.

    sudo usermod --add-subuids 200000-265534 --add-subgids 200000-265534 $USER

{% include icon.html type="info" %}
Check out the [brickstrap Github page]{: .alert-link}
for the most up-to-date information on brickstrap.
{: .alert .alert-info}

[brickstrap Github page]: https://github.com/ev3dev/brickstrap

## Creating a Virtual Environment

Now, create an empty directory to work in. You can name it whatever you like.
I am calling it `brickstrap`.

    mkdir brickstrap
    cd brickstrap

Then, build an image. Right now there are 3 *flavors* of ev3dev.
The `-b` option is the "board" definition that is used to build the image
It should either be `ev3-ev3dev-jessie` if you are using the EV3,
`rpi-ev3dev-jessie` for Raspberry Pi 0/1 or `rpi2-ev3dev-jessie` for Raspberry Pi 2.
The `-d` option is the name of the directory that will be created. The `create-rootfs`
command tells brickstrap to build a file system but to not actually create an
image file. This will take 20 to 30 minutes or longer depending on the speed of
your machine and Internet connection.

    brickstrap -b ev3-ev3dev-jessie -d ev3-rootfs create-rootfs

## Working in the Brickstrap Shell

Once `brickstrap` has finished creating the root filesystem, you can get a bash
shell inside of the directory that was created. This is almost like working in
a virtual machine except that qemu is used to run individual commands instead
of the whole thing being run inside of a virtual environment.

    brickstrap -b ev3-ev3dev-jessie -d ev3-rootfs shell

Now, you can install packages and run programs almost just as if you were on the
actual EV3. Don't forget to run `apt-get update` first! For starters, you will
want to install `build-essential`. If you want to use any extra libraries, most 
have `-dev` packages that you will need to install. We should probably setup a
non-root user, but for now, we are going to do everything as (fake)root.

    apt-get install build-essential

There is a magical folder called `host-rootfs` inside the brickstrap shell that
that gives you access to he filesystem of your host machine. You will want to
work there so that you can access the files that create from outside of the
brickstrap shell. This is important because some things, like ssh, will not
work inside the brickstrap shell.

    cd /host-rootfs/home/user

## Sample Program

Let's build the classic hello world.

    mkdir hello
    cd hello
    cat > hello.c << EOF
    #include <stdio.h>
    
    int main(void) {
        printf("Hello World!\n");
        return 0;
    }
    EOF
    gcc -o hello hello.c
    ./hello

Nice. It works inside the brickstrap shell. Now, lets get it onto the EV3. You need to open a new terminal (or exit the brickstrap shell) to do this. You may need to use an IP address instead of `ev3dev` in order to connect.

    user@host:~$ cd ~/hello
    user@host:~/hello$ scp hello user@ev3dev:~/
    user@host:~/hello$ ssh user@ev3dev
    user@ev3dev:~$ ./hello

## Mounting a Remote File System

Of course, you are not going to want to copy your program like this every time
you build it. So, in order to get around this, you can mount part of the
filesystem of your host computer on the EV3.

You have a couple of options to do this:

* [Use nfs](https://github.com/mindboards/ev3dev/wiki/Set-Up-An-nfs-FileShare)
* [Use sshfs] TOTO: find link or write tutorial.

Both of these options essentially do the same thing, just using a different
network protocol. They make files that physically exist on your host computer
available on the EV3 as if they were real files.

Now, you just need two terminals open. One running the brickstrap shell where
you build your program and one connected to the EV3 so that you can run the
program.

## Using GDB

`gdb` is the GNU debugger. TODO: need to find a good link for intro to gdb.

Although it is possible to run gdb directly on the EV3, you will quickly run
out of memory. To get around this, we will do remote debugging.

On your EV3, install `gdbserver`.

    sudo apt-get install gdbserver

And in your brickstrap shell, install `gdb`

    apt-get install gdb

Now, let's debug our hello program. First, we need to make sure we compile with
debugging symbols (thats the `-g` flag). You will need to copy the new
executable to the EV3 too if you haven't done the *mounting a remote file system*
thing yet.

    gcc -g -o hello hello.c

On the EV3, run `gdbserver`. `host` is the name or IP address of your host
computer (or VM) and `3333` is an arbitrary TCP port.

    gdbserver host:3333 hello

Then back in the brickstrap shell run gdb. `target remote` tells gdb to connect
to your EV3. Host name resolution seems to have issues in the brickstrap shell,
so you are better off using the IP address of your EV3 (192.168.0.100 in this
example). And of course, the port number needs to match what you used with
gdbserver.

    gdb hello

This starts an interactive gdb session. You have to type in the commands
on each line that starts with `(gdb)`.

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
    4               printf("Hello World!\n");
    (gdb) c
    Continuing.
    [Inferior 1 (process 1821) exited normally]
    qemu: Unsupported syscall: 26
    (gdb) q

Since gdb is running in an emulated environment using qemu, you will
occasionally see errors like the unsupported syscall above. Most errors don't
seem to cause any problems, but it may limit the use of some features of gdb.

## Using a "Real" Cross-Compiler

If you are compiling a larger project, you will quickly notice that while the
methods above are faster than compiling on the EV3 itself, they are still slow
compared to compiling on your host computer. This is because inside of the
brickstrap shell, it is actually running ARM machine code using an emulator
instead of running a native binary.

So, we can actually use a "real" cross-compiling toolchain to compile much
faster but still use the root file system created by brickstrap as the source
of header files and libraries.

I haven't done this yet with a regular makefile, but I'll use [brickman]
as an example, which uses CMake for the build system.

[brickman]: https://github.com/ev3dev/brickman

### Example using Vala and CMake 3.x

First, we will assume that you ran brickstrap as described above to create a
root file system on your host computer at `/home/user/work/ev3-rootfs`.
While we are talking about the root files system, let's get is setup. Do this
in the brickstrap shell (see above if you don't remember how to start the
brickstrap shell).

    nano /etc/apt/sources.list

We need to edit source package repositories. Edit the file so that it looks like
this...

    deb http://cdn.debian.net/debian jessie main contrib non-free
    deb-src http://cdn.debian.net/debian jessie main contrib non-free

    deb http://archive.ev3dev.org/debian jessie main
    deb-src http://archive.ev3dev.org/debian jessie main

Save the changes, then run...

    apt-get update
    apt-get build-dep brickman
    apt-get install symlinks

This will install all of the package that are needed when building brickman.
Now, for a very important part. Some libraries use absoloute symlinks, which is
bad for us when we are cross compiling because we are accessing files in the
root file system created by brickstrap from outside of the brickstrap shell.
This is why we installed the `symlinks` package. Simply run...

    symlinks -c /usr/lib/arm-linux-gnueabi

This will change any absolute links to relative links and save us a bunch of
trouble later. This should be all that we need to do inside of the brickstrap
shell.

You will also need to install a cross compiler toolchain and and some other build
tools on your host computer (not in brickstrap shell)...

    sudo apt-get install gcc-arm-linux-gnueabi g++-arm-linux-gnueabi cmake valac pkg-config

{% include icon.html type="warning" %}
These cross-compiler packages are only available on Ubuntu. Sorry Debian users.
{:.alert .alert-warning}

And we need to download the brickman source code...

    cd ~/work
    git clone https://github.com/ev3dev/brickman.git

The source code will be downloaded to `/home/user/work/brickman`, but don't
switch to that directory. We are going to build "out of tree" (that means in
another directory that is not the source code directory). Let's make that
directory now - and a couple more files too.

    mkdir build-area
    touch arm-linux-gnueabi.cmake
    touch ev3-rootfs-cross.env

Use your favorite text editor to edit the two empty files we just created with
`touch`. First, `arm-linux-gnueabi.cmake` should look like this...

    set(CMAKE_SYSROOT /home/user/work/ev3-rootfs)

    set(CMAKE_SYSTEM_NAME Linux)

    set(CMAKE_C_COMPILER arm-linux-gnueabi-gcc)
    #set(CMAKE_CXX_COMPILER arm-linux-gnueabi-g++)

    set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
    set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
    set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
    set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)

This will tell CMake to use programs on our host computer (which is why we had
to install `valac` and `pkg-config` on the host computer). But, it will look
for header files and libraries inside of the root file system we created with
brickstrap. And, of course, it tells us to use the cross-compiler too.

The `ev3-rootfs-cross.env` file needs to look like this...

    SYSROOT_PATH=/home/user/work/ev3-rootfs

    export PKG_CONFIG_ALLOW_SYSTEM_CFLAGS=1
    export PKG_CONFIG_ALLOW_SYSTEM_LIBS=1
    export PKG_CONFIG_SYSROOT_DIR=${SYSROOT_PATH}
    export PKG_CONFIG_LIBDIR=${SYSROOT_PATH}/usr/lib/arm-linux-gnueabi/pkgconfig
    export PKG_CONFIG_LIBDIR=${PKG_CONFIG_LIBDIR}:${SYSROOT_PATH}/usr/lib/pkgconfig
    export PKG_CONFIG_LIBDIR=${PKG_CONFIG_LIBDIR}:${SYSROOT_PATH}/usr/share/pkgconfig
    export PKG_CONFIG_LIBDIR=${PKG_CONFIG_LIBDIR}:${SYSROOT_PATH}/usr/local/lib/arm-linux-gnueabi/pkgconfig
    export PKG_CONFIG_LIBDIR=${PKG_CONFIG_LIBDIR}:${SYSROOT_PATH}/usr/local/lib/pkgconfig
    export PKG_CONFIG_LIBDIR=${PKG_CONFIG_LIBDIR}:${SYSROOT_PATH}/usr/local/share/pkgconfig

    export XDG_DATA_DIRS=${SYSROOT_PATH}/usr/local/share:${SYSROOT_PATH}/usr/share

These set environment variables so that pkg-config and vala will search for
files inside of our root file system instead of the usual places on the host
computer. To make these actually take effect, run...

    source ev3-rootfs-cross.env

Now, lets actually try to build something...

    cd build-area
    cmake ../brickman -DCMAKE_TOOLCHAIN_FILE=../arm-linux-gnueabi.cmake
    make

If all went well, you should end up with a `brickman` binary that you can
copy to your EV3 and run.

### Example using Makefiles

I haven't actually done this yet, so feel free to edit this page and add more
info. The basic gist is that you need to have something like this...

    PROGRAM = my-program
    CROSS_COMPILE = arm-linux-gnueabi-
    SYSROOT = /home/user/work/ev3-rootfs

    CC=$(CROSS_COMPILE)gcc
    LD=$(CROSS_COMPILE)ld
    CFLAGS= --sysroot=$(SYSROOT) -g -I$(SYSROOT)/usr/include

    all: $(PROGRAM)

    LIBDIR = -L=/usr/lib/arm-linux-gnueabi
    #LIBDIR = -L$(SYSROOT)/usr/lib/arm-linux-gnueabi

    LIBS = -lpthread

    LDFLAGS= $(LIBDIR) $(LIBS)
    SOURCE = my_program.c

    OBJS = $(SOURCE:.c=.o)

    $(PROGRAM): $(OBJS)
        $(CC) -o $@ $(OBJS) $(LDFLAGS)

    clean:
        -rm -f $(OBJS) $(PROGRAM)

The important points are that you:

* Use `arm-linux-gnueabi-gcc` for the compiler and `arm-linux-gnueabi-ld` for
  the linker.
* Pass the `--sysroot=$(SYSROOT)` option to the compiler and point it to the
  root file system created by brickstrap.
* The `=` in `-L=` means search for libraries relative to `$(SYSROOT)`. You could
  optionally specify the full path.
* The path to include files need to include `$(SYSROOT)` as well.
