#ifndef BLINK_H
#define BLINK_H

#include <scheduler.h>
#include <pwm.h>
#include <Arduino.h>

class Blink : public Task
{
private:
    PWMControl *pwm_control;
    uint8_t channel;
    uint16_t frequency;
    uint16_t iterations;

public:
    Blink(PWMControl *pwm_control);
    ~Blink();

    void blink(uint8_t channel, uint16_t frequency, uint16_t iterations);

    bool Callback();
    bool OnEnable();
    void OnDisable();
};

#endif