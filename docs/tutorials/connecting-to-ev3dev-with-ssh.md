---
title: Connecting to Ev3dev Using SSH
group: basic-networking
---

Connecting with SSH will allow you to run commands on the EV3 over the network
so that you can deploy code, change settings, and install tools. Make sure that
you have configured a network connection before continuing.

*   {: tab="Mac OSX"}
    OS X supports the good old `ssh` program. In a terminal, run the following command
    to use it to connect to your EV3 or other ev3dev device.

        ssh robot@ev3dev.local

    <div class="panel panel-info">
    <div class="panel-heading">
    {% include /style/icon.html type="info" %}
    If you have never connected before, you will be prompted to confirm the
    authenticity of the host, so type <code>yes</code> when prompted.
    </div>
    <div class="panel-body">
    <pre>
        The authenticity of host 'ev3dev.local (192.168.2.3)' can't be established.
        RSA key fingerprint is xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx.
        Are you sure you want to continue connecting (yes/no)? yes
        Warning: Permanently added 'ev3dev.local' (RSA) to the list of known hosts.
    </pre>
    </div>
    </div>

    Enter your password when prompted. The default password is `maker`.

        robot@ev3dev's password: 
                     _____     _
           _____   _|___ /  __| | _____   __
          / _ \ \ / / |_ \ / _` |/ _ \ \ / /
         |  __/\ V / ___) | (_| |  __/\ V /
          \___| \_/ |____/ \__,_|\___| \_/
        
        Debian jessie on LEGO MINDSTORMS EV3!
        
        The programs included with the Debian GNU/Linux system are free software;
        the exact distribution terms for each program are described in the
        individual files in /usr/share/doc/*/copyright.
        
        Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
        permitted by applicable law.
        robot@ev3dev:~$ 

*   {: tab="Ubuntu"}
    Type the following command in a terminal window.

        ssh robot@ev3dev.local

    <div class="panel panel-info">
    <div class="panel-heading">
    {% include /style/icon.html type="info" %}
    If you have never connected before, you will be prompted to confirm the
    authenticity of the host, so type <code>yes</code> when prompted.
    </div>
    <div class="panel-body">
    <pre>
        The authenticity of host 'ev3dev.local (10.42.0.228)' can't be established.
        ECDSA key fingerprint is SHA256:LjEw+uEG5x7kl9LwVeynjeybuBHT3VQB5simpcVqmu8.
        Are you sure you want to continue connecting (yes/no)? yes
        Warning: Permanently added 'ev3dev.local,10.42.0.228' (ECDSA) to the list of known hosts.
        Warning: Permanently added '10.42.0.228' (ECDSA) to the list of known hosts.
    </pre>
    </div>
    </div>

    Enter your password when prompted. The default password is `maker`.

        robot@ev3dev.local's password: 
                     _____     _
           _____   _|___ /  __| | _____   __
          / _ \ \ / / |_ \ / _` |/ _ \ \ / /
         |  __/\ V / ___) | (_| |  __/\ V /
          \___| \_/ |____/ \__,_|\___| \_/

        Debian jessie on LEGO MINDSTORMS EV3!

        The programs included with the Debian GNU/Linux system are free software;
        the exact distribution terms for each program are described in the
        individual files in /usr/share/doc/*/copyright.

        Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
        permitted by applicable law.
        robot@ev3dev:~$ 


*   {: tab="Windows"}
    Windows 10 now supports the good old `ssh` program. In cmd.exe, run the following command
    to use it to connect to your EV3 or other ev3dev device.
   
    
        ssh robot@ev3dev.local

    <div class="panel panel-info">
    <div class="panel-heading">
    {% include /style/icon.html type="info" %}
    If you have never connected before, you will be prompted to confirm the
    authenticity of the host, so type <code>yes</code> when prompted.
    </div>
    <div class="panel-body">
    <pre>
    The authenticity of host 'ev3dev.local (10.42.0.228)' can't be established.
ECDSA key fingerprint is SHA256:LjEw+uEG5x7kl9LwVeynjeybuBHT3VQB5simpcVqmu8.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'ev3dev.local,10.42.0.228' (ECDSA) to the list of known hosts.
    </pre>
    </div>
    </div>

    Enter your password when prompted. The default password is `maker`.

        Password: 
                     _____     _
           _____   _|___ /  __| | _____   __
          / _ \ \ / / |_ \ / _` |/ _ \ \ / /
         |  __/\ V / ___) | (_| |  __/\ V /
          \___| \_/ |____/ \__,_|\___| \_/

        Debian jessie on LEGO MINDSTORMS EV3!

        The programs included with the Debian GNU/Linux system are free software;
        the exact distribution terms for each program are described in the
        individual files in /usr/share/doc/*/copyright.

        Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
        permitted by applicable law.
        robot@ev3dev:~$ 

    
{: tab-list="os"}


[PuTTY]: https://www.chiark.greenend.org.uk/~sgtatham/putty/
[PuTTY download]: https://www.chiark.greenend.org.uk/~sgtatham/putty/
