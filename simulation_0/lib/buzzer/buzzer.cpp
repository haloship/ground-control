#include "buzzer.h"

Buzzer::Buzzer() : Task(TASK_IMMEDIATE, TASK_ONCE, &scheduler, false), pin(BUZZER)
{
    pinMode(pin, OUTPUT);
}

Buzzer::~Buzzer() {}

void Buzzer::signal(uint16_t frequency, uint16_t duration)
{
    this->frequency = frequency;
    this->which_tone = SINGLE_TONE;
    this->setInterval(duration);
    this->restartDelayed();
}

void Buzzer::signalSuccess()
{
}

void Buzzer::signalFail() {}

void Buzzer::signalMario()
{
    this->which_tone = MARIO_TONE;

    this->frequency = mario_notes[0];
    this->setInterval(mario_durations[0] * 3);
    this->tone_counter = 1;

    this->restartDelayed();
}

void Buzzer::signalTakeOnMe()
{
    this->which_tone = TAKE_ON_ME_TONE;

    this->frequency = take_on_me_notes[0];
    this->setInterval(320);
    this->tone_counter = 1;

    this->restartDelayed();
}

bool Buzzer::Callback()
{
    if (this->which_tone == MARIO_TONE && this->tone_counter < sizeof(mario_notes) / 4)
    {
        this->frequency = mario_notes[tone_counter];
        this->setInterval(mario_durations[tone_counter] * 3);
        this->tone_counter++;
        this->restartDelayed();
    }

    else if (this->which_tone == TAKE_ON_ME_TONE && this->tone_counter < sizeof(take_on_me_notes) / 4)
    {
        this->frequency = take_on_me_notes[tone_counter];
        this->setInterval(320);
        this->tone_counter++;
        this->restartDelayed();
    }

    return true;
}

bool Buzzer::OnEnable()
{
    tone(this->pin, this->frequency);
    return true;
}

void Buzzer::OnDisable()
{
    noTone(this->pin);
    return;
}
