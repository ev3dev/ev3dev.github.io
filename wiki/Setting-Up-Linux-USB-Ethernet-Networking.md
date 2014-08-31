---
title: Setting Up Linux USB Ethernet Networking
index: wiki
---

## <a name="ConnectingToLinuxHost"/> Connecting to a Linux Host

Before doing anything, check to see what the existing network devices are on your Linux host:

```clean
user@machine:~$ ls /sys/class/net
eth0  lo  wlan0
```

This is a reference for the next step, where we plug the host end of the cable into the Linux machine and check if any new network devices showed up...

```clean
user@machine:~$ ls /sys/class/net
eth0  lo  usb0  wlan0
```

Great, we got a new device at `usb0`, as expected. If you did NOT see the device, then make check dmesg to see what happened ... the last few lines should look like this:

```clean
[ 3402.872886] usb 2-1.2.3: new full-speed USB device number 54 using ehci_hcd
[ 3402.965691] usb 2-1.2.3: not running at top speed; connect to a high speed hub
[ 3402.967534] usb 2-1.2.3: New USB device found, idVendor=0525, idProduct=a4a2
[ 3402.967541] usb 2-1.2.3: New USB device strings: Mfr=1, Product=2, SerialNumber=0
[ 3402.967547] usb 2-1.2.3: Product: RNDIS/Ethernet Gadget
[ 3402.967552] usb 2-1.2.3: Manufacturer: Linux 3.3.0 with musb-hdrc
[ 3402.974822] cdc_eem 2-1.2.3:1.0: usb0: register 'cdc_eem' at usb-0000:00:1d.0-1.2.3, CDC EEM Device, 2a:7a:91:09:c5:b6
```

Maybe double check to make sure you updated the `ev3dev.rc.local` file on the FAT32 partioin of the microSD card. Also check to see if you have the `cdc_eem` and `cdc_subset` modules available for your host machine.

Now it's a simple matter to configure an IP address for the Host end of the connection. I'm assuming you left the default value of the EV3 IP address at `192.168.2.100` in the `ev3dev.rc.local` file. just do something like:

```clean
sudo ifconfig usb0 192.168.2.1
```

Of course, you'll use the actual new `usbx` value you see when you connect the EV3 to your host machine.

Now you can `ping` the brick like this:

```clean
user@machine:~/nfs/ev3dev/ev3dev-rootfs$ ping 192.168.2.100
PING 192.168.2.100 (192.168.2.100) 56(84) bytes of data.
64 bytes from 192.168.2.100: icmp_seq=1 ttl=64 time=1.48 ms
64 bytes from 192.168.2.100: icmp_seq=2 ttl=64 time=0.826 ms
64 bytes from 192.168.2.100: icmp_seq=3 ttl=64 time=0.850 ms
64 bytes from 192.168.2.100: icmp_seq=4 ttl=64 time=0.812 ms
^C
--- 192.168.2.100 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3002ms
rtt min/avg/max/mdev = 0.812/0.992/1.481/0.283 ms
```

And you can ssh to it like this:

```clean
user@machine:~/nfs/ev3dev/ev3dev-rootfs$ ssh root@192.168.2.100
root@192.168.2.100's password: 
Linux ev3dev 3.3.0 #4 PREEMPT Sat Dec 7 13:12:33 EST 2013 armv5tejl
             _____     _
   _____   _|___ /  __| | _____   __
  / _ \ \ / / |_ \ / _` |/ _ \ \ / /
 |  __/\ V / ___) | (_| |  __/\ V /
  \___| \_/ |____/ \__,_|\___| \_/

Debian GNU/Linux 7 on LEGO MINDSTORMS EV3!

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Sat Jan  1 00:04:26 2000
root@ev3dev:~# 
```

Once you have confirmed that this all works, you can automagically set the IP address of your host computer when a USB Ethernet connection. Just edit `/etc/network/interfaces` and add this stanza to the file:

```clean
allow-hotplug usb0
auto usb0
iface usb0 inet static
         address 192.168.2.1
         netmask 255.255.255.0
```

That's all for now.

## <a name="ShareInternetConnectionFromLinuxHost"/> Share Internet Connection from Linux Host

If you want to share the Internet connection from your host PC with the EV3 via USB, enable forwarding on your host PC:
```
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward > /dev/null
sudo iptables -P FORWARD ACCEPT
sudo iptables -A POSTROUTING -t nat -j MASQUERADE -s 192.168.2.0/24
```
And use your router as the name server on the EV3:
```
echo "nameserver 192.168.0.1" >> /etc/resolv.conf
```
Then you can test the Internet connection on the EV3:
```
ping google.com
```
Forwarding the Internet connection can also be deactivated on your host PC: 
```
echo 0 | sudo tee /proc/sys/net/ipv4/ip_forward > /dev/null
sudo iptables -t nat -F POSTROUTING
```
The description for forwarding the Internet connection is based on the article from [[https://developer.ridgerun.com/wiki/index.php/How_to_use_USB_device_networking#Bridging_host_PC_to_allow_device_to_reach_the_Internet]].

Later on we'll discuss getting your EV3 connected to the Internet via wifi.
