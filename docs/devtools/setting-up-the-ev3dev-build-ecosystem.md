---
title: Setting Up The `ev3dev` Build Ecosystem
subject: Development Setup
---

* Table of Contents
{:toc}

This is a set of notes that are helpful to get the full [ev3dev][ev3dev]
development environment up and running. It assumes that you
are comfortable with:

1. Basic Linux command line usage
1. Installing Linux software from packages
1. Setting up a [VirtualBox][VirtualBox] VM
1. Setting up a web server
1. Setting up `nfs` to share folders

## Why Use Virtual Machines For Development

I like to use VMs for development - it lets me make sure that programs
and procedures work on mulitple platforms.

If you develop programs on multiple VMs, it can use a LOT of disk space
if the source is duplicated for each VMs. Instead, I keep the source
(usually in a git repo) on the host and
use nfs to make directories available on the VMs. With a regular
spinning disk and a slow laptop, this made builds slower. Now that I
have a faster laptop with an SSD, it's not such a big deal.

There's another advantage that you might not have considered
either - you only need to keep track of your source in one place
and you can edit and navigate the source using your host machine's
tools instead of having to manually install them in each VM.

## Building the Kernel

I keep the `ev3dev-kernel` and `ev3dev-buildscripts` source as a
git repo on the host in:

- `~/Downloads/gitRepos/ev3dev-kernel`
- `~/Downloads/gitRepos/ev3dev-buildscripts`

Before you can actually build the kernel, you need to install the
required tools. Again, it's a tossup on how you want to manage the
executables - the ARM toolchain is pretty big so I tend to put it
on the host and then share it across VMs.

The [ev3dev-buildscripts][ev3dev-buildscripts] repository already
has a script called `install-kernel-build-tools` that you can run
as-is on your virtual machine. If you want to install the ARM toolchain
on your host computer then just run the script and use the intructions
in the README for [ev3dev-buildscripts][ev3dev-buildscripts] to
build the kernel.

If you want to install the ARM toolchain on your host computer
and then share it, the easiest way is actually to install it on
one your target virtual machine and then copy the result out
to the host.

I'm assuming that the target VM is already set up for developing
the `ev3dev` kernel.

    # Do this on your target VM!
    #
    sudo apt-get -y --no-install-recommends install code-sourcery-toolchain-arm-2011.03
    sudo mv /opt/arm-2011.03 $HOME/projects

Now the `arm-2011.03` folder should appear in the folder corresponding to
your VM on your host machine - in this case `/path/to/nfs/ev3dev-tahr64` - and
it still has `root` ownership. All we need to do is put it up in `/opt` on
the host and make it available to other VMs using the `/etc/exportfs` folder.

    # Do this on your host computer
    #
    sudo mv /path/to/nfs/ev3dev-tahr64/arm-2011.03 /opt

OK, now we have the `ev3dev-kernel` source, the `ev3dev-buildscripts` scripts,
and the `arm-2011.03` on the host machine, all we need to do is make them 
available on the VM target. As `root` on your host machine, edit `/etc/exports`
so that it has these extra lines:

    # host /etc/exports additions - substitute use your own userid
    #
    /home/userid/Downloads/gitRepos/ev3dev-kernel       192.168.56.*(rw,sync,no_subtree_check,no_root_squash)
    /home/userid/Downloads/gitRepos/ev3dev-buildscripts 192.168.56.*(rw,sync,no_subtree_check,no_root_squash)
    /opt/arm-2011.03                                    192.168.56.*(rw,sync,no_subtree_check,no_root_squash)

You'll need to update the `export`ed directories afterwards:

    sudo exportfs -r
    sudo exportfs -u

And on your VM, edit the `/etc/fstab` to mount those exported directories:

    # vm /etc/fstab additions - substitute use your own userid
    #
    192.168.56.1:/home/userid/nfs/ev3dev-tahr64                      /home/userid/projects            nfs vers=3 0 0
    192.168.56.1:/home/userid/Downloads/gitRepos/ev3dev-kernel       /home/userid/ev3dev-kernel       nfs vers=3 0 0
    192.168.56.1:/home/userid/Downloads/gitRepos/ev3dev-buildscripts /home/userid/ev3dev-buildscripts nfs vers=3 0 0
    192.168.56.1:/opt/arm-2011.03                                    /opt/arm-2011.03                 nfs vers=3 0 0


And then create the mountpoints and automount the new shares:

    mkdir -p ~/ev3dev-kernel
    mkdir -p ~/ev3dev-buildscripts

    sudo mkdir -p /opt/arm-2011.03
    sudo mount -a

Finally, you'll need to install a few additional packages on your VM
to do a full kernel build:

    # Install missing kernel build tools on the vm:
    #
    sudo apt-get --no-install-recommends install ncurses-dev libc6-i386 bc u-boot-tools fakeroot

Now you can go ahead and build the kernel by following the directions 
on the official [ev3dev-buildscripts][ev3dev-buildscripts] page. There
are also directions for repackaging the kernel for distribution.

## Overview of brickstrap

The [`brickstrap`][brickstrap] tool is used to build the root filesystem
that will eventually become the SD card image used to run `eve3dev` on
the LEGO MINDSTORMS EV3. It's pretty much a hands-off script once you have the
whole ecosystem setup. If you are interested in building your own SD card
image, or if you want to compile programs that will run under `ev3dev` without
installing a compiler on the EV3, then you'll need to use `brickstrap`.
 
You can do it the "easy" way and just run `brickstrap` from your main
development machine, or you can run it from your development VM - I choose
the latter option to make it easier to isolate issues and to make the
VM more portable to other machines. No matter which way you do it, you'll probably
make mistakes and need to build the SD card image more than once, and each
time you build the image you'll need to download 100's of MB of package files.

If you want to save time and bandwidth, you'll spend some time up front
and set up an ecosystem that lets you download the package files once, and
then serve them up locally whenever you need them. To do this you'll need
a webserver and a partial mirror of the repositories where the packages
are normally loaded from.

If you don't care about time and network bandwidth, skip the sections on
setting up a webserver and local package repository.

## Set Up A Webserver

You can use pretty much any webserver that supports the concept of virtual
hosts. We'll be directing virtual host names like `http://ev3dev.jessie.armel.hostname.com`
to bind to the default VirtualBox host-only interface at `192.168.56.1`. Each
of the virtual hostnames will be served up from a different directory.

I happen to like [Hiawatha][Hiawatha] for this task because it's lightweight, easy to 
configure, and rock solid. We'll get into the specific steps later, for now
you need to think about which webserver you'll want to use - maybe your host
machine already has one.

## Set Up A Local Package Repository

Believe me when I say you'll be happy for the improved image build times
if you set up a local package repository now. Fortunately this is nowhere
near as complex as it sounds because of two tools that you can install
on your host machine:

```
apt-get --no-install-recommends install germinate reprepro
```

The [`germinate`][germinate] tool takes a list of the top level packages that you want
to have on the SD card image and generates a list of all the required dependencies.
We'll massage the output of `germinate` to create a package list that can
be used to set up the local repositories using `reprepro`. Let's start with
the `germinate` setup.

### Seeds and Crops and Packages

If there's one thing I get a kick out of, it's a good metaphor. The idea of
`germinate` is to provide a list of _seed_ packages from which we can
create a complete required package list. I've extended the metaphor a bit
further because I actually need to create a number of package lists that are
satisfied by different repositories:

- The official Debian package repository
- The ev3dev specific package repository
- The third party repos for other source packages

Naturally, these repositories are accessed via different URLs on the
web, so I've added the concept of _farms_ to the metaphor. Each farm
stores a `conf` file that is used to tell `germinate` where it should
try to get the package dependency files that it needs.

The whole thing is tied together by a script called `grow_crop` - it takes 
the name of a farm (which matches the name of the corresponding seed directory)
and creates output in a corresponding folder in the `crops` directory. You
can delete the `crops` folder any time you like, the `grow_crop` script will
regenerate the `crops` file structure if needed.

The easiest way to get the folders all set up for `ev3dev` is to grab the
files from the [`growrepo`][growrepo] repository on GitHub - it contains the files I
have used to build the SD card image for `ev3dev` according to this
`STRUCTURE`:

    required:
    minimal: required
    standard: required minimal
    custom:
    blacklist:
    supported

Each of the files in the specific `seeds` folder contains a list of packages
that looks something like this:

     * apt
     * conspy
     * dosfstools
     ...

Note the ` * ` at the beginning of each line - in particular the space in
front of the asterix! Where do we get this list of packages - from the
`packages` folder in the board specific folder in the `brickstrap` package.

I just do something like this to create the required package list:

    cat ev3dev-jessie/packages/* | sed 's/^/ * /' > path/to/seed/required

Later on we'll talk about adding packages to the other package list files
as needed.  To grow the crops that we're going to need to populate the local
mirrors, we do the following:

    /path-to-script/grow_crop ev3dev.debian.jessie.armel
    /path-to-script/grow_crop ev3dev.ev3dev.jessie.armel

This will create a bunch of output in the corresponding `crops` folders. These
files will contain formatted output that contains all the packages you'll
need for each crop in `required`, and incrementally more packages in `minimal`
and `standard`.

### Harvesting Crops and Populating a Local Mirror

To actually populate and update the local mirrors, the [`growrepo`][growrepo]
repository has an additional helper
script called `harvest_crops` that strips the package names from the
formatted output of `germinate`. You pass it the name of the farm that grew the
crops, and which crops to harvest, like this:

    /path-to-script/harvest_crop ev3dev.ev3dev.jessie.armel minimal required

This will spit out to standard output a list of packages that will reproduce
the packages you'll want to install.

For bonus points, you can pipe the result through `sort` before writing the
output to the package file for `reprepro`. If you're still with me, you'll
know we have not yet discussed `reprepro` - so let's move on with that and 
then tie everything together at the end.

## Set Up The reprepro System

Now we can focus on setting up [`reprepro`][reprepro] which is really not very difficult
at all. Recall that when we set up the `germinate` ecosystem, we used the
idea of "farms" to grow the package lists. We will re-use this idea and give
the local repositories their own directories - and the name will be the
same as the farm.

Using the Debian conventions, the top level repository mirror folders will
be stored in the `/srv/packages/` directory. We don't strictly need it
now, but for future automation of `reprepro` you're going to want to create
a `reprepro` system user like this:

    sudo adduser --system --disabled-password --disabled-login \
                 --home /srv/packages \
                 --group reprepro

For the following sections on setting up `reprepro`, you'll need to become
the `reprepro` user, but that user was configured with no login privileges.
We can do some `sudo` magic to work around that - note that your shell
prompt (if you're using the default that comes with most Linux distributions)
will have changed:

    userid@machine:~$ sudo -u reprepro bash
    reprepro@machine:/home/userid$ cd $HOME
    reprepro@machine:~$ pwd
    /srv/packages
    reprepro@machine:~$ exit
    userid@machine:~$

### Create Folder Structure For Each Local Respository 

For `ev3dev` development, we're going to create two repositories, one for 
the `ev3dev.org` packages and another for the standard Debian packages.
You can guess that to make things easy, the repository names will be
exactly the same as the `farms` that we grow the `crops` in.

Remember to become the `reprepro` user and then create the following
directories:

    for d in "conf" "gpg" "logs" "www"; do
        mkdir -p "/srv/packages/ev3dev.debian.jessie.armel/$d"
        mkdir -p "/srv/packages/ev3dev.ev3dev.jessie.armel/$d"
    done

    chmod 700 /srv/packages/ev3dev.debian.jessie.armel/gpg
    chmod 700 /srv/packages/ev3dev.ev3dev.jessie.armel/gpg

Then create the file `conf/options` like this"

    cat <<EOF > "/srv/packages/ev3dev.debian.jessie.armel/conf/options"
    outdir +b/www
    logdir +b/logs
    gnupghome +b/gpg
    EOF
    
    cat <<EOF > "/srv/packages/ev3dev.ev3dev.jessie.armel/conf/options"
    outdir +b/www
    logdir +b/logs
    gnupghome +b/gpg
    EOF

Then we'll set up the ev3dev repository `conf` files:

    cat <<EOF > "$HOME/ev3dev.ev3dev.jessie.armel/conf/distributions"
    Codename: jessie
    Architectures: armel
    Description: ev3dev (required packages only)
    Components: main
    Update: ev3dev-jessie-update
    EOF
    
    cat <<EOF > "$HOME/ev3dev.ev3dev.jessie.armel/conf/options"
    outdir +b/www
    logdir +b/logs
    gnupghome +b/gpg
    EOF

    cat <<EOF > "$HOME/ev3dev.ev3dev.jessie.armel/conf/updates"
    Name:  ev3dev-jessie-update
    Method: http://archive.ev3dev.org/debian
    VerifyRelease: 93178A7C
    Suite: jessie
    Components: main
    Architectures: armel
    FilterList: purge ../ev3dev.ev3dev.jessie.armel.packages
    EOF

I'm using the University of Waterloo Debian mirror locations here, you
should use the closest mirror:

    cat <<EOF > "$HOME/ev3dev.debian.jessie.armel/conf/distributions"
    Codename: jessie
    Architectures: armel
    Description: debian (required packages only)
    Components: main contrib non-free
    Update: debian-jessie-update
    EOF
    
    cat <<EOF > "$HOME/ev3dev.debian.jessie.armel/conf/options"
    outdir +b/www
    logdir +b/logs
    gnupghome +b/gpg
    EOF

    cat <<EOF > "$HOME/ev3dev.debian.jessie.armel/conf/updates"
    Name:  debian-jessie-update
    Method: http://mirror.csclub.uwaterloo.ca/debian
    VerifyRelease: 8B48AD6246925553
    Suite: jessie
    Components: main contrib non-free
    Architectures: armel
    FilterList: purge ../ev3dev.debian.jessie.armel.packages
    EOF

### Get the GPG Keys For Each Repository

We are (hopefully) still the `reprepro` user - remember that the `$HOME`
for this user is `/srv/packages` and that's where the `.gnupg` directory
will get created. Don't worry, only the `reprepro` user has access to
it.

Pulling in and saving the keys for each repository is simple:

    # Get the ev3dev.org public signing key
    
    gpg2 --keyserver pgp.mit.edu --recv-keys 2B210565
    cd $HOME/ev3dev.ev3dev.jessie.armel
    gpg2 --export 2B210565 | GNUPGHOME=gpg gpg --import --no-permission-warning
    
    # Get the Debian Jessie public signing key
    
    gpg2 --keyserver pgp.mit.edu --recv-keys 8B48AD6246925553
    cd $HOME/ev3dev.debian.jessie.armel
    gpg2 --export 8B48AD6246925553 | GNUPGHOME=gpg gpg --import --no-permission-warning
    
    cd $HOME

### Create The Package Lists and Populate The Repositories

We're almost ready - all we need to do now is create the package
lists and populate the repositories. The package lists are easy
because we've got the `harvest_crop` script to help us.

Still as the `reprepro` user, all we need to do is run it like this:

    cd $HOME
    
    FARM="ev3dev.ev3dev.jessie.armel"
    /path/to/harvest_crop "$FARM" required minimal standard > "$FARM.packeges"
    
    FARM="ev3dev.debian.jessie.armel"
    /path/to/harvest_crop "$FARM" required minimal standard  > "$FARM/$FARM.packeges"

And then the final bit is to update the repositories:

    cd $HOME/ev3dev.ev3dev.jessie.armel
    reprepro -V update jessie
    
    cd $HOME/ev3dev.debian.jessie.armel
    reprepro -V update jessie

## Configuring Your Webserver To Serve Packages

As discussed near the beginning of this tutorial, I happen to like
using Hiawatha for serving up content. We need to configure Hiawatha
to create virtual hosts - this allows the server to associate a URL
with a particular source directory.

Whatever web server you use, the steps will be similar to these.

I've got Hiawatha set up to listen to the following adresses:

- `127.0.0.1:8080` localhost
- `192.168.56.1:8080` VirtualBox HostOnly

For Hiawatha, that looks like the following configuration stanzas:

    Binding {
    	Port = 8080
     	Interface = 127.0.0.1
    }
    
    Binding {
    	Port = 8080
     	Interface = 192.168.56.1
    }

Next, we need to configure the virtual host URLs, and associate
the root directory for the content. These stanzas handle it:

    VirtualHost {
    	Hostname = debian.jessie.armel.domain.com
    	WebsiteRoot = /srv/packages/ev3dev.debian.jessie.armel/www
    	ShowIndex = yes
     	AccessLogfile = /var/log/hiawatha/debian-access.log
     	ErrorLogfile = /var/log/hiawatha/debian-error.log
    	FollowSymlinks = yes
    }
    
    VirtualHost {
    	Hostname = ev3dev.jessie.armel.domain.com
    	WebsiteRoot = /srv/packages/ev3dev.ev3dev.jessie.armel/www
    	ShowIndex = yes
     	AccessLogfile = /var/log/hiawatha/ev3dev-access.log
     	ErrorLogfile = /var/log/hiawatha/ev3dev-error.log
    	FollowSymlinks = yes
    }

No magic here - you'll notice of course that the `farm` name
shows up again in the `Hostname` definition, and in the `WebsiteRoot`. 
Remember to chage `domain.com` to your local domain name.

The last step is to set up your local DNS server to direct the
`Hostname` URLs to one of the specific IP addresses that Hiawatha is bound
to.

If you don't have a full blown DNS server, have no fear. The old-school
local DNS file under Linux is `/etc/hosts`, just add these two stanzas
to the `/etc/hosts` file:

    127.0.0.1	debian.jessie.armel.domain.com
    127.0.0.1	ev3dev.jessie.armel.domain.com

Point your webserver at `debian.jessie.armel.domain.com:8080` and you
should see a directory listing with `dists/` and `pool/` in it.

## Conclusion

If you've followed along this far and had success, then give yourself
a pat on the back and go for a walk and enjoy the outdoors. You have
set a partial repository of the main Debian repository, built the `ev3dev`
compatible Linux kernel using a cross compiler, and possibly build the
SD card image for `ev3dev`.


[ev3dev]: <http://www.ev3dev.org>
[ev3dev-buildscripts]: <https://github.com/ev3dev/ev3dev-buildscripts>
[brickstrap]: <https://github.com/ev3dev/brickstrap>
[germinate]: <http://manpages.ubuntu.com/manpages/utopic/en/man1/germinate.1.html>
[growrepo]: <https://github.com/rhempel/growrepo>
[reprepro]: <http://mirrorer.alioth.debian.org>

[Hiawatha]: <https://www.hiawatha-webserver.org/>
[VirtualBox]: <https://www.virtualbox.org/>
