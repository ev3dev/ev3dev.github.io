---
author: "@dlech"
title: "ev3dev-browser VS Code Extension Beta Release"
---

<img
 src="/images/news/vscode-ev3dev-browser-debug-python.png"
 alt="Screenshot of ev3dev-browser VS Code extension showing debuggers for Python"
 style="width: 400px; max-width: 100%;"
 class="image-responsive pull-right"
/>

**Update 2020-07-20: Extension v1.2.0 has been released in the VS Code
marketplace.**

We are working on the next release of the [ev3dev-browser VS Code Extension][1]
and we need testers! This version mostly contains bug fixes. It should do a
better job detecting ev3dev devices. It also fixes a bug where subprocesses
on the EV3 are not stopped when clicking the red stop button in VS Code.

[1]: https://marketplace.visualstudio.com/items?itemName=ev3dev.ev3dev-browser

<!--more-->

There is also one new feature courtesy of @WasabiFan. The `ev3dev` debugger is
now registered as a default handler for Python files, so now it is possible to
download and run a Python script without having to create a `launch.json` file.
Just open your file and press <kbd>F5</kbd> or <kbd>Cmd ⌘</kbd>
+<kbd>Return ↩</kbd> on Mac.

If you find any problems, please report them [here][issues].

[issues]: https://github.com/ev3dev/vscode-ev3dev-browser/issues


### Getting the Beta Version

The beta version is not available on the VS Code Marketplace. Instead download
the `.vsix` file from the [GitHub Releases][2] page. Then [install it in VS
Code][3].

[2]: https://github.com/ev3dev/vscode-ev3dev-browser/releases
[3]: https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix

The ev3dev VS Code extension is also now available via [open-vsx.org][4] for
those that use other VS Code-compatible editors like VSCodium and Eclipse Theia.

[4]: https://open-vsx.org/extension/ev3dev/ev3dev-browser
