#include <scheduler.h>
#include <Arduino.h>
#include <SPI.h>
#include <chip.h>
#include <bmx055.h>

#define BMX_SCK PB13
#define BMX_MISO PB14
#define BMX_MOSI PB15

#define ACC_CS PC7
#define GYR_CS PC4

class IMU : public Task, public Chip
{

private:
    BMX055 *driver;
    long measurement_delay;
    long previous_time = 0;
    float acc_x, acc_y, acc_z;

public:
    IMU(long measurement_delay);
    ~IMU();

    bool measurementReady();

    // Task virtual methods
    bool Callback();
    bool OnEnable();
    void OnDisable();

    // Chip virtual methods
    bool checkStatus();
};
