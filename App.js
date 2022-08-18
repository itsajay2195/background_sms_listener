import React,{useEffect,useState} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Heartbeat from './Heartbeat';
import heart from './heart-fill-icon.png';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C684',
  },
  view: {
    flex: 0.5,
    backgroundColor: '#00C684',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#009E6A',
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});


const App = ({ heartBeat }) => {
  
  const imageSize = heartBeat ? 150 : 100;
  
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    console.log('ooo',heartBeat)
    
  },);
  

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image source={heart} style={{ tintColor:'#009E6A',width: imageSize, height: imageSize }} resizeMode="contain" />
      </View>
      <Text numberOfLines={2} style={{fontSize:20,fontStyle:'italic',color:'#FFFFFF'}}>{isRunning?'The service is up and running, click stop to end the service' :  'Click start to begin the service'}</Text>

      <View style={styles.view}>
        <TouchableOpacity activeOpacity={0.7} disabled={isRunning ? true :false} style={[styles.button,{opacity:isRunning?0.4 :1}]} onPress={() => {
          Heartbeat.startService()
          setIsRunning(true)
          }}>
          <Text style={styles.instructions}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={isRunning ? false :true} style={[styles.button,{opacity:isRunning ?1 :0.4}]} onPress={() =>{ 
          Heartbeat.stopService()
          setIsRunning(false)
        }}>
          <Text style={styles.instructions}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  heartBeat: store.App.heartBeat,
});

export default connect(mapStateToProps)(App);
