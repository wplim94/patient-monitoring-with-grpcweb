const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = 'vital_signs.proto'
const SERVER_URI = '0.0.0.0:50051'

const publishData = (call, callback) => {
    console.log("Received data : ", call.request);
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()
server.addService(protoDescriptor.VitalSignsService.service, {
    publishData: publishData
})
server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure())

server.start()
console.log('Server is running!')