---
author: "@wasabifan"
title: "Announcing python-ev3dev v0.8.0"
---

We just released python-ev3dev v0.8.0, which includes a bunch of miscellaneous
bug fixes and some new goodies to try out.

<!--more-->

Firstly, we have added a [new "ev3dev.fonts" module][fonts] which allows you to
easily load a wide range of preexisting fonts by name. To draw text on the EV3
screen, for example, you could do this:

{% highlight python %}
import ev3dev.fonts as fonts
screen.draw.text((10,10), 'Hello World!', font=fonts.load('luBS14'))
{% endhighlight %}

We also changed the way that sensor-specific properties are accessed. Instead of
these "special" properties being accessible as _methods_, they are now Python
_properties_. This change means that instead of calling `my_sensor.angle()`, you
would access `my_sensor.angle` (without the parenthesis). These changes apply to
properties such as `TouchSensor.is_pressed` and `GyroSensor.angle`. 

 You can now ask to wait for a motor to change state, e.g. wait for
 a motor to stop running (`motor.wait_while('running')`). This comes with the
 caveat that waiting for the “stalled” state has issues on current kernel
 versions.
 
 Finally, the LED helper functions have been updated with new logic to make them
 operate much more reliably when using `trigger`s. This should now work without
 issue:

{% highlight python %}
Leds.set(Leds.LEFT, brightness_pct=0.5, trigger='timer', delay_off=3000, delay_on=500)
{% endhighlight %}

The full release notes are here: <https://github.com/rhempel/ev3dev-lang-python/releases/tag/0.8.0>.

To upgrade to this new version, run the following commands (make sure that you have
connected your EV3 to the internet):

{% highlight bash %}
sudo apt-get update
sudo apt-get install --only-upgrade python3-ev3dev
{% endhighlight %}

[fonts]: http://ev3dev-lang.readthedocs.io/projects/python-ev3dev/en/stable/other.html#bitmap-fonts