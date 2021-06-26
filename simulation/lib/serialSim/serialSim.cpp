#include "serialSim.h"

serialSim::serialSim(long measurement_delay) : Task(TASK_MILLISECOND, TASK_FOREVER, &scheduler, false)
{
    this->measurements_delay = measurements_delay;
    this->previous_time = 0;
}

serialSim::~serialSim() {}

bool serialSim::measurementsReady()
{

    long current_time = millis();
    if (current_time - this->previous_time >= this->measurements_delay)
    {
        this->previous_time = current_time;
        return true;
    }
    return false;
}

bool serialSim::Callback()
{

    long current_time = millis();
    if (measurementsReady())
    {
        char radiopacket[60];
        snprintf(radiopacket, 60, "%f\n%f\n%d\n%d\n%d\n ",
                 1000,
                 121243,
                 2234,
                 23,
                 878);
        // Send a message!
        Serial.println(radiopacket);
        // this->myFile.write(radiopacket);
        this->previous_time = current_time;
    }
    return true;
}

bool serialSim::OnEnable()
{
    // this->myFile = SD.open("test.txt", FILE_WRITE);
    return true;
}

void serialSim::OnDisable()
{
}

bool serialSim::checkStatus()
{

    return true;
}