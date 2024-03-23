import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../componenets/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RememberWordsScreen = ({navigation, route}: any) => {
  const [word, setWord] = useState([]);
  const [fireBaseData, setFireBaseData] = useState([]);
  const [name, setName] = useState('');
  const [def, setDefination] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  console.log('Worda===------------------,', word);
  const [isLoading, setIsLoading] = useState(true);
  const fetchingWordType = route?.params?.wordType;
  const Data = route?.params?.fireBaseData;
  console.log('Data', Data);
  const looseWord = route?.params?.word;

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getDataFromDatabase = async () => {
    await AsyncStorage.setItem('isRemeberScreen', 'true');
    const snapshot = await firestore().collection('wordData').get();
    const data = snapshot.docs.map(doc => doc.data());
    setFireBaseData(data);
    const asyncStoredWords = await AsyncStorage.getItem('rememberedWords');
    console.log(
      'asyncStoredWords',
      require('../assets/images/hangManIcon2.png'),
    );
    if (asyncStoredWords) {
      setWord(JSON.parse(asyncStoredWords));
    } else {
      let filteredData = Data.filter(
        doc => doc.type === fetchingWordType.toLowerCase(),
      );
      const shuffledData = shuffleArray(filteredData);

      let extractedNames = shuffledData.slice(0, 5).map(item => item.name);
      if (looseWord) {
        extractedNames.push(looseWord);
      }

      // Check for duplicates
      const uniqueWords = Array.from(new Set(extractedNames));
      if (uniqueWords.length !== extractedNames.length) {
        // If there are duplicates, generate a new list
        const newShuffledData = shuffleArray(filteredData);
        extractedNames = newShuffledData.slice(0, 5).map(item => item.name);
        if (looseWord) {
          extractedNames.push(looseWord);
        }
      }

      setWord(extractedNames);
      await AsyncStorage.setItem(
        'rememberedWords',
        JSON.stringify(extractedNames),
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDataFromDatabase();
  }, []);

  const renderItem = ({item}: any) => {
    const showAlert = () => {
      setShowSuccessModal(true);
      const selectedItem =
        Data == undefined
          ? fireBaseData?.find((dataItem: any) => dataItem.name === item)
          : Data?.find((dataItem: any) => dataItem.name === item);
      if (selectedItem) {
        const {name, def} = selectedItem;
        setName(name);
        setDefination(def);
        // Alert.alert(`${name}`, ` ${def}`);
      }
    };

    return (
      <TouchableOpacity onPress={showAlert}>
        <View style={styles.item}>
          <Text style={{fontWeight: '500', fontSize: 15, color: '#fff'}}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleTakeTest = async () => {
    navigation.navigate('TakeTestScreen', {wordArray: word});
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Modal visible={showSuccessModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.container_1}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={[styles.textStyle, {fontWeight: '600', fontSize: 20}]}>
                {name}
              </Text>
              <Text style={styles.textStyle}>{def}</Text>
            </View>
            <View style={styles.btnMainView1}>
              <TouchableOpacity
                style={styles.btnViewStyle1}
                onPress={() => {
                  setShowSuccessModal(false);
                }}>
                <Text style={styles.btnTextStyle1}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{marginTop: 16}}></View>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/images/rememberIcon.png')}
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
            Remember
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#000',
              lineHeight: 24,
            }}>
            Remember these words
          </Text>
        </View>
      </View>
      <View style={{flex: 0.6}}>
        <FlatList
          data={word}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <View style={styles.btnMainView}>
        <TouchableOpacity style={styles.btnViewStyle} onPress={handleTakeTest}>
          <Text style={styles.btnTextStyle}>Take Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RememberWordsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  flatListContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#D64F53',
    marginVertical: 8,
    marginHorizontal: 10,
    height: 40,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnMainView: {
    flex: 0.1,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container_1: {
    height: 240,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    // justifyContent: 'center',
  },
  textStyle: {
    marginTop: 15,
    fontWeight: '400',
    fontSize: 18,
    color: '#000',
  },
  btnMainView1: {
    justifyContent: 'flex-end',
    marginTop: 12,

    flex: 0.8,
  },
  btnViewStyle1: {
    height: 50,
    backgroundColor: '#D64F53',
    marginHorizontal: 60,
    justifyContent: 'center',
    borderRadius: 11,
  },
  btnTextStyle1: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },
});
