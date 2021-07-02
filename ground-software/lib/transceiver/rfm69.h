#ifndef RFM69_H
#define RFM69_H

#define RFM69_RST PC1
#define RFM69_FREQ 915.0

#include <scheduler.h>
#include <RH_RF69.h>
#include <SPI.h>
#include <Arduino.h>
#include <gps.h>
#include "chip.h"

class Transceiver : public Task, public Chip
{
private:
    RH_RF69 *driver;
    uint8_t *buffer;
    GPS *gps;

public:
    Transceiver(int RFM69_CS, int RFM69_INT, GPS *gps);
    ~Transceiver();

    // Task virtual methods
    bool Callback();
    bool OnEnable();
    void OnDisable();

    // Chip virtual methods
    bool checkStatus();
};

#endif