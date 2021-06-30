#ifndef SERIALSIM_H
#define SERIALSIM_H

#define RFM69_RST PC1
#define RFM69_FREQ 915.0

#include <scheduler.h>
#include <RH_RF69.h>
#include <SPI.h>
#include <Arduino.h>
#include <gps.h>
#include <imu.h>
#include "chip.h"

class SerialSim : public Task
{
private:
    uint8_t *buffer;
    GPS *gps;
    IMU *imu;
    long measurements_delay;
    long previous_time = 0;

public:
    SerialSim(GPS *gps, IMU *imu, int measurements_delay);
    ~SerialSim();

    bool measurementsReady();

    // Task virtual methods
    bool Callback();
    bool OnEnable();
    void OnDisable();

    // Chip virtual methods
    bool checkStatus();
};

#endif