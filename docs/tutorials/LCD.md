---
title: Using the EV3 LCD
subject: Hardware - Displays
---

* Table of Contents
{:toc}

NOTE: You need to be a member of the `video` group to use the LCD

## Basics

The EV3 has a 178 x 128 pixels monochrome LCD. The ev3dev video driver
provides [standard Linux framebuffer interface](https://www.kernel.org/doc/Documentation/fb/api.txt)
and it's possible to write pixel data into `/dev/fb0` directly using `write`
or `mmap`.

## The Frame Buffer Format

You can get information about the framebuffer by running `fbset -i`.

    robot@ev3dev:~$ fbset -i

    mode "178x128"
        geometry 178 128 178 128 1
        timings 0 0 0 0 0 0 0
        rgba 1/0,1/0,1/0,0/0
    endmode

    Frame buffer device information:
        Name        : ST7586
        Address     : 0xc39be000
        Size        : 3072
        Type        : PACKED PIXELS
        Visual      : MONO01
        XPanStep    : 0
        YPanStep    : 0
        YWrapStep   : 0
        LineLength  : 24
        Accelerator : No

The `1` at the end of `geometry` means that there is 1 bit per pixel. So, each
byte in the buffer represents 8 pixels. The leftmost pixel is in the least
significant bit.

`Visual : MONO01` tells us that the value 0 is white and the value 1 is black.

`LineLength : 24` means that each horizontal line is 24 bytes. If you do the
math, 178 pixels / 8 bits per byte * 1 bit per pixel = 22.25 bytes. This means
not all of the bits in a line are actually displayed.

Suppose below is the pixel buffer:

        (76543210)(FEDCBA98)
    row0 10000100  00000000 00000000 ... (total 24 bytes)
    row1 10000100  00000000 00000000 ... (total 24 bytes)
    row2 10000100  00000000 00000000 ... (total 24 bytes)
    ... (total 128 rows)

It draws two vertical lines at column 2 (0 based index) and column 7 (also 0 based index).

## Example

Use python to draw something interesting.

    #!/usr/bin/env python
    
    # Hard coding these values is not a good idea because the values could
    # change. But, since this is an example, we want to keep it short.
    SCREEN_WIDTH = 178 # pixels
    SCREEN_HEIGHT = 128 # pixels
    LINE_LENGTH = 24 # bytes
    SIZE = 3072 # bytes

    import os
    import array
    
    
    def main():
        buf = [0] * SIZE
    
        # draw a vertical line in column 100 (0 based index)
        for row in range(0, SCREEN_HEIGHT):
            buf[row * LINE_LENGTH + int(100 / 8)] = 1 << (100 % 8)
    
        # draw a horizontal line in row 64 (0 based index)
        for col in range(0, LINE_LENGTH):
            buf[64 * LINE_LENGTH + col] = 0xff
    
    
        import math
        # draw a circle, center at (40,40), radius is 20
        for x in range(0, 20):
            y = math.sqrt(20 * 20 - x * x)
            buf[(40 + int(y)) * LINE_LENGTH + int((40 + x) / 8)] = 1 << ((40 + x) % 8)
            buf[(40 - int(y)) * LINE_LENGTH + int((40 + x) / 8)] = 1 << ((40 + x) % 8)
            buf[(40 + int(y)) * LINE_LENGTH + int((40 - x) / 8)] = 1 << ((40 - x) % 8)
            buf[(40 - int(y)) * LINE_LENGTH + int((40 - x) / 8)] = 1 << ((40 - x) % 8)
    
        f = os.open('/dev/fb0', os.O_RDWR)
        s = array.array('B', buf).tostring()
        os.write(f, s)
        os.close(f)
    
    if __name__ == '__main__':
        main()

