---
title: Using Motors Run Limited
index: wiki
---

This page introduces the `time` and `position` run modes of the `ev3dev` motor driver.  It's part of a series of wiki pages that describe using motors with the EV3 running `ev3dev` that includes:

-  [Using Motors](https://github.com/mindboards/ev3dev/wiki/Using-Motors)
-  [Using Motors - Run Forever](https://github.com/mindboards/ev3dev/wiki/Using-Motors-Run-Forever)
-  [Using Motors - Run Limited](https://github.com/mindboards/ev3dev/wiki/Using-Motors-Run-Limited)

### Table of Contents

- [Overview](#Overview)
- [`run_mode` = `time`](RunModeTime)
- [`time_sp`](TimeSetpoint)
- [`ramp_up` and `ramp_down`](RampUpAndDown)
- [`run_mode` = `position`](RunModePosition)
- [Setting the `position`](SettingPosition)
- [`position_setpoint`](PositionSetpoint)
- [`position_mode`](PositionMode)

### <a name="Overview"/> Overview

While the `forever` run mode is useful, sometimes you want to tell the system to run a motor for a fixed amount of time, or to some specific position. It's relatively easy to run at full power for n milliseconds, but that's not always helpful. Some robot mechanisms do not react well to being yanked up to full speed and then brought to an abrupt halt.

For these cases, a more general mode of operation that includes a ramp-up to a specified speed, and then a ramp-down to zero has been developed. In fact, there are 2 ramp-enabled `run_mode`s. The first is `time` and the second is `position`.

We'll start with the `time` description, then move on to a general description of how the `ramp_up` and `ramp_down` attributes are defined, and close out the note with `runmode` set to `position`.

The examples below all assume we're starting from where we left off in the previous tutorial - [Using Motors - Run Limited](https://github.com/mindboards/ev3dev/wiki/Using-Motors-Run-Limited).

### <a name="RunModeTime"/> `run_mode` = `time`

The `run_mode` attribute default is `forever`, but you can simply write `time` to it. So let's go ahead and do that to get started.

```
user@ev3dev:~$ echo  time > /sys/class/tacho-motor/tacho-motor2/run_mode
user@ev3dev:~$ echo   off > /sys/class/tacho-motor/tacho-motor2/regulation_mode
user@ev3dev:~$ echo coast > /sys/class/tacho-motor/tacho-motor2/stop_mode
user@ev3dev:~$ echo    40 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
user@ev3dev:~$ echo     1 > /sys/class/tacho-motor/tacho-motor2/run
```

What happened? Nothing. That's because we have not told the motor how long it should run for yet!

### <a name="TimeSetpoint"/> `time_sp`

We have gone over the `duty_cycle_sp` in a previous section to set the power level that can be delivered to the motor.

It stands to reason that there should be an attribute that tells the motor driver how long it should run for, and that's exactly what `time_sp` does for us. As soon as we set a value and tell the motor to run, it will run for `time_sp` milliseconds from that point in time.

```
user@ev3dev:~$ echo 0    > /sys/class/tacho-motor/tacho-motor2/run
user@ev3dev:~$ echo 2000 > /sys/class/tacho-motor/tacho-motor2/time_sp
user@ev3dev:~$ echo 1    > /sys/class/tacho-motor/tacho-motor2/run
```

Nice! The motor runs for exactly 2 seconds - but it coasts to a stop. We know how to fix that.

```
user@ev3dev:~$ echo brake > /sys/class/tacho-motor/tacho-motor2/stop_mode
user@ev3dev:~$ echo    1  > /sys/class/tacho-motor/tacho-motor2/run
```

And note that the `time_sp` does not change, even after the run. That means you can easily tell the motor to run for the same amount of time without having to reload  `time_sp`.

### <a name="RampUpAndDown"/> `ramp_up_sp` and `ramp_down_sp`

The `time_sp` works well, but has the disadvantage of starting and stopping somewhat suddenly, and that's where `ramp_up_sp` and `ramp_down_sp` come in to help us.

The `ramp_up_sp` attribute is the number of milliseconds that it would take to ramp the motor up from 0% to 100% power.

The `ramp_down_sp` attribute is the number of milliseconds that it would take to ramp the motor down from 100% to 0% power.

What's really neat about this is that no matter what your `duty_cycle_sp` or `pulses_per_second_sp` is, the ramp rate never changes. This is super useful when you are tuning your motor control operation. In other words, the _slope_ of the ramp stays constand no matter what the final power or speed setting is.

As an experiment, we can try this command that should ramp the motor up to 100% power for 1000 msec (1 sec), then ramp the motor back down to 0% for 1000 msec.

```
user@ev3dev:~$ echo brake > /sys/class/tacho-motor/tacho-motor2/stop_mode
user@ev3dev:~$ echo  1000 > /sys/class/tacho-motor/tacho-motor2/ramp_up_sp
user@ev3dev:~$ echo  2000 > /sys/class/tacho-motor/tacho-motor2/time_sp
user@ev3dev:~$ echo  1000 > /sys/class/tacho-motor/tacho-motor2/ramp_down_sp
user@ev3dev:~$ echo   100 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
user@ev3dev:~$ echo     1 > /sys/class/tacho-motor/tacho-motor2/run
```

Now let's say that 100% power is too fast for our operation, and we change the `duty_cycle_sp` to 50 - what will the motor do? Think about it for a few seconds...

The `ramp_up_sp` and `ramp_down_sp` attributes have not changed, so the ramp rates are the same, but the `duty_cycle_sp` is now half of 100% - so it will take half as long for the increasing speed to hit the setpoint!

The motor should ramp up to 50% power in 500 msec, run at 50% for 1000 msec, then ramp the back down to 0% in 500 msec.

```
user@ev3dev:~$ echo    50 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
user@ev3dev:~$ echo     1 > /sys/class/tacho-motor/tacho-motor2/run
```

Notice that we only had to change the `speed_setpoint` - all the other values stay the same.

Similarly, if we change the `ramp_up` value to 500 then the motor will only spend about half that time getting to 50% power, or 250 msec.

```
user@ev3dev:~$ echo   500 > /sys/class/tacho-motor/tacho-motor2/ramp_up_sp
user@ev3dev:~$ echo   500 > /sys/class/tacho-motor/tacho-motor2/ramp_down_sp
user@ev3dev:~$ echo     1 > /sys/class/tacho-motor/tacho-motor2/run
```

Experiment a bit with the `time` based `run_mode` to get the hang of using it.

### <a name="RunModePosition"/> `run_mode` = `position`

The `position` run mode is how you get precise, repeatable servo motions from the tacho motors attached to the EV3 - this is arguably the feature that set the LEGO NXT apart from the RCX, and with `ev3dev` there is unprecedented control of the motor operation.

This `run_mode` benefits from having `regulation_mode` set to `on` for more stable low_speed operation, and it's a good idea to also set `stop_mode` to make sure that the end point is hit more accurately.

NOTE: Check to see if `position` modes work at all when the `regulation_mode` is `off`.

The `ev3dev` motor driver will take into account any overshoot or undershoot in the final position of the motor before the next run to a specified position.

For the ultimate in accuracy, you can also set `hold_mode` to `on` - this will effectively snap the motor into the final position and hold it there - very handy if you're trying to hold an arm in a fixed position.

Finally, we should note that when using the `position` run mode, some tuning will be needed to get the ramp and speed setpoints correct. For some combinations of speed and position and ramp time, you'll see that the motor either overshoots the mark (high speed or short ramps) or slowly creeps up to the final position (low speed or long ramps).

Be prepared to experiment and get awesome results!

### <a name="SettingPosition"/> Setting the `position`

If you have been following along and running the motors, the position of your motor will be at some non-zero value, you can check it like this:

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/position
8527
```

What do you think will happen the first time we ask the motor to go to a setpoint, for example 360? Think for a minute...

Right - it will start spinning _from_ 8527 _to_ 360 - which may not at all be what we intend to do. So, how can we fix this?

The `position` attribute was advertised as read-only. In fact, you _can_ write to it, and the new motor position will be reflected in the value you write. For the next section on the `position_setpoint`, we'll want the starting position of the motor to be 0 - so let's set it up that way...

```
user@ev3dev:~$ echo 0  > /sys/class/tacho-motor/tacho-motor2/position
user@ev3dev:~$ cat       /sys/class/tacho-motor/tacho-motor2/position
0
```

### <a name="PositionSetpoint"/> `position_setpoint`

We'll assume that you've got the `ramp_up_sp` and `ramp_down_sp concepts well in hand. The `position` mode uses these values to control the departure form the current position and the approach to the new position.

Also make sure you've zero'ed the current motor position as described in the previous section.

Here's a set of instructions to set up a motion to put the new motor position at 360 - remember, the `tacho` motor counts pulses, not degrees. It just happens that the engineers at LEGO designed the motors to count 360 pulses for a full circle!

We'll do this in two parts, resetting the motor position and setting up the motion characteristics that will not change, like the run, stop and regulation modes and the ramp and speed setpoints:

```
user@ev3dev:~$ echo        0 > /sys/class/tacho-motor/tacho-motor2/position
user@ev3dev:~$ echo position > /sys/class/tacho-motor/tacho-motor2/run_mode
user@ev3dev:~$ echo    brake > /sys/class/tacho-motor/tacho-motor2/stop_mode
user@ev3dev:~$ echo       on > /sys/class/tacho-motor/tacho-motor2/regulation_mode
user@ev3dev:~$ echo      300 > /sys/class/tacho-motor/tacho-motor2/ramp_up_sp
user@ev3dev:~$ echo      300 > /sys/class/tacho-motor/tacho-motor2/ramp_down_sp
user@ev3dev:~$ echo      500 > /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
```

Then set up the move to 360 and execute it:

```
user@ev3dev:~$ echo 360 > /sys/class/tacho-motor/tacho-motor2/position_sp
user@ev3dev:~$ echo   1 > /sys/class/tacho-motor/tacho-motor2/run
```

Cool! The motor moves one full circle. And if we ask the motor to run again, what happens?

```
user@ev3dev:~$ echo 1  > /sys/class/tacho-motor/outB:motor:tacho/run
```

Nothing, because the motor is already at the target position. It might wiggle a little bit because we're not in `hold` mode. You need to give the motor a new `position_setpoint` to get it to move, like this:

```
user@ev3dev:~$ echo 720 > /sys/class/tacho-motor/tacho-motor2/position_sp
user@ev3dev:~$ echo   1 > /sys/class/tacho-motor/tacho-motor2/run
```

One thing to also keep in mind is that the sign of the `pulses_per_second_sp` is ignored in the `position` run mode. It's too much of a hassle to ask the programmer to keep track of whether the `position_setpoint` is in the positive or negative direction, so the driver looks after this for you.

### <a name="PositionMode"/> `position_mode`

In the previous section, we set up things so that the motor could move to a specific setpoint. This is very useful for robots that need to have their positions specified in absolute values, such as chart recorders, XY plotters, etc.

But what if your motor needs relative motion? For example, many robots need a mechanism that always turns in the same direction by steps. This is easily done with the `position_mode` attribute.

The default value for `position_mode` is `absolute`. That's why the previous example needs a new `position_setpoint` for every move. But you can also set the `position_mode` attribute to `relative` mode.

```
user@ev3dev:~$ cat             /sys/class/tacho-motor/tacho-motor2/position_mode
absolute
user@ev3dev:~$ echo relative > /sys/class/tacho-motor/tacho-motor2/position_mode
user@ev3dev:~$ cat             /sys/class/tacho-motor/tacho-motor2/position_mode
relative
```

Keep in mind that `relative` mode moves the motor a certain number of steps from the previous setpoint. This is very important when you transition from `forever` or `time` run modes to `position`.

*Always* remember to set your `position` attribute when changing into the relative postion run mode. You can set the position to `0`, the current value of `position` or some other arbitrary value, but you MUST set it.

```
user@ev3dev:~$ echo   0 > /sys/class/tacho-motor/tacho-motor2/position
user@ev3dev:~$ cat        /sys/class/tacho-motor/tacho-motor2/position
456
user@ev3dev:~$ echo 456 > /sys/class/tacho-motor/tacho-motor2/position
user@ev3dev:~$ echo 100 > /sys/class/tacho-motor/tacho-motor2/position
```

We'll leave the run, stop and regulation modes as they were in the previous example and set things up for `relative` position mode, remember to set the `position`. We'll also set the `position_sp` to 90 counts, and execute the move:

```
user@ev3dev:~$ echo relative > /sys/class/tacho-motor/tacho-motor2/position_mode
user@ev3dev:~$ echo        0 > /sys/class/tacho-motor/tacho-motor2/position
user@ev3dev:~$ echo       90 > /sys/class/tacho-motor/tacho-motor2/position_sp
user@ev3dev:~$ echo        1 > /sys/class/tacho-motor/tacho-motor2/run
```

Nice, the motor runs exactly 90 counts (degrees in this case).

To run the exact same motion again, all we need to do is write 1 to run:

```
user@ev3dev:~$ echo        1 > /sys/class/tacho-motor/tacho-motor2/run
```

And now the motor should be at 180, right?

```
user@ev3dev:~$ cat /sys/class/tacho-motor/outB:motor:tacho/position
180
```

Yes, it's exactly 180 in this case. The actual position may be +/- 5 count from the setpoint, but it's usually exactly correct if you have `hold_mode` set to `on`.









