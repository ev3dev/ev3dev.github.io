---
author: "@jabrena"
title: "Announcing ev3dev-lang-java v0.2.0"
---

If you like [Linux](https://www.linux.com/) features from ev3dev and you enjoy with [Java](http://www.java.com/), this library is the solution to develop Java software for robots on ev3dev. [ev3dev-lang-java](https://ev3dev-lang-java.github.io/ev3dev-lang-java/#/) is a Java library designed to interact with the hardware managed by ev3dev using the LeJOS way.

## What features are included in last release?

Current version includes these features:

* Regulated Motor Support
* Unregulated Motor Support
* Sensor Support
* Sounds
* LeJOS Sensor filter Support
* eSpeak TTS (Text to speech) Support

## How to extend the features of this library?

If you have experience with Robotics, you could explore other possibilities as Computer Vision. In this case, [OpenCV](http://opencv.org/) has a Java port and the way to install is very easy on ev3dev:

{% highlight bash %}
sudo apt-get install libopencv2.4-java
{% endhighlight %}

Using ev3dev with Java, you have the opportunity to build on your Brick directly so you only have to install your favorite Java build system and test your software or the sofware of your friend in the same way that you do on your laptop.

{% highlight bash %}
sudo apt-get install git
git clone https://github.com/ev3dev-lang-java/ev3dev-lang-java.git
sudo apt-get install gradle
sudo apt-get install maven
sudo apt-get install ant
cd ev3dev-lang-java/library
mvn package
{% endhighlight %}

One advantage of the usage of ev3dev with Java is the option to study some solution from another technology and later, try to port to Java. Ev3dev is polyglot, a common feature in nowdays.

## What is the support for Lego Mindstorms boards?

In this release, the library has implemented the support for the EV3 Brick and their sensors & actuators included in the following kits:

* [45544 LEGO MINDSTORMS Education EV3 Core Set](https://education.lego.com/en-us/products/lego-mindstorms-education-ev3-core-set-/5003400)
* [31313 LEGO MINDSTORMS EV3](http://www.lego.com/en-us/mindstorms/products/mindstorms-ev3-31313)

In the next releases, the library will add support for [Raspberry Pi](https://www.raspberrypi.org/) boards as [Mindsensors PiStorms](http://www.mindsensors.com/teaching-stem-with-robotics/13-pistorms-base-kit-raspberry-pi-brain-for-lego-robot) & [Dexter Industries BrickPi+](http://www.dexterindustries.com/brickpi/) in order to use the power of Raspberry Pi. 

Take a look the following table to observe the differences:

| **Model**       | **EV3 Brick**                        | **Raspberry Pi 1Model B**  | **Raspberry Pi 2Model B** |
|-----------------|--------------------------------------|----------------------------|---------------------------|
| Main Processor: | TI Sitara AM1808 (ARM926EJ-S core)   | Single-core ARM1176JZF-S   | Quad-coreARM Cortex-A7    |
| Frequency:      | 300 MHz                              | 700 MHz                    | 900 MHz                   |
| Main Memory:    | 64 MB RAM 16 MB Flashmicro SDHC Slot | 512 MB (shared with GPU)   | 1 GB (shared with GPU)    |
| USB Ports:      | 1                                    | 2                          | 4                         |
{: .table .table-striped .table-bordered}

This numbers explains the reason to develop this library for ev3dev.

## What kind of software is possible to use with this library?

At the moment, the library will help you to learn coding with Java and experiment with basic robotics concepts. Try to run this example on your EV3 Brick:

{% highlight java linenos%}
package ev3dev.examples.misc;

import ev3dev.hardware.Battery;
import ev3dev.hardware.port.MotorPort;
import ev3dev.hardware.port.SensorPort;
import ev3dev.hardware.motor.EV3LargeRegulatedMotor;
import ev3dev.hardware.sensor.ev3.EV3IRSensor;
import lejos.robotics.SampleProvider;
import lejos.utility.Delay;

//java -cp ev3-lang-java-0.2-SNAPSHOT.jar ev3dev.examples.misc.BumperCar
public class BumperCar {
	
    //Robot Definition
    private final static EV3LargeRegulatedMotor mA = new EV3LargeRegulatedMotor(MotorPort.A);
    private final static EV3LargeRegulatedMotor mB = new EV3LargeRegulatedMotor(MotorPort.B);
    private final static EV3IRSensor ir1 = new EV3IRSensor(SensorPort.S1);

    //Configuration
    private final static int motorSpeed = 500;
    
    public static void main(String[] args) {
    	
        final SampleProvider sp = ir1.getDistanceMode();
        int distance = 255;

        final int distance_threshold = 35;
        
        //Robot control loop
        final int iteration_threshold = 100;
        for(int i = 0; i <= iteration_threshold; i++) {
        	forward();

            float [] sample = new float[sp.sampleSize()];
            sp.fetchSample(sample, 0);
            distance = (int)sample[0];
            if(distance <= distance_threshold){
            	backwardWithTurn();
            }

        	System.out.println("Iteration: " + i);
            System.out.println("Battery: " + Battery.getInstance().getVoltage());
            System.out.println("Distance: " + distance);
            System.out.println();
        }

        mA.stop();
        mB.stop();
        System.exit(0);
    }
    
    private static void forward(){
        mA.setSpeed(motorSpeed);
        mB.setSpeed(motorSpeed);
        mA.forward();
        mB.forward();
    }
    
    private static void backwardWithTurn(){
        mA.backward();
        mB.backward();
        Delay.msDelay(1000);
        mA.stop();
        mB.stop();
        mA.backward();
        mB.forward();
        Delay.msDelay(1000);
        mA.stop();
        mB.stop();
    }
}
{% endhighlight %}

Explore [JavaDocs](https://ev3dev-lang-java.github.io/ev3dev-lang-java/docs/api/) from the project to learn how to use the library. In the future, I will add a tutorial to learn to use the library.

## Roadmap

The current roadmap for this project is:

[v0.3.0](https://github.com/ev3dev-lang-java/ev3dev-lang-java/milestones/0.3.0)

* Migrate project to Gradle
* Install Java 8 on Lego Mindstorms EV3
* Add support for Mindsensors PiStorms
* Add support for RPLidar, 2D Lidar 
* Add support for Mindsensors Absolute IMU

![RPLidar](https://pbs.twimg.com/media/Cb6yExKWwAANKJ4.jpg)
{: .img-responsive}

[v0.4.0](https://github.com/ev3dev-lang-java/ev3dev-lang-java/milestones/0.4.0)

* Add support for Dexter Industries BrickPi+
* Add support for Microinfinity XG1300L

## Support

If you have some doubt about this library, please create a issue:
[https://github.com/ev3dev-lang-java/ev3dev-lang-java/issues](https://github.com/ev3dev-lang-java/ev3dev-lang-java/issues)

## References

* [ev3dev-lang-java](https://ev3dev-lang-java.github.io/ev3dev-lang-java/#/)
* [Tiobe](http://www.tiobe.com/index.php/tiobe_index)
* [Githut](http://githut.info/)
* [IEEE Spectrum](http://spectrum.ieee.org/computing/software/the-2015-top-ten-programming-languages)
* [Redmonk](https://redmonk.com/sogrady/category/programming-languages/)


Juan Antonio

