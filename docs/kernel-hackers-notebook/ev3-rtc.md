---
title: EV3 RTC
subtitle: Real Time Clock
---

The [AM1808 SoC](../ev3-processor) has 1 Real-Time Clock (RTC).

Sadly, there is not a separate battery connected to the RTC, so every time you disconnect the battery from the EV3, the clock is reset. This can lead to issues if you are using NFS because of time/date stamp discrepancies.

## Usage

The RTC is used in the Linux kernel for time/date stamps.
