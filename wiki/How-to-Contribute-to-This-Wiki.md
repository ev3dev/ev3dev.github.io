---
title: How to Contribute to This Wiki
index: wiki
---

As you can see, not just anyone can edit a wiki page. We welcome your contributions, but we would like to be able to review them first. [Why?][1]

So, here is how to submit your changes... 

**Note:** If it sounds too complicated, then you can just submit your changes in the comment of an issue. Issues use the same markdown format as the wiki, so we can usually just copy and paste.

1. [Fork][2] the [ev3dev repo][3] on github.

    **Note:** We keep a copy of the wiki in the [wiki branch][4] so that you can submit a pull request. However, what is actually displayed in the wiki has it's own separate repo. This means we have to juggle 4 copies of the wiki. Unless you are already a git ninja, this may sound a bit scary, but once you get the hang of it, it is not so bad.
    
    ![wiki repo diagram](docs/ev3dev-wiki-repos.png)

2. Clone the ev3dev wiki branch on your computer. (Subtitute your github user name for `<user>`.)

        git clone git@github.com:<user>/ev3dev ev3dev-wiki
        cd ev3dev-wiki
        git checkout wiki
        
3. The wiki branch in the ev3dev repo is probably behind the real wiki unless we just merged a pull request. So, we need to get the latest updates from the real wiki.
        
        git remote add realwiki git://github.com/mindboards/ev3dev.wiki
        git pull realwiki master:wiki
        
4. Now, we need to get the ev3dev wiki pushed to your repo on github. Browse (web) to `https://github.com/<user>/ev3dev/wiki` and click the button that says *Create the first page*. When you see the message *Your Wiki was created.*, we are ready to proceed. Next, you need to push the ev3dev wiki to the wiki of your fork on GitHub.
    
        git remote add mywiki git@github.com:<user>/ev3dev.wiki
        git push mywiki wiki:master
        
    Now, you can edit the wiki online and see what the results actually look like on GitHub. Check out the [GitHub][5] [help][6] [pages][7] if you are not familiar with the markdown syntax.
    
5. You can also edit the files locally using any text editor.  There are even tools that let you preview the formated markdown ([ReText][8] for example). Be sure to push the changes on your local computer to the wiki in your GitHub repo and preview any results to check that they look like you expected.

6. Once you have the changes the way you like and you are ready to submit them for review, we need to make sure the changes are pushed to the correct repo so that we can to a pull request.

        git pull mywiki master:wiki
        git push origin wiki:wiki
       
7. To submit a pull request, browse to `https://github.com/<user>/ev3dev/tree/wiki` and click the [pull request][9] button. In the description, tell us about your changes and provide links to the pages that you changed in your repository so that we can see what they look like.

8. Once the changes have been reviewed, we will push them to the real wiki. You can now pat your self on the back for a job well done. Thanks for your help!

[1]: https://github.com/mindboards/ev3dev/issues/28
[2]: https://help.github.com/articles/fork-a-repo
[3]: https://github.com/mindboards/ev3dev
[4]: https://github.com/mindboards/ev3dev/tree/wiki
[5]: https://help.github.com/articles/markdown-basics
[6]: https://help.github.com/articles/github-flavored-markdown
[7]: https://help.github.com/articles/about-github-wikis
[8]: http://sourceforge.net/p/retext/home/ReText
[9]: https://help.github.com/articles/creating-a-pull-request
