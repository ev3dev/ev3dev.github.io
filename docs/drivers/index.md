---
title: Drivers
---

These are all of the (documented) devices drivers included in the ev3dev
kernel for EV3-specific hardware. For mainline or other drivers, check out
the [tutorials] or if nothing related is there, try searching the web.

<ul>
{% assign drivers=site.pages | where: "category","drivers" %}
{%for driver in drivers %}
{%if driver.url != page.url %}
{% assign paths=driver.url | split: '/' %}
{% assign page_name=paths | last %}
<li><a href="{{ driver.url }}">{{ driver.title }}</a> ({{ page_name }})</li>
{% endif %}
{% endfor %}
</ul>

[tutorials]: ../tutorials