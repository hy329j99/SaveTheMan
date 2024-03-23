import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserNameScreen = ({navigation}: any) => {
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');
  const [loading, setLoading] = useState(false);

  const saveUsername = async () => {
    if (inputValue.trim() === '') {
      Alert.alert('Error', 'Please enter a username');
      return;
    } else if (email.trim() === '') {
      Alert.alert('Error', 'Please enter a Email');
      return;
    } else if (pswd.trim() === '') {
      Alert.alert('Error', 'Please enter a Password');
      return;
    }
    setLoading(true); // Start loading

    const usernameExists = await checkUsernameExists(inputValue);
    const emailExists = await checkEmailExists(email);
    console.log('Email Exist====>', emailExists);

    if (usernameExists) {
      // Alert if username already exists
      setLoading(false); // Stop loading
      Alert.alert(
        'Error',
        'Username already exists. Please choose another one.',
      );
    } else if (emailExists) {
      setLoading(false); // Stop loading
      Alert.alert('Error', 'Email already exists. Please choose another one.');
    } else {
      // Save username to Firestore
      try {
        await firestore().collection('users').doc(inputValue).set({
          username: inputValue,
          Email: email,
          Password: pswd,
        });
        await AsyncStorage.setItem('username', inputValue);

        setLoading(false); // Stop loading
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      } catch (error) {
        console.error('Error saving username: ', error); // Log error
        setLoading(false); // Stop loading
        Alert.alert('Error', 'Failed to save username. Please try again.');
      }
    }
  };

  const checkUsernameExists = async (username: string) => {
    try {
      const usernameSnapshot = await firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

      return !usernameSnapshot.empty;
    } catch (error) {
      console.error('Error checking username existence: ', error);
      return false;
    }
  };
  const checkEmailExists = async (Email: string) => {
    try {
      const usernameSnapshot = await firestore()
        .collection('users')
        .where('Email', '==', Email)
        .get();

      return !usernameSnapshot.empty;
    } catch (error) {
      console.error('Error checking username existence: ', error);
      return false;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 0.8, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/images/splashIcon.png')}
            style={{width: 181, height: 150}}
          />
        </View>

        <View style={{marginTop: 30}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#000',
              marginHorizontal: 22,
            }}>
            Please Enter Your Name
          </Text>
          <TextInput
            style={styles.textInput}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter Name..."
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#000',
              marginHorizontal: 22,
            }}>
            Please Enter Your Email
          </Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email..."
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#000',
              marginHorizontal: 22,
            }}>
            Please Enter Your Password
          </Text>
          <TextInput
            style={styles.textInput}
            value={pswd}
            onChangeText={setPswd}
            placeholder="Enter Password..."
          />
          <Text style={{color: '#000', textAlign: 'center'}}>
            If already have account please{' '}
            <Text
              style={{color: '#D64F53'}}
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              Login
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.btnMainView}>
        <TouchableOpacity style={styles.btnViewStyle} onPress={saveUsername}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnTextStyle}>Next</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserNameScreen;

const styles = StyleSheet.create({
  btnMainView: {
    flex: 0.2,
    justifyContent: 'center',
  },
  btnViewStyle: {
    height: 50,
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
  textInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
});
