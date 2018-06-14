---
title: Contribute
redirect_from: /contributing/index.html
excerpt: "ev3dev is a **HUGE** project and we are always happy to receive help. Here are some of the many ways you can contribute to the project."
---

* Table of Contents
{:toc}

ev3dev is a **HUGE** project and we are always happy to receive help.
Here are some of the many ways you can contribute to the project.

## Have a look at the "HELP WANTED" issues

We label some issues as [HELP WANTED](https://github.com/ev3dev/ev3dev/labels/HELP%20WANTED).
The means that we could use your feedback, the task is very time consuming or we don't have
the hardware needed. Click on the link to see the list of issues and contribute if you can.

## Write some documentation

All of our documentation (including this entire website) is maintained through
GitHub via [pull requests] (so you will need a GitHub account if you don't
already have one). All of the *docs* pages have a link that says "Edit on
Github". Just follow the link and make your changes - and be sure to preview
before saving changes. Github will automatically create a pull request. We will
review your changes before incorporating them into the site.

Even if a page doesn't have the edit link, you can actually still make changes.
Just find it [here][this-website].

You can also contribute to our more informal [wiki] if you are not comfortable
with contributing to the main website.

## Write some software

As the hardware drivers are being finalized, development will be shifting to
software that can interface with the hardware. There are many [packages on
GitHub][ev3dev-github-org] that you can hack on. Additionally, there are some
language bindings listed on the [Programming Languages page](/docs/programming-languages)
that would love some community support.

If you have never used GitHub before, it's super easy. [Read about it][GitHub Help],
then send a pull request.

## Write a driver

Have some sensor that isn't supported yet? With a little technical know-how
and the right attitude, there is nothing stopping you. Open an [issue] on
GitHub and we can help you get started. For an example of just how easy it
can be to add a sensor, check out [this commit][ms-angle-sensor-commit].

Some things you will need:

* The actual hardware (sensor or other device).
* Technical documentation on the hardware that explains the low level
  communications (or circuit diagram for analog sensors).
* A computer or virtual machine running Ubuntu 16.04. (Other Linux distros are
  OK, but this is what we officially support.)
* An EV3 serial port adapter like [mindsensors.com EV3 Console Adapter] or
  [make your own][ev3-creating-a-console-cable].
* A logic analyzer. (We recommend [Saleae])


## Donate hardware

Don't have the time or interest in writing a driver? You can donate the
hardware and we will make it work for you. See this
[blog post][will-work-for-sensors] from @dlech for more info.

## Financial contributions

You can make financial contributions to ev3dev.org through our page at [bountysource.com].
These contributions will be used to purchase additional hardware, like sensors and motors.

[pull requests]: https://help.github.com/articles/using-pull-requests
[wiki]: https://github.com/ev3dev/ev3dev/wiki
[this-website]: https://github.com/ev3dev/ev3dev.github.io
[GitHub Help]: https://help.github.com/
[mindsensors.com EV3 Console Adapter]: http://mindsensors.com/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=189&MMN_position=39:39
[issue]: https://github.com/ev3dev/ev3dev/issues
[ms-angle-sensor-commit]: https://github.com/ev3dev/ev3dev-kernel/commit/0bb5e72135f8abf789db5d061a78a26f6281ed2f
[ev3-creating-a-console-cable]: http://botbench.com/blog/2013/08/15/ev3-creating-console-cable
[will-work-for-sensors]: https://lechnology.com/2014/08/will-work-for-sensors
[ev3dev-github-org]: https://github.com/ev3dev
[bountysource.com]: https://www.bountysource.com/teams/ev3dev
[Saleae]: https://www.saleae.com/
