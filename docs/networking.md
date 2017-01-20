---
title: Networking
subtitle: Connecting ev3dev to the internet and other devices
---

If you want to access your ev3dev installation from a PC or install new software
on your EV3, you'll need to connect to a network. Here are some resources to
help you out.


{% include /style/icon.html type="info" %}
For Raspberry Pi platforms with no display 
([to be able to use Brickman](http://lechnology.com/2016/05/adding-a-display-to-brickpi/)), 
you must use the wired Ethernet port to connect for the first time through a remote SSH 
session. An alternative is to connect the pi to an HDMI screen monitor 
and USB keyboard and press <kbd>Alt</kbd>+<kbd>F2</kbd> at the end of
the boot sequence to reach a login prompt (id: robot, password: maker). Once 
connected, you can then set up additional connections using 
[`connmanctl`](https://wiki.archlinux.org/index.php/Connman#Usage) commands.
{: class="alert alert-info"}

# Connecting to the Internet

You have a few options for connecting to the internet.

### With a Wi-Fi dongle

The simplest route is to use a Wi-Fi dongle connected through the EV3's USB
port. If you have a supported Wi-Fi dongle available already, we recommend that
you use it; otherwise you can use one of the other networking options below.
Many USB Wi-Fi dongles which support Linux will work, but we officially support
and recommend the following (these are supported by the EV3's default operating
system as well):

- NetGear WNA1100 Wireless-N 150 (officially supported by LEGO's software)
- Edimax EW-7811Un 802.11n Wireless Adapter (officially supported by LEGO's
  software)
- EP-N8508GS 150Mbps Mini Wireless 802.11N USB Adapter (not officially supported
  by LEGO, but also works)

Once you have plugged in a dongle, you can use Brickman's
"**_Wireless and Networks_ > _Wi-Fi_**" menu to connect to a network. Make sure
you check the "**Powered**" box so that it starts searching for Wi-Fi networks,
and then choose the one you want from the list that appears.

**Note** 

### With USB through a PC

You can use a PC to connect to the EV3 through its mini USB port and share an
internet connection. To try out connecting via USB, see our [Connecting to the Internet via USB](/docs/tutorials/connecting-to-the-internet-via-usb/)
tutorial.

### With Bluetooth through a PC

If you have a PC or Android device with Bluetooth capability, you can connect
your EV3 through it to access the Web. To learn more about this option, check
out our [Connecting to the Internet via Bluetooth](/docs/tutorials/connecting-to-the-internet-via-bluetooth/)
tutorial.

### With a USB Ethernet adapter

If you have a USB Ethernet adapter (or can buy one) which supports Linux, you
can use it to access the network from your EV3. Just plug it into the brick and
connect the adapter to an ethernet cable; no configuration is needed.

# Tethering to a Host PC (no Internet access)

If you don't need to connect your brick to the Internet, you can use a
technology called "tethering" to connect it directly to a PC. This can sometimes
require less configuration than other options. Some of these guides may be
partially incomplete on certain platforms.

### With Bluetooth

You can use Bluetooth to connect your EV3 to a PC. To do so, read through our
[Using Bluetooth Tethering](/docs/tutorials/using-bluetooth-tethering/) guide.

### With USB

Another tethering option is using the mini USB port on the EV3. To try tethering
with USB, try our [Using USB Tethering](/docs/tutorials/using-usb-tethering/)
tutorial.

# Further Reading

### Remote terminal with SSH

Once you have a connection between your PC and ev3dev, you will almost certainly
want to establish an SSH connection to the EV3. This allows you to install
software, run code, and edit files. Read more in
[our SSH guide](/docs/tutorials/connecting-to-ev3dev-with-ssh/).

### File sharing with NFS

One option to transfer code, configuration, and other files is NFS. You can learn
more with [our guide on setting up an NFS file share](/docs/tutorials/setting-up-an-nfs-file-share/).
