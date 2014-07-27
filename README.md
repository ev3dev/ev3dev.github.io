ev3dev.github.io
================

This is the web page at <http://www.ev3dev.org> and also <http://ev3dev.github.io>.

Feel free to fork and make a pull request.

You can view your changes locally by installing [jekyll](http://jekyllrb.com/).

In ubuntu 14.04:

    sudo apt-get install git ruby1.9.1 ruby1.9.1-dev nodejs
    sudo gem install bundle
    git clone git@github.com:<user>/ev3dev.github.io
    cd ev3dev.github.io
    bundle install
    bundle exec jekyll serve --watch &
    www-browser http://localhost:4000 &
    # work, work, work

Alternately, when forking, you can create a new branch called `gh-pages`, then your
changes can be viewed as `http://<user>.github.io/ev3dev.github.io`. When you do this
though, GitHub will send you lots of email like this, which you should ignore.

    The page build completed successfully, but returned the following warning:
    
    CNAME already taken: www.ev3dev.org
    
    For information on troubleshooting Jekyll see:
    
      https://help.github.com/articles/using-jekyll-with-pages#troubleshooting
    
    If you have any questions please contact us at https://github.com/contact.
    
If it really gets on your nerves, you can rename the `CNAME` file. Just make sure to
change it back before you submit your pull request.


