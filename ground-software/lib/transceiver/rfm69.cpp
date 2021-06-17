#include "rfm69.h"

Transceiver::Transceiver(int RFM69_CS, int RFM69_INT) : Task(TASK_MILLISECOND, TASK_FOREVER, &scheduler, false)
{
    this->driver = new RH_RF69(RFM69_CS, RFM69_INT);
}

Transceiver::~Transceiver() {}

bool Transceiver::Callback()
{

    if (this->driver->available())
    {
        // Should be a message for us now
        uint8_t buf[RH_RF69_MAX_MESSAGE_LEN];
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

    return false;
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