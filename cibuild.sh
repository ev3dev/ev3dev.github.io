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

# credit: code snippet borrowed from jekyllrb.com website source
IGNORE_HREFS=$(ruby -e 'puts %w{
    example.com
    https:\/\/github\.com\/myuser\/myrepo
    .*revolds-whitepaper\.pdf
    https:\/\/github.com\/ev3dev\/ev3dev\.github\.io\/edit\/.*
    warmcat.com
    robosnap.net
}.map{|h| "/#{h}/"}.join(",")')

# Explanation of ignored sites:
# - example.com and github.com/myuser/myrepo are fake/example links
# - The edit on github pages don't exist when you create a page, so ignoring them.
#   They are automatically generated anyway.
#  -revolds-whitepaper.pdf causes problems on travis but is really a good link (for now)
# - warmcat.com works locally but fails on travis for some reason related to ssl

echo "Validating HTML ----------------------------------"
# We want to use the publish script so that we can implement other transformations in the future
ruby publish.rb --no-fix-links --test "htmlproofer ./ --url-ignore $IGNORE_HREFS --check-html --allow-hash-href"

# If the site build succeeded but we found BOMs, we want to fail the build
if [ $FOUND_BOM == true ]
then
    exit 1
fi
