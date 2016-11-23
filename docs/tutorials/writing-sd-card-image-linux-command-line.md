---
title: Writing an SD Card Image Using Linux Command Line Tools
group: sd-card-image
---

{% include /docs/imaging-tutorial-etcher-banner.html %}

1.  Make sure that you SD card is **unplugged**. Then run `df`. You should see
    something like this:

        user@host ~/ $ df -h
        Filesystem      Size  Used Avail Use% Mounted on
        /dev/sda1       119G   79G   34G  70% /
        none            4.0K     0  4.0K   0% /sys/fs/cgroup
        udev            7.8G   12K  7.8G   1% /dev
        tmpfs           1.6G  1.1M  1.6G   1% /run
        none            5.0M     0  5.0M   0% /run/lock
        none            7.9G  1.5M  7.9G   1% /run/shm
        none            100M  3.7M   97M   4% /run/user

2.  Now insert you SD card and run `df` again. See the new entry (`/dev/sdb1`)?
    That is your SD card. `sdb` is the actual device name and `1` is the
    partition number. Your actual device may be named something different.

        user@host ~/ $ df -h
        Filesystem      Size  Used Avail Use% Mounted on
        /dev/sda1       119G   79G   34G  70% /
        none            4.0K     0  4.0K   0% /sys/fs/cgroup
        udev            7.8G   12K  7.8G   1% /dev
        tmpfs           1.6G  1.1M  1.6G   1% /run
        none            5.0M     0  5.0M   0% /run/lock
        none            7.9G  1.5M  7.9G   1% /run/shm
        none            100M  3.7M   97M   4% /run/user
        /dev/sdb1       2.0G  0.0G  2.0G   0% /media/user/LABEL

3.  Unmount your SD card. If it has more than one partition, you will need to
    do this for each partition.

        user@host ~ $ sudo umount /dev/sdb1

4.  This is the dangerous part. If you pick the wrong device, you could wipe
    out your hard drive, so BE CAREFUL!. When specifying the device, don't
    include the partition number.

    In this example we downloaded the compressed disk image file to
    `~/Download/` and our SD card is `/dev/sdb`. Adjust these values as
    needed. This will take a long time.

        user@host ~ $ xzcat ~/Download/ev3dev-yyyy-mm-dd.img.xz | sudo dd bs=4M of=/dev/sdb
        [sudo] password for user:

    **TIP:** You can monitor the progress of this by running the following in
    another terminal. On some systems, the signal may need to be `INFO`
    instead of `USR1`. This will cause the status to be printed periodically
    in the first terminal.

        user@host ~ $ sudo watch kill -USR1 $(pgrep ^dd)

5.  When copying the image file has completed, run...

        user@host ~ $ sync

    ... to make sure any cached disk writes have completed. Once `sync` is finished,
    it is safe to remove the SD card.
