

const { SubscribeDataRequest } = require('./vital_signs_pb.js');
const { VitalSignsServiceClient } = require('./vital_signs_grpc_web_pb.js');

let serverUrl = window.location.protocol + "//" + window.location.hostname + ":8080";
const subscriber = new VitalSignsServiceClient(serverUrl);
const deviceVitalSigns = [];
const deviceIdSet = new Set();

const util = require('./util.js')
const subscriberId = "FRONTEND-" + util.uuidV4();

// Call server grpc method to register oneself
var subscribeDataRequest = new SubscribeDataRequest();
subscribeDataRequest.setSubscriberid(subscriberId);

const dataStream = subscriber.subscribeData(subscribeDataRequest, {}, (err, response) => {
  if(err){
    console.error(err);
  }
  if(response){
    console.log("res", response.getMessage());
  }
});

// Receives data stream once DOM is ready
document.addEventListener("DOMContentLoaded", function(event) {

  dataStream.on('data', data => {
    let vitalSignsData = data.toObject();

    // console.log("Received new data for deviceId ", vitalSignsData.deviceid )
    // console.log("Heart Rate: ", vitalSignsData.heartrate)
    // console.log("Blood Pressure: ", vitalSignsData.bloodpressure)
    // console.log("Temperature: ", vitalSignsData.temperature)
    // console.log("Timestamp: ", new Date(vitalSignsData.timestampunix).toLocaleTimeString())
    // console.log("=====================================================================")
  
    let index = -1;
    let isNewDevice = false;

    // Check if device id set contains the current device id,
    // if it does not exist, push the new device to deviceVitalSigns array
    // otherwise, find existing device in the array and update it with latest metrics
    if(!deviceIdSet.has(vitalSignsData.deviceid)){
      deviceIdSet.add(vitalSignsData.deviceid);
      deviceVitalSigns.push(vitalSignsData);
      index = deviceVitalSigns.length - 1;
      isNewDevice = true;
    }else{
      for(let i in deviceVitalSigns){
        if(deviceVitalSigns[i].deviceid == vitalSignsData.deviceid){
          deviceVitalSigns[i] = vitalSignsData;
          index = i;
          isNewDevice = false;
          break;
        }
      }
    }
    
    // Update DOM
    draw(index, isNewDevice, vitalSignsData);
  })
});

// Method to display vital signs in respect to the device id on screen
// If it's new device, append a new div to the html,
// otherwise just find the existing div element using the index
// and update the latest values accordingly
const draw = (index, isNewDevice, vitalSignsData) => {
  let elem = document.getElementById('body');
  let html = elem.innerHTML;
  if(isNewDevice){
    html += '<div id="device'+ index +'" class="card">Device ID: <span class="device-id">' + vitalSignsData.deviceid + '</span><br/>'
        + 'Heart Rate: <span class="heart-rate">' + vitalSignsData.heartrate + '</span><br/>'
        + 'Blood Pressure: <span class="blood-pressure">' + vitalSignsData.bloodpressure + '</span><br/>'
        + 'Temp: <span class="temp">' + vitalSignsData.temperature + '</span><br/>'
        + 'Timestamp <span class="timestamp">' + new Date(vitalSignsData.timestampunix).toLocaleTimeString() + '</span><br/><br/></div>';

    elem.innerHTML = html;
  }else{
    document.querySelector('#device' + index + ' .device-id').innerHTML = vitalSignsData.deviceid;
    document.querySelector('#device' + index + ' .heart-rate').innerHTML = vitalSignsData.heartrate;
    document.querySelector('#device' + index + ' .blood-pressure').innerHTML = vitalSignsData.bloodpressure;
    document.querySelector('#device' + index + ' .temp').innerHTML = vitalSignsData.temperature;
    document.querySelector('#device' + index + ' .timestamp').innerHTML = new Date(vitalSignsData.timestampunix).toLocaleTimeString();
  }
}
