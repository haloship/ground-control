#ifndef RFM69_H
#define RFM69_H

#define RFM69_RST PC1
#define RFM69_FREQ 915.0

#include <scheduler.h>
#include <RH_RF69.h>
#include <SPI.h>
#include <Arduino.h>
#include "chip.h"

class SerialSim : public Task
{
private:
    uint8_t *buffer;
    long measurements_delay;
    long previous_time = 0;

public:
    SerialSim(int measurements_delay);
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