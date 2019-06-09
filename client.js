const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "vital_signs.proto";
const SERVER_URI = "0.0.0.0:50051";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const device = new protoDescriptor.VitalSignsService(
  SERVER_URI,
  grpc.credentials.createInsecure()
);

const publishData = () => {
  device.publishData(
    { heartRate: 1, bloodPressure: 2, temperature: 3, deviceId: "VSID0001", timestampUnix: (new Date).getTime() },
    (error, response) => {
      if (error) {
        console.error(error);
      }
      if (response) {
        console.log(response);
      }
    }
  );
}

publishData();