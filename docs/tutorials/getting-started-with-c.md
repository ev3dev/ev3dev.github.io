---
title: Getting Started with C
subject: Software - C
author: "@wasabifan"
---

This tutorial walks you through writing a simple C program, compiling it on
your ev3dev device, and running it. We will assume that you have already
configured a means of connecting to your device from a PC.
{:.lead}

{% include icon.html type="warning" %}
Note that C is not a particularly friendly language, especially for beginners.
It would be recommended to use Python or another easier language.
{: .alert .alert-warning}

## Background on C

To understand what you will be doing in this tutorial, you'll first need to
understand the way that C programs are run. C is a "compiled" language; that
means that the code that you write must be converted into a different kind of
code that a computer understands before it can run. This is the job of the
_compiler_. The compiler is a program that takes your C code and converts it
into something that can be run. If you are familiar with Windows, the final
product is the equivalent of a `.exe` file.

On ev3dev, you will need to run the compiler over SSH to create the executable
file. Once you have the binary file, you can run it whenever you want from Brickman.

## Installing prerequisites
We need to install the compiler and some other tools. Open an SSH connection
to your EV3 and run `sudo apt-get install build-essential`.

## Choosing a location
Depending on your project and environment, you may want to write code directly
on the brick or you may want to write it on your PC and copy it over. Choose
whichever works for you and create a folder to put your code into.

## Creating a "Hello world" program
The code that you write will live in its own file. Create a file called `main.c`
and paste the following code into it:

{% highlight c %}
#include <stdio.h>
int main()
{
    printf("Hello world!\n");
    return 0;
}
{% endhighlight %}

## Creating a "makefile"
A makefile is a file that gives instructions on how your program should be
compiled. Makefiles can be very simple (as ours will be here) but it can get
more complicated if you have additional C source files or need to include other
libraries.

Create a file in your chosen directory and call it `Makefile` (with no extension).
Copy the following contents into it:

{% highlight makefile %}
all: main.o
	gcc main.o -o bin
main.o: main.c
	gcc -I . -c main.c
clean:
	rm -rf *.o
	rm bin

{% endhighlight %}

You will need to make sure that the indentation is tabs and not just 4 spaces.
Depending on your text editor, the process for using tabs will be different; you
can probably just delete the spaces and then hit <kbd>Tab</kbd> to replace them.

## Running the compiler
Now, from an SSH session, open the directory that you have saved your two files and
run `make`. If it is successful, the output should look like this:

~~~
gcc -I . -c main.c
gcc main.o -o bin
~~~

Assuming it succeeded, you should have a file called `bin` in your current folder.

## Executing the compiled program
You can run your new file by typing `./bin` in the SSH terminal. You can also run
that file from Brickman.

## Final notes
If you want to use the motors, sensors, etc. of the EV3, you will need to either
find an existing C library (not C++) or manually read from and write to the
files that let you control devices. You can find a list of the known libraries
on [our libraries page](/docs/libraries/).