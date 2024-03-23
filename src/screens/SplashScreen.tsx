import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, {firebase} from '@react-native-firebase/firestore';

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    const checkUsername = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          const checkRememberScreen = await AsyncStorage.getItem(
            'isRemeberScreen',
          );
          if (checkRememberScreen == 'true') {
            navigation.reset({
              index: 0,
              routes: [{name: 'RememberWordsScreen'}],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            });
          }
        } else {
          navigation.reset({
            index: 0,
            // routes: [{name: 'UserNameScreen'}],
            routes: [{name: 'LoginScreen'}],
          });
        }
      } catch (error) {
        console.error('Error checking username:', error);
      }
    };

    setTimeout(checkUsername, 3000); // Call checkUsername function after 3 seconds
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.9,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/images/splashIcon.png')}
          style={{width: 278, height: 245}}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  btnMainView: {
    flex: 0.2,
    justifyContent: 'center',
  },
  btnViewStyle: {
    height: 58,
    backgroundColor: '#D64F53',
    marginHorizontal: 70,
    justifyContent: 'center',
  },
  btnTextStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
});
