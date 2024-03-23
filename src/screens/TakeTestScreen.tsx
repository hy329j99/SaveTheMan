import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';

const TakeTestScreen = ({navigation, route}: any) => {
  const wordArray: string[] = (route?.params?.wordArray || []).map(word =>
    word.toLowerCase(),
  );
  console.log('wordArray: ', wordArray);

  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<{word: string; isMatch: boolean}[]>(
    [],
  );
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const handleAsyncOperation = async () => {
      if (attempts === 6) {
        const allSame = results.every(result =>
          wordArray.includes(result.word.toLowerCase()),
        );
        if (allSame) {
          navigation.navigate('HomeScreen');
          await AsyncStorage.setItem('isRemeberScreen', 'false');
          await AsyncStorage.removeItem('rememberedWords');
        } else {
          Alert.alert(
            'Alert',
            'Sorry you are unable to guess correct words. Please Retry',
            [
              {
                text: 'Retry',
                onPress: () => navigation.goBack(),
              },
            ],
          );
        }
      }
    };

    handleAsyncOperation();
  }, [attempts]);

  const handleVerify = () => {
    let lowercaseInput = inputValue.trim().toLowerCase();
    if (!lowercaseInput) {
      Alert.alert('Alert', 'Please enter a word.');
      return;
    }
    const isMatch = wordArray.includes(lowercaseInput);
    if (!results.some(result => result.word.toLowerCase() === lowercaseInput)) {
      setResults(prevResults => [
        ...prevResults,
        {word: lowercaseInput, isMatch},
      ]);
      setAttempts(prevAttempts => prevAttempts + 1);
    }
    setInputValue('');
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 16}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/backIcon.png')}
            style={{
              width: 14,
              height: 17,
              resizeMode: 'contain',
              marginTop: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/images/takeTestIcon.png')}
          style={{width: 70, height: 70, resizeMode: 'contain'}}
        />
        <View style={{alignItems: 'center', marginTop: 19}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 22,
              color: '#000',
              lineHeight: 33,
            }}>
            Take Test
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#000',
              lineHeight: 24,
            }}>
            Write the words you remember
          </Text>
        </View>
      </View>
      <View style={{marginTop: 40}}>
        <Text
          style={{
            fontSize: 14,
            color: '#000',
            marginHorizontal: 14,
            fontWeight: '500',
          }}>
          Please Enter six words which you remember
        </Text>
        <TextInput
          style={styles.textInput}
          value={inputValue}
          onChangeText={val => setInputValue(val)}
          placeholder="Enter word..."
        />
      </View>

      <ScrollView style={{marginTop: 10, marginBottom: 10}}>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#000',
              textAlign: 'center',
            }}>
            Results
          </Text>
          {results.map((result, index) => (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: result.isMatch ? '#F2FAF1' : '#D64F5317',
                height: 44,
                width: 186,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                borderRadius: 10,
              }}
              key={index}>
              <Text
                style={{
                  color: result.isMatch ? '#45B333' : '#D64F53',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                {result.word}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.btnMainView}>
        <TouchableOpacity style={styles.btnViewStyle} onPress={handleVerify}>
          <Text style={styles.btnTextStyle}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TakeTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
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
  btnMainView: {
    justifyContent: 'center',
  },
  btnViewStyle: {
    height: 50,
    marginHorizontal: 60,
    justifyContent: 'center',
    borderRadius: 11,
    borderColor: '#1E1E1E',
    borderWidth: 1,
  },
  btnTextStyle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#000',
  },
});
