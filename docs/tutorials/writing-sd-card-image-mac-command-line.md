---
title: Writing an SD Card Image Using Mac OSX Command Line Tools.
subject: SD Card
---

1.  If you have not already unzipped the ev3dev disk image, lets do that first.

        host:~ user$ cd Downloads
        host:Downloads user$ unzip ev3dev.1900MB.img.zip
        Archive:  ev3dev.1900MB.img.zip
          inflating: ev3dev.1900MB.img

2.  Now, we find our SD card. Make sure that you SD card is **unplugged**. Then
    run `diskutil`. You should see something like this:

        host:~ user$ diskutil list
        /dev/disk0
          #:                       TYPE NAME                    SIZE       IDENTIFIER
          0:      GUID_partition_scheme                        *250.1 GB   disk0
          1:                        EFI EFI                     209.7 MB   disk0s1
          2:                  Apple_HFS Macintosh HD            249.2 GB   disk0s2
          3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3

3.  Now insert you SD card and run `diskutil` again. The new entry (`/dev/disk1`)
    is your SD card. Your actual device may be named something different.

        host:~ user$ diskutil list
        /dev/disk0
           #:                       TYPE NAME                    SIZE       IDENTIFIER
           0:      GUID_partition_scheme                        *250.1 GB   disk0
           1:                        EFI EFI                     209.7 MB   disk0s1
           2:                  Apple_HFS Macintosh HD            249.2 GB   disk0s2
           3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3
        /dev/disk1
           #:                       TYPE NAME                    SIZE       IDENTIFIER
           0:     FDisk_partition_scheme                        *2.0 GB     disk1
           1:                 DOS_FAT_32 LABEL                   2.0 GB     disk1s1

4.  Unmount your SD card. If it has more than one partition, you will need to do
    this for each partition.

        host:~ user$ diskutil unmountDisk /dev/disk1s1
        Unmount of all volumes on disk1 was successful

5.  This is the dangerous part. If you pick the wrong device, you could wipe
    out your hard drive, so BE CAREFUL!.

    To make this go faster, we want to use the raw disk device, so wee need to
    stick an `r` in front of the disk device name. In this example our SD card
    is `/dev/disk1`, so we are going to write to `/dev/rdisk1`. Adjust these
    values as needed. This will take some time.

        host:~ user$ sudo dd if=~/Downloads/ev3dev.1900MB.img of=/dev/rdisk1 bs=4m

    **TIP:** You can monitor the progress of this by pressing <code>&#8963;T</code>.

6.  When it has finished copying, it is safe to remove your SD card.
