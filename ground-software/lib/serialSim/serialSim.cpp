#include "serialSim.h"

SerialSim::SerialSim(GPS *gps, IMU *imu, int measurements_delay) : Task(TASK_MILLISECOND, TASK_FOREVER, &scheduler, false)
{
    this->measurements_delay = measurements_delay;
    this->previous_time = 0;
    this->gps = gps;
    this->imu = imu;

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
        
        Serial.print(this->gps->getLatitude());
        Serial.print("\n");
        Serial.print(this->gps->getLongitude());
        Serial.print("\n");
        Serial.println(radiopacket);
        // this->myFile.write(radiopacket);
        this->previous_time = current_time;
    }

     // receive message from Dashboard
    const byte DATA_MAX_SIZE = 32;
    char data[DATA_MAX_SIZE];       // an array to store the received data
    static char endMarker = '\n';   // message separator
    char receivedChar;              // read char from serial port
    int ndx = 0;                    // current index of data buffer  // clean data buffer
    memset(data, 32, sizeof(data)); // read while we have data available and we are
    // still receiving the same message.
    while (Serial.available() > 0)
    {
        receivedChar = Serial.read();
        if (receivedChar == endMarker)
        {
            data[ndx] = '\0'; // end current message
            continue;
        } // looks like a valid message char, so append it and
        // increment our index
        // Serial.println(receivedChar);
        data[ndx] = receivedChar;
        ndx++;
        if (ndx >= DATA_MAX_SIZE)
        {
            break;
        }
        Serial.println(data);
    }

    // if(strlen(text) == 0) {

    //     char radiopacket[RH_RF69_MAX_MESSAGE_LEN];
    //     snprintf(radiopacket, RH_RF69_MAX_MESSAGE_LEN, "%d\n ", 1);
    //     // Send a message!
    //     this->driver->send((uint8_t *)radiopacket, sizeof(radiopacket));
    //     this->driver->waitPacketSent();
    //     Serial.println("sending to flight computer");
    //     // this->previous_time = current_time;
    //     // return true;
        
    // }

    // memset(data, 32, sizeof(data));

    return true;

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