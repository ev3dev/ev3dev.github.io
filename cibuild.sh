#!/usr/bin/env bash
set -e # halt script on error

echo "Searching for BOMs -------------------------------"

FOUND_BOM=false
for filename in ./**/*.*; do
    # Make sure that the file is UTF-8 so we don't search binary files or other encodings
    CURRENT_FILE_ENCODING="`file --mime-encoding --brief "$filename"`"
    if [ "$CURRENT_FILE_ENCODING" == "utf-8" ] && [ "`head -c 3 -- "$filename"`" == $'\xef\xbb\xbf' ]
    then
        # Make note of all the files that failed so we can see it in the Travis log
        FOUND_BOM=true
        echo "Found BOM in file $filename!"
    fi
done

if [ $FOUND_BOM == true ]
then
    # We still want to run the other validation checks even if we found BOMs
    echo "Checks failed! Jekyll can't handle BOMs. See above for list of problematic files."
else
    echo "Checks passed! No BOMs found."
fi

echo "Building site ------------------------------------"
bundle exec jekyll build --trace

if [ "$TRAVIS" == "true" ]; then
    # Travis has issues with https, so we have to ignore quite a few extra sites

    # credit: code snippet borrowed from jekyllrb.com website source
    IGNORE_HREFS=$(ruby -e 'puts %w{
        https:\/\/.*
        example.com
        fatcatlab.com
        robosnap.net
        dsharlet.com
        alioth.debian.org
        manpages.info
        kernel.ubuntu.com
    }.map{|h| "/#{h}/"}.join(",")')
else
    # credit: code snippet borrowed from jekyllrb.com website source
    IGNORE_HREFS=$(ruby -e 'puts %w{
        example.com
        https:\/\/github\.com\/myuser\/myrepo
        https:\/\/github.com\/ev3dev\/ev3dev\.github\.io\/edit\/.*
        fatcatlab.com
        robosnap.net
        alioth.debian.org
        kernel.ubuntu.com
        https:\/\/na\.industrial\.panasonic\.com\/products\/wireless-connectivity\/bluetooth\/bluetooth-classic\/series\/pan1325a1315a-series\/CS460
    }.map{|h| "/#{h}/"}.join(",")')
fi

# Explanation of ignored sites:
# - example.com and github.com/myuser/myrepo are fake/example links
# - The edit on github pages don't exist when you create a page, so ignoring them.
#   They are automatically generated anyway.
# - robosnap.net no longer exists, but keeping the link for historical reasons

echo "Validating HTML ----------------------------------"
# We want to use the publish script so that we can implement other transformations in the future
ruby publish.rb --no-fix-links --test "htmlproofer ./ --url-ignore $IGNORE_HREFS --check-html --allow-hash-href"

# If the site build succeeded but we found BOMs, we want to fail the build
if [ $FOUND_BOM == true ]
then
    exit 1
fi
