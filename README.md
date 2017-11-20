Pretty website for ev3dev [![Build Status](https://travis-ci.org/ev3dev/ev3dev.github.io.svg?branch=master)](https://travis-ci.org/ev3dev/ev3dev.github.io)
================

This is the source repository for the **web page** at <http://www.ev3dev.org>. If you want
to learn more about ev3dev in general, visit the site or check out our
[GitHub repo](github.com/ev3dev/ev3dev).

Feel free to fork and make a pull request! If you're looking for ways to
contribute to our website, check out issues [tagged "help wanted"](https://github.com/ev3dev/ev3dev.github.io/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22); there are often tasks there
which are well-suited to new contributors.

Previewing Locally
---

You can view your changes locally by installing [Jekyll](https://help.github.com/articles/using-jekyll-with-pages).

### Installing Jekyll in Ubuntu 16.04

#### Install Ruby via apt-get
    sudo apt-get install git ruby ruby-dev zlib1g-dev nodejs
    sudo gem install bundler

#### Install Ruby via RVM (Ruby Version Manager)
If you use ruby for other things and don't want to mess up you system ruby
installation, you can install ruby via `rvm` instead. Note that you must do the
'source' line when you open a new xterm or add it to `~/.bashrc`.

    gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
    \curl -sSL https://get.rvm.io | bash -s stable --ruby
    source ~/.rvm/scripts/rvm
    
You will still need to run the following too...

    sudo apt-get install git zlib1g-dev nodejs
    sudo gem install bundler

#### Check Out Code and Run Jekyll
    git clone git@github.com:<user>/ev3dev.github.io
    cd ev3dev.github.io
    bundle install
    bundle exec jekyll serve --safe --incremental &
    www-browser http://localhost:4000 &
    # work, work, work

### Installing Jekyll on  Windows

First, follow the instructions in step 1
[here](http://jekyll-windows.juthilo.com/1-ruby-and-devkit/):
"Installing Ruby and the Ruby DevKit."

Then run:

    gem install bundler
    git clone https://github.com/<user>/ev3dev.github.io
    cd ev3dev.github.io
    bundle install
    bundle exec jekyll serve --safe --incremental

Now you should be able to visit your page at: <http://localhost:4000>.
It should auto-update when you change the source files, so all you have to do is
refresh your browser.

Previewing Your Changes Online
---

After you have previewed your changes locally, you can use a special Ruby script to publish your changes using the `gh-pages`
branch of your fork of ev3dev.github.io. 

If you have SSH setup for your GitHub account, simply run `./publish.rb <gh-user> --ssh` where `<gh-user>` is your actual GitHub user name. If you do not have SSH set up, use `./publish.rb <gh-user>`. This will copy the contents of `_site`, fix it up a bit and push it to your fork on GitHub. You can view the results at `http://<gh-user>.github.io/ev3dev.github.io`.
