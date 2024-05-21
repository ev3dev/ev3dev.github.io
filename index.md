---
no-wrapper: 1
no-footer: 1
no-display-title: 1
title: ev3dev Home

extra-head-content: |
  <script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Organization",
    "url": "http://www.ev3dev.org",
    "logo": "http://www.ev3dev.org/images/logo_standard.png"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "ev3dev",
    "url": "http://www.ev3dev.org/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "http://www.ev3dev.org/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>

jumbotron-heading: |
  ev3dev is your EV3 <strong><i>re-imagined</i></strong>
jumbotron-content: |
  <div id="main-lead-content" class="col-lg-8">
      <p class="lead">
          ev3dev is a <a href="https://www.debian.org/">Debian Linux</a>-based
          operating system that runs on several LEGO<sup>&reg;</sup> MINDSTORMS compatible
          platforms including the <a href="https://www.lego.com/en-us/product/lego-mindstorms-ev3-31313">LEGO<sup>&reg;</sup> MINDSTORMS EV3</a>
          and <a href="https://www.raspberrypi.org/">Raspberry Pi</a>-powered
          <a href="https://www.dexterindustries.com/BrickPi/">BrickPi</a>.
      </p>
      <p>
          Just like you can take apart your LEGO<sup>&reg;</sup> models and build something
          completely different, we have reverse-engineered the EV3 and created
          a new software platform for programming your robots.
      </p>
  </div>
  <div class="col-lg-4">
      <img class="img-responsive" id="splash-thumbnail" src="images/logo_ev3dev_mono.png" alt="ev3dev boot logo" />
  </div>
excerpt: "ev3dev is a Debian Linux-based operating system that runs on several LEGO MINDSTORMS compatible platforms including the LEGO MINDSTORMS EV3 and Raspberry Pi-powered BrickPi."
---
<div class="container">

<div class="row">
<div class="col-lg-4" markdown="1">

## <span class="glyphicon glyphicon-console heading-icon"></span> EV3 programming unlocked

ev3dev gives you the power to program how <i>you</i> want to. We have created
a low-level driver framework for controlling sensors, motors and pretty much
everything else. It's as easy as reading from and writing to a file.

ev3dev supports many popular scripting languages out-of-the-box, so you can
get started right away with your favorite language and libraries.

</div>
<div class="col-lg-4" markdown="1">

## <i class="fa fa-linux"></i> Backed by the full power of Linux

Since ev3dev is built on Debian Linux, there are over 51,000 free 
software packages available for you to install.

And with the Linux kernel at its core, many USB and Bluetooth devices, like
Wi-Fi dongles, keyboards, keypads, joysticks and cameras work too.

</div>
<div class="col-lg-4" markdown="1">

## <span class="glyphicon glyphicon-save heading-icon"></span> It's not firmware

It's more like dual-boot. ev3dev runs from a microSD card and doesn't ever
touch the firmware installed on the EV3. To switch back, you just shut down
and remove the microSD card - no flashing required.

</div>
</div>

</div>

<div class="projects-featurette">
    <div class="container featurette projects-featurette-content">
        <div class="col-md-5 text-center">
            <a class="btn btn-lg btn-primary xl-button-text" href="projects">Projects <span class="glyphicon glyphicon-arrow-right"></span></a>
        </div>

        <div class="col-md-7">
            <h2 class="featurette-heading">
                See what ev3dev can do
            </h2>
        </div>
    </div>
</div>

<div class="container">
    <div class="row featurette">
        <div class="col-md-7">
            <h2 class="featurette-heading">
                Ready to jump in?
                <span class="text-muted">Grab your bot and let's go!</span>
            </h2>
        </div>

        <div class="col-md-5 text-center">
            <a class="btn btn-lg btn-primary xl-button-text" href="docs/getting-started">Get started <span class="glyphicon glyphicon-arrow-right"></span></a>
        </div>
    </div>
</div>
