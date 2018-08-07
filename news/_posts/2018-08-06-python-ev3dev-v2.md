---
author: "@WasabiFan"
title: "python-ev3dev version 2 for ev3dev-stretch available in beta"
---

After several months' work, python-ev3dev version 2 is available in beta. This
release is specifically targeted at [ev3dev-stretch](https://www.ev3dev.org/news/2018/06/14/ev3dev-stretch/),
and comes with a variety of improvements to existing interfaces as well as some
new features. In particular, we hope that writing software for driving robots
will now be significantly easier.

The highlights include:

- New classes are available for coordinating motors: `ev3dev2.motor.MotorSet`, `ev3dev2.motor.MoveTank`, `ev3dev2.motor.MoveSteering`, and `ev3dev2.motor.MoveJoystick`.
- Classes representing a variety of motor speed units are available and accepted by many of the motor interfaces: see [our docs](https://python-ev3dev.readthedocs.io/en/ev3dev-stretch/motors.html#units) to learn more.
- Friendlier interfaces for operating motors and sensors: check out `ev3dev2.motor.Motor.on_for_rotations` and the other `on_for_*` methods on motors.
- Easier interactivity via buttons: each button now has `wait_for_pressed`, `wait_for_released` and `wait_for_bump`
- Improved `ev3dev2.sound.Sound` and `ev3dev2.display.Display` interfaces
- New color conversion methods in `ev3dev2.sensor.lego.ColorSensor`

If you haven't already, see @dlech's [news post on Stretch](https://www.ev3dev.org/news/2018/06/14/ev3dev-stretch/)
for information on the new ev3dev version. If you're running the image from August
6 or newer, the library should come pre-installed; otherwise, you'll need
to install the `python3-ev3dev2` package via `apt-get`.

Once your ev3dev installation is ready, head over to our [upgrading guide](https://python-ev3dev.readthedocs.io/en/ev3dev-stretch/upgrading-to-stretch.html)
to get started!