
#include <Arduino.h>
#include <notes.h>

static uint16_t mario_notes[] = {
    NOTE_E7, NOTE_E7, 0, NOTE_E7, 0, NOTE_C7, NOTE_E7, 0, NOTE_G7, 0,
    NOTE_G6, 0, NOTE_C7, 0, NOTE_G6, 0, NOTE_E6, 0, NOTE_A6, 0, NOTE_B6,
    0, NOTE_AS6, NOTE_A6, 0, NOTE_G6, NOTE_E7, NOTE_G7, NOTE_A7, 0, NOTE_F7,
    NOTE_G7, 0, NOTE_E7, 0, NOTE_C7, NOTE_D7, NOTE_B6, 0, NOTE_C7, 0,
    NOTE_G6, 0, NOTE_E6, 0, NOTE_A6, 0, NOTE_B6, 0, NOTE_AS6, NOTE_A6, 0,
    NOTE_G6, NOTE_E7, NOTE_G7, NOTE_A7, 0, NOTE_F7, NOTE_G7, 0,
    NOTE_E7, 0, NOTE_C7, NOTE_D7, NOTE_B6, 0};

static uint16_t mario_durations[] = {
    80, 80, 80, 80, 80, 80, 80, 80, 80, 240, 80, 240, 80, 160,
    80, 160, 80, 160, 80, 80, 80, 80, 80, 80, 80, 100, 100, 100,
    80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 160, 80, 160, 80, 160,
    80, 160, 80, 80, 80, 80, 80, 80, 80, 100, 100, 100, 80, 80,
    80, 80, 80, 80, 80, 80, 80, 80, 160};
