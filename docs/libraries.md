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
currently has support for C++, Lua, Node.js, R and vala.
These libraries are all built around a single
[API specification](https://github.com/ev3dev/ev3dev-lang/blob/develop/wrapper-specification.md)
that ensures that interface is almost identical for each, and they are being updated and
enhanced regularly.

* Unified bindings:
    * [Lua](https://github.com/ev3dev/ev3dev-lang/tree/develop/lua)
    * [C++](https://github.com/ev3dev/ev3dev-lang/tree/develop/cpp)
    * [Node.js](https://github.com/ev3dev/ev3dev-lang/tree/develop/js)
    * [R](https://github.com/ev3dev/ev3dev-lang/tree/develop/R)

## Extra languages
We also have many great contrubutors that are maintaining extra libraries for languages not included in our other repository. 

* Extra languages:
    * [Google Go](https://github.com/ldmberman/GoEV3) updated for ev3dev-jessie by @ldmberman, [original](https://github.com/mattrajca/GoEV3) by @mattrajca
    * [Python](https://github.com/topikachu/python-ev3) by @topikachu
    * [C (with optional Perl, Python and Ruby bindings)](https://github.com/in4lio/ev3dev-c) by @in4lio
    * [C](https://github.com/theZiz/ev3c) by @Ziz
    * [Clojure](https://github.com/annapawlicka/clj-ev3dev) by @annapawlicka
