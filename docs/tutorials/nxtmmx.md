---
title: Using the mindsensors.com NxtMMX Motor Controller
subject: Hardware - Motors
---

The [mindsensors.com NxtMMX] motor controller uses the [tacho-motor class], so
most of the information in the [tahco-motor tutorial] is applicable. However,
it does not support all of the possible functions of the tacho-motor class.

## Duty Cycle

The NxtMMX does not have a way to monitor the duty cycle of the motor, so reading
the `duty_cycle` attribute will return `-EOPNOTSUPP`. Additionally, you cannot
specify the duty cycle to use (see Speed Regulation below), so writing to
`duty_cycle_sp` will also return `-EOPNOTSUPP` as well.

## Speed Regulation

The NxtMMX does not support `speed_regulation` of `off`. If you try to change
the `speed_regulation` attribute, it will return `-EINVAL`. This means that
`duty_cycle_sp` is never used. When following the [tahco-motor tutorial] you must
use `speed_sp` instead of `duty_cycle_sp`.

## Encoder Polarity

The NxtMMX does not support motors with `inversed` encoder polarity. This means
the Firgelli linear actuators will not work with the NxtMMX.

## Battery Voltage

The NxtMMX creates a lego-sensor class [device][mindsensors.com NxtMMX] that
can be used to monitor the battery voltage of the NxtMMX.

## Advanced I2C Registers

There are two settings that are not changeable using the tacho-motor class,
namely 0x86-Pass Count and 0x87-Tolerance. If you need to change these, you can
do so by writing to the `direct` attribute of the lego-sensor class
[device][mindsensors.com NxtMMX].

Example - set Pass Count to 10:

    $ echo -e -n "\x$(printf '%x' 10)" | dd bs=1 of=direct seek=0x86

[mindsensors.com NxtMMX]: /docs/sensors/mindsensors.com-multiplexer-for-nxt-ev3-motors
[tacho-motor class]: /docs/drivers/tacho-motor-class
[tahco-motor tutorial]: ../tacho-motors
