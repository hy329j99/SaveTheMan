import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}: any) => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = await AsyncStorage.getItem('username');
      if (username !== null) {
        setName(username);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 0.8, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/images/splashIcon.png')}
            style={{width: 181, height: 160, resizeMode: 'contain'}}
          />
        </View>
        <View style={{marginTop: 40}}>
          <TouchableOpacity
            style={styles.btnViewStyle}
            onPress={() => navigation.navigate('SelectLevelsScreen')}>
            <Text style={styles.btnTextStyle}>Start Game</Text>
          </TouchableOpacity>

          {/* <ButtonComp
            text={'Remember'}
            onPress={() => navigation.navigate('RememberWordsScreen')}
          />
          <ButtonComp
            text={'Take Test'}
            onPress={() => navigation.navigate('TakeTestScreen')}
          /> */}
        </View>
        <View
          style={{
            marginTop: 20,

            alignItems: 'center',
          }}>
          <Text style={{fontWeight: '500', fontSize: 20, color: '#000'}}>
            Welcome Back {name}
          </Text>
        </View>
      </View>
      <View style={styles.btnMainView}>
        <ButtonComp
          text={'High Score'}
          onPress={() => navigation.navigate('HighScoreScreen')}
        />
      </View>
    </View>
  );
};

const ButtonComp = (props: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnViewStyle,
        {backgroundColor: '#D64F5317', height: 44, marginTop: 10},
      ]}
      onPress={props.onPress}>
      <Text style={[styles.btnTextStyle, {color: '#D64F53'}]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  btnMainView: {
    flex: 0.2,
    justifyContent: 'center',
  },
  btnViewStyle: {
    height: 60,
    backgroundColor: '#D64F53',
    marginHorizontal: 60,
    justifyContent: 'center',
    borderRadius: 11,
  },
  btnTextStyle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },
});
