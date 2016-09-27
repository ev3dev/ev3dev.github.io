---
title: Networking
subtitle: Connecting ev3dev to the internet and other devices
---

If you want to access your ev3dev installation from a PC or install new software
on your EV3, you'll need to connect to a network. Here are some resources to
help you out.

# Connecting to the internet

You have a few options for connecting to the internet.

### With a Wi-Fi dongle

The simplest route is to purchase a Wi-Fi dongle and plug it into the EV3's USB
port. Almost any USB Wi-Fi dongle which supports Linux will work, including the
one that is supported by the official LEGO software. Once you have plugged in a
dongle, you can use Brickman's "**_Wireless and Networks_ > _Wi-Fi_**" menu to
connect to a network.

### With a USB Ethernet adapter

If you have a USB Ethernet adapter (or can buy one) which supports Linux, you
can use it to access the network from your EV3. Just plug it into the brick and
connect the adapter to an ethernet cable; no configuration is related.

### With USB through a PC

You can use a PC to connect to the EV3 through its mini USB port and share an
internet connection. To try out connecting via USB, see our [Connecting to the Internet via USB](/docs/tutorials/connecting-to-the-internet-via-usb/)
tutorial.

### With Bluetooth through a PC

If you have a PC or Android device with Bluetooth capability, you can connect
your EV3 through it to access the Web. To learn more about this option, check
out our [Connecting to the Internet via Bluetooth](/docs/tutorials/connecting-to-the-internet-via-bluetooth/)
tutorial.

# Tethering to a host PC (no internet access)

If you don't need to connect your brick to the Internet, you can use tether it
to a PC. This can sometimes require less configuration than other options.
Some of these guides may be partially incomplete on certain platforms.

### With Bluetooth

You can use Bluetooth to connect your EV3 to a PC. To do so, read through our
[Using Bluetooth Tethering](/docs/tutorials/using-bluetooth-tethering/) guide.

### With USB

Another tethering option is using the mini USB port on the EV3. To try tethering
with USB, try our [Using USB Tethering](/docs/tutorials/using-usb-tethering/)
tutorial.

# Further reading

### Remote terminal with SSH

Once you have a connection between your PC and ev3dev, you will almost certainly
want to establish an SSH connection to the EV3. This allows you to install
software, run code, and edit files. Read more in [Our nonexistent guide](/docs/tutorials/connecting-to-ev3dev-with-ssh/).

### File sharing with NFS

One option to transfer code, configuration, and other files is NFS. You can learn
more in [Setting Up an NFS Fileshare](/docs/tutorials/setting-up-an-nfs-file-share/).
