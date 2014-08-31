---
title: Using Motors
index: wiki
---

This page introduces the most basic motor attributes. It's part of a series of wiki pages that describe using motors with the EV3 running `ev3dev` that includes:

-  [Using Motors](https://github.com/mindboards/ev3dev/wiki/Using-Motors)
-  [Using Motors - Run Forever](https://github.com/mindboards/ev3dev/wiki/Using-Motors-Run-Forever)
-  [Using Motors - Run Limited](https://github.com/mindboards/ev3dev/wiki/Using-Motors-Run-Limited)

## Known issues

- Motor synchronization is not yet implemented.
- Only the standard EV3 and NXT tacho motors, as well as the new Firgelli L12-EV3-50 and L12-EV3-100 motors are auto detected.

## Overview

The `ev3dev` motor driver allows you to have complete control of the motor operation. You can:

- Run the motor in speed regulated or unregulated mode
- Choose to coast, brake or hold at the end of the motor operation
- Specify time or position based motor moves
- Specify absolute or relative positoin moves
- Add time based ramping at either end of the move
- Customise the PID parameters for speed regulation

With this flexibility comes a bit of extra complexity, but it's all laid out in an easy to understand set of control parameters - the Linux Way (tm).

## Auto Detection

The motor ports support autodetection of the standard tacho motor and the new minitacho motor. Older NXT and the Firgelli Linear Actuators are also supported. Simply plug a motor into any motor port and a new device is created. 

When the EV3 boots up, there are 4 motor ports created as part of the standard device driver enumeration on the `legoev3` bus. They are:

- `/sys/bus/legoev3/devices/outA`
- `/sys/bus/legoev3/devices/outB`
- `/sys/bus/legoev3/devices/outC`
- `/sys/bus/legoev3/devices/outD`

When you plug a motor into one of the ports, a new motor device is created in one of the above motor port directories. For example, if you plug a compatible motor into port B, the new device is available as the directory:

- `/sys/bus/legoev3/devices/outA/outA\:motor/tacho-motor/tacho-motor0/`

That gets a little unwieldy, but you can always make a link to a more convenient name.

The Linux device model also supports _device classes_. The supported tacho motors show up in the `tacho_motor` device class directory here:

- `ls /sys/class/tacho-motor/tacho-motor0`

Notice that the final directory name in the device class tree corresponds to the directory name in the `legoev3` bus tree.

The number after the `tacho-motor` increments every time `ev3dev` detects that you've plugged a motor in - and it has nothing to do with the por name. We'll show you how to get the port name next.

## Tacho Motor Attributes

The Linux device model communicates with devices using _attributes_. The tacho motor attributes use text based representations wherever possible. What that means is you won't need to remember things like wheter motor type 7 is a standard tacho motor or the new mini tacho motor. More on this later when we discusss the `type` attribute.

If you do a directory listing on a tacho motor device, you'll see something like this:

```
user@ev3dev:~# ls /sys/class/tacho-motor/tacho-motor0/
device/               pulses_per_second_sp  speed_regulation_P
duty_cycle            ramp_down_sp          state
duty_cycle_sp         ramp_up_sp            stop_mode
estop                 regulation_mode       stop_modes
polarity_mode         reset                 subsystem/
port_name             run                   time_sp
position              run_mode              type
position_mode         speed_regulation_D    uevent
position_sp           speed_regulation_I    
pulses_per_second     speed_regulation_K    
```

That's a lot of attributes! Fortunately, we don't need to deal with all of them at once. Attributes can be read-only, write_only, or read/write. You can read and write to device attributes using standard file I/O in your favorite programming language.

For example, from the Linux command line:

- You read a device attribute using the Linux `cat` command.
- You write to a device attribute using the Linux `echo` command.

Let's start with the simplest attributes to get comfortable with manipulating them.

### Tacho Motor Port Name

The tacho motor device name is unrelated to the port that it's plugged in to, but it's always available by reading the `port_name` attribute, like this:

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor0/port_name
outB
```

### Tacho Motor Type

Plug a full sized tacho motor (EV3 or NXT) into motor port B, then read the `type` attribute from the command line:

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor0/type
tacho
```

Now plug the smaller tacho motor into motor port B, then read the `type` attribute from the command line. Note that the tacho-motor0 directory disappeared, and tacho-motor1 is now available.

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor1/type
minitacho
```

You can override the motor type (if you want to) by writing the desired value to the attribute, like this:

```
user@ev3dev:~$ echo tacho > /sys/class/tacho-motor/tacho-motor1/type
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor1/type
tacho
```

Unplug the motor, wait a second or so, and then plug it back in again, and read the type. It should revert back to the `minitacho` value. Note that the tacho-motor number has incremented again...

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2
/type
minitacho
```

### Tacho Motor Position

The next attribute is `position` - it's a read-only indication of how many tacho ticks the driver has counted. Plug a standard tacho motor into motor port B and rotate the hub clockwise by hand.

After each rotation, read the `position` attribute. It should look something like this:

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/position
0
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/position
116
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/position
-210
```

You can read the `position` at any time. The number has a range of +/- 2,147,483,648 which is enough to measure the distance from New York to Los Angeles (3940 km) to an accuracy of about 2 mm.

In other words, it will be a long time before you run out of counts in most applications where the position is important.

### Tacho Motor Pulses Per Second

The `pulses_per_second` attribute is a read-only indication of how fast the motor is turning. The standard LEGO firmware and previous versions of ev3dev used `speed` - which was not measured in any particular units and changed depending on motor type.

The `ev3dev` motor driver uses the number of tacho pulses per second to represents speed, and it's the same for the standard as well as mini tacho motors.

The range of `pulses_per_second` for the `tacho` motor is +/- 900

The range of `pulses_per_second` for the `minitacho` motor is +/- 1200

The maximum `pulses_per_second` depends on motor loading and battery voltage.

You can read the motor speed at any time, even if the motor is being rotated by hand! To see this, connect rubber tires to the motor hub and push the motor forwards and backwards on your desk. While pushing the motor, read the `pulses_per_second` like this:

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/pulses_per_second
0
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/pulses_per_second
13
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/pulses_per_second
-20
```

Positive speeds correspond to increasing `position` counts, negative speeds correspond to decreasing `position` counts.

### Tacho Motor Duty Cycle

The `duty_cycle` attribute is a read-only indication of how hard the motor is being driven. It's measured in duty-cycle percentage. That's just fancy terminology for the percentage of the battery voltage being used to drive the motor. The `duty_cycle` ranges in value from -100 to +100, where 100% is driving the motor as hard as posible in the positive direction, and -100 driving the motor hard in the negative direction.

You can read the motor power at any time. Since we're not driving the motor at all yet,the `duty_cycle` attribute will simply return 0.

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/duty_cycle
0
```

### Tacho Motor State

The `state` attribute is a read-only indication of what state the motor is in. Depending on what you're doing, you'll get different results when reading this attribute. The result is a descriptive text string that represents the state of the motor driver.

You can read the motor state at any time. Since we're not driving the motor at all yet,the `state` attribute will simply return "idle".

```
user@ev3dev:~$ cat /sys/class/tacho-motor/tacho-motor2/state
idle
```

We'll learn more about the different states that the motor driver can have in the next tutorial - [Using Motors - Run Forever](https://github.com/mindboards/ev3dev/wiki/Using-Motors-Run-Forever).
