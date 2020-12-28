---
title: "Support"
redirect_from: /issues/index.html
excerpt: "Have a problem or question? We are here to help - but you have to help us help you. We keep track of problems, suggestions and questions about ev3dev using GitHub Issues. This lets us keep everything in one place."
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

First, before submitting an issue, search the existing issues (open and closed)
to make sure someone else has not already reported the same problem or asked the
same question. Please only comment on an existing **open** issue if you are
fairly sure your problem/question is *exactly* the same. If the issue is closed
or you are not sure your problem is the same, open a new issue instead.

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
__Note:__ The [ev3dev-lang-python]{:target="_blank"} repository has its own
[issues][ev3dev-lang-python-issues]{:target="_blank"} tracker for Python-related
questions.
</small>

<br/>

If you don't find anything helpful by searching, then create a [new issue]{:target="_blank"}
(only __one__ problem, question or suggestion per issue please).

{% include /style/begin-panel.html type="info" heading="Tips for Posting Issues" %}

<strong>Most importantly for problems, we need to know the *exact* steps need to reproduce the
issue. If you are writing a program, post the code. If you are following
a tutorial, which step failed? Be as detailed as possible.</strong>

In the description of your issue, **make sure to fill in the information from the template**.
In addition, include as much relevant information as possible:

  * Be sure to mention any related issues by number, so we can refer to past
    discussion. GitHub will properly format a reference of the format `#100`.
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
<br/>

We also expect you to clean up after yourself. Please close the issue when
you feel that it is resolved.

Some additional things to take into consideration:

*   If you are posting logs that are more than 5-10 lines long, please use
    <http://pastebin.com>, <https://gist.github.com> or something similar
    instead of posting long logs in comments.

*   If you are copying and pasting information from a terminal, use "code fences"
    to make the text more readable.

        ```
        A code fence is three backtick (`) characters before and after the text.

        Just like you see here.
        ```

Learn more about [writing on GitHub]{:target="_blank"}.

{% include /style/end-panel.html %}

Gitter
------

[gitter.im] is an online chat service that works in conjunction with GitHub. We
monitor our Gitter room and are happy to provide support in live chat.

**This is the recommended means of live chat support for ev3dev.**

If you have a GitHub, GitLab or Twitter account, come say hello at <https://gitter.im/ev3dev/chat>.

[gitter.im]: https://gitter.im
[GitHub Issues]: https://help.github.com/articles/about-issues/
[ev3dev-lang-python]: https://github.com/rhempel/ev3dev-lang-python
[ev3dev-lang-python-issues]: https://github.com/rhempel/ev3dev-lang-python/issues
[new issue]: https://github.com/ev3dev/ev3dev/issues/new
[writing on GitHub]: https://help.github.com/categories/writing-on-github/
