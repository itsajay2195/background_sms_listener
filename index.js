import { AppRegistry } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { name as appName } from "./app.json";
import { setHeartBeat, store } from "./store";
import SmsReader from "react-native-sms-reader";
import {base_url,bearer_token,channel_id} from './constants'
 
let message;
const startReadSMS = async () => {
	const hasPermission = await SmsReader.requestReadSMSPermission();

	if (hasPermission) {
		SmsReader.startReadSMS((status, sms, error) => {
			if (status === "success" && sms !== message) {
				message = sms;
				let requestOptions = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization:
							`Bearer ${bearer_token}`,
					},
					body: JSON.stringify({ channel: channel_id, text: sms }),
				};

				fetch(base_url, requestOptions).then(
					(response) => console.log(response)
				);
			}
		});
	}
};
const MyHeadlessTask = async () => {
	startReadSMS();
	store.dispatch(setHeartBeat(true));

	setTimeout(() => {
		store.dispatch(setHeartBeat(false));
	}, 500);
};

const RNRedux = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

AppRegistry.registerHeadlessTask("Heartbeat", () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
