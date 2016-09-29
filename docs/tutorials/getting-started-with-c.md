---
title: Getting Started with C
subject: software-languages
author: "@wasabifan"
---

{% include icon.html type="info" %}
If you're looking to write programs that are more than simple test apps
or demos and are willing to try something a bit more involved, we
recommend following the
[Using Docker to Cross-Compile](/docs/tutorials/using-docker-to-cross-compile/)
tutorial instead of this one.
{: .alert .alert-info}

This tutorial walks you through writing a simple C program, compiling it on
your ev3dev device, and running it. We will assume that you have already
configured a means of connecting to your device from a PC.
{:.lead}

{% include icon.html type="warning" %}
Note that C is not a particularly friendly language, especially for beginners.
It would be recommended to use Python or another easier language.
{: .alert .alert-warning}

For this tutorial, we will be using a text editor called `nano`. You can refer
to our [nano cheat sheet](/docs/tutorials/nano-cheat-sheet) for information on
nano.

**Before you start, make sure that you have configured a network connection to
your ev3dev device and have opened an SSH connection to it.**

## Background on C

To understand what you will be doing in this tutorial, you'll first need to
understand the way that C programs are run. C is a "compiled" language; that
means that the code that you write must be converted into a different kind of
code that a computer understands before it can run. This is the job of the
_compiler_. The compiler is a program that takes your C code and converts it
into something that can be run. If you are familiar with Windows, the final
product is the equivalent of a `.exe` file.

On ev3dev, you will need to run the compiler over SSH to create the executable
file. Once you have the binary file, you can run it whenever you want from the
terminal or Brickman.

## Installing prerequisites
We need to install the compiler and some other tools. Execute the following
command to install them:

{% highlight shell %}
sudo apt-get install build-essential
{% endhighlight %}

## Create a project folder
We need a place to store the code that you'll write. In the terminal, run the
following commands:

{% highlight shell %}
mkdir c-demo
cd c-demo
{% endhighlight %}

## Creating a "Hello world" program
The code that you write will live in its own file. Let's reate a file called
`main.c` and open it in nano:

{% highlight shell %}
nano main.c
{% endhighlight %}

Now paste the following code into the file (in many cases, you can
paste by right-clicking on the terminal window):

{% highlight c %}
#include <stdio.h>
int main()
{
    printf("Hello world!\n");
    return 0;
}
{% endhighlight %}

Save the file by pressing <kbd>Ctrl</kbd>+<kbd>O</kbd> and exit the editor with
<kbd>Ctrl</kbd>+<kbd>X</kbd>.

## Creating a "makefile"
A makefile is a file that gives instructions on how your program should be
compiled. Makefiles can be very simple (as ours will be here) but it can get
more complicated if you have additional C source files or need to include other
libraries.

Create a file called `Makefile` and open it:

{% highlight shell %}
nano Makefile
{% endhighlight %}

Copy the following contents into the file:

{% highlight makefile %}
all: main.o
	gcc main.o -o bin
main.o: main.c
	gcc -I . -c main.c
clean:
	rm -rf *.o
	rm bin

{% endhighlight %}

When you paste the contents into nano, the indentation will likely disappear.
Move your cursor using the arrow keys to the beginning of the lines that are
indented above and press <kbd>Tab</kbd> to indent them.

## Running the compiler
Now we're ready to use the makefile to compile your code. Run the command
`make`. If it is successful, the output should look like this:

~~~
gcc -I . -c main.c
gcc main.o -o bin
~~~

Now type `ls` and hit <kbd>Enter</kbd>. If the compilation did what it was
supposed to do, you should see an item called `bin`.

## Executing the compiled program
You can run your new file by typing `./bin` in the SSH terminal. You should
see the text `Hello world!` printed back. Congratulations! You have written
your first C program on ev3dev.

## Making changes

To make changes to your code, you can open the `main.c` file in nano and edit
it. You must then go through the "Running the compiler" step again.

To test your skills, try changing the text in the code to print something
other than "Hello world!"

## Final notes
If you want to use the motors, sensors, etc. of the EV3, you will need to either
use an existing C library (not C++) or manually read from and write to the
files that let you control devices. You can find a list of the known libraries
on [our libraries page](/docs/libraries/).