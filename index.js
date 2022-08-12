import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setHeartBeat, store } from './store';
import SmsReader from "react-native-sms-reader";


let message 
const startReadSMS = async () => {
  const hasPermission = await SmsReader.requestReadSMSPermission();
  if (hasPermission) {
    SmsReader.startReadSMS((status, sms, error) => {
      
      if (status === "success" && sms!== message) {
        message =sms
        console.log("Great!! you have received new sms:", sms);
      }
    });
  }
}
const MyHeadlessTask = async () => {

  startReadSMS()
  store.dispatch(setHeartBeat(true));
  // store.dispatch(setHeartBeat(false));
  // setTimeout(() => {
  
  // }, 10);
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
