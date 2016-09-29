---
title: Setting Up Wi-Fi Using the Command Line
subject: networking
---

{% include icon.html type="danger" %}
You must have another way to connect to your robot first before following this
tutorial. On the EV3, that means USB or Bluetooth. If you have a Raspberry Pi,
you can plug in a monitor and keyboard to the Raspberry Pi. The instructions
below are run on your robot itself.
{:.alert .alert-danger}

I like to setup wireless networking on my robots. Robots should go untethered!
Here is how. It's easy in an interactive tool call `connmanctl`. You connect
once, and next time you boot, it's all configured. On my ev3dev machine it went
like this:

    robot@ev3dev:~$ sudo connmanctl
    Error getting VPN connections: The name net.connman.vpn was not provided by any
    connmanctl> enable wifi
    Enabled wifi
    connmanctl> scan wifi
    Scan completed for wifi
    connmanctl> services
    *AO Wired                ethernet_b827ebbde13c_cable
                             wifi_e8de27077de3_hidden_managed_none
        AH04044914           wifi_e8de27077de3_41483034303434393134_managed_psk
        Frissie              wifi_e8de27077de3_46726973736965_managed_psk
        ruijgt gast          wifi_e8de27077de3_7275696a67742067617374_managed_psk
        schuur               wifi_e8de27077de3_736368757572_managed_psk
    connmanctl> agent on
    Agent registered
    connmanctl> connect wifi_e8de27077de3_41      # You can use the TAB key at this point to autocomplete the name
    connmanctl> connect wifi_e8de27077de3_41483034303434393134_managed_psk
    Agent RequestInput wifi_e8de27077de3_41483034303434393134_managed_psk
      Passphrase = [ Type=psk, Requirement=mandatory ]
    Passphrase? *************
    Connected wifi_e8de27077de3_41483034303434393134_managed_psk
    connmanctl> quit

You're all set up now! After reboot connman automatically finds your local
Wi-Fi again.
