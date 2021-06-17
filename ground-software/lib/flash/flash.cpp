#include "flash.h"

Flash::Flash(uint8_t FLASH_CS)
{
    this->driver = new SPIFlash(FLASH_CS, 0xEF40);
}

Flash::~Flash() {}

bool Flash::checkStatus()
{
    return this->driver->initialize();
}