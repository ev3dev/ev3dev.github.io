---
title: Debian Packaging for ev3dev
subject: Packaging
---

* Table of Contents
{:toc}

Being a Debian distribution, Debian packaging is an important part of ev3dev.
We maintain quite a few packages of our own and also modify some upstream
packages.

## Setting up the Package Development Environment

Whether you are creating a new package or modifying an existing one, there are
some tools that you are going to need. We currently use Ubuntu trusty as the
development environment. (We will only support trusty, but any thing newer should
work - same goes for jessie or newer on Debian). If you are using Windows or Mac
you can use [VirtualBox] or [Docker] to run trusty in a virtual machine/container.

On your Ubuntu machine, you will need to install some packages. If you haven't
already, you will need to [add the ev3dev archive to apt][ev3dev-archive].
Note: If you are the kind of person that doesn't install recommends, make sure
you install *all* of the recommended packages. If you don't know what
"recommends" means, don't worry about it.

    sudo apt-get update
    sudo apt-get install ubuntu-dev-tools pbuilder-ev3dev

If you have never used `git` before, you need to configure your name and email.
In a terminal, run...

    git config --global user.name "Your Name"
    git config --global user.email "yourname@example.com"

And the same info needs to be put into some environment variables. Paste the
following to the end of `~/.bashrc`. You will need to start a new terminal
or run the same commands in the current terminal for these changes to take
effect.

    export DEBFULLNAME="Your Name"
    export DEBEMAIL="yourname@example.com"

And we need to configure [quilt] as well. Save the following to `~/.quiltrc`.

    QUILT_PATCHES=debian/patches
    QUILT_NO_DIFF_INDEX=1
    QUILT_NO_DIFF_TIMESTAMPS=1
    QUILT_REFRESH_ARGS="-p ab"
    QUILT_DIFF_ARGS="--color=auto"

## Initializing/Updating pbuilder-ev3dev

You need to initialize a base image for each distribution and architecture that
you are building for. These base images also need to be periodically updated,
otherwise packages may fail to install during build because they are no longer
available (as in the case with security updates).

The same command is used for both creating and updating:

    OS=debian DIST=jessie ARCH=armel pbuilder-ev3dev base

Replace the variables as needed. `OS` can be `debian` or `rasbian`. `DIST` can
be any Debian distribution supported by ev3dev (currently only `jessie`). `ARCH`
is any valid Debian architecture (`armel`, `armhf`, etc.). The images are stored
in `~/pbuilder-ev3dev`.

## Building an Existing Package

All ev3dev Debian package source code is hosted at <https://github.com/ev3dev>.
To get the package source code, you need to clone it using `git`. If you are
planning on making changes, you should [fork] the repository on GitHub first
and then clone your repository so that you can push the changes back to GitHub.
After you have forked the repository on GitHub, run...

    # if you have ssh setup...
    git clone git@github.com:yourname/packagename
    # or if you don't have ssh...
    git clone https://github.com/yourname/packagename

To build a package, simply run `pbuilder-ev3dev` from the source code directory.

    OS=debian DIST=jessie ARCH=armel pbuilder-ev3dev build

The .deb package(s) will be placed in `~/pbuilder-ev3dev/debian/jessie-armel`.
You can copy these files to your EV3 and install them.

## Modifying a Package

If you haven't already, you need to clone the package from git as described above.

Then we are going to tell git to ignore changes to the changelog. We are going
to change that file, but we don't want to accidentally commit those changes.
In the source code directory that you cloned, run the following...

    git update-index --assume-unchanged debian/changelog

Now, we can change this file. Were going to use the `dch` program to do that.

    dch --local yourname

This will add a new entry to the changelog and open it in a text editor for
for changes. It will look something like this...

    packagename (1.2.3-1yourname1) UNRELEASED; urgency=medium

      *

     -- Your Name <youremail@example.com>  Fri, 31 Jul 2016 17:34:04 -0500

     ...

You don't need to make any changes - just close the text editor. **Tip:** After
you install this package somewhere, you should bump the version number by running
`dch --local yourname` again.

Now, you can make any changes you want to the source code. When you are done
making changes, you can try them out by building the package as described above
with one difference. You need to use the `dev-build` command so that it will
not fail because of your changes.

    OS=debian DIST=jessie ARCH=armel pbuilder-ev3dev dev-build

Once you are happy with your changes, commit them and push them back to GitHub.
**Note:** Some packages use [quilt] for managing patches. If you want to figure
out how that works, go for it, but it is not necessary. And even if you do use
quilt, you will need to commit the quilt patch via git.

    git add -i
    git commit
    git push

Then send us a [pull request] on GitHub.

## Releasing a Package

**Note:** This section is for ev3dev package maintainers. It does not apply to
building packages for yourself.

1.  Make sure you have thoroughly tested the changes and that the package builds
    and installs correctly using the methods described above. Be sure to
    check the `+++ lintian output +++` section at the end of the `pbuilder-ev3dev`
    output to see if there are any packaging problems.

3.  Ensure any version information (other than `debian/changelog`) is properly
    updated to the new version.

4.  Update `debian/changelog`.

    You can do this automatically:

    1.  Delete any `debian/changelog` entries since the last release (you
        should have at least one for doing a test build).
    2.  Make sure there are not any uncommited changes in git. If there are
        changes, commit them.
    3.  Run `gbp dch -R --commit` to create a `debian/changelog` entry.
        Edit it by hand if necessary.

    Or if you have been maintaining it by hand:

    1.  Run `dch -r`.
    2.  Run `git commit -a -m "Update changelog for release"`.

5.  Tag the commit:

        gbp buildpackage --git-tag-only

6.  Build the release packages using `pbuilder-ev3dev`. If you have run the `base`
    command recently, you can omit those lines.

        # build for EV3
        OS=debian ARCH=armel DIST=jessie pbuilder-ev3dev base
        OS=debian ARCH=armel DIST=jessie pbuilder-ev3dev build
        # build for RPi 2/3 and BeagleBone
        OS=debian ARCH=armhf DIST=jessie pbuilder-ev3dev base
        DEBUILD_OPTIONS="--binary-only" OS=debian ARCH=armhf DIST=jessie pbuilder-ev3dev build
        # build for RPi 0/1
        OS=raspbian ARCH=armhf DIST=jessie pbuilder-ev3dev base
        OS=raspbian ARCH=armhf DIST=jessie pbuilder-ev3dev build

    If your package does not have any binary components (like a pure python
    package), you can do this instead:

        # build for EV3, RPi 2/3 and BeagleBone
        OS=debian ARCH=amd64 DIST=jessie pbuilder-ev3dev base
        OS=debian ARCH=amd64 DIST=jessie pbuilder-ev3dev build
        # build for RPi 0/1
        OS=raspbian ARCH=armhf DIST=jessie pbuilder-ev3dev base
        OS=raspbian ARCH=armhf DIST=jessie pbuilder-ev3dev build

7.  Sign the `.changes` files in `~/pbuilder-ev3dev/$OS/$DIST-$ARCH/` using `debsign`.

        debsign ~/pbuilder-ev3dev/debian/jessie-armel/<package>_<version>_armel.changes
        debsign ~/pbuilder-ev3dev/debian/jessie-armhf/<package>_<version>_armhf.changes
        debsign ~/pbuilder-ev3dev/raspbian/jessie-armhf/<package>_<version>_armhf.changes

8.  Upload the new release to the ev3dev archive using `dput`.

    If you have never uploaded before, you will need to send your SSH public key
    and your GPG public key to @dlech and save the following as `~/.dput.cf`:

        [ev3dev-debian]
        login           = ev3dev-upload
        fqdn            = reprepro.ev3dev.org
        method          = sftp
        incoming        = ~/debian

        [ev3dev-raspbian]
        login           = ev3dev-upload
        fqdn            = reprepro.ev3dev.org
        method          = sftp
        incoming        = ~/raspbian

        [ev3dev-ubuntu]
        login           = ev3dev-upload
        fqdn            = reprepro.ev3dev.org
        method          = sftp
        incoming        = ~/ubuntu

    Then upload:

        dput ev3dev-debian ~/pbuilder-ev3dev/debian/jessie-armel/<package>_<version>_armel.changes
        dput ev3dev-debian ~/pbuilder-ev3dev/debian/jessie-armhf/<package>_<version>_armhf.changes
        dput ev3dev-raspbian ~/pbuilder-ev3dev/raspbian/jessie-armhf/<package>_<version>_armhf.changes

    Please be careful about `armhf` and `ev3dev-debian` vs. `ev3dev-raspbian`!
    You should receive an email after each upload. If not, let @dlech know about it.

    Note: if `dput` fails, you may also need to install `python-paramiko` package:

        apt-get install python-paramiko

9.  Push the git branch and tag to GitHub.

10. Close any issues on GitHub that are fixed by this release with a message
    that includes the package name and version number.

11. Add a news article to the ev3dev.org site announcing the release.

## Additional Resources

* [Debian Policy Manual] - make sure your package conforms to this
* [Debian New Maintainers Guide] - good intro to Debian packaging
* [git-buildpackage] - useful info that is not in the man pages


[VirtualBox]: https://www.virtualbox.org
[Docker]: http://www.docker.com
[ev3dev-archive]: {{ github.site.url }}/docs/devtools/installing-the-ev3dev-archive
[ev3dev-buildscripts]: https://github.com/ev3dev/ev3dev-buildscripts
[quilt]: https://wiki.debian.org/UsingQuilt
[fork]: https://help.github.com/articles/fork-a-repo/
[git-buildpackage]: http://honk.sigxcpu.org/projects/git-buildpackage/manual-html/gbp.html
[pull request]: https://help.github.com/articles/creating-a-pull-request/
[Debian Policy Manual]: https://www.debian.org/doc/debian-policy/
[Debian New Maintainers Guide]: https://www.debian.org/doc/manuals/maint-guide/
