#include "blink.h"

Blink::Blink(PWMControl *pwm_control) : Task(1000, TASK_ONCE, &scheduler, false),
                                        pwm_control(pwm_control), iterations(0)

{
}

Blink::~Blink() {}

void Blink::blink(uint8_t channel, uint16_t frequency, uint16_t iterations)
{
    // Set variables
    this->channel = channel;
    this->frequency = frequency;
    this->iterations = iterations;

    this->setInterval(frequency);
    this->setIterations(iterations * 2);
    this->enableDelayed();
    return;
}

bool Blink::Callback()
{
    if (this->getIterations() % 2 != 0)
    {
        this->pwm_control->switchOff();
    }
    else
    {
        this->pwm_control->switchOn(this->channel);
    }
    return true;
}

bool Blink::OnEnable()
{
    this->pwm_control->switchOn(this->channel);
    return true;
}
void Blink::OnDisable()
{
    this->pwm_control->switchOff();
    return;
}