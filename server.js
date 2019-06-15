const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = 'vital_signs.proto'
const SERVER_URI = '0.0.0.0:9090'

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const devices = [];

const subscribers = [];

const registerDevice = (call, callback) => {
    console.log("Registered device : ", call.request);
    devices.push(call.request.deviceId);
    return callback(null, {
        message: `Successfully registered device ${call.request.deviceId}` 
    })
}

const publishData = (call, callback) => {
    console.log("Received data : ", call.request);
    subscribers.forEach(subscriberId => subscriberId.write(call.request))
}

const subscribeData = call => {
    call.on('cancelled', () => {
        subscribers = subscribers.filter(subscriberId => subscriberId !== call)
    })
  
    subscribers.push(call)
}

const server = new grpc.Server()
server.addService(protoDescriptor.VitalSignsService.service, {
    registerDevice: registerDevice,
    publishData: publishData,
    subscribeData: subscribeData
})
server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure())

server.start()
console.log('Server is running!')