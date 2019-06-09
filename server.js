const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = 'vital_signs.proto'
const SERVER_URI = '0.0.0.0:50051'

const devices = [];

const registerDevice = (call, callback) => {
    console.log("Registered device : ", call.request);
    devices.push(call.request.deviceId);
    return callback(null, {
        message: `Successfully registered device ${call.request.deviceId}` 
    })
}

const publishData = (call, callback) => {
    console.log("Received data : ", call.request);
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()
server.addService(protoDescriptor.VitalSignsService.service, {
    registerDevice: registerDevice,
    publishData: publishData
})
server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure())

server.start()
console.log('Server is running!')