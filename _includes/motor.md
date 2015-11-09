{% assign motor=site.data.motors[page.motor_index] %}
{% assign footnotes='' %}
{% if motor.notes %}
    {% assign footnotes=footnotes | append: motor.notes %}
{% endif %}

<!-- the empty comments before and after the footnotes are to prevent unwanted
     spaces from being added between the spans -->

### General Info

<table id="sensor-info">
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th><code>device_name</code></th>
        <td><code>{{ motor.name }}</code></td>
    </tr>
    {%if motor.vendor_website %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th>Website</th>
        {% assign split_website=motor.vendor_website | split: '/' %}
        <td><span markdown="1">[{{ split_website[2] }}]({{ motor.vendor_website }})</span></td>
    </tr>
    {% endif %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th>Connection</th>
        <td>{{ connection }}</td>
    </tr>
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th>sysfs class</th>
        <td>
            {%if motor.device_class %}
                <span markdown="1">{{ motor.device_class }}</span><!--
            {% else %}
                <span markdown="1">[lego-motor]</span><!--
            {% endif %}
            {%if motor.device_class_footnote %}
                --><span markdown="1">{{ motor.device_class_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% if motor.vendor_id %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th><code>vendor_id</code></th>
        <td>
            {{ motor.vendor_id }}<!--
            {% if motor.vendor_id_footnote %}
                --><span markdown="1">{{ motor.vendor_id_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% endif %}
    {% if motor.product_id %}
    <tr class="{% cycle 'info': 'd0', 'd1' %}">
        <th><code>product_id</code></th>
        <td>
            {{ motor.product_id }}<!--
            {% if motor.product_id_footnote %}
                --><span markdown="1">{{ motor.product_id_footnote }}</span><!--
            {% endif %}
            -->
        </td>
    </tr>
    {% endif %}
</table>

{% if footnotes != '' %}
### Notes

{{ footnotes }}

{% endif %}
