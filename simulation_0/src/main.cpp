// #include "config.h"
// #include "util.h"
#include <TaskScheduler.h>
// #include <scheduler.h>

#include <serialSim.h>

// Instantiate objects
// Buzzer *buzzer;
// Blink *blinker;
serialSim *serialSimu;

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
    Serial.begin(115200);
    // main_chute_servo.attach(MAIN_CHUTE_SERVO_PIN);
    // drogue_chute_servo.attach(DROGUE_CHUTE_SERVO_PIN);

    // Wait until serial console is open, remove if not tethered to computer
    while (!Serial)
    {
        delay(1);
    }

    // buzzer = new Buzzer();
    serialSimu = new serialSim(1000);

    // blinker = new Blink(pwm);

    // Run sensor check
    // check_sensors(pwm, barometer, transceiver, imu, flash)
    //     ? buzzer->signalSuccess()
    //     : buzzer->signalFail();
    // check_sensors_feather(transceiver)
    //     ? Serial.println("sensors success")
    //     : Serial.println("sensors failed");

    // Enable chips
    serialSimu->enable();
}


void loop()
{
    scheduler.execute();
}