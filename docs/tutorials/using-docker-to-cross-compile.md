---
title: "Using Docker to Cross-Compile"
subject: "Cross-Compiling"
author: "@dlech"
---

* Table of Contents
{:toc}

[Docker] is a light-weight virtual machine with excellent cross-platform support.
This allows us to run something very close to the ev3dev OS on any desktop or
notebook computer. This means that we get the same versions of all of the libraries
running on the EV3 but compile with the power of a desktop processor.
{: .lead .clearfix}

We are totally new to Docker, so this tutorial is a work in progress. Please
let us know if you have problems or find a better way of doing it!
{: .lead .well}

[Docker]: http://www.docker.com/

{% include icon.html type="warning" %}
This will only work on 64-bit operating systems. We do not maintain images for
32-bit operating systems.
{:.alert .alert-warning}


## Getting Docker

Docker has excellent documentation, so we will just send you to their
[download](http://www.docker.com/products/docker) page. Come back when you have
Docker installed for Windows, Mac or Linux.
{: .well}

<div class="panel panel-info" markdown="1">
{% include icon.html type="info" %}
Linux
{:.panel-heading}

<div class="panel-body" markdown="1">
Docker for Linux has quite a bit of information to read. This may help you sort
through it. The most important parts are:

* Add the Docker package repository
* Install the `docker-engine` package
* Add your user to the `docker` group
</div>
</div>


## Download the ev3dev cross-compiler image

We provide images with developer tools already installed. Grab the one appropriate
for your hardware...

    docker pull ev3dev-docker-docker.bintray.io/debian-jessie-armel-cross

This will take some time. The download is hundreds of megabytes.


When it is finished, we can give it a shorter name...

    docker tag ev3dev-docker-docker.bintray.io/debian-jessie-armel-cross ev3cc

{% include icon.html type="info" %}
Docker images are immutable. You can always revert back to this image after making
changes without having to download it again.
{:.alert .alert-info}

You can see a list of images you have downloaded by running...

    docker images

... and delete them with...

    docker rmi <image-name-or-hash>


## Hello World!

Let's do the classic hello world program in C. Create a new, empty directory
wherever you like. In your favorite text editor, paste this and save it as
`hello.c`. For this example, we will be using `C:\Users\myname\example\hello.c`.

    #include <stdio.h>
    
    int main(int argc, const char *argv[])
    {
        printf("Hello World!\n");

        return 0;
    }

{% include icon.html type="warning" %}
If you are using Windows, you must explicitly allow [shared drives in the Docker
control panel first][shared-drives]{: .alert-link}!
{: .alert .alert-warning}

[shared-drives]: https://docs.docker.com/docker-for-windows/#/shared-drives

Now, we compile using the docker image. First we run a new docker container...

    docker run --rm -it -v C:\Users\myname\example\:/home/compiler/example ev3cc

Let's break down the command:

* `run` means we are running a new container.
* `--rm` indicates that we want to throw away the container when we are done.
  If you don't do this, docker saves a new container from each `run` command,
  which takes up space on your hard drive.
* `-it` is two options, it means "interactive" and "tty". This will let us use
  the command prompt inside of the container.
* `-v <host-path>:<container-path>` lets us use a directory from our host computer
  inside of the container.
* `ev3cc` is the name of the docker image we are using.

In the docker container, we are logged in as a user named `compiler` and start
in the `/home/compiler` directory (`~` for short). First we need to go to our
`example` directory...

    cd example

And we can compile our program...

    gcc hello.c -o hello

Since this program does not depend on any hardware drivers, we can actually run
this program inside of the docker container!

    ./hello

This will output:

    Hello World!

Also, a binary file called `hello` will now exist in `C:\Users\myname\example`
on your host computer. You can copy this file to your EV3 and run it!

To exit the docker container, simply type...

    exit


## Using the "Real" Cross-Compiler

In the hello world example above, we used the `gcc` command to compile our program.
This is actually an ARM executable file that is being run using QEMU to emulate
the ARM architecture. We didn't notice because our example was so small, but this
can be very slow for large programs.

However, our image has a "real" cross-compiler. This is a version of `gcc` that
runs natively on x86_64 hardware but produces binaries that run on ARM hardware.
To use this version of `gcc` instead, there are a couple things we need to do.

First, let's make a variable to save some typing because the cross-compiler has
a very long path name.

    export CC=/opt/gcc-linaro-5.3-2016.02-x86_64_arm-linux-gnueabi/bin/arm-linux-gnueabi-gcc

Now we can compile using the cross-compiler. It is important to add the `--sysroot`
option because by default the cross-compiler looks in its own system root directory
instead.

    $CC --sysroot=/ hello.c -o hello


## Using GDB

`gdb` is the GNU debugger. _TODO: need to find a good link for intro to gdb._

Although it is possible to run gdb directly on the EV3, you will quickly run
out of memory. To get around this, we will do remote debugging.

On your EV3, install `gdbserver`.

    sudo apt-get install gdbserver

And in your docker container, install `gdb` (or use `arm-linux-gnueabi-gdb` in
the cross-compiler directory in `/opt`):

    sudo apt-get install gdb

Now, let's debug our "hello world" program. First, we need to make sure we compile
with debugging symbols (thats the `-g` flag). You will need to copy the new
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
on each line that starts with `(gdb)`; the other lines are output and
you should not type them.

    ...
    Reading symbols from /host-rootfs/home/david/work/brickdm/build/hello...done.
    ...
    (gdb) target remote 192.168.0.100:3333
    Remote debugging using 192.168.0.144:1234
    ...
    (gdb) break hello.c:5
    Breakpoint 1 at 0x8428: file hello.c, line 5.
    (gdb) c
    Continuing.
    
    Breakpoint 1, main () at hello.c:5
    5               printf("Hello World!\n");
    (gdb) c
    Continuing.
    [Inferior 1 (process 1821) exited normally]
    qemu: Unsupported syscall: 26
    (gdb) q

Since gdb is running in an emulated environment using qemu, you will
occasionally see errors like the unsupported syscall above. Most errors don't
seem to cause any problems, but it may limit the use of some features of gdb.


## Example: Building the brickman Package

This is how you can use docker to build the [brickman](https://github.com/ev3dev/brickman)
package from source.

First, we assume you have already pulled the cross-compiler image as described
above. Then we need to get the source code. Run this wherever you would like to
save the code. For this tutorial, we will assume `C:\Users\myname`. We also
create a new empty directory to hold the build output.

    git clone --recursive https://github.com/ev3dev/brickman brickman-src
    mkdir brickman-build

Now, we are going to create a new image based on that that includes the
build dependencies. If you do this often, you will want to create a `Dockerfile`
instead, but for this tutorial, we will do it manually by creating a docker
container and saving the result as a new image. Let's start a new container...

    docker run --name brickman -it ev3cc

The `--name` option will give our container a name, otherwise docker generates
a random name. In the container, install the build dependencies...

    sudo apt-get update
    sudo apt-get build-dep brickman
    exit

Then we save the container as a new image. We can also delete the container once
the image is saved.

    docker commit brickman brickman-ev3
    docker rm brickman

We now have a new image named `brickman-ev3`. Now, lets start a new container
for building...

    docker run --rm -it -v c:\Users\myname\brickman-src:/src -v c:\Users\myname\brickman-build:/build brickman-ev3

This runs a new container with our source code at `/src` and our empty directory
at `/build`. In the container, we build...

    cd /build
    cmake /src -DCMAKE_TOOLCHAIN_FILE=/opt/gcc-linaro-5.3-2016.02-x86_64_arm-linux-gnueabi/toolchain.cmake
    make
    mkdir install
    DESTDIR=install make install
    exit

The `CMAKE_TOOLCHAIN_FILE` option sets the appropriate options in `cmake` to
make use of the cross-compiler to speed things up. We also created a new
`install` directory. This will contain the files that need to be copied to
the EV3 to actually run the program.
