---
title: "Get Help"
redirect_from: /issues/index.html
---

* Table of Contents
{:toc}

<center>
<h3>Have a problem or question?
    <br/>
<small>We are here to help - but you have to help us help you.</small>
</h3>
</center>

GitHub Issues
-------------

We keep track of problems, suggestions and questions about ev3dev using [GitHub
Issues]. This lets us keep everything in one place. (So, please don't email the
developers directly unless you have a personal question.)

First, before submitting an issue, please make sure that you have the latest
kernel and other packages:

    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get dist-upgrade
    # if a new kernel package was installed
    sudo reboot

Then search the existing issues (open and closed) to make sure someone else has
not already reported the same problem or asked the same question. Please only
comment on an existing **open** issue if you are fairly sure your problem/question is
*exactly* the same. If the issue is closed or you are not sure your problem is the same,
open a new issue instead. Be sure to mention any related issue by number and GitHub will
magically create a link to it (e.g `#100`).

<br/>

<form class="input-group" onSubmit="window.open('https://github.com/ev3dev/ev3dev/issues?q=is%3Aissue+'
        + document.getElementById('search-issues').value.replace(' ', '+')); return false;">
    <span class="input-group-addon glyphicon glyphicon-search" style="top: 0"></span>
    <input id="search-issues" class="form-control" type="search" placeholder="Example: hitechnic ir receiver" />
    <span class="input-group-btn">
        <input type="submit" value="Search Issues"  class="btn btn-primary">
    </span>
</form>

<small>
__Note:__ The [ev3dev-lang]{:target="_blank"} repository has its own
[issues][ev3dev-lang-issues]{:target="_blank"} tracker.
</small>

<br/>

If you don't find anything helpful by searching, then create a [new issue]{:target="_blank"}
(only __one__ problem, question or suggestion per issue please).

<div class="panel panel-info">
    <div class="panel-heading">
        <h2 class="panel-title">Tips for Posting Issues</h2>
    </div>
<div class="panel-body" markdown="1">
<strong>Most importantly for problems, we need to know the *exact* steps need to reproduce the
issue. If you are writing a program, post the code. If you are following
a tutorial, which step failed? Be as detailed as possible.</strong>

In the description of your issue, be sure to also include:

  * The image file that you used to flash your SD card (e.g. `ev3dev-jessie-2015-02-24.img`).
  * Your kernel version (output of `uname -rv`)
  * If you are using a library (ev3dev-lang, python-ev3, ev3dev-c, etc.) please
    state which library. Most, if not all, of these have their own issues tracker.
    You may have better luck posting there instead.
  * If the issue is with detection of a sensor or motor: unplug and plug in the
    device and include the output of `dmsg | tail`.
  * If the issue is with an USB device like a WiFi dongle: include the output of `lsusb`.
  * If the issue is with the Brick Manager (brickman): include the output of
    `systemctl status brickman.service -l`.
  * If a screenshot of the EV3 would be helpful, run `fbgrab <some-name>.png`
    on the EV3 and include the picture in your comments.
<p />

We also expect you to clean up after yourself. Please close the issue when
you feel that it is resolved.

Some additional things to take into consideration:

*   If you are posting logs that are more than 5-10 lines long, please use
    <http://pastebin.com> or <https://gist.github.com> or something similar
    instead of posting long logs in comments.

*   If you are copying and pasting information from a terminal, use "code fences"
    to make the text more readable.

        ```
        A code fence is three backtick (`) characters before and after the text.

        Just like you see here.
        ```

Learn more about [writing on GitHub]{:target="_blank"}.
    
</div>
</div>

IRC
---

IRC is [Internet Relay Chat]. You can find other ev3dev users in [#ev3dev on
freenode.net]. It is a great way to ask quick questions or carry on a conversation.

If you have never used IRC before, there are a some things you need to know:

*   We are a global community - not everyone lives in the same time zone. If you
    ask a question and no one answers, stay connected for a day or two and someone
    may eventually answer (or leave a note that you will check the logs - see below).
*   If no one ever answers you, do not be offended. The right person did not see
    your message, or maybe no one knows the answer. Ask again later or open a GitHub issue.

Also, #ev3dev is logged by `ev3devlogbot`. You can find the logs at <http://ev3dev.org/irclog>.

If you don't already have an IRC client program, you can connect right in your
browser. Just enter a nickname and click start below.

<iframe src="https://kiwiirc.com/client/irc.freenode.net/?&theme=cli#ev3dev" class="button" style="width:100%; height:450px; border: none;" />

[GitHub Issues]: https://help.github.com/articles/about-issues/
[ev3dev-lang]: https://github.com/ev3dev/ev3dev-lang
[ev3dev-lang-issues]: https://github.com/ev3dev/ev3dev-lang/issues
[new issue]: https://github.com/ev3dev/ev3dev/issues/new
[writing on GitHub]: https://help.github.com/categories/writing-on-github/
[Internet Relay Chat]: https://en.wikipedia.org/wiki/Internet_Relay_Chat
[#ev3dev on freenode.net]: irc://irc.freenode.net/#ev3dev
