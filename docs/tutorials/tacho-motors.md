---
title: Using the Tacho-Motor Class
subject: Hardware - Motors
---

* Table of Contents
{:toc}

This tutorial uses a command line shell to demonstrate how to use the [tacho-motor] class.

## About tachometers

A [tachometer] is a device that measures rotational speed. The LEGO MINDSTORMS
NXT and EV3 motors have an optical encoder that sends electrical pulses to the
EV3 when the motor rotates.

We call any motor that can see feedback like this a "tacho-motor". Using this
feedback, you have greater control over the speed and position of the motor
compared to motors that do not provide feedback.

## Identifying the Motor

Always be sure to check the `port_name` attribute to identify a motor (same with
sensors). Here is a command that lists the `port_name` of all tacho motors...

    $ for f in /sys/class/tacho-motor/*; do echo -n "$f: "; cat $f/port_name; done
    /sys/class/tacho-motor/motor0: outA
    /sys/class/tacho-motor/motor1: outB
    /sys/class/tacho-motor/motor2: outC
    /sys/class/tacho-motor/motor3: outD
    /sys/class/tacho-motor/motor4: in4:i2c3:mux0
    /sys/class/tacho-motor/motor5: in4:i2c3:mux1

I have a motor plugged into each of the four output ports of the EV3 (A-D) and
I also have a mindsensors.com NxtMMX plugged into input port 4 which provides
two additional motors. So, for example, if I want to control the motor attached
to output port C, then I need to use the path `/sys/class/tacho-motor/motor2`.

To save some typing, I'm going to define a variable for the motor path...

    $ export MC=/sys/class/tacho-motor/motor2

Now we can just type `$MC` for the motor path.

## Reseting the Motor

The tacho-motor class has a `reset` command that resets all of the parameters
back to the default values and stops the motor. It is a good idea to send this
command at the start of a program to ensure the motor is in a known state without
having to write each of the parameters individually. Let's do that first...

    $ echo reset > $MC/command

## Position and Speed

Unlike other MINDSTORMS software, the units of measurement used are in tachometer
counts rather than rotations or degrees. This can be tricky because for the NXT
and EV3 motors, one pulse of the tachometer = one degree. If you use a 3rd party
motor, it may be different.

Let's start by looking at the `position` attribute...

    $ cat $MC/position
    0

If you have not rotated your motor since you plugged it in, it should say `0`.
If not, we can reset it with...

    $ echo 0 > $MC/position

Note: you will get an error if you do this while the motor is running.

Now, turn the motor one rotation by hand and read the position again...

    $ cat $MC/position
    345

It should be somewhere close to the value returned by the `count_per_rot`
(tachometer pulse counts per one rotation) attribute...

    $ cat $MC/count_per_rot
    360

Speed is similar in that the units are in tachometer pulse counts per second.
You can watch the speed by running...

    $ while true; do echo -en "\033[0G$(cat $MC/speed)   "; done

... and then turn the motor by hand to watch the value change. You should see
numbers between +/-300 (unless you are not being nice to your motor and turning
it very fast). Press `^C` when you are done. Note: `\033[0G` is an escape code
that moves the cursor back to the beginning of the line so that we don't fill up
the screen with numbers.

## Running the Motor

The most obvious thing to do with a motor is make it run, so let's do that first.

 To run the motor, we need to send
it a command. To find out what commands are available, read the `commands` attribute.
Other motor controllers, such as the NxtMMX may not support all of the possible
commands, so it is always good to check this attribute.

    $ cat $MC/commands
    run-forever run-to-abs-pos run-to-rel-pos run-timed run-direct stop reset

Let's have a look at the `run-*` commands.

### run-forever

This command works like "Duration: unlimited" in NXT-G or "On" in EV3-G. The
motor will run until we send another command. So, let's run it...

    $ echo run-forever > $MC/command

... and nothing happens. We forgot to tell it how fast to go. We do this by
setting the `duty_cycle_sp` to a value between 0 and 100...

    $ echo 50 > $MC/duty_cycle_sp

... and still nothing happens. This is because parameters only take effect when
we send a command. If we change a parameter, we have to send the command again
in order to apply the changes.

    $ echo run-forever > $MC/command

... now the motor is running. Let's make the motor turn in the opposite
direction, but a little slower. Using a negative value changes the direction...

    $ echo -20 > $MC/duty_cycle_sp
    $ echo run-forever > $MC/command

... and stop it...

    $ echo stop > $MC/command

### run-to-abs-pos

This means "run to absolute position". The position is specified by writing to
the `position_sp` attribute. Remember, the units are in tachometer pulse counts,
so if you are not using a LEGO motor, then you will need to do some math to
convert to/from degrees.

The `position_sp` should be at 0, so if we send this command, the motor will
run until the `position` is 0. If you have turned the motor many times, this
could take a while. We'll add an extra command so we can watch the position
change.

    $ cat $MC/position_sp
    0
    $ echo run-to-abs-pos > $MC/command
    $ while true; do echo -en "\033[0G$(cat $MC/position)   "; done

### run-to-rel-pos

This means "run to relative position". Again, the position is specified by
`position_sp`, but this time the value is added to the current position. So,
if we run...

    $ echo 180 > $MC/position_sp
    $ echo run-to-rel-pos > $MC/command

... the motor will turn 1/2 of a turn. If we run...

    $ echo run-to-rel-pos > $MC/command

... again, the motor will turn an additional 1/2 turn.

Note: Using a negative value for `position_sp` will cause the motor to rotate
in the opposite direction.

### run-timed

This is an easy way to run the motor for a specified time asynchronously.
Essentially, it starts the motor using the `run-forever` command and sets a
timer in the kernel to run the `stop` command after the specified time. The
time, in milliseconds, is written to the `time_sp` attribute.

    $ echo 2000 > $MC/time_sp
    $ echo run-timed > $MC/command

This will cause the motor to run for 2 seconds. Notice that writing to `command`
returns immediately. If you need to block the program from running while the
motor runs for a period of time, you should use the `run-forever` and `stop`
command along with the built-in time delay functions in your programming
language.

    $ run-for-time() { echo run-forever > $MC/command; sleep $1; echo stop > $MC/command; }
    $ run-for-time 2

This function does not return until the time has elapsed (it runs synchronously).

Likewise, if you need your program to *not* block during the time delay, but you
need something to happen after the time delay, you should use the features of
your programming language for an asynchronous callback, like `setTimeout()` in
javascript.

    $ run-for-time() { echo run-forever > $MC/command; (sleep $1; echo stop > $MC/command;) & }
    $ run-for-time 2

### run-direct

This command works just like `run-forever` except that changes to `duty_cycle_sp`
take effect immediately instead of having to send a new command. This is useful
for implementing your own PID or something similar that needs to update the
motor output very quickly.

Note: Not all motor controller support this command.

So, like before, we can start the motor...

    $ echo 20 > $MC/duty_cycle_sp
    $ echo run-direct > $MC/command

But, this time when we change the duty cycle, the motor speed changes...

    $ echo 30 > $MC/duty_cycle_sp

## Stopping the Motor

As we have already seen, with the `run-to-*-pos` and `run-timed` commands, the
motor will stop automatically. For the other run commands, you have to send a
`stop` command to make the motor stop. The motor actually has three possible
behaviors when it stops. We can list them by reading the `stop_commands` attribute...

    $ cat $MC/stop_commands
    coast brake hold

Note: Some motor controllers may not support all of these, so it is a good idea
to always check this attribute.

### coast

`coast` means that power will be removed from the motor and it will coast to a
stop. Let's try it...

    $ echo 100 > $MC/duty_cycle_sp
    $ echo 1000 > $MC/time_sp
    $ echo coast > $MC/stop_command
    $ echo run-timed > $MC/command

Notice how it takes the motor about 1 additional second to actually stop. Also,
try turning the motor by hand. It turns fairly easily.

### brake

`brake` means to use passive braking, which is another way of saying that the
motor controller removes power from the motor, but it also shorts the power
wires of the motor together. When a motor is manually rotated, it acts as an
electrical generator, so shorting the power wires creates a load that absorbs
the energy.

    $ echo brake > $MC/stop_command
    $ echo run-timed > $MC/command

Notice how much faster the motor stops this time. Also try turning it by hand.
The motor turns, but it is more difficult to turn.

### hold

`hold` means to actively hold the motor position when stopping. Instead of
removing power from the motor, the motor controller will start a PID to prevent
the motor from being turned any farther. This stop command is really intended
for use with the `run-to-*-pos` commands. It will work with other run commands,
but may result in unexpected behavior.

    $ echo hold > $MC/stop_command
    $ echo 180 > $MC/position_sp
    $ echo run-to-rel-pos > $MC/command

Try to turn the motor now. The motor might turn a small amount, but the more you
push, the more it will push back. You can actually see how hard the motor is
pushing back by reading the `duty_cycle` attribute. This attribute returns the
actual power being sent to the motor (0 to +/-100%)...

    $ while true; do echo -en "\033[0G$(cat $MC/duty_cycle)   "; done

## Polarity

The "forward" direction of a motor can be changed using the `polarity` attribute.
This is useful, for example, when you have two motors used as drive wheels. By
changing the polarity of one of the two motors, you can send a positive value
to both motor to drive forwards.

Normally, the polarity is `normal`...

    $ cat $MC/polarity
    normal

Run the motor and see which way it rotates...

    $ echo 30 > $MC/duty_cycle_sp
    $ echo run-forever > $MC/command
    $ while true; do echo -en "\033[0G$(cat $MC/position) $(cat $MC/speed)   "; done

The position is increasing and the speed is positive. Then change the polarity
to `inversed`...

    $ echo inversed > $MC/polarity

Like before, nothing happens. We have to send a command again...

    $ echo run-forever > $MC/command
    $ while true; do echo -en "\033[0G$(cat $MC/position) $(cat $MC/speed)   "; done

Now, the motor runs in the opposite direction, however the position is still
increasing and the speed is still positive. Be sure to change to polarity back
to `normal` before continuing...

    $ echo stop > $MC/command
    $ echo normal > $MC/polarity


## Speed Regulation

So far, we have just specified a duty cycle to control the speed of the motor.
This is OK, but the actual speed of the motor will depend on battery voltage
and the load on the motor. If you have an application where you need repeatable
results, it might be better to run the motor at a fixed speed. You can do this
by turning on speed regulation...

    $ echo on > $MC/speed_regulation

Now, instead of using the `duty_cycle_sp`, the driver will use `speed_sp`. As
discussed already, the units are tachometer counts per second. You can convert
to RPM by dividing the value in `count_per_rot`. For the EV3 large motor, the
maximum speed is about 900 counts per second and the EV3 medium motor is about
1200 counts per second. To ensure that the motor runs at the same speed every
time, even with low battery, use values less than these.

First, let's see what happens when speed regulation is off...

    $ echo off > $MC/speed_regulation
    $ echo 30 > $MC/duty_cycle_sp
    $ echo run-forever > $MC/command
    $ while true; do echo -en "\033[0G$(cat $MC/duty_cycle) $(cat $MC/speed)   "; done

The motor runs somewhere around 275 counts per second. Use your fingers to slow
down the motor. Notice that the duty cycle remains constant and the speed
decreases when you place a load on the motor. Now, let's try speed regulation...

    $ echo stop > $MC/command
    $ echo on > $MC/speed_regulation
    $ echo 275 > $MC/speed_sp
    $ echo run-forever > $MC/command
    $ while true; do echo -en "\033[0G$(cat $MC/duty_cycle) $(cat $MC/speed)   "; done

With no load, the duty cycle should be about the same as before (30%). Now, use
your fingers to slow down the motor again. This time, the driver increases the
duty cycle to make up for the load on the motor. As long as the load on the
motor remains constant, the speed should remain fairly constant. It may
overcompensate a bit though if the load changes rapidly.

Speed regulation works with all of the run commands. Just remember, you need to
set `speed_sp` instead of `duty_cycle_sp` when speed regulation is on.

## Ramping

Ramping needs some work in the drivers, so nothing here yet...

## State Flags

You can monitor several aspects of the motor by reading the `state` attribute.
Possible values are `running`, `ramping`, `holding` and `stalled`. Reading the
attribute returns a space-separated list of flags, so use your programming
language's string split function to split on the space (ascii 32) character to
get individual flags or use the string contains (or index of) function to test
for the presence of a flag.

### running

This flag indicates that the motor is powered. This means that a run command is
active or if the stop command is `hold`, the motor is holding position. If the
power is low enough, the motor may not actually be moving even though the
`running` flag is present.

Note: To check that a run command is active when stop mode is `hold`, checking
the `running` flag is not enough. e.g. run-command-active = `running` and not
`holding`.

### ramping

This flag indicates that the motor is ramping up or down rather than operating
at the duty cycle or speed setpoint.

### holding

This flag indicates that no run command is active but the motor is still being
powered to hold the position because the stop command is set to `hold`.

### stalled

This flag indicates that a run command is trying to rotate the motor, but the
motor is not actually moving. This can be caused by something mechanically
preventing the motor from rotating or it could mean that the power being sent
to the motor is not enough (too small) to make the motor move.

[tacho-motor]: /docs/drivers/tacho-motor-class
[tachometer]: https://en.wikipedia.org/wiki/Tachometer
