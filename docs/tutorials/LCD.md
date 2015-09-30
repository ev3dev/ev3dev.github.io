---
title: Using the LCD
subject: LCD
---

* Table of Contents
{:toc}

NOTE: You need to be a member of the `video` group to use the LCD

## Basics
The EV3 has a 178 x 128 pixels monochrome LCD. The ev3dev video driver
provides [standard Linux framebuffer interface](https://www.kernel.org/doc/Documentation/fb/api.txt)
and it's possible to write pixel data into `/dev/fb0` directly using `write`
or `mmap`.

## The pixel buffer format
Each byte in the buffer represents 8 pixels. Leftmost pixel is in the least
significant bit. Value 0 is white and value 1 is black (`fb_fix_screeninfo#visual`
is set to `FB_VISUAL_MONO01`).

Each row needs to be aligned on a 4-byte boundry. The closest 4-byte boundry to
178 is 192. 192/8 = 24 bytes per row (same value as fb_fix_screeninfo#line_length`).
That gives us a total buffer length of 128 * 24 = 3072 bytes.

See the [ev3 video driver code](https://github.com/ev3dev/ev3-kernel/blob/ev3dev-jessie/drivers/video/st7586fb.c) for more details.

Suppose below is the pixel buffer

        (76543210)(FEDCBA98)
    row0 10000100  00000000 00000000 ... (total 24 bytes)
    row1 10000100  00000000 00000000 ... (total 24 bytes)
    row2 10000100  00000000 00000000 ... (total 24 bytes)
    ... (total 128 rows)

It draws two vertical lines at column 2(0 based index) and column 7 (also 0 based index).

## POC
Use python to draw something interesting.

Code below only tested on [ev3dev-jessie-2014-07-12](https://github.com/ev3dev/ev3dev/releases/tag/ev3dev-jessie-2014-07-12). ev3dev may change video driver in the future. We recommend developers getting your own console, activate it and set it to graphics mode before write to framebuffer. Plese see [https://github.com/ev3dev/brickdm/blob/master/src/BrickDisplayManager.vala](https://github.com/ev3dev/brickdm/blob/master/src/BrickDisplayManager.vala) as an example

    #!/usr/bin/env python
    
    SCREEN_WIDTH = 178
    SCREEN_HEIGHT = 128
    HW_MEM_WIDTH = int((SCREEN_WIDTH + 31) / 32) * 4
    SCREEN_MEM_WIDTH = int((SCREEN_WIDTH + 7) / 8)
    LCD_BUFFER_LENGTH = SCREEN_MEM_WIDTH * SCREEN_HEIGHT
    LCD_HW_BUFFER_LENGTH = HW_MEM_WIDTH * SCREEN_HEIGHT
    import os
    import array
    
    
    def main():
        buf = [0] * LCD_HW_BUFFER_LENGTH
    
        # draw a vertical line in column 100 (0 based index)
        for row in range(0, SCREEN_HEIGHT):
            buf[row * HW_MEM_WIDTH + int(100 / 8)] = 1 << (100 % 8)
    
        # draw a horizontal line in row 64 (0 based index)
        for col in range(0, SCREEN_MEM_WIDTH):
            buf[64 * HW_MEM_WIDTH + col] = 0xff
    
    
        import math
        # draw a circle, center at (40,40), radius is 20
        for x in range(0, 20):
            y = math.sqrt(20 * 20 - x * x)
            buf[(40 + int(y)) * HW_MEM_WIDTH + int((40 + x) / 8)] = 1 << ((40 + x) % 8)
            buf[(40 - int(y)) * HW_MEM_WIDTH + int((40 + x) / 8)] = 1 << ((40 + x) % 8)
            buf[(40 + int(y)) * HW_MEM_WIDTH + int((40 - x) / 8)] = 1 << ((40 - x) % 8)
            buf[(40 - int(y)) * HW_MEM_WIDTH + int((40 - x) / 8)] = 1 << ((40 - x) % 8)
    
        f = os.open('/dev/fb0', os.O_RDWR)
        s = array.array('B', buf).tostring()
        os.write(f, s)
        os.close(f)
    
    if __name__ == '__main__':
        main()

