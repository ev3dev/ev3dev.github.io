---
title: Libraries
subtitle: Pre-made language bindings that make accessing the EV3 device drivers easy
---

* Table of Contents
{:toc}

If you are looking to write a program that takes advantage of the EV3's motors, sensors, or other native devices,
using a language binding is the way to go.
We have a repository of officially maintained language bindings, as well as many more that are maintained separately by contributors on GitHub.

## Unified Libraries

Our official "unified" [language binding repository](http://github.com/ev3dev/ev3dev-lang)
currently has support for C++, Lua, Node.js, and Python.
These libraries are all built around a single
[API specification](https://github.com/ev3dev/ev3dev-lang/blob/develop/wrapper-specification.md)
that ensures that interface is almost identical for each, and they are being updated and
enhanced regularly.

* Unified bindings:
    * [C++](https://github.com/ev3dev/ev3dev-lang/tree/develop/cpp)
    * [Lua](https://github.com/ev3dev/ev3dev-lang/tree/develop/lua)
    * [Node.js](https://github.com/wasabifan/ev3dev-lang-js)
    * [Python](https://github.com/rhempel/ev3dev-lang-python)

## Programming toolkit for ev3dev

There is also a [GLib]/[GObject] based [toolkit][ev3devKit] that provides a number of
programming interfaces for ev3dev, including user interface and device driver
interface.  It is written in vala, but since it uses GObjects, it can be used
with many [languages] via [GObjectIntrospection]. The [Brick Manager][brickman]
for ev3dev is written using this library.

[ev3devKit]: https://github.com/ev3dev/ev3devKit
[GLib]: https://developer.gnome.org/glib/stable/index.html
[GObject]: https://developer.gnome.org/gobject/stable/index.html
[languages]: https://wiki.gnome.org/Projects/GObjectIntrospection/Users
[GObjectIntrospection]: https://wiki.gnome.org/Projects/GObjectIntrospection
[brickman]: https://github.com/ev3dev/brickman


## Extra languages
We also have many great contrubutors that are maintaining extra libraries for
languages not included in our other repository.  Note that some of these
libraries may be outdated due to the fast development cycle of ev3dev.

* Extra languages:
    * [Google Go](https://github.com/ldmberman/GoEV3) updated for ev3dev-jessie by @ldmberman, [original](https://github.com/mattrajca/GoEV3) by @mattrajca
    * [Python](https://github.com/topikachu/python-ev3) by @topikachu
    * [C (with optional Perl, Python and Ruby bindings)](https://github.com/in4lio/ev3dev-c) by @in4lio
    * [C](https://github.com/theZiz/ev3c) by @theZiz
    * [Clojure](https://github.com/annapawlicka/clj-ev3dev) by @annapawlicka
