const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "vital_signs.proto";
const SERVER_URI = "0.0.0.0:9090";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const device = new protoDescriptor.VitalSignsService(
  SERVER_URI,
  grpc.credentials.createInsecure()
);

// assign patient device an UUID
const util = require('./util.js')
const deviceId = util.uuidV4();

// define the normal range of vital signs
const HEART_RATE_RAND = {
  min: 60,
  max: 120
};

const BLOOD_PRESSURE_RAND = {
  min: 100,
  max: 200
};

const TEMPERATURE_RAND = {
  min: 25,
  max: 45
};

// function to get random value within a range
getRandValue = range => {
  return Math.random() * (range.max - range.min) + range.min;
};

// function to simulate vital signs values
const simulateVitalSigns = () => {
  this.heartRateVal = getRandValue(HEART_RATE_RAND);
  this.temperatureVal = getRandValue(TEMPERATURE_RAND);
  this.bloodPressureVal = getRandValue(BLOOD_PRESSURE_RAND);
}

device.registerDevice({
  deviceId: deviceId
}, (error, response) => {
  if (error) {
    console.error(error);
  }
  if (response) {
    console.log(response);
  }
})

// function to publish vital signs to server
const publishData = () => {
  simulateVitalSigns();

  device.publishData(
    {
      heartRate: this.heartRateVal,
      bloodPressure: this.bloodPressureVal,
      temperature: this.temperatureVal,
      deviceId: deviceId,
      timestampUnix: new Date().getTime()
    },
    (error, response) => {
      if (error) {
        console.error(error);
      }
      if (response) {
        console.log(response);
      }
    }
  );
};

// publish data every second
setInterval(() => {
  publishData();
}, 1000);
