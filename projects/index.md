---
title: Projects
---

﻿This is where we keep a collection of all the projects that people are working
on using ev3dev. We invite you to click through the links below to see what
cool stuff ev3dev can do!

Would you like your project added to the list? We would!
[Create a page and send us a pull request.](https://github.com/ev3dev/ev3dev/wiki/Posting-A-Project)

<ul id="projects-list">
    {% for post in site.posts %}
        {% if post.categories.first == "projects" %}
            <li>
                <a href="{{ site.github.url }}{{ post.url }}">{{ post.title }}</a>
                {% if post.author %}
                    {% assign author_mention = post.author %}
                    by {% include author-mention.html %}
                {% endif %}
                ({{ post.date | date_to_string }})
            </li>
        {% endif %}
    {% endfor %}
</ul>
