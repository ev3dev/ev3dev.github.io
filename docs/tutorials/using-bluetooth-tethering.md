---
title: Using Bluetooth Tethering
group: basic-networking
---

{% include icon.html type="info" %}
When using tethering, the EV3 brick will act as a network server. This
means there is little to no configuration that needs to be done on your host
computer which makes it easy to setup and use. However, you __cannot access the
Internet from your EV3 using tethering__. If you want to be able to update
packages or do anything else that requires an Internet connection, you will need
to set up another connection instead of or in addition to a tethering connection.
{: .alert .alert-info}

---

{% include icon.html type="warning" %}
These instructions are for [brickman v0.7.0](/news/2015/12/15/Package-Release/){: .alert-link}.
If you are using an older version, please upgrade.
{: .alert .alert-warning}

*   {: tab="Mac OSX"}
    1.  On the EV3, first verify that Bluetooth is powered on. In brickman,
        open the *Wireless and Networks* menu and select *Bluetooth*. Make sure the
        *Powered* checkbox is checked. The Bluetooth icon next to the battery in the
        status bar also indicates that Bluetooth is powered on.

        {% include screenshot.html source="/images/brickman/bluetooth-powered-visible-no-devices.png" %}

    2.  Go back to *Wireless and Networks* and select *Tethering*. Enable tethering
        via Bluetooth by checking the box next to *Bluetooth*.

        {% include screenshot.html source="/images/brickman/tethering-bluetooth-enabled.png" %}

    3.  On your host computer, open *System Preferences* and go to *Bluetooth*. This
        will make your host computer discoverable.

        {% include screenshot.html source="/images/osx/10.10/System-Preferences-Bluetooth.png" %}

    4.  On the EV3, go back to *Wireless and Networks* and select *Bluetooth* again,
        then select *Start Scan*. It should find your computer.

        {% include screenshot.html source="/images/brickman/bluetooth-powered-my-computer.png" %}

    5.  Select your computer from the menu and then select the *Pair* button.

        {% include screenshot.html source="/images/brickman/bluetooth-my-computer-not-paired.png" %}

        {% include icon.html type="info" %}
        If you have already paired your EV3 with your host computer, you
        will need to select *Remove* and then re-pair in order for the host computer
        to see the new tethering network connection.
        {: .alert .alert-info}

    6.  Confirm the passkey on both devices when requested.

        {% include screenshot.html source="/images/brickman/bluetooth-confirm-passkey.png" %}
        {% include screenshot.html source="/images/osx/10.10/Pairing-Request.png" %}

    7.  On your Mac, open up *System Preferences* and select *Network*.

        {% include screenshot.html source="/images/osx/10.9/SystemPreferencesNetwork.png" %}

    8.  If you do not already have a Bluetooth PAN device, click on the `+`
        icon in the lower left area to add a new network device. You'll need to
        select *Bluetooth PAN* in the drop down box. Click *Create* when you are done.

        {% include screenshot.html source="/images/osx/10.10/System-Preferences-Network-Add-PAN.png" %}

    9.  Click *Apply* first to save your changes, then select your EV3 next to
        *Device:* and click *Connect*.

        {% include screenshot.html source="/images/osx/10.10/System-Preferences-Network-Bluetooth-PAN.png" %}

    10. Here, you can see that the EV3 assigned us the address *192.168.1.2*. The
        last two numbers may be different for you. The IP address of your EV3 will
        be the same as the number you see here with the last number replaced by *1*.
        So, in the case, the EV3 is at *192.168.1.1*.

        {% include screenshot.html source="/images/osx/10.10/System-Preferences-Network-Bluetooth-PAN-Connected.png" %}

*   {: tab="Ubuntu"}
    {% include icon.html type="warning" %}
    HELP WANTED! See [issue #287](https://github.com/ev3dev/ev3dev/issues/287){: .alert-link}.
    {: .alert .alert-warning}

*   {: tab="Windows"}

    *   {: tab="7"}
        {% include icon.html type="warning" %}
        HELP WANTED! See [issue #287](https://github.com/ev3dev/ev3dev/issues/287){: .alert-link}.
        {: .alert .alert-warning}

        This is mostly figured out for Windows 8 [here](https://github.com/ev3dev/ev3dev/issues/232#issuecomment-69801370).
        Windows 7 looks a bit different, so it needs its own instructions.

    *   {: tab="8"}
        {% include icon.html type="warning" %}
        HELP WANTED! See [issue #287](https://github.com/ev3dev/ev3dev/issues/287){: .alert-link}.
        {: .alert .alert-warning}

        This is mostly figured out [here](https://github.com/ev3dev/ev3dev/issues/232#issuecomment-69801370).
        We just need someone to make it pretty.
    {: tab-list="os-version"}
{: tab-list="os"}

Now that you have a network connection, you should
[connect to your EV3 with SSH](/docs/tutorials/connecting-to-ev3dev-with-ssh)
if you haven't done so already.