#include <imu.h>

IMU::IMU(long measurement_delay) : Task(TASK_MILLISECOND, TASK_FOREVER, &scheduler, false),
                                   measurement_delay(measurement_delay)
{
    this->driver = new BMX055();
};

IMU::~IMU(){};

bool IMU::measurementReady()
{
    long current_time = millis();
    if (current_time - this->previous_time >= this->measurement_delay)
    {
        this->previous_time = current_time;
        return true;
    }
    return false;
}

bool IMU::Callback()
{
    if (measurementReady())
    {
        this->driver->update();
        this->driver->getAccelerometer(&this->acc_x, &this->acc_y, &this->acc_z);
        return true;
    }
    return false;
}

bool IMU::OnEnable()
{
    this->driver->init();
    return true;
}

void IMU::OnDisable()
{
}

bool IMU::checkStatus()
{
    uint8_t result = this->driver->getChipID();
    uint8_t expected = 0xFA;
    return (result == expected);
}
