#include "config.h"
#include "util.h"
#include "SparkFun_u-blox_GNSS_Arduino_Library.h"

// Instantiate objects
// Buzzer *buzzer;
// Blink *blinker;
// Transceiver *transceiver;

SerialSim *serialSim;
IMU *imu;                 // Orientation
GPS *gps; // GPS

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

// bool check_sensors_feather(
//     // Barometer *barometer,
//     Transceiver *transceiver)
// {
//     Serial.println("************************************");
//     Serial.println("Conducting status check on all ICs...");
//     Serial.println("************************************");

//     bool error = true;
//     // Check status of RFM69HW Transceiver
//     if (transceiver->checkStatus())
//     {
//         Serial.println("Transceiver connection success! \xE2\x9C\x93");
//     }
//     else
//     {
//         Serial.println("Transceiver connection failed \xE2\x9C\x97");
//         error = false;
//     }

//     return error;
// }

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
    
    imu = new IMU(1000);
    gps = new GPS(1000);
    serialSim = new SerialSim(gps, imu, 1000);

    // blinker = new Blink(pwm);

    // Run sensor check
    check_sensors(
        imu,
        gps)
        ? Serial.println("sensors success")
        : Serial.println("sensors failed");
    // check_sensors_feather(transceiver)
    //     ? Serial.println("sensors success")
    //     : Serial.println("sensors failed");

    // Enable chips
    // barometer->enable();
    gps->enable();
    imu->enable();
    serialSim->enable();
}

void loop()
{
    scheduler.execute();
}

// #include <Wire.h>
 
 
// void setup()
// {
//   Wire.begin();
 
//   Serial.begin(9600);
//   while (!Serial);             // Leonardo: wait for serial monitor
//   Serial.println("\nI2C Scanner");
// }
 
 
// void loop()
// {
//   byte error, address;
//   int nDevices;
 
//   Serial.println("Scanning...");
 
//   nDevices = 0;
//   for(address = 1; address < 127; address++ )
//   {
//     // The i2c_scanner uses the return value of
//     // the Write.endTransmisstion to see if
//     // a device did acknowledge to the address.
//     Wire.beginTransmission(address);
//     error = Wire.endTransmission();
 
//     if (error == 0)
//     {
//       Serial.print("I2C device found at address 0x");
//       if (address<16)
//         Serial.print("0");
//       Serial.print(address,HEX);
//       Serial.println("  !");
 
//       nDevices++;
//     }
//     else if (error==4)
//     {
//       Serial.print("Unknown error at address 0x");
//       if (address<16)
//         Serial.print("0");
//       Serial.println(address,HEX);
//     }    
//   }
//   if (nDevices == 0)
//     Serial.println("No I2C devices found\n");
//   else
//     Serial.println("done\n");
 
//   delay(5000);           // wait 5 seconds for next scan
// }