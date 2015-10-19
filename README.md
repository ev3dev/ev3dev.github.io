ev3dev.github.io
================

This is the web page at <http://www.ev3dev.org> and also <http://ev3dev.github.io>.

Feel free to fork and make a pull request.

You can view your changes locally by installing [jekyll](https://help.github.com/articles/using-jekyll-with-pages).

Installing Jekyll in Ubuntu 14.04
---

### Install Ruby via apt-get
    sudo apt-get install git ruby2.0 ruby2.0-dev nodejs
    sudo gem install bundler

### Install Ruby via RVM (Ruby Version Manager)
If you hit any snags with apt another option is to install via RVM. Note that
you must do the 'source' line when you open a new xterm.

    gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
    \curl -sSL https://get.rvm.io | bash -s stable --ruby
    source ~/.rvm/scripts/rvm
    
### Checkout Code and Run Jekyll
    git clone git@github.com:<user>/ev3dev.github.io
    cd ev3dev.github.io
    bundle install
    bundle exec jekyll serve &
    www-browser http://localhost:4000 &
    # work, work, work

Installing Jekyll in  Windows
---

- Follow the instructions in step 1 [here](http://jekyll-windows.juthilo.com/1-ruby-and-devkit/) (Installing Ruby and the Ruby DevKit).

Then run:

    gem install bundler
    git clone https://github.com/<user>/ev3dev.github.io
    cd ev3dev.github.io
    bundle install
    bundle exec jekyll serve

Now you should be able to visit your page at: [http://localhost:4000](http://localhost:4000). It should auto-update when you change the source files, so all you have to do is refresh your browser.

Previewing Your Changes Online
---

When forking, you can create a new branch called `gh-pages`, then your
changes can be viewed as `http://<user>.github.io/ev3dev.github.io`. When you do this
though, GitHub will send you lots of email like this, which you should ignore.

    The page build completed successfully, but returned the following warning:
    
    CNAME already taken: www.ev3dev.org
    
    For information on troubleshooting Jekyll see:
    
      https://help.github.com/articles/using-jekyll-with-pages#troubleshooting
    
    If you have any questions please contact us at https://github.com/contact.
    
If it really gets on your nerves, you can rename the `CNAME` file. Just make sure to
change it back before you submit your pull request.


