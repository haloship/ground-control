#ifndef UBLOX_H
#define UBLOX_H

#include <scheduler.h>
#include <SparkFun_u-blox_GNSS_Arduino_Library.h>
#include <Arduino.h>
#include <SPI.h>
#include "chip.h"

class GPS : public Task, public Chip
{
private:
    SFE_UBLOX_GNSS *gps_driver;
    long measurement_delay;
    long previous_time = 0;
    long altitudeMSL;
    long latitude;
    long longitude;

public:
    GPS(long measurement_delay);
    ~GPS();

    bool measurementReady();
    long getAltitude();
    long getLatitude();
    long getLongitude();

    // Task virtual methods
    bool Callback();
    bool OnEnable();
    void OnDisable();

    // Chip virtual methods
    bool checkStatus();
};

#endif