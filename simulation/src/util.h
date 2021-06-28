#ifndef UTIL_H
#define UTIL_H

#include "config.h"

bool check_sensors(
       IMU *imu,
    GPS *gps)
{
    Serial.println("************************************");
    Serial.println("Conducting status check on all ICs...");
    Serial.println("************************************");

    bool error = true;

    // Check status of BMX055 IMU
    if (imu->checkStatus())
    {
        Serial.println("IMU connection success! \xE2\x9C\x93");
    }
    else
    {
        Serial.println("IMU connection failed \xE2\x9C\x97");
        error = false;
    }

    if (gps->checkStatus())
    {
        Serial.println("GPS connection success! \xE2\x9C\x93");
    }
    else
    {
        Serial.println("GPS connection failed \xE2\x9C\x97");
        error = false;
    }

    return error;
}

#endif