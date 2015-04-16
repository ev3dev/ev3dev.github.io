---
title: EV3 FIQ
subtitle: Fast Interrupt
---

ARM processors have a feature called Fast Interrupts (FIQs). These work mostly like regular interrupts, except that they can actually interrupt regular hardware interrupts (IRQs). The linux kernel is not designed to handle this, so we have to be very careful when using them.

## Required Reading

[This article](http://warmcat.com/embedded%20linux/2007/09/17/at91rm9200-fiq-faq-and-simple-example-code-patch.html) is by the author of the patch that our implementation (and in lms2012) is based on. The link to the patch in the article is broken, but it can be found [here](http://svn.openmoko.org/branches/src/target/kernel/2.6.24.x/patches/introduce-fiq-basis.patch). A patch that is more like what was included in lms2012 is found [here](https://dev.openwrt.org/browser/trunk/target/linux/s3c24xx/patches-2.6.31/005-fiq_c_handler.patch?rev=17665).

[This article](http://free-electrons.com/blog/fiq-handlers-in-the-arm-linux-kernel/) does a good job explaining _why_ we need to use FIQs and has some nice pictures so you can see the difference of using a FIQ vs. a regular IRQ.

## Debugging

You read the required reading, right? So you understand that the Linux kernel has no idea that FIQ routines are running, right? And that if you tried to do something like call `printk` in a FIQ service routine your EV3 might explode? (OK, the explosion is an exaggeration, but you get the point.)

To debug the code in the FIQ service routines, we need to change them to regular interrupts. On the AM1808 processor, interrupt channels 0 an 1 are reserved for the FIQs. The rest of the channels are for regular interrupts.

The first step is to change the channels the interrupts are assigned to. This is done in [arch/arm/mach-davinci/da850.c](https://github.com/ev3dev/ev3dev-kernel/blob/master/arch/arm/mach-davinci/da850.c). Search for `FIQ` to find the relevant interrupts and change the priority to 2 or higher.

Now, when you recompile the kernel, they will operate as regular interrupts. There is code in place so that the `fiq_c_handler` routine is called back from the appropriate interrupts.

Of course, performance will be terrible (which is why we are using FIQs in the first place), but now you can `printk` and whatever else you need to do to troubleshoot the problem.

When you are done, make sure your remove __all__ `printk`s and other kernel API code from the FIQ service routines and then set the interrupt priorities/channels back to what they were and recompile the kernel.