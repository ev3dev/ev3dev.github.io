---
title: Using the EV3 Buttons
group: hardware-standard
---

* Table of Contents
{:toc}

The buttons on the EV3 are mapped as regular keyboard keys

* BACKSPACE (1)
* UP (2)
* LEFT (3)
* ENTER (4)
* RIGHT (5)
* DOWN (6)

{% include /util/screenshot.html source="/images/ev3/labeled-buttons.png" %}

## Polling Key States

If you would rather poll the button states instead of using regular keyboard input
methods, you can do that via the EVIOCGKEY ioctl on `/dev/input/eventX`.  Key codes
and ioctl definitions are in linux/input.h.

Here is an example using python:

    #!/usr/bin/env python
    
    import array
    import fcntl
    import sys
    
    # from linux/input.h
    
    KEY_UP = 103
    KEY_DOWN = 108
    KEY_LEFT = 105
    KEY_RIGHT = 106
    KEY_ENTER = 28
    KEY_BACKSPACE = 14
    
    KEY_MAX = 0x2ff
    
    def EVIOCGKEY(length):
        return 2 << (14+8+8) | length << (8+8) | ord('E') << 8 | 0x18
    
    # end of stuff from linux/input.h
    
    BUF_LEN = (KEY_MAX + 7) / 8
    
    def test_bit(bit, bytes):
        # bit in bytes is 1 when released and 0 when pressed
        return not bool(bytes[bit / 8] & (1 << (bit % 8)))
    
    def main():
        buf = array.array('B', [0] * BUF_LEN)
        with open('/dev/input/by-path/platform-gpio-keys.0-event', 'r') as fd:
            ret = fcntl.ioctl(fd, EVIOCGKEY(len(buf)), buf)
    
        if ret < 0:
            print "ioctl error", ret
            sys.exit(1)
    
        for key in ['UP', 'DOWN', 'LEFT', 'RIGHT', 'ENTER', 'BACKSPACE']:
            key_code = globals()['KEY_' + key]
            key_state = test_bit(key_code, buf) and "pressed" or "released"
            print '%9s : %s' % (key, key_state)
    
    if __name__ == "__main__":
        main()


## Directly Reading the Event Device

If you want your program to be event driven, you can read the
`/dev/input/by-path/platform-gpio-keys.0-event` file. It will block until a key
is pressed. The data is in 16 byte blocks. The first 8 bytes are the time stamp
(2 unsigned 64-bit integers, seconds and microseconds), the next 2 bytes are the
type (unsigned 16-bit integer), the next 2 bytes are the code (unsigned 16-bit
integer) and the last 4 bytes are the value (unsigned 32-bit integer).

Here is an example. It prints out 2 lines each time you press a button on the
EV3 and 2 more lines each time you release a button. And of course, press CTRL+C
to end.

    root@ev3dev:~# hexdump -e \
    '"timestamp:%d.%6d""\t""" 1/2 "type:%i""\t"""  1/2 "code:%3i""\t"""  "value:%d\n"' \
    < /dev/input/by-path/platform-gpio-keys.0-event 
    timestamp:1391366282.119886 type:1  code: 14    value:0
    timestamp:1391366282.120100 type:0  code:  0    value:0
    timestamp:1391366282.829942 type:1  code: 14    value:1
    timestamp:1391366282.830179 type:0  code:  0    value:0
    timestamp:1391366284.300099 type:1  code:105    value:0
    timestamp:1391366284.300319 type:0  code:  0    value:0
    timestamp:1391366284.829989 type:1  code:105    value:1
    timestamp:1391366284.830223 type:0  code:  0    value:0
    timestamp:1391366286.019866 type:1  code:103    value:0
    timestamp:1391366286.020076 type:0  code:  0    value:0
    timestamp:1391366286.319967 type:1  code:103    value:1
    timestamp:1391366286.320202 type:0  code:  0    value:0
    timestamp:1391366287.169925 type:1  code:106    value:0
    timestamp:1391366287.169973 type:0  code:  0    value:0
    timestamp:1391366287.479994 type:1  code:106    value:1
    timestamp:1391366287.480234 type:0  code:  0    value:0
    timestamp:1391366288.339882 type:1  code: 28    value:0
    timestamp:1391366288.340092 type:0  code:  0    value:0
    timestamp:1391366288.699929 type:1  code: 28    value:1
    timestamp:1391366288.700291 type:0  code:  0    value:0
    timestamp:1391366289.470046 type:1  code:108    value:0
    timestamp:1391366289.470263 type:0  code:  0    value:0
    timestamp:1391366289.829943 type:1  code:108    value:1
    timestamp:1391366289.830176 type:0  code:  0    value:0
    ^C

