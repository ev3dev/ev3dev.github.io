---
title: Reuse SSH Connections
group: advanced-networking
author: [ "@Dave-Baum" ]
---

* Table of Contents
{:toc}

## Intro

Establishing an ssh connection requires a a lot of communication between your host computer
and the EV3 and can take several seconds.  Although this is fine a long-lived connection,
it can be quite tedious if you want to use ssh to invoke a single command or scp to transfer
files.  By instructing ssh to reuse connections, each connection after the first one will
reuse the session that was already established, drastically speeding up ssh and scp commands.

## Congifuration (OSX, Linux)

Edit or create a new file at `~/.ssh/config`.  Add the following contents:

    Host <name>
      HostName <address>
      User <user>
      ControlMaster auto
      ControlPath ~/.ssh/master-%r@%h:%p

Where `<name>` is the name you want to use to refer to your ev3, `<address>` is its ip address, and `<user>` is
the user name (the default is `robot`).  For example, if your ev3 has address `192.168.1.10`, you want to
call it `ev3` and connect as user `robot`, the file would look like this:

    Host ev3
      HostName 192.168.1.10
      User robot
      ControlMaster auto
      ControlPath ~/.ssh/master-%r@%h:%p

Note that if you already have a DNS entry for your ev3, you can use that name in the `Host` line and you do
not need a `HostName` line.

## Testing

Start by creating a new ssh session to your EV3.  If it was named `ev3`, you would do the following:

    ssh ev3

After a few seconds you will be prompted for a password and then will be greeted with the shell
prompt from the ev3.

In another terminal session, use ssh to list the files in your ev3's home directory:

    ssh ev3 ls

If connection sharing is working properly there should have been no prompt for your password and
the ssh command will have executed very quickly.  As long as the initial ssh session is still running,
any new connections will share the existing connection.  This even works with scp.  For example,
to copy `some_file.txt` from your host to the home directory on the ev3:

    scp some_file.txt ev3:
