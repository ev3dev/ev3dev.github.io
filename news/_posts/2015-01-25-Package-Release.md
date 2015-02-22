---
author: "@dlech"
title: "Package Release: brickman, grx"
---

Updated packages:

### brickman (0.4.0)

Add a File Browser... and you can use it to run programs!

The File Browser is limited to browsing the `/home` folder (this is for your own protection
since brickman runs as root). Directories are indicated by a trailing `/` and executable
files are indicated by a trailing `*`. Selecting a directory will open it. Selecting an
executable will run it not as root, but as the owner of the file. If a file is
owned by a system user (uid < 1000) then it will not be executed. Pressing and
holding the back button for more than 1 second will terminate a user program.


### grx (2.4.9-0ev3dev3)

This is the graphics library used by brickman (libgrx2-20). This update fixes a bug that caused
pixels to be inverted after switching virtual consoles. (I know I said that last time, but I
really fixed it this time - I promise.)
