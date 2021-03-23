---
title: "Using Docker to Cross-Compile"
group: cross-compiling
author: "@dlech"
---

* Table of Contents
{:toc}

[Docker] is a light-weight virtual machine with excellent cross-platform support.
This allows us to run something very close to the ev3dev OS on any desktop or
notebook computer. This means that we get the same versions of all of the libraries
running on the EV3 but compile with the power of a desktop processor.
{: .lead .clearfix}

[Docker]: https://www.docker.com/

{% include /style/icon.html type="warning" %}
This will only work on 64-bit operating systems. We do not maintain images for
32-bit operating systems.
{:.alert .alert-warning}


## Getting Docker

Docker has excellent documentation, so we will just send you to their
[install](https://docs.docker.com/install/) page. Come back when you have
Docker installed for Windows, Mac or Linux.
{: .well}

{% include /style/begin-panel.html type="info" heading="Linux" %}

Docker for Linux has quite a bit of information to read. This may help you sort
through it. The most important parts are:

* Add the Docker package repository
* Install the `docker-ce` package
* Add your user to the `docker` group
 
Also, you will need to install `qemu-user-static` on your host computer, otherwise
you will get an error: `exec user process caused "exec format error"`.

{% include /style/end-panel.html %}

## Download the ev3dev cross-compiler image

We provide a Docker image with the most common developer tools already installed.
Download it by running...

    docker pull ev3dev/debian-stretch-cross

This will take some time. The download is nearly 1GB!


When it is finished, we can give it a shorter name...

    docker tag ev3dev/debian-stretch-cross ev3cc

{% include /style/icon.html type="info" %}
Docker images are immutable. You can always revert back to this image after making
changes without having to download it again.
{:.alert .alert-info}

You can see a list of images you have downloaded by running...

    docker images

... and delete them with...

    docker rmi <image-name-or-hash>

But don't delete the one you just downloaded yet!


## Hello World!

Let's do the classic hello world program in C. Create a new, empty directory
wherever you like. In your favorite text editor, paste this and save it as
`hello.c`. For this example, we will be using `C:\Users\myname\example\hello.c`.

{% highlight c %}
#include <stdio.h>

int main(int argc, const char *argv[])
{
    printf("Hello World!\n");

    return 0;
}
{% endhighlight %}

{% include /style/icon.html type="warning" %}
If you are using Windows, you must explicitly allow [shared drives in the Docker
control panel first][shared-drives]{: .alert-link}!
{: .alert .alert-warning}

[shared-drives]: https://docs.docker.com/docker-for-windows/#/shared-drives

{% include /style/begin-panel.html type="info" heading="Docker Toolbox" %}
Unless you are using Windows 10 Pro edition, you may have received the following error when trying to install Docker using `Install Docker.msi`:

`HyperV is not available on home editions. Please use Docker Toolbox.`

This is fine, you can just [download Docker Toolbox instead][docker-toolbox]{: .alert-link}.

Docker Toolbox however handles shared drives differently; there is no whale icon in the system tray. Instead, Docker Toolbox automatically allows sharing of your `C:\Users\myname` folder. Also, the path handling is different, you have to use paths in linux style, so the command below has to be changed:

`docker run --rm -it -v /c/Users/myname/example/:/src -w /src ev3cc`
{% include /style/end-panel.html %}

[docker-toolbox]: https://www.docker.com/products/docker-toolbox

Now, we compile using the docker image. First we run a new docker container...

    docker run --rm -it -v C:\Users\myname\example\:/src -w /src ev3cc

Let's break down the command:

* `run` means we are running a new container.
* `--rm` indicates that we want to throw away the container when we are done.
  If you don't do this, docker saves a new container from each `run` command,
  which takes up space on your hard drive.
* `-it` is two options, it means "interactive" and "tty". This will let us use
  the command prompt inside of the container.
* `-v <host-path>:<container-path>` lets us use a directory from our host computer
  inside of the container.
* `-w <container-path>` is the working directory inside of the container.
* `ev3cc` is the name of the docker image we are using.

Now we can compile our program...

    arm-linux-gnueabi-gcc -o hello hello.c

Note: For BeagleBone and Raspberry Pi 2/3 use `gnueabihf` instead of `gnueabi`.

Since this program does not depend on any hardware drivers, we can actually run
this program inside of the Docker container! There are some caveats though...
You must be running Docker >= 1.12 and if you are using a Linux host you must
have the proper format registered with `binfmt_misc`.

    ./hello

This will output:

    Hello World!

Also, a binary file called `hello` will now exist in `C:\Users\myname\example`
on your host computer. You can copy this file to your EV3 and run it!

To exit the docker container, simply type...

    exit

Note: if encountered `/lib/ld-linux.so.3: No such file or directory` error while
running `./hello` in the docker environment, try 
`qemu-arm-static -L /usr/arm-linux-gnueabi/ ./hello`

## Advanced Usage

If you need to install additional libraries, you need to be sure to install
the `armel` version (or `armhf` for BeagleBone and Raspberry Pi 2/3). Example:

    sudo apt-get install libsomething-dev:armel

It is best to create a [Dockerfile] to do this so that you can repeat the
process easily and share it with others. Here is an [example] on how you might
do this.

The same example also shows a trick of how to keep a Docker container running
so that you can run builds without starting a new container each time.

[Dockerfile]: https://docs.docker.com/engine/reference/builder/
[example]: https://github.com/ev3dev/lms2012-compat/tree/ev3dev-jessie/docker


## Using GDB

`gdb` is the GNU debugger. _TODO: need to find a good link for intro to gdb._

Although it is possible to run gdb directly on the EV3, you will quickly run
out of memory. To get around this, we will do remote debugging.

Let's debug our "hello world" program. First, we need to make sure we compile
with debugging symbols (thats the `-g` flag). You will need to copy the new
executable to the EV3 too if you haven't done the *mounting a remote file system*
thing yet.

    arm-linux-gnueabi-gcc -g -o hello hello.c

On the EV3, run `gdbserver`. `host` is the name or IP address of your host
computer (or VM) and `3333` is an arbitrary TCP port.

    gdbserver host:3333 hello

Then back in the docker container run gdb. `target remote` tells gdb to connect
to your EV3. If you have trouble connecting by hostname, you can use the IP
address of your EV3 instead (192.168.0.100 in this example). And of course, the
port number needs to match what you used with gdbserver.

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
