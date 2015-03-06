---
title: Issues
---

__Have a problem or question? We are here to help - but you have to help us help you.
Here is what you need to do:__

*   First, before submitting an issue, please make sure that you have the latest
    kernel and other packages:

        # as root...
        apt-get update
        apt-get upgrade
        apt-get dist-upgrade
        # if a new kernel package was installed
        reboot
    
*   Then search the existing issues (open and closed) to make sure someone else has
    not already reported the same problem or asked the same question. Please only
    comment on an existing issue if you are fairly sure your problem/question is
    *exactly* the same. When in doubt, open a new issue instead.

    <p>
        <form id="search-issue-form" onSubmit="window.open('https://github.com/ev3dev/ev3dev/issues?q=is%3Aissue+'
                + document.getElementById('search-issues').value.replace(' ', '+')); return false;">
            <input id="search-issues" type="search" placeholder="Example: hitechnic ir receiver" />
            <input type="submit" value="Search Issues" />
        </form>
    </p>

    __Note:__ The [ev3dev-lang]{:target="_blank"} repository has its own
    [issues][ev3dev-lang-issues]{:target="_blank"} tracker.

*   If you don't find anything helpful by searching, then create a [new issue]{:target="_blank"}.

    __Most importantly, we need to know the *exact* steps need to reproduce the
    issue. If you are writing a program, post the code. If you are following
    a tutorial, which step failed? Be as detailed as possible.__

    In the description of your issue, be sure to also include:

    *   The image file that you used to flash your SD card (e.g. `ev3dev-jessie-2015-02-24.img`).
    *   Your kernel version (output of `uname -rv`)
    *   If you are using a library (ev3dev-lang, python-ev3, ev3dev-c, etc.) please
        state which library. Most, if not all, of these have their own issues tracker.
        You may have better luck posting there instead.
    *   If the issue is with detection of a sensor or motor: unplug and plug in the
        device and include the output of `dmsg | tail`.
    *   If the issue is with an USB device like a WiFi dongle: include the output of `lsusb`.
    *   If the issue is with the Brick Manager (brickman): include the output of
        `systemctl status brickman.service -l`.
    *   If a screenshot of the EV3 would be helpful, run `fbgrab <some-name>.png`
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

    * Learn more about [writing on GitHub]{:target="_blank"}.

[ev3dev-lang]: https://github.com/ev3dev/ev3dev-lang
[ev3dev-lang-issues]: https://github.com/ev3dev/ev3dev-lang/issues
[new issue]: https://github.com/ev3dev/ev3dev/issues/new
[writing on GitHub]: https://help.github.com/categories/writing-on-github/
