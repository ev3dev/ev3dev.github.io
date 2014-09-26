{% assign sensor=site.data.sensors[page.sensor_index] %}
{% include sensor-connection.html %}
{% assign footnotes='' %}
{% if sensor.notes %}
    {% assign footnotes=footnotes | append: sensor.notes %}
{% endif %}

<!-- the empty comments before and after the footnotes are to prevent unwanted
     spaces from being added between the spans -->

### General Info

<table id="sensor-info">
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th><code>name</code></th>
        <td><code>{{ sensor.name }}</code></td>
    </tr>
    {%if sensor.vendor_website %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th>Website</th>
        {% assign split_website=sensor.vendor_website | split: '/' %}
        <td><span markdown="1">[{{ split_website[2] }}]({{ sensor.vendor_website }})</span></td>
    </tr>
    {% endif %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th>Connection</th>
        <td>{{ connection }}</td>
    </tr>
    {% if sensor.default_address %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
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
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th>sysfs class</th>
        <td>
            {%if sensor.device_class %}
                <span markdown="1">{{ sensor.device_class }}</span><!--
            {% else %}
                <span markdown="1">[msensor]</span><!--
            {% endif %}
            {%if sensor.device_class_footnote %}
                --><span markdown="1">{{ sensor.device_class_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% if sensor.vendor_id %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th><code>vendor_id</code></th>
        <td>{{ sensor.vendor_id }}</td>
    </tr>
    {% endif %}
    {% if sensor.product_id %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th><code>product_id</code></th>
        <td>{{ sensor.product_id }}</td>
    </tr>
    {% endif %}
    {%if sensor.device_class == null %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th># Modes</th>
        <td>{{ sensor.num_modes }}</td>
    </tr>
    {% endif %}
</table>

{%if sensor.device_class == null %}
### Modes

<table id="sensor-modes">
    <tr class="{% cycle 'modes': 'd0', 'd1' %}">
        <th><code>mode</code></th>
        <th>Description</th>
        <th><code>units</code></th>
        <th><code>dp</code><span markdown="1">[^dp]</span></th>
        <th><code>num_values</code></th>
        <th>Values</th>
    </tr>
    {% for mode in sensor.ms_mode_info %}
    {% if mode.notes %}
        {% assign footnotes=footnotes | append: mode.notes %}
    {% endif %}
    <tr class="{% cycle 'modes': 'd0', 'd1' %}">
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
            {% endif %}
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
                {% assign num_modes=1 %}
                {% if mode.data_sets %}
                    {% assign num_modes=mode.data_sets %}
                {% endif %}
                {{ num_modes }}
            </code>
        </td>
        <td>
            {% for i in (1..num_modes) %}
                {% if i > 1 %}
                    <br />
                {% endif %}
                {% assign value=forloop.index0 | prepend: 'value' %}
                {% assign value_footnote=value | append: '_footnote' %}
                <span style="white-space:nowrap;">
                    <code>{{ value }}</code>: {{ mode[value] }}<!--
                    {% if mode[value_footnote] %}
                        --><span markdown="1">{{ mode[value_footnote] }}</span><!--
                    {% endif %}
                    -->
                </span>
            {% endfor %}
        </td>
    </tr>
    {% endfor %}
</table>

Values in the tables that look like `this` are the names of sysfs attributes
or values returned by said attributes.

[^dp]: Decimal places. For example, if the range of a value is from 0 to 1000
    and `dp` is `1`, then the acutal range is 0.0 to 100.0 in the units specified.

[^not-read-only]: This mode is not availible when the sensor is connected to a
    read-only input port like the HiTechnic NXT Sensor MUX.
{% endif %}

{{ footnotes }}

[msensor]: ../msensor-class