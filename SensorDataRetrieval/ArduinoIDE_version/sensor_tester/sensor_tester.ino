#include <Arduino.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include<Wire.h>
#include <MadgwickAHRS.h>
#include <math.h>
Madgwick MadgwickFilter;

#include "BMX055.h"
#include "Adafruit_BMP3XX.h"
#include "SparkFun_Ublox_Arduino_Library.h"

#define BMP_SCK 13
#define BMP_MISO 12
#define BMP_MOSI 11
#define BMP_CS 9

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BMP3XX bmp;
SFE_UBLOX_GPS myGPS;
long lastTime = 0; //Simple local timer. Limits amount if I2C traffic to Ublox module.

void setup()
{

  // Wire(Arduino-I2C)
  Wire.begin();
  Serial.begin(9600);
  while (!Serial) ;

  //BMX055
  BMX055_Init();
  delay(300);
  MadgwickFilter.begin(10); //周波数

  // if (!bmp.begin_I2C()) {   // hardware I2C mode, can pass in address & alt Wire
  //if (! bmp.begin_SPI(BMP_CS)) {  // hardware SPI mode
  if (! bmp.begin_SPI(BMP_CS, BMP_SCK, BMP_MISO, BMP_MOSI)) {  // software SPI mode
    Serial.println("Could not find a valid BMP3 sensor, check wiring!");
    while (1);
  }
  // Set up oversampling and filter initialization
  bmp.setTemperatureOversampling(BMP3_OVERSAMPLING_8X);
  bmp.setPressureOversampling(BMP3_OVERSAMPLING_4X);
  bmp.setIIRFilterCoeff(BMP3_IIR_FILTER_COEFF_3);
  bmp.setOutputDataRate(BMP3_ODR_50_HZ);


  if (myGPS.begin() == false) //Connect to the Ublox module using Wire port
  {
    Serial.println(F("Ublox GPS not detected at default I2C address. Please check wiring. Freezing."));
    while (1);
  }

  myGPS.setI2COutput(COM_TYPE_UBX); //Set the I2C port to output UBX only (turn off NMEA noise)
  myGPS.saveConfiguration(); //Save the current settings to flash and BBR
}


void loop()
{
  /*

  //UBlox Execution
  Serial.println("UBlox Execution -------------------");
  if (millis() - lastTime > 1000)
  {
    lastTime = millis(); //Update the timer

    long latitude = myGPS.getLatitude();
    Serial.print(F("Lat: "));
    Serial.println(latitude);

    long longitude = myGPS.getLongitude();
    Serial.print(F("Long: "));
    Serial.print(longitude);
    Serial.println(F(" (degrees * 10^-7)"));

    long altitude = myGPS.getAltitude();
    Serial.print(F("Alt: "));
    Serial.print(altitude);
    Serial.println(F(" (mm)"));

    byte SIV = myGPS.getSIV();
    Serial.print(F("7SIV: "));
    Serial.println(SIV);

    Serial.println();
  }

  */

  //BMP388 Execution
//  Serial.println("BMP388 Execution -------------------");/
  if (! bmp.performReading()) {
//    /Serial.println("Failed to perform reading :(");
    return;
  }
//  /Serial.print("Temperature = ");
  Serial.println(bmp.temperature);
  delay(3000);
//  Ser/ial.println(" *C");
/*
  Serial.print("Pressure = ");
  Serial.print(bmp.pressure / 100.0);
  Serial.println(" hPa");

  Serial.print("Approx. Altitude = ");
  Serial.print(bmp.readAltitude(SEALEVELPRESSURE_HPA));
  Serial.println(" m");

  Serial.println();
  //  delay(2000);

  //BMX055 Execution
  Serial.println("BMX055 Execution -------------------");
  BMX055_Gyro();
  Serial.print(GRYO);//gryo==1
  Serial.print(",");
  Serial.print(xGyro);
  Serial.print(",");
  Serial.print(yGyro);
  Serial.print(",");
  Serial.println(zGyro);


  BMX055_Accl();
  Serial.print(ACCL);//accl ==2
  Serial.print(",");
  Serial.print(xAccl);
  Serial.print(",");
  Serial.print(yAccl);
  Serial.print(",");
  Serial.println(zAccl);

  BMX055_Mag();
  Serial.print(MAG);//mag==3
  Serial.print(",");
  Serial.print(xMag);
  Serial.print(",");
  Serial.print(yMag);

  Serial.print(",");

  Serial.println(zMag);


  MadgwickFilter.update(xGyro, yGyro, zGyro, xAccl, yAccl, zAccl, xMag, yMag, zMag);
  roll = MadgwickFilter.getRoll();
  pitch = MadgwickFilter.getPitch();
  yaw = MadgwickFilter.getYaw();
  Serial.print(XYZ_ROTATION);//XYZ_ROTATION=4
  Serial.print(",");
  Serial.print(roll);
  Serial.print(",");
  Serial.print(pitch);
  Serial.print(",");
  Serial.println(yaw);
  Serial.println();
  delay(1000);
  */
}
