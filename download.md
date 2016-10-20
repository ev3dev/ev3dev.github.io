---
title: Downloads
subtitle: Bootable SD card image files
excerpt: Download ev3dev SD card images.
no-wrapper: true
---

{% include begin-section.html %}
<div class="row margin-bottom-xl">
    <div class="col-sm-12">
        <p class="lead">
            <span class="glyphicon glyphicon-download"/>
            Select the download below that corresponds to your hardware.
            <br/>
            <small>
                Then head to the <a href="/docs/getting-started/#step-2-flash-the-sd-card">Getting Started</a>
                page for installation instructions.
            </small>
        </p>
    </div>
</div>
<div class="row margin-bottom-xl">
    <div class="col-sm-8">
        <div class="margin-bottom-md">
            <h3>LEGO MINDSTORMS EV3</h3>
            <p>
                It's the Intelligent Brick that put the "EV3" in "ev3dev" and
                the primary focus of development.
            </p>
        </div>
        <a data-release-link-platform="ev3" class="btn btn-lg btn-primary">
            <span class="glyphicon glyphicon-download-alt"/>
            Download for EV3
        </a>
    </div>
    <div class="col-sm-4 hidden-xs">
        <img src="/images/downloads/ev3.jpg" class="img-responsive" alt="LEGO MINDSTORMS EV3">
    </div>
</div>
<div class="row margin-bottom-xl">
    <div class="col-sm-8">
        <div class="margin-bottom-md">
            <h3>Dexter Industries BrickPi and mindsensors.com PiStorms</h3>
            <p>
                The same image works for both BrickPi and PiStorms.
                All Raspberry Pi models are supported. Pick the image based
                on which model you have.
            </p>
        </div>
        <div class="margin-bottom-md">
            <a data-release-link-platform="rpi" class="btn btn-md btn-primary">
                <span class="glyphicon glyphicon-download-alt"/>
                Download for Raspberry Pi Model 0/1
            </a>
        </div>
        <div class="margin-bottom-md">
            <a data-release-link-platform="rpi2" class="btn btn-md btn-primary">
                <span class="glyphicon glyphicon-download-alt"/>
                Download for Raspberry Pi Model 2/3
            </a>
        </div>
    </div>
    <div class="col-sm-4">
        <img src="/images/downloads/brickpi-and-pistorms.jpg" class="img-responsive" alt="BrickPi and PiStorms">
    </div>
</div>
<div class="row margin-bottom-xl">
    <div class="col-sm-8">
        <div class="margin-bottom-md">
            <h3>FatcatLab EVB and Quest Institute QuestCape*</h3>
            <p>
                These capes work with BeagleBone, BeagleBone Black and BeagleBone
                Green. They do not work with BeagleBone Green Wireless due to
                I/O pin conflicts.
            </p>
        </div>
        <div class="margin-bottom-md">
            <a data-release-link-platform="bone" class="btn btn-md btn-primary">
                <span class="glyphicon glyphicon-download-alt"/>
                Download for BeagleBone
            </a>
        </div>
        <div class="margin-bottom-md">
            <small>* QuestCape is currently not publicly available.</small>
        </div>
    </div>
    <div class="col-sm-4 hidden-xs">
        <img src="/images/downloads/fatcatlab-and-questcape.jpg" class="img-responsive" alt="EVB and QuestCape">
    </div>
</div>
{% include end-section.html %}

{% include begin-section.html bg="dark" %}
<div class="row">
    <h1>Other Images</h1>
</div>
<div class="row">
    <div class="col-md-6">
        <h2>Snapshot Releases</h2>
        <p>
            We occasionally build images for testing purposes. These images
            are published without any prior testing and there are no release
            notes. However, you might be interested in these images if you
            want to try out the latest bug fixes.
        </p>
        <div class="margin-top-md">
            <a class="btn btn-md btn-primary" href="https://oss.jfrog.org/list/oss-snapshot-local/org/ev3dev/brickstrap/">
                <span class="glyphicon glyphicon-link"/>
                Snapshots
            </a>
        </div>
    </div>
    <div class="col-md-6">
        <h2>Previous Releases</h2>
        <p>
            We don't recommend these for new users, but if you have a need
            for older images (such as you are doing a long-term project based
            on an older image), you can find them on our GitHub releases page.
        </p>
        <div class="margin-top-md">
            <a class="btn btn-md btn-primary" href="https://github.com/ev3dev/ev3dev/releases">
                <span class="glyphicon glyphicon-link"/>
                GitHub Releases
            </a>
        </div>
    </div>
</div>
<div class="row margin-top-xl">
<div class="col-md-12 margin-top-xl">
{% include begin-panel.html type="info"
heading="How to pick the correct image file..." %}

There are multiple image files for each release. Look for
the file name that matches the device you are using.

For...                 | Pick...
-----------------------|----------------
LEGO MINDSTORMS EV3    | `*-ev3-*.img`
Raspberry Pi Model 0/1 | `*-rpi-*.img`
Raspberry Pi Model 2/3 | `*-rpi2-*.img`
BeagleBone             | `*-bone-*.img`
{: .table .table-striped .table-bordered }

{% include end-panel.html %}
</div>
</div>
{% include end-section.html %}

{% include begin-section.html %}

# Source Code

Nearly all of the software that makes up the ev3dev OS is open source.
Since ev3dev is based on Debian Linux many software packages come
from the official Debian repositories. Source code for these packages
can be found at [packages.debian.org](https://packages.debian.org).

The software the was developed by ev3dev.org is hosted on the
[ev3dev GitHub](https://github.com/ev3dev) site. Direct
links to some of the more interesting repositories are listed below.

* [Brickman](https://github.com/ev3dev/brickman)
* [Docker Images](https://github.com/ev3dev/docker-library)
* [ev3dev.org Website](https://github.com/ev3dev/ev3dev.github.io)
* [ev3dev Kernel Drivers](https://github.com/ev3dev/lego-linux-drivers)
* [EV3 Linux Kernel](https://github.com/ev3dev/ev3-kernel)
* [Raspberry Pi Linux Kernel](https://github.com/ev3dev/rpi-kernel)
* [BeagleBone Linux Kernel](https://github.com/ev3dev/bb.org-kernel)

{% include end-section.html %}
