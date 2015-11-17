{% assign port=site.data.ports[page.port_index] %}
{% assign footnotes='' %}
{% if port.notes %}
    {% assign footnotes=footnotes | append: port.notes %}
{% endif %}

<!-- the empty comments before and after the footnotes are to prevent unwanted
     spaces from being added between the spans -->

### General Info

<table id="sensor-info" class="table table-striped table-bordered">
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th><code>device_name</code></th>
        <td><code>{{ port.name }}</code></td>
    </tr>
    <tr>
        <th>
            <code>port_name</code>
            <span markdown="1" style="white-space:nowrap;">prefix<!--
            {% if port.prefix_footnote %}
            -->{{ port.prefix_footnote }}<!--
            {% endif %}
            -->
            </span>
        </th>
        <td><code>{{ port.prefix }}</code></td>
    </tr>
    {%if port.vendor_website %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th>Website</th>
        {% assign split_website=port.vendor_website | split: '/' %}
        <td><span markdown="1">[{{ split_website[2] }}]({{ port.vendor_website }})</span></td>
    </tr>
    {% endif %}
    {% if port.default_address %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th>Address</th>
        <td>
            {{ port.default_address }}<!--
            {% if port.default_address_footnote %}
                --><span markdown="1">{{ port.default_address_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% endif %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th>sysfs class</th>
        <td>
            {%if port.device_class %}
                <span markdown="1">{{ port.device_class }}</span><!--
            {% else %}
                <span markdown="1">[lego-port]</span><!--
            {% endif %}
            {%if port.device_class_footnote %}
                --><span markdown="1">{{ port.device_class_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% if port.vendor_id %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th><code>vendor_id</code></th>
        <td>
            {{ port.vendor_id }}<!--
            {% if port.vendor_id_footnote %}
                --><span markdown="1">{{ port.vendor_id_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% endif %}
    {% if port.product_id %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th><code>product_id</code></th>
        <td>
            {{ port.product_id }}<!--
            {% if port.product_id_footnote %}
                --><span markdown="1">{{ port.product_id_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% endif %}
    {%if port.device_class == null %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th># Modes</th>
        <td>{{ port.num_modes }}</td>
    </tr>
    {% endif %}
</table>

{%if port.device_class == null %}
### Modes

<table id="sensor-modes" class="table table-striped table-bordered">
    <tr class="{% cycle 'modes': 'd0', 'd1' %}">
        <th><code>mode</code></th>
        <th>Description</th>
    </tr>
    {% for mode in port.mode_info %}
    {% if mode.notes %}
        {% assign footnotes=footnotes | append: mode.notes %}
    {% endif %}
    <tr class="{% cycle 'modes': 'd0', 'd1' %}">
        <td style="white-space:nowrap;">
            <code>{{ mode.name }}</code><!--
            {% if mode.name_footnote %}
                --><span markdown="1">{{ mode.name_footnote }}</span><!--
            {% endif %}
            {% if port.num_read_only_modes %}
                {% assign num_read_only_modes=port.num_read_only_modes | plus: 0 %}
                {%if forloop.index > num_read_only_modes %}
                    {% if mode.name_footnote %}
                        --><sup>,</sup><!--
                    {% endif %}
                    --><span markdown="1">[^not-read-only]</span><!--
                {% endif %}
            {% endif %}
            -->
        </td>
        <td><span markdown="1">{{ mode.description }}</span></td>
    </tr>
    {% endfor %}
</table>
{% endif %}

{% if footnotes != '' %}
### Notes

{{ footnotes }}
{% endif %}

[lego-port]: ../../drivers/lego-port-class