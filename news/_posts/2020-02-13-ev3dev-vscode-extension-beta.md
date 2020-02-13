---
author: "@dlech"
title: "ev3dev-browser VS Code Extension Beta Release"
---

<img
 src="/images/news/vscode-ev3dev-browser-terminal-python-inspect.png"
 alt="Screenshot of ev3dev-browser VS Code extension terminal pane showing Python REPL"
 style="width: 300px; max-width: 100%;"
 class="image-responsive pull-right"
/>

We are working on the next release of the [ev3dev-browser VS Code Extension][1]
and we need testers! This version has a cool new feature for debugging your
Python programs.


[1]: https://marketplace.visualstudio.com/items?itemName=ev3dev.ev3dev-browser


<!--more-->

### Getting the Beta Version

The beta version is not available on the VS Code Marketplace. Instead download
the `.vsix` file from the [GitHub Releases][2] page. Then [install it in VS
Code][3].

[2]: https://github.com/ev3dev/vscode-ev3dev-browser/releases
[3]: https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix


### New "Run in Interactive Terminal" Feature

The major new feature of this release allows you to run programs in an
interactive terminal instead of the read-only output pane in VS Code.

Why would you want to do this? With Python programs, it allows us inspect the
current state of the program when it crashes because of an error (or when the
program ends normally without error).

#### Setup

To enable this feature, we need to add `"interactiveTerminal": true` to
`.vscode/launch.json` in the project folder.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Download and Run",
      "type": "ev3devBrowser",
      "request": "launch",
      "program": "/home/robot/${workspaceRootFolderName}/main.py",
      "interactiveTerminal": true
    }
  ]
}
```

#### Running the program

Now, lets run a program with a bug. This is our `main.py` file:

```python
#!/usr/bin/env python3

count = 5 / 3
for _ in range(count):
    print('hi')
```

If we run it with `"interactiveTerminal": false` (the default), then the program
runs in the *output* pane just as it does in older versions of the extension.

<img
 src="/images/news/vscode-ev3dev-browser-output-python-crash.png"
 alt="Screenshot of ev3dev-browser VS Code extension output pane showing Python crash"
 class="image-responsive"
/>

#### Running the program the new way

But when we run it with `"interactiveTerminal": true`, the the program runs
in the *terminal* pane instead of the *output* pane. It also sets the
[PYTHONINSPECT][4] environment variable, which causes Python to start
the interactive REPL after the crash instead of ending the program. This lets
us check the current values of variables to try to figure out why the program
crashed!

For example, here we type in `count` in the terminal and press <kbd>ENTER</kbd>
to see that it is a float and not an integer, just like the error message says.
Be aware, though, that we can only inspect global variables, not local variables
inside of a function (that's just how Python works).

<img
 src="/images/news/vscode-ev3dev-browser-terminal-python-inspect.png"
 alt="Screenshot of ev3dev-browser VS Code extension output pane showing Python crash"
 class="image-responsive"
/>

[4]: https://docs.python.org/3/using/cmdline.html#envvar-PYTHONINSPECT

#### Side-effects

There is also a side-effect to be aware of if you have existing Python programs.
When using `"interactiveTerminal": true`, the standard output stream is
redirected to the VS Code terminal pane. This means that if you use `print()`
in your Python program to write text on the screen of the EV3, now the text
will print in the VS Code terminal window instead.

To see this you can fix the example program (hint `5 // 3` results in an integer
instead of a float) and run it with both `"interactiveTerminal": true` and
`"interactiveTerminal": false`.
