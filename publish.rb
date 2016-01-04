#!/usr/bin/env ruby
#
# publish.rb
#
# This script publishes the ev3dev website to the gh-pages branch of your
# personal fork. This allows you to share a preview of your changes with others.
#
# Usage: ./publish.rb <gh-user-name>

require 'tmpdir'

if ARGV.count != 1
    STDERR.puts "Usage: ./publish.rb <gh-user-name>"
    exit(1)
end

Dir.mktmpdir do |tmp|
    FileUtils.cp_r "_site/.", tmp
    Dir.chdir tmp
    system "git init"
    git_url = "git@github.com:#{ARGV[0]}/ev3dev.github.io.git"
    system "git remote add origin #{git_url}"

    # make sure the remote is reachable before continuing
    if not system "git ls-remote #{git_url} HEAD"
        STDERR.puts "Repository: #{git_url}"
        exit(1)
    end

    # Fix up the files for publishing on gh-pages

    # having cname sends you annoying email
    FileUtils.rm 'CNAME'

    # prepend ev3dev.github.io to all root-relative urls
    system "git add ."
    file_names = `git ls-files | grep '.html$'`
    file_names.each_line do |file_name|
        file_name = file_name.strip
        text = File.read(file_name)
        # TODO: basename need to be different for travis build
        basename = "/ev3dev.github.io"
        new_contents = text.gsub(/(href|src)="\//, "\\1=\"#{basename}/")
        File.open(file_name, "w") {|file| file.puts new_contents }
    end

    # TODO: need to fixup javascripts/search.js
    # this line needs to be changed...
    # $.getJSON("/search-index.json", function (e) {

    # TODO: need to fixup search-index.json
    # line like this need to be changed...
    # "href": "/news/2015/12/30/ev3dev-jessie-2015-12-30-release/",

    system "git add ."
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    system "git push origin master:refs/heads/gh-pages --force"
end
