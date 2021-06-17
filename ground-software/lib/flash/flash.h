#ifndef W25Q_FLASH_H
#define W25Q_FLASH_H

#include <Arduino.h>
#include <SPIFlash.h>
#include "chip.h"
#include "scheduler.h"

class Flash : public Chip
{
private:
    SPIFlash *driver;

public:
    Flash(uint8_t FLASH_CS);
    ~Flash();

    bool checkStatus();
};

#endif