---
title: Contributing
---

ev3dev is a HUGE project and we are always happy to receive help.
Here are some of the many ways you can contribute to the project.

## Write some documentation

All of our documentation (including this website) is maintained through GitHub
via [pull requests]. If you find an error or would like to add new
documentation to the [wiki], you can find instructions on how to contribute
[here][contribute-to-wiki]. If you have an idea or correction for this website,
you can submit it [here][this-website].

## Write some software

As the hardware drivers are being finalized, development will be shifting to software that can interface
with the hardware. There are many <a href="https://github.com/ev3dev">packages on GitHub</a> that you can
hack on. Additionally, there are some language bindings listed on the <a href="/">home page</a> that are
not part of the ev3dev GitHub organization (yet).

If you have never used GitHub before, it's super-easy. [Read about it][GitHub Help],
then send a pull request.

## Write a driver

Have some sensor that isn't supported yet? With a little technical know-how
and the right attitude, there is nothing stopping you. Open an [issue] on
GitHub and we can help you get started.

Some things you will need:

* The actual hardware (sensor or other device).
* Technical documentation on the hardware that explains the low level
  communications (or circuit diagram for analog sensors).
* A computer or virtual machine running Ubuntu 14.04. (Other Linux distros are
  OK, but this is what we officially support.)
* An EV3 serial port adapter like [mindsensors.com EV3 Console Adapter] or
  [make your own][ev3-creating-a-console-cable].
* A logic analyzer.  \[ Advertisement: [Get 20% off of Logic or Logic16 from Saleae][Saleae referral]
  (and @dlech gets $20 credit) \]


## Donate hardware

Don't have the time or interest in writing a driver? You can donate the
hardware and we will make it work for you. See this
[blog post][will-work-for-sensors] from @dlech for more info.


[pull requests]: https://help.github.com/articles/using-pull-requests
[wiki]: https://github.com/ev3dev/ev3dev/wiki
[contribute-to-wiki]: https://github.com/ev3dev/ev3dev/wiki/How-to-Contribute-to-This-Wiki
[this-website]: https://github.com/ev3dev/ev3dev.github.io
[GitHub Help]: https://help.github.com/
[mindsensors.com EV3 Console Adapter]: http://mindsensors.com/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=189&MMN_position=39:39
[issue]: https://github.com/ev3dev/ev3dev/issues
[ev3-creating-a-console-cable]: http://botbench.com/blog/2013/08/15/ev3-creating-console-cable
[Saleae referral]: http://go.referralcandy.com/share/8LP4Z9L
[will-work-for-sensors]: http://lechnology.com/2014/08/will-work-for-sensors