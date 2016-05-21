#!/usr/bin/env ruby
#
# publish.rb
#
# This script publishes the ev3dev website to the gh-pages branch of your
# personal fork. This allows you to share a preview of your changes with others.
#
# Usage: ./publish.rb { <gh-user> } [ --ssh ] [ --test '<command>' ] [ --no-fix-links ]
#
# <gh-user> is your github user name.
#
# --ssh will use SSH instead of HTTPS when connecting to GitHub.
#
# --test '<command>' will run <command> in a shell and return the result. The
# working directory will be a temporary directory containing the fixed up files.
#
# --no-fix-links will prevent modification of links in anchor and img elements.
#
# Use BASENAME environment variable to override basename. Use "@FULL_PATH@" as a
# placeholder for the full path to the temporary directory that is created.

require 'tmpdir'

# TODO: We should use a real parser library. This has many ways it could go wrong.
if ARGV.count < 1 || ARGV.include?('--test') && ARGV[ARGV.index('--test') + 1].nil?
    STDERR.puts "Usage: ./publish.rb { <gh-user> | <gh-url> } [ --test '<command>' ] [ --no-fix-links ]"
    exit(1)
end

Dir.mktmpdir do |tmp|
    FileUtils.cp_r "_site/.", tmp
    Dir.chdir tmp
    system "git init"

    unless ARGV.include? "--test"
        gh_user = ARGV[0]
        if ARGV.include?("--ssh")
            git_url = "git@github.com:#{gh_user}/ev3dev.github.io.git"
        else
            git_url = "https://github.com/#{gh_user}/ev3dev.github.io.git"
        end
        system "git remote add origin #{git_url}"

        # make sure the remote is reachable before continuing
        if not system "git ls-remote #{git_url} HEAD"
            STDERR.puts "Repository: #{git_url}"
            exit(1)
        end
    end

    # Fix up the files for publishing on gh-pages

    # having cname sends you annoying email
    FileUtils.rm 'CNAME'
    
    # adding a .nojekyll file disables unnecessary build job on GH Pages
    FileUtils.touch '.nojekyll'

    system "git add ."

    unless ARGV.include? "--no-fix-links"

        # prepend ev3dev.github.io to all root-relative urls
        basename = ENV['BASENAME'] || "/ev3dev.github.io"
        basename = basename.gsub(/@FULL_PATH@/, tmp)

        html_file_names = `git ls-files | grep '.html$'`
        html_file_names.each_line do |file_name|
            file_name = file_name.strip
            text = File.read(file_name)
            new_contents = text.gsub(/(href|src)="\//, "\\1=\"#{basename}/")
            File.open(file_name, "w") { |file| file.puts new_contents }
        end

        css_file_names = `git ls-files | grep '.css$'`
        css_file_names.each_line do |file_name|
            file_name = file_name.strip
            text = File.read(file_name)
            new_contents = text.gsub(/(url\(\s*)"\//, "\\1\"#{basename}/")
            File.open(file_name, "w") { |file| file.puts new_contents }
        end

        # Do the same thing for seach files
        file_name = 'javascripts/search.js'
        text = File.read(file_name)
        new_contents = text.gsub(/(\/search-index.json)/, "#{basename}\\1")
        File.open(file_name, "w") { |file| file.puts new_contents }

        file_name = 'search-index.json'
        text = File.read(file_name)
        new_contents = text.gsub(/("href"\s*:\s*")\//, "\\1#{basename}/")
        File.open(file_name, "w") { |file| file.puts new_contents }
    end

    if ARGV.include? '--test'
        # run test command
        exit(system ARGV[ARGV.index('--test') + 1])
    elsif git_url
        system "git add ."
        message = "Site updated at #{Time.now.utc}"
        system "git commit -m #{message.inspect}"
        system "git push origin master:refs/heads/gh-pages --force"        
    end
end
