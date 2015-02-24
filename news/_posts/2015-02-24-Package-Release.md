---
author: "@dlech"
title: "Package Release: brickman"
---

Updated packages:

### brickman (0.5.0)

This release includes some major redesign of the user interface. If you have
any ideas for further design improvements, please join in the [discussion].

For starters, there is now a splash screen. I took about 5 minutes to make it,
so if you think you can do better please send us a pull request.

The Bluetooth and USB menus are now under the "Wireless and Networks" menu
(previously called "Networking"). Bluetooth devices with networking support now
have a button that links to the network connection. There is also a new,
separate menu for Wi-Fi.

Also under the "Wireless and Networks" menu, there is now a "Tethering" menu
that allow you to enable tethering via USB or Bluetooth. It is easier to setup
a network connection this way since there is no configuration required on your
host computer, however the EV3 cannot access the Internet via tethering.

There are now Bluetooth and Wi-Fi indicators in the status bar too.

There are also some bug fixes, mostly related to network connections. You can
find the full changelog [here][changelog].


[discussion]: https://github.com/ev3dev/ev3dev/issues/266
[changelog]: https://github.com/ev3dev/brickman/blob/ev3dev-jessie/debian/changelog