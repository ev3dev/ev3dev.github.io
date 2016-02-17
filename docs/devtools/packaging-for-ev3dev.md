---
title: Debian Packaging for ev3dev
subject: Packaging
---

* Table of Contents
{:toc}

Being a Debian distribution, debian packaging is an important part of ev3dev.
We maintain quite a few packages of our own and also modify some upstream
packages.

## Setting up the Package Development Environment

Whether you are creating a new package or modifying an existing one, there are
some tools that you are going to need. We currently use Ubuntu trusty as the
development environment. (We will only support trusty, but any thing newer should
work - same goes for jessie or newer on Debian). If you are using Windows or Mac
you can use [VirtualBox] to run trusty in a virtual machine.

On your Ubuntu machine, you will need to install some packages.
Note: If you are the kind of person that doesn't install recommends, make sure
you install *all* of the recommended packages. If you don't know what
"recommends" means, don't worry about it.

    sudo apt-get install ubuntu-dev-tools qemu-user-static git-buildpackage

If you haven't already, you will also need to [add the ev3dev archive to apt][ev3dev-archive].
Be sure to install the `ev3dev-archive-keyring` package. We will need it later.

(Optional) If you want to build packages for Raspberry Pi (1 - not 2), then you
need to grab the patched [pbuilder-dist] script from [ev3dev-buildscripts].
Save it somewhere in your `$PATH` (`/usr/local/bin` is a good choice).

If you have never used `git` before, you need to configure your name and email.
In a terminal, run...

    git config --global user.name "Your Name"
    git config --global user.email "yourname@example.com"

And the same info needs to be put into some environment variables. Paste the
following to the end of `~/.bashrc`. You will need to start a new terminal
or run `. ~/.bashrc` for these changes to take effect.

    export DEBFULLNAME="Your Name"
    export DEBEMAIL="yourname@example.com"

And we need to configure [quilt] as well. Save the following to `~/.quiltrc`.

    QUILT_PATCHES=debian/patches
    QUILT_NO_DIFF_INDEX=1
    QUILT_NO_DIFF_TIMESTAMPS=1
    QUILT_REFRESH_ARGS="-p ab"
    QUILT_DIFF_ARGS="--color=auto"

And one more config file. Save the following to `~/.pbuilderrc`.

    APTKEYRINGS="/usr/share/keyrings/ev3dev-archive-keyring.gpg"
    # OTHERMIRROR is ignored when using pbuilder-dist. :-(
    # LP bug #1004579
    OTHERMIRROR="deb http://ev3dev.org/debian jessie main"

Finally, we need to setup `pbuilder-dist` to create a clean environment where
the packages will actually be built. Run the following in a terminal...

    # we have to work around a bug in pbuilder-dist.
    export OTHERMIRROR="deb http://ev3dev.org/debian jessie main"
    # For the EV3
    pbuilder-dist jessie armel create
    # For Raspberry Pi 1 (raspbian) - see "(Optional)" note above.
    pbuilder-dist jessie rpi create
    # For Raspberry Pi 2
    pbuilder-dist jessie armhf create

## Building an Existing Package

All ev3dev debian packages are hosted at <https://github.com/ev3dev>. To get the
package source code, you need to clone it using `git`. If you are planning
on making changes, you should [fork] the repository on GitHub first and then
clone your repository so that you can push the changes back to GitHub. After you
have forked the repository on GitHub, run...

    # if you have ssh setup...
    git clone git@github.com:yourname/packagename
    # or if you don't have ssh...
    git clone https://github.com/yourname/packagename

We use [git-buildpackage] to manage packages, so to build a source package (.dsc),
run...

    git buildpackage -S -us -uc

The `-S` means to just build a source package and `-us -uc` means don't sign it.
This creates several files in the parent directory.

If you have not run `pbuilder-dist` in a while, you should update it to make sure
you have the most recent package list. Replace `armel` with other architectures
as needed.

    # Don't forget our workaround.
    export OTHERMIRROR="deb http://ev3dev.org/debian jessie main"
    pbuilder-dist jessie armel update

Now, we can actually build the package.

    pbuilder-dist jessie armel build ../packagename_version.dsc

The .deb package(s) will be placed in `~/pbuilder/jessie-armel_result`. You can
copy these files to your EV3 and install them.

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

     -- Your Name <youremail@example.com>  Fri, 31 Jul 2015 17:34:04 -0500

     ...

You don't need to make any changes - just close the text editor. **Tip:** After
you install this package somewhere, you should bump the version number by running
`dch --local yourname` again.

Now, you can make any changes you want to the source code. When you are done
making changes, you can try them out by building the package as described above
with one difference. You need to add an option so that it will not fail because
of your changes.

    git buildpackage -S -us -uc --git-ignore-new

Then use `pbuilder-dist` to build the binary package as describe above.

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
    and installs correctly using the methods described above.
2.  Run `lintian` on the test package(s) to ensure there are no packaging problems.
3.  Ensure any version information (other than `debian/changelog`) is properly
    updated to the new version.
4.  Delete any `debian/changelog` entries since the last release (you should
    have at least one for doing a test build).
5.  Make sure there are not any uncommited changes in git. If there are changes,
    commit them.
6.  Run `git-dch -R --commit` to create a `debian/changelog` entry. Edit it by
    hand if necessary.
7.  Run `git-buildpackage -S -us -uc --git-tag` to create the source package.
8.  Build the release packages using `pbuilder-dist`.
9.  Sign the `.changes` file in `~/pbuilder/<release>-<arch>_result/` using `debsign`.
10. Push the new release to the ev3dev archive using `dput`.
11. Push the git branch and tag to GitHub.
12. Close any issues on GitHub that are fixed by this release with a message
    that includes the package name and version number.
13. Add a news article to the ev3dev.org site announcing the release.

## Additional Resources

* [Debian Policy Manual] - make sure your package conforms to this
* [Debian New Maintainers Guide] - good intro to debian packaging
* [git-buildpackage] - useful info that is not in the man pages


[VirtualBox]: https://www.virtualbox.org
[ev3dev-archive]: {{ github.site.url }}/docs/devtools/installing-the-ev3dev-archive
[pbuilder-dist]: https://raw.githubusercontent.com/ev3dev/ev3dev-buildscripts/master/pbuilder-dist
[ev3dev-buildscripts]: https://github.com/ev3dev/ev3dev-buildscripts
[quilt]: https://wiki.debian.org/UsingQuilt
[fork]: https://help.github.com/articles/fork-a-repo/
[git-buildpackage]: http://honk.sigxcpu.org/projects/git-buildpackage/manual-html/gbp.html
[pull request]: https://help.github.com/articles/creating-a-pull-request/
[Debian Policy Manual]: https://www.debian.org/doc/debian-policy/
[Debian New Maintainers Guide]: https://www.debian.org/doc/manuals/maint-guide/
