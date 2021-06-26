// #include <TaskScheduler.h>
#include <scheduler.h>
#include <Arduino.h>
// #include <SD.h>

class serialSim : public Task
{
private:
    uint8_t *buffer;
    // File myFile;
    long measurements_delay;
    long previous_time = 0;

public:
    serialSim(long measurements_delay);
    ~serialSim();

    bool measurementsReady();

    // Task virtual methods
    bool Callback();
    bool OnEnable();
    void OnDisable();

    // Chip virtual methods
    bool checkStatus();
};
