#include "rfm69.h"

Transceiver::Transceiver(int RFM69_CS, int RFM69_INT) : Task(TASK_MILLISECOND, TASK_FOREVER, &scheduler, false)
{
    this->driver = new RH_RF69(RFM69_CS, RFM69_INT);
}

Transceiver::~Transceiver() {}

bool Transceiver::Callback()
{

    // receive message from flight computer
    if (this->driver->available())
    {
        // Should be a message for us now
        // uint8_t buf[RH_RF69_MAX_MESSAGE_LEN];
        uint8_t buf[120];

        uint8_t len = sizeof(buf);
        this->buffer = buf;

        if (this->driver->recv(this->buffer, &len))
        {
            if (!len)
                return false;
            Serial.println((char *)this->buffer);
            buf[len] = 0;
        }

        return true;
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

    if(strlen(data) == 0) {

        char radiopacket[RH_RF69_MAX_MESSAGE_LEN];
        snprintf(radiopacket, RH_RF69_MAX_MESSAGE_LEN, "%d\n ", 1);
        // Send a message!
        this->driver->send((uint8_t *)radiopacket, sizeof(radiopacket));
        this->driver->waitPacketSent();
        Serial.println("sending to flight computer");
        // this->previous_time = current_time;
        // return true;
        
    }

    memset(data, 32, sizeof(data));

    return true;
}

bool Transceiver::OnEnable()
{

    if (!(this->driver->setFrequency(RFM69_FREQ)))
    {
        return false;
    }

    // range from 14-20 for power, 2nd arg must be true for 69HCW
    this->driver->setTxPower(20, true);

    // The encryption key has to be the same as the one in the server
    uint8_t key[] = {0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                     0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08};

    this->driver->setEncryptionKey(key);

    return true;
}

void Transceiver::OnDisable()
{
    delete this->buffer;
    delete this->driver;
}

bool Transceiver::checkStatus()
{

    return this->driver->init();
}