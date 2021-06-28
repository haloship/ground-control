#include "serialSim.h"

SerialSim::SerialSim(int measurements_delay) : Task(TASK_MILLISECOND, TASK_FOREVER, &scheduler, false)
{
    this->measurements_delay = measurements_delay;
    this->previous_time = 0;
}

SerialSim::~SerialSim() {}

bool SerialSim::measurementsReady()
{

    long current_time = millis();
    if (current_time - this->previous_time >= this->measurements_delay)
    {
        this->previous_time = current_time;
        return true;
    }
    return false;
}

bool SerialSim::Callback()
{
    long current_time = millis();
    if (measurementsReady())
    {
        char radiopacket[60];
        snprintf(radiopacket, 60, "%f\n%f\n%d\n%d\n%d\n ",
                 1016.409424,
                 26.479166,
                 24963,
                 339166590,
                 -1183337104);
        // Send a message!
        Serial.println(radiopacket);
        // this->myFile.write(radiopacket);
        this->previous_time = current_time;
    }
    return true;

    // if (this->driver->available())
    // {
    //     // Should be a message for us now
    //     uint8_t buf[RH_RF69_MAX_MESSAGE_LEN];
    //     uint8_t len = sizeof(buf);
    //     this->buffer = buf;

    //     if (this->driver->recv(this->buffer, &len))
    //     {
    //         if (!len)
    //             return false;
    //         Serial.println((char *)this->buffer);
    //         buf[len] = 0;
    //     }

    //     return true;
    // }

    // return false;
}

bool SerialSim::OnEnable()
{
    return true;
}

void SerialSim::OnDisable()
{
}

bool SerialSim::checkStatus()
{
    return true;
}