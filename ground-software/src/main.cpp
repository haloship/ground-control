#include "config.h"
// #include "util.h"

// Instantiate objects
// Buzzer *buzzer;
// Blink *blinker;
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

bool check_sensors_feather(
    // Barometer *barometer,
    Transceiver *transceiver)
{
    Serial.println("************************************");
    Serial.println("Conducting status check on all ICs...");
    Serial.println("************************************");

    bool error = true;
    // Check status of RFM69HW Transceiver
    if (transceiver->checkStatus())
    {
        Serial.println("Transceiver connection success! \xE2\x9C\x93");
    }
    else
    {
        Serial.println("Transceiver connection failed \xE2\x9C\x97");
        error = false;
    }

    return error;
}

void setup()
{
    // Initialize communication
    Wire.begin();
    Serial.begin(115200);
    // main_chute_servo.attach(MAIN_CHUTE_SERVO_PIN);
    // drogue_chute_servo.attach(DROGUE_CHUTE_SERVO_PIN);

    // Wait until serial console is open, remove if not tethered to computer
    while (!Serial)
    {
        delay(1);
    }

    // buzzer = new Buzzer();
    transceiver = new Transceiver(RFM69_CS, RFM69_INT);

    // blinker = new Blink(pwm);

    // Run sensor check
    // check_sensors(pwm, barometer, transceiver, imu, flash)
    //     ? buzzer->signalSuccess()
    //     : buzzer->signalFail();
    check_sensors_feather(transceiver)
        ? Serial.println("sensors success")
        : Serial.println("sensors failed");

    // Enable chips
    transceiver->enable();
}

void loop()
{
    scheduler.execute();
}