require "kramdown"


wiki_url    = "https://github.com/ev3dev/ev3dev/wiki"
wiki_source = "_wiki"
wiki_dest   = "wiki"

task :default => :refresh


task :commit do |t|
    #puts "deploying"
    #system "git add wiki/*"
    #message = "Update wiki at #{Time.now.utc}"
    #puts "\n## Committing: #{message}"
    #system "git commit -m \"#{message}\""
    #puts "\n## Committed all files"

end

# sync repository wiki pages with Jekyll
# needs a public wiki
task :refresh do |t|

    # check for update in wiki
    cd "#{wiki_source}" do
      pullCommand = 'git pull origin master'

      puts "Updating wiki submodule"
      output = `#{pullCommand}`
=begin
      if output.include? 'Already up-to-date'
        abort("No update necessary") # exit
      end
=end
    end

    puts "Updating #{wiki_dest}"

    if File.exist?(wiki_dest)
      puts "remove older wiki pages"
      Dir.glob("#{wiki_dest}/*.md") do |wikiPage|
        puts "removing #{wikiPage}"
        rm_rf wikiPage
      end
    else
      puts "create the dest dir for wiki pages"
      FileUtils.mkdir(wiki_dest)
    end

    Dir.glob("#{wiki_source}/*.md") do |wikiPage|

      wikiPageName     = File.basename(wikiPage)
      newWikiPageName  = File.join("#{wiki_dest}", wikiPageName)

      # transform page name to get a title
      newWikiPageTitle = wikiPageName.sub(/.[^.]+\z/,'')# remove extension
      newWikiPageTitle = newWikiPageTitle.gsub("-"," ")# replace - by spaces

      fileContent =  File.read(wikiPage)

      # link conversion
      # kDoc = Kramdown::Document.new(fileContent)

      puts "generating #{newWikiPageName} with title : #{newWikiPageTitle}"

      # write the new file with yaml front matter
      open(newWikiPageName, 'w') do |newWikiPage|
        newWikiPage.puts "---"
        newWikiPage.puts "title: #{newWikiPageTitle}"
		newWikiPage.puts "index: wiki"
        newWikiPage.puts "---"
        newWikiPage.puts ""
        newWikiPage.puts fileContent
      end

    end
    puts "refresh complete"

end

