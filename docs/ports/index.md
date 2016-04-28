---
title: Input and Output Ports
excerpt: "Documentation reference for the input (sensor) and output (motor) port device drivers."
---

This page is about the kind of ports that you plug [sensors] and [motors] into.
Ports that have more than one connection type will have drivers that let you
control the port itself. The input and output ports on the EV3 itself and some
sensor multiplexers fall into this category (see list below). Simple
multiplexers that only support one connection type will not have a separate
driver for the port.

Port drivers use the [lego-port class] to provide a common interface for
interacting with individual ports. Follow the link for more information.

## List of port drivers

This is a list of port drivers that are currently available in the ev3dev
kernel.

<table class="table table-striped table-bordered">
    <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Connection Types</th>
    <th>Module</th>
    </tr>
{% for port_data in site.data.ports %}
    {% assign port = port_data %}
    <tr>
        <td>
            <span style="white-space:nowrap">
                <a href="{{ port.url_name }}">{{ port.name }}</a>
            </span>
        </td>
        <td>{{ port.description }}</td>
        <td>{{ port.connection_types }}</td>
        <td>
            <span style="white-space:nowrap">{{ port.module }}</span>
        </td>
    </tr>
{% endfor %}
</table>

[sensors]: ../sensors
[motors]: ../motors
[lego-port class]: /docs/drivers/lego-port-class
