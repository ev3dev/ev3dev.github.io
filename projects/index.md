---
title: Projects
---

This is where we keep a collection of all the projects that people are working
on using ev3dev. We invite you to click through the links below to see what
cool stuff ev3dev can do!

Would you like your project added to the list? We would!
[Create a page and send us a pull request.](https://github.com/ev3dev/ev3dev/wiki/Posting-A-Project)

<ul id="projects-list">
    {% for post in site.posts %}
        {% if post.categories contains "projects" %}
            {% unless post.id == '/projects/2014/03/21/Example-Project' %}
                <li>
                    <div class="project-tile-title">
                        <h4>
                            <a href="{{ site.github.url }}{{ post.url }}">{{ post.title }}</a>
                        </h4>
                    </div>
                    {% assign num_words = 40 %}
                    {% if post.youtube_video_id %}
                        {% assign num_words = 20 %}
                        <a href="{{ site.github.url }}{{ post.url }}">
                            <img class="project-tile-img" src="http://img.youtube.com/vi/{{post.youtube_video_id}}/mqdefault.jpg" />
                        </a>
                    {% endif %}
                    <span class="project-tile-excerpt">
                        {{ post.excerpt | truncatewords: num_words }}
                    </span>
                </li>
            {% endunless %}
        {% endif %}
    {% endfor %}
</ul>
