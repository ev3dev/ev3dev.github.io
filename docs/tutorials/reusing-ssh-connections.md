---
title: Reusing SSH Connections
group: advanced-networking
author: [ "@Dave-Baum" ]
---

* Table of Contents
{:toc}

## Intro

Establishing an ssh connection requires a a lot of communication between your host computer
and the EV3 and can take several seconds. Although this is fine a long-lived connection,
it can be quite tedious if you want to use ssh to invoke a single command or scp to transfer
files. By instructing ssh to reuse connections, each connection after the first one will
reuse the session that was already established, drastically speeding up ssh and scp commands.

## Configuration (macOS, Linux)

Edit or create a new file at `~/.ssh/config`.  Add the following contents:

    Host ev3
    HostName ev3dev.local
    User robot
    ControlMaster auto
    ControlPath ~/.ssh/master-%r@%h:%p

This configuration does several things: it establishes `ev3` as a nickname (so you don't have to type
`ev3dev.local` all the time), defaults to `robot` as the user name, and instructs ssh to automatically
share connections. If this configuration does not work, replace `ev3dev.local.` with the IP address
of your EV3.

## Testing

Start by creating a new ssh session to your EV3:

    ssh ev3

After a few seconds you will be prompted for a password and then will be greeted with the shell
prompt from the EV3.

In another terminal session, use ssh to list the files in your EV3's home directory:

    ssh ev3 ls

If connection sharing is working properly there should have been no prompt for your password and
the ssh command will have executed very quickly. As long as the initial ssh session is still running,
any new connections will share the existing connection. This even works with scp. For example,
to copy `some_file.txt` from your host to the home directory on the EV3:

    scp some_file.txt ev3:
