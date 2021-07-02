#include "config.h"
#include "util.h"

#if defined(HALOSHIP_SIM)
bool sim = true;
#else
bool sim = false;
#endif
// Instantiate objects
// Buzzer *buzzer;
// Blink *blinker;
IMU *imu; // Orientation
GPS *gps;
SerialSim *serialsim;
Transceiver *transceiver;

// SERVO USES STM32F4 TIMER 1 THAT OPERATES AT TWICE THE EXPECTED FREQUENCY
// HENCE WRITE ALL MICROSECONDS IN DOUBLE
// 2000 MICROSECONDS --> 1 MILLISECOND
// 4000 MICROSECONDS --> 2 MILLISECOND

enum state
{
    PRELAUNCH,
    LAUNCH_READY,
    MOTOR_BURN,
    BURNOUT,
    APOGEE,
    POST_DROGUE,
    POST_MAIN,
    END
};

void setup()
{
    // Initialize communication
    Wire.begin();
    Serial.begin(115200);

    // Wait until serial console is open, remove if not tethered to computer
    while (!Serial)
    {
        delay(1);
    }

    imu = new IMU(1000);
    gps = new GPS(1000);
    serialsim = new SerialSim(gps, imu, 1000);
    transceiver = new Transceiver(RFM69_CS, RFM69_INT,gps);

    // // Run sensor check
    check_sensors(imu, gps, transceiver)
        ? Serial.println("sensors success")
        : Serial.println("sensors failed");

    // blinker = new Blink(pwm);

    // Enable chips
    if (sim)
    {
        check_sensors(imu, gps, serialsim)
            ? Serial.println("sensors success")
            : Serial.println("sensors failed");
        serialsim->enable();
    }
    else
    {
        check_sensors(imu, gps, transceiver)
            ? Serial.println("sensors success")
            : Serial.println("sensors failed");
        transceiver->enable();
    }
    gps->enable();
    imu->enable();
    // serialSim->enable();
}

void loop()
{
    scheduler.execute();
}