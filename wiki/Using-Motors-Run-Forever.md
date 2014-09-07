---
title: Using Motors Run Forever
index: wiki
---

This page introduces the fundamental `run_forever` mode of the `ev3dev` motor driver.  It's part of a series of wiki pages that describe using motors with the EV3 running `ev3dev` that includes:

-  [Using Motors](https://github.com/mindboards/ev3dev/wiki/Using-Motors)
-  [Using Motors - Run Forever](https://github.com/mindboards/ev3dev/wiki/Using-Motors-Run-Forever)
-  [Using Motors - Run Limited](https://github.com/mindboards/ev3dev/wiki/Using-Motors-Run-Limited)

### Table of Contents

- [Overview](#Overview)
- [`run_mode`](#TachoMotorRunMode)
- [`regulation_mode`](#TachoMotorRegulationMode)
- [`duty_cycle_sp`](#TachoMotorDutyCycleSP)
- [`run`](#TachoMotorRun)
- [`pulses_per_second_sp`](#TachoMotorPulsesPerSecondSP)
- [`stop_mode`](#TachoMotorStopMode)

### <a name="Overview"/> Overview

The simplest `ev3dev` motor driver operation is the so-called `run_forever` mode. You specify the  `pulses_per_second_sp` attribute and the motor driver runs the motor until you tell it to stop. You can also use the `regulation_mode` attribute to affect how the driver handles changes in motor speed due to loading.

The examples below all assume we're starting from where we left off in the previous tutorial - [Using Motors](https://github.com/mindboards/ev3dev/wiki/Using-Motors).


### <a name="TachoMotorRunMode"/> Tacho Motor `run_mode`

The `run_mode` attribute determines how the motor is going to run. The default `run_mode` when you plug in a motor is `forever` - which is exactly what we need here. Read the current `run_mode` of your motor to be sure it's set correctly. If it's anything other than `forever`, just unplug the motor for a few seconds and plug it in again to reset it.

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/run_mode
forever
```

### <a name="TachoMotorRegulationMode"/>Tacho Motor `regulation_mode`

Here's where we encounter our first bit of potentially confusing information. We need to talk about `regulation_mode` before we describe `duty_cycle_sp` and `pulses_per_second_sp`.

The standard LEGO firmware, and previous versions of `ev3dev` used `speed` as a catch-all to describe how fast the motor should go. As you'll see shortly, the meaning of `speed` depends on whether the motor is running in regulated mode.

The `regulation_mode` attribute has two possible values `on` and `off` - the default is `off`. To turn on regulation, all you need to do is write `on` to the `regulation_mode` attribute, like this:

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/regulation_mode
off
user@ev3dev:~$ echo on > /sys/class/tacho-motor/tacho-motor2/regulation_mode
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/regulation_mode
on
user@ev3dev:~$ echo off > /sys/class/tacho-motor/tacho-motor2/regulation_mode
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/regulation_mode
off
```

Let's start with `regulation_mode` set to `off`. In this mode, the motor driver uses the `duty_cycle_sp` to determine what percentage of the battery voltage to send to the motor.
 
If you run the motor at a fairly low `duty_cycle_sp`, and you try to stop the hub of the motor with your thumb, you'll find it's pretty easy to slow down or even stop the motor. In some cases, this is not what you want. You want the motor to "try harder" when it encounters resistance - and the `regulation_mode` attribute is going to help us with that.

When the `regulation_mode` attribute is set to `on`, the motor driver attempts to keep the motor speed at the value you've specified in `pulses_per_second_sp`. If you slow down the motor with a load, the motor driver tries to compensate by sending more power to the motor to get it to speed up. If you speed up the motor for some reason, the motor driver will try to compensate by sending less power to the motor.

To summarize:

| `regulation_mode` | Controlling Setpoint   | Actual Value        |
|-------------------|------------------------|---------------------|
| `off` (default)   | `duty_cycle_sp`        | `duty_cycle`        |
| `on`              | `pulses_per_second_sp` | `pulses_per_second` |

Regulation can help when the batteries start running low. Remember that the `duty_cycle_sp` in unregulated mode just sends a percentage of the battery voltage to the motor. When the batteries get depleted, the percentage stays the same but the resulting voltage at the motor goes down in proportion to the battery, and the motor will run slower.

Turning regulation on in this case will make the EV3 driver the ports a little harder to compensate for the lower battery voltage to try and keep the speed at the `pulses_per_second_sp`.

Changing the `regulation_mode` while the motor is running can lead to unexpected operation, so avoid doing that.

### <a name="TachoMotorDutyCycleSP"/>Tacho Motor `duty_cycle_sp`

The `duty_cycle_sp` is useful when you just want to turn the motor on and are not too concerned with how stable the speed is. The `duty_cycle_sp` attribute accepts values from -100 to +100. The sign of the attribute determines the direction of the motor.

It's easy to control the motor using this attribute - here's an example that sets the `duty_cycle_sp` to a series of values, including an illegal one. Note that the motor will not actually turn on yet, that's the next attribute we'll go over.

```
user@ev3dev:~$ echo   0 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
user@ev3dev:~$ echo   1 > /sys/class/tacho-motor/tacho-motor2/run
user@ev3dev:~$ echo  25 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
user@ev3dev:~$ echo  50 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
user@ev3dev:~$ echo -50 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
user@ev3dev:~$ echo 101 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
-bash: echo: write error: Invalid argument
```

Of course, you can read the `duty_cycle_sp` back using the by-now familiar `cat` command:

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/duty_sycle_sp
-50
```

Yep, that was the last reasonable value that was set!

### <a name="TachoMotorRun"/>Tacho Motor `run`

The `run` attribute is a numerical value - 0 means stop, anthing else means run

Here we will force the motor to run at the desired `duty_cycle_sp` forever. You can update the `duty_cycle_sp` while the motor is running.

```
user@ev3dev:~$ echo  50 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
user@ev3dev:~$ echo   1 > /sys/class/tacho-motor/tacho-motor2/run
user@ev3dev:~$ echo  75 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
user@ev3dev:~$ echo -50 > /sys/class/tacho-motor/tacho-motor2/duty_cycle_sp
```

You can read the position, speed, and state of the motor too:

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/state
ramp_const
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/pulses_per_second
-409
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/duty_cycle
-50
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/position
-9044
```

If you're paying attention, you'll be asking yourself what the `ramp_const` state could possibly be for. That will come in the next tutorial. For now, you can think of this state as one where the motor control setpoint is at a constant value.

And of course, you can stop the motor by writing 0 to the `run` attribute.

```
user@ev3dev:~$ echo 0 > /sys/class/tacho-motor/tacho-motor2/run
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/state
idle
```

The motor should gently "coast" to a stop. We'll discuss making the motor "brake" instead of coast a bit later.

### <a name="TachoMotorPulsesPerSecondSP"/>Tacho Motor `pulses_per_second_sp`

So far we've covered running the motor with `regulation_mode` set to `off` - now let's see what happens when we set `regulation_mode` to `on`.

Recall that `regulation_mode` set to `on` uses a different control setpoint - `pulses_per_second_sp`. The motor driver attempts to keep the motor speed at the set value even in the face of varying loads. This is a much more reliable way to drive the motor at very low speeds.

The useful `pulses_per_second_sp` attribute range depends on the motor type. For the standard `tacho` motor it's about +/- 900. The new `minitacho` motor has a useful range of about +/- 1200 pulses per second.

We want to allow for future expansion, so the range of values accepted for `pulses_per_second_sp` is +/- 2000.

Here's an example of valid and invalid writes to the `pulses_per_second_sp` attribute:

```
user@ev3dev:~$ echo -400 > /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
user@ev3dev:~$ echo  400 > /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
user@ev3dev:~$ echo 1500 > /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
user@ev3dev:~$ echo 2001 > /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
-bash: echo: write error: Invalid argument
```

Of course, you can read the `speed_setpoint` back using the `cat` command:

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
1500
```

Yep, that was the last reasonable value that was set!

By this time, you should be able to figure out how to play around with this atribute, but here's an example anyways:

```
user@ev3dev:~$ echo   on > /sys/class/tacho-motor/tacho-motor2/regulation_mode
user@ev3dev:~$ echo  500 > /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
user@ev3dev:~$ echo    1 > /sys/class/tacho-motor/tacho-motor2/run
user@ev3dev:~$ echo  300 > /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
user@ev3dev:~$ echo  100 > /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
user@ev3dev:~$ echo -300 > /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
user@ev3dev:~$ echo    0 > /sys/class/tacho-motor/tacho-motor2/run
```

You'll notice that when `regulation_mode` is `on` the motor tends to "jump" up to the setpoint, even overshooting the speed before settling down. This is most noticeable when there is very little load on the motor. In the next tutorial, we'll cover ramping the speed up and down to achieve smooth changes in speed.

### <a name="TachoMotorStopMode"/>Tacho Motor `stop_mode`

If you have been following along with the examples, you'll notice that the motor does not stop immediately when `run` is set to `0`. For some kinds of robots, a more precise method of stopping is needed - and that's where the `stop_mode` attribute comes in.

In previous versions of `ev3dev` this was a simple `on` and `off` attribute - but now it has three values. They are `coast` (the default) `brake` and `hold`. In `coast` mode, when the motor is turned off the internal H-bridge that drives the motors is left in a state where there is no load applied to the motor. When you set the `stop_mode` attribute to `brake`, the H-bridge applies a short across the motor terminals.

To see the effect of this in action, turn the hub of the motor when it is disconnected from the brick. Note the relative ease of turning the hub, and how it coasts after you stop spinning it.

Now attach the standard tacho motor to the other tacho motor in the kit, using one of the connection cables. Turn on of the motor hubs. Did you notice that it was a bit harder to turn? Did you notice that the hub of the other motor turned too? That's the effect of a motor in generator mode. Applying energy to the output of the motor (turning the hub) results in electricity being generated by the motor!

Now hold the hub of the one motor in fixed position while turning the hub of the other motor. Notice that the hub is much harder to turn now, and no longer "coasts" to a stop.

Notice the difference in how the motor stops in the following example:

```
user@ev3dev:~$ echo    on > /sys/class/tacho-motor/tacho-motor2/regulation_mode
user@ev3dev:~$ echo   500 > /sys/class/tacho-motor/tacho-motor2/pulses_per_second_sp
user@ev3dev:~$ echo     1 > /sys/class/tacho-motor/tacho-motor2/run
user@ev3dev:~$ echo     0 > /sys/class/tacho-motor/tacho-motor2/run
user@ev3dev:~$ echo brake > /sys/class/tacho-motor/tacho-motor2/stop_mode
user@ev3dev:~$ echo     1 > /sys/class/tacho-motor/tacho-motor2/run
user@ev3dev:~$ echo     0 > /sys/class/tacho-motor/tacho-motor2/run

```

You can update the `stop_mode` even while the motor is running, but you won't see its effect until the motor stops. Also note that the motor driver is left in `brake` mode, and that the motor hub is harder to turn than when it's in `coast` mode.

While the `stop_mode` attribute set to `brake` improves the ability of the motor to stop quickly, the `hold` value does it one better. This mode is used to tell the motor driver to hold its position after it has been turned off.

Be careful, this can consume quite a bit of power if you are trying to hold a large load stationary.

Note that this is the only attribute that has any effect on the motor when the motor `run` attribute is '0' - so you can test it right away. Enter the following commands if your motor is plugged in to Motor Port B, and then try and turn the motor hub!

```
user@ev3dev:~$ cat         /sys/class/tacho-motor/tacho-motor2/stop_mode
brake
user@ev3dev:~$ echo hold > /sys/class/tacho-motor/tacho-motor2/stop_mode
user@ev3dev:~$ cat         /sys/class/tacho-motor/tacho-motor2/stop_mode
hold
```

When you select the `hold` for the `stop_mode`, you'll notice a slight overshoot in position if the motor is running with little or no load. In the next tutorial, we'll cover ramping the speed up and down to achieve smooth `hold` mode operation.
