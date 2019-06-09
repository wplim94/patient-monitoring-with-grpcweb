const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "vital_signs.proto";
const SERVER_URI = "0.0.0.0:50051";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const subscriber = new protoDescriptor.VitalSignsService(
  SERVER_URI,
  grpc.credentials.createInsecure()
);

const util = require('./util.js')
const subscriberId = "FRONTEND-" + util.uuidV4();

const dataStream = subscriber.subscribeData({ subscriberId })

dataStream.on('data', data => {
  const { heartRate, bloodPressure, temperature, timestampUnix, deviceId } = data

  console.log("Received new data for deviceId ", deviceId )
  console.log("Heart Rate: ", heartRate)
  console.log("Blood Pressure: ", bloodPressure)
  console.log("Temperature: ", temperature)
  console.log("Timestamp: ", new Date(timestampUnix).toLocaleTimeString())
  console.log("=====================================================================")
})
