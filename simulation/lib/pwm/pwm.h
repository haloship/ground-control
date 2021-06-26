#ifndef PCA9635_H
#define PCA9635_H

#include <scheduler.h>
#include <Arduino.h>
#include "PCA9635.h"
#include "chip.h"

class PWMControl : public Task, public Chip
{
private:
    PCA9635 *driver;
    uint8_t channel;

public:
    PWMControl();
    ~PWMControl();

    void switchOn(uint8_t channel);
    void switchOff();

    // Task virtual methods
    bool Callback();
    bool OnEnable();
    void OnDisable();

    // Chip virtual methods
    bool checkStatus();
};

#endif