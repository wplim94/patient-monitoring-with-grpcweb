# Patient Monitoring Example with GRPC Web

This is a gPRC and gRPC-web example with node and javascript.

## How to Run the Server

Make sure you have node and npm install.

1. cd to /patient-monitoring-tool folder
```
$ cd patient-monitoring-tool
```

2. Install dependencies with npm
```
npm install
```

3. Run the patient monitoring control system - server.js. This listens at port :9090.
```
$ node server.js
```

4. In another terminal, run patient device simulation program - client.js
```
$ node client.js
```

5. Now you should see logs coming from server.js

```
Registered device :  { deviceId: '6fb635d6-aa50-4ec2-9915-31a853fce688' }
Received data :  { heartRate: 66,
  bloodPressure: 140,
  temperature: 35,
  deviceId: '6fb635d6-aa50-4ec2-9915-31a853fce688',
  timestampUnix: 1560608307294 }
```

## How to Run the Frontend Application

1. In /patient-monitoring-tool, run envoy proxy with docker.
The `envoy.yaml` file configures Envoy to listen to browser requests at port `:8080`, and forward them to port `:9090`.
```
$ docker build -t patient/envoy -f ./envoy.Dockerfile .
$ docker run -d -p 8080:8080 --network=host patient/envoy
```
`P.S. If you are running Docker on Mac/Windows, remove the --network=host option.`

2. Move to frontend app folder and install dependencies
```
$ cd ../frontend-app
$ npm install
```

3. Run HTTP Web Server that hosts the static file `index.html` and `dist/main.js`
```
http-server . -p 8081
```
or with python2
```
python2 -m SimpleHTTPServer 8081
```
or with python3
```
python3 -m http.server 8081
```

4. Open `http://localhost:8081` with browser and you should see a webpage with real time metrics. 

Meanwhile, you can also run more client.js programs concurrently to see what happens on the UI
