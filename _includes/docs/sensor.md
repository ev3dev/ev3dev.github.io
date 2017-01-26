{% assign sensor=site.data.sensors[page.sensor_index] %}
{% include /docs/sensor-connection.html %}
{% assign footnotes='' %}
{% if sensor.notes %}
    {% assign footnotes=footnotes | append: sensor.notes %}
{% endif %}

<!-- the empty comments before and after the footnotes are to prevent unwanted
     spaces from being added between the spans -->

### General Info

<table class="table table-striped table-bordered">
    <tr>
        <th><code>device_name</code></th>
        <td><code>{{ sensor.name }}</code></td>
    </tr>
    {%if sensor.vendor_website %}
    <tr>
        <th>Website</th>
        {% assign split_website=sensor.vendor_website | split: '/' %}
        <td><span markdown="1">[{{ split_website[2] }}]({{ sensor.vendor_website }})</span></td>
    </tr>
    {% endif %}
    <tr>
        <th>Connection</th>
        <td>{{ connection }}</td>
    </tr>
    {% if sensor.default_address %}
    <tr>
        <th>Address</th>
        <td>
            {{ sensor.default_address }}<!--
            {% if sensor.default_address_footnote %}
                --><span markdown="1">{{ sensor.default_address_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% endif %}
    <tr>
        <th>sysfs class</th>
        <td>
            {%if sensor.device_class %}
                <span markdown="1">{{ sensor.device_class }}</span><!--
            {% else %}
                <span markdown="1">[lego-sensor]</span><!--
            {% endif %}
            {%if sensor.device_class_footnote %}
                --><span markdown="1">{{ sensor.device_class_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% if sensor.vendor_id %}
    <tr>
        <th><code>vendor_id</code></th>
        <td>
            {{ sensor.vendor_id }}<!--
            {% if sensor.alt_vendor_id %}
            --> or {{ sensor.alt_vendor_id }}<!--
            {% endif %}
            {% if sensor.vendor_id_footnote %}
                --><span markdown="1">{{ sensor.vendor_id_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% endif %}
    {% if sensor.product_id %}
    <tr>
        <th><code>product_id</code></th>
        <td>
            {{ sensor.product_id }}<!--
            {% if sensor.product_id_footnote %}
                --><span markdown="1">{{ sensor.product_id_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% endif %}
    {%if sensor.device_class == null %}
    <tr>
        <th># Modes</th>
        <td>{{ sensor.num_modes }}</td>
    </tr>
    {% endif %}
</table>

{%if sensor.device_class == null %}
### Modes

<table id="sensor-modes" class="table table-striped table-bordered">
    <tr>
        <th><code>mode</code></th>
        <th>Description</th>
        <th><code>units</code></th>
        <th><code>decimals</code><span markdown="1">[^decimals]</span></th>
        <th><code>num_values</code></th>
        <th>Values</th>
    </tr>
    {% for mode in sensor.mode_info %}
    {% if mode.notes %}
        {% assign footnotes=footnotes | append: mode.notes %}
    {% endif %}
    <tr>
        <td style="white-space:nowrap;">
            <code>{{ mode.name }}</code><!--
            {% if mode.name_footnote %}
                --><span markdown="1">{{ mode.name_footnote }}</span><!--
            {% endif %}
            {% if sensor.num_read_only_modes %}
                {% assign num_read_only_modes=sensor.num_read_only_modes | plus: 0 %}
                {%if forloop.index > num_read_only_modes %}
                    {% if mode.name_footnote %}
                        --><sup>,</sup><!--
                    {% endif %}
                    --><span markdown="1">[^not-read-only]</span><!--
                {% endif %}
            {% endif %}
            -->
        </td>
        <td>{{ mode.description }}</td>
        <td>
            {% if mode.units %}
                <code>{{ mode.units }}</code>
                {% if mode.units_description %}
                    ({{ mode.units_description }})
                {% endif %}
            {% else %}
                <i>none</i>
            {% endif %}<!--
            {% if mode.units_footnote %}
            --><span markdown='1'>{{ mode.units_footnote }}</span><!--
            {% endif %}
            -->
        </td>
        <td>
            <code>
                {% if mode.decimals %}
                    {{ mode.decimals }}
                {% else %}
                    0
                {% endif %}
            </code>
        </td>
        <td>
            <code>
                {% assign num_values=1 %}
                {% if mode.data_sets %}
                    {% assign num_values=mode.data_sets %}
                {% endif %}
                {{ num_values }}
            </code>
        </td>
        <td>
            {% for i in (1..num_values) %}
                {% assign value=forloop.index0 | prepend: 'value' %}
                {% if mode[value] %}
                {% if i > 1 %}
                    <br />
                {% endif %}
                {% assign value_footnote=value | append: '_footnote' %}
                <span style="white-space:nowrap;">
                    <code>{{ value }}</code>: {{ mode[value] }}<!--
                    {% if mode[value_footnote] %}
                        --><span markdown="1">{{ mode[value_footnote] }}</span><!--
                    {% endif %}
                    -->
                </span>
                {% endif %}
            {% endfor %}
        </td>
    </tr>
    {% endfor %}
</table>

[^decimals]: Decimal places. For example, if the range of a value is from 0 to 1000
    and `decimals` is `1`, then the actual range is 0.0 to 100.0 in the units specified.

[^not-read-only]: This mode is not available when the sensor is connected to a
    read-only input port like the HiTechnic NXT Sensor MUX.
{% endif %}

### Commands
{% assign num_commands = sensor.num_commands | plus: 0 %}
{% if num_commands > 0 %}
<table class="table table-striped table-bordered">
    <tr>
        <th><code>command</code></th>
        <th>Description</th>
    </tr>
    {% for command in sensor.cmd_info %}
    {% if command.notes %}
        {% assign footnotes=footnotes | append: command.notes %}
    {% endif %}
    <tr>
        <td>
            <code>{{ command.name }}</code><!--
            {% if command.name_footnote %}
                --><span markdown="1">{{ command.name_footnote }}</span><!--
            {% endif %}
            -->
        </td>
        <td><span markdown="1">{{ command.description }}</span></td>
    </tr>
    {% endfor %}
</table>
{% else %}
This sensor does not support commands.
{% endif %}

### Notes

{{ footnotes }}

[lego-sensor]: ../../drivers/lego-sensor-class
