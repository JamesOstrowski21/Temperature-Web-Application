#include <Arduino.h>

#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebSrv.h>

#include <Arduino_JSON.h>

#include <Wire.h>
#include <OneWire.h> 
#include <DallasTemperature.h>

const char* ssid = "TBD";
const char* pswd = "Hawks123";

const int temperaturePin = 4;

OneWire onewire(temperaturePin); 
DallasTemperature sensor(&onewire);

AsyncWebServer server(80);

// Temperature reading functions
String readTemperatureCelcius() {
  JSONVar reading;
  sensor.requestTemperatures();
  float value = sensor.getTempCByIndex(0);
  reading["temperature"] = String(value);
  return JSON.stringify(reading);
}

String readTemperatureFahrenheit () {
  JSONVar reading;
  sensor.requestTemperatures();
  float value = sensor.getTempFByIndex(0);
  reading["temperature"] = String(value);
  return JSON.stringify(reading);
}

void setup() {
  // Start serial communication 
  Serial.begin(115200);

  // Start sensor reading
  sensor.begin();

  // Connect to Wi-Fi
  WiFi.begin(ssid, pswd);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  
  Serial.println(WiFi.localIP());

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/plain", "Get a temperature data point with either /temperatureC or /temperatureF");
  });

  server.on("/temperatureF", HTTP_GET, [](AsyncWebServerRequest *request)
  {
    String json = readTemperatureFahrenheit();
    Serial.println(json);

    AsyncWebServerResponse *response = request->beginResponse(200, "application/json", json);
    response->addHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    response->addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response->addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    request->send(response);
  });
  
  server.on("/temperatureC", HTTP_GET, [](AsyncWebServerRequest *request){
    String json = readTemperatureCelcius();
     Serial.println(json);

    AsyncWebServerResponse *response = request->beginResponse(200, "application/json", json);
    response->addHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    response->addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response->addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    request->send(response);
  });
  
  server.begin();
}

void loop() {
}