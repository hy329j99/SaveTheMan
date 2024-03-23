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
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter an Email');
      return;
    } else if (pswd.trim() === '') {
      Alert.alert('Error', 'Please enter a Password');
      return;
    }
    setLoading(true); // Start loading

    try {
      // Check if user with the entered email exists in Firestore
      const userSnapshot = await firestore()
        .collection('users')
        .where('Email', '==', email.trim())
        .get();

      if (userSnapshot.empty) {
        // If no user found with the entered email
        setLoading(false); // Stop loading
        Alert.alert('Error', 'Invalid credentials');
      } else {
        // User found, check if the password matches
        const userData = userSnapshot.docs[0].data();
        console.log('userData====>', userData?.username);
        await AsyncStorage.setItem('username', userData?.username);
        if (userData.Password === pswd.trim()) {
          // Password matches, login successful
          setLoading(false); // Stop loading
          await AsyncStorage.setItem('email', email);

          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
        } else {
          // Password doesn't match
          setLoading(false); // Stop loading
          Alert.alert('Error', 'Invalid credentials');
        }
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      setLoading(false); // Stop loading
      Alert.alert('Error', 'Failed to log in. Please try again.');
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
        <View style={{marginTop: 40}}>
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
            Don't have an account?{' '}
            <Text
              style={{color: '#D64F53'}}
              onPress={() => {
                navigation.navigate('UserNameScreen');
              }}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.btnMainView}>
        <TouchableOpacity style={styles.btnViewStyle} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnTextStyle}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
