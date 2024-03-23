import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../componenets/Loader';
import InputBox from '../componenets/InputBox';
import Keyboard from '../componenets/Keyboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartGameScreen = ({navigation, route}: any) => {
  const selectedLevel = route?.params?.selectedLevel;
  const [word, setWord] = useState('');

  const [inputs, setInputs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [defination, setDefination] = useState('');
  const [gameLevel, setGameLevel] = useState('');
  console.log('ty', gameLevel);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [wordType, setWordType] = useState('');
  const [fireBaseData, setFireBaseData] = useState([]);
  const refs = useRef([]);

  const [correctLetters, setCorrectLetters] = useState('');
  const [wrongLetters, setWrongLetters] = useState('');
  const [status, setStatus] = useState('');
  const [correctWord, setCorrectWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPoints, setUserPoints] = useState(0);

  const WordsArray = [];

  const easyImages = [
    require('../assets/images/hangManIcon1.png'),
    require('../assets/images/hangManIcon2.png'),
    require('../assets/images/hangManIcon3.png'),
    require('../assets/images/hangManIcon4.png'),
    require('../assets/images/hangManIcon5.png'),
    require('../assets/images/hangManIcon6.png'),
    require('../assets/images/hangManIcon7.png'),
    require('../assets/images/hangManIcon8.png'),
  ];
  const mediumImages = [
    require('../assets/images/hangManIcon1.png'),
    require('../assets/images/hangManIcon4.png'),
    require('../assets/images/hangManIcon5.png'),
    require('../assets/images/hangManIcon6.png'),
    require('../assets/images/hangManIcon7.png'),
    require('../assets/images/hangManIcon8.png'),
  ];
  const hardImages = [
    require('../assets/images/hangManIcon1.png'),
    require('../assets/images/hangManIcon5.png'),
    require('../assets/images/hangManIcon6.png'),
    require('../assets/images/hangManIcon7.png'),
    require('../assets/images/hangManIcon8.png'),
  ];
  const veryHardImages = [
    require('../assets/images/hangManIcon1.png'),
    require('../assets/images/hangManIcon2.png'),
    require('../assets/images/hangManIcon7.png'),
    require('../assets/images/hangManIcon8.png'),
  ];
  const handleWrongGuess = () => {
    setWrongGuesses(wrongGuesses + 1);
  };
  const resetGame = () => {
    setWrongGuesses(0);
    setWrongLetters('');
    setCorrectLetters('');
    // setInputs(Array(word.length).fill(''));
    setStatus('');
  };

  const getDataFromDatabase = async () => {
    let arr = [];
    const snapshot = await firestore().collection('wordData').get();
    const data = snapshot.docs.map(doc => doc.data());
    setFireBaseData(data);
    snapshot.docs.map(doc => arr.push(doc.data()));

    let filteredData = arr.filter(
      doc => doc.level == selectedLevel.toLowerCase(),
    );
    return filteredData;
  };
  const getPointsDataFromDatabase = async () => {
    const snapshot = await firestore()
      .collection('users')
      .orderBy('points', 'desc')
      .get();
    const data = snapshot.docs.map(doc => doc.data());
    return data;
  };
  useEffect(() => {
    setShowSuccessModal(false);
    const fetchData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        let result = await getDataFromDatabase();
        let data = await getPointsDataFromDatabase();

        const userData = data.find(item => item.username === username);
        console.log('User data:', userData);
        if (userData) {
          setUserPoints(userData.points);
        }
        const randomIndex = Math.floor(Math.random() * result?.length);
        const fetchedWord = result[randomIndex]?.name.replace(/\s/g, '');
        console.log('word is======>', result[randomIndex]?.name);
        console.log('word Type is======>', result[randomIndex]?.type);
        setWordType(result[randomIndex]?.type);
        setCorrectWord(result[randomIndex]?.name.replace(/\s/g, ''));
        setGameLevel(result[randomIndex]?.level);
        setDefination(result[randomIndex]?.def);
        setWord(fetchedWord);
        //@ts-ignore
        setInputs(Array(fetchedWord.length).fill(''));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [showSuccessModal]);

  const storeCorrectLetters = keyInput => {
    const ans = correctWord.toUpperCase();
    if (ans.includes(keyInput)) {
      const cl = correctLetters + keyInput;
      setCorrectLetters(cl);
      // check win
      updateStatus(cl);
    } else {
      const wl = wrongLetters + keyInput;
      setWrongLetters(wl);
      handleWrongGuess();

      if (gameLevel == 'easy') {
        if (wl.length >= 7) {
          setStatus('lost');
          setShowFailureModal(true);
          calculatePoints(false, 'easy');
        }
      } else if (gameLevel == 'medium') {
        if (wl.length >= 5) {
          setStatus('lost');
          setShowFailureModal(true);
          calculatePoints(false, 'medium');
        }
      } else if (gameLevel == 'hard') {
        if (wl.length >= 4) {
          setStatus('lost');
          setShowFailureModal(true);
          calculatePoints(false, 'hard');
        }
      } else if (gameLevel == 'very_hard') {
        if (wl.length >= 3) {
          setStatus('lost');
          setShowFailureModal(true);
          calculatePoints(false, 'very_hard');
        }
      }
    }
  };

  const updateStatus = cl => {
    handleVerify();
    const correctWordArray = Array.from(correctWord.toUpperCase());
    const isWordCompleted = correctWordArray.every(letter =>
      cl.includes(letter),
    );
    if (isWordCompleted) {
      setIsLoading(true);
      setStatus('completed');
      setShowSuccessModal(true);
      setCorrectLetters('');

      calculatePoints(true, gameLevel);
      resetGame();
    }
  };

  const handleVerify = () => {
    const userInput = inputs.join('').toLowerCase();
    if (userInput === word.toLowerCase()) {
      console.log('hello');
      setShowSuccessModal(true);
    }
  };

  const renderBoxes = () => {
    let totalChances = 0;

    switch (gameLevel) {
      case 'easy':
        totalChances = 7;
        break;
      case 'medium':
        totalChances = 5;
        break;
      case 'hard':
        totalChances = 4;
        break;
      case 'very_hard':
        totalChances = 3;
        break;
      default:
        totalChances = 0;
    }

    return Array.from({length: totalChances}, (_, index) => {
      const isWrongGuess = index < wrongLetters.length;
      return (
        <View
          key={index}
          style={[
            styles.box,
            {
              backgroundColor: isWrongGuess ? '#D64F53' : '#F6F6F6',
            },
          ]}>
          {isWrongGuess ? <Text style={styles.cross}>X</Text> : null}
        </View>
      );
    });
  };

  const renderChances = () => {
    let remainingChances = 0;
    switch (gameLevel) {
      case 'easy':
        remainingChances = 7 - wrongLetters.length;

        break;
      case 'medium':
        remainingChances = 5 - wrongLetters.length;

        break;
      case 'hard':
        remainingChances = 4 - wrongLetters.length;

        break;
      case 'very_hard':
        remainingChances = 3 - wrongLetters.length;

        break;
      default:
        remainingChances = 0;
    }
    return <Text style={styles.chances}>Chances Left: {remainingChances}</Text>;
  };

  const calculatePoints = async (isCorrect, gameMode) => {
    let points = 0;
    let deduction = 0;
    switch (gameMode) {
      case 'easy':
        points = 20;
        deduction = 10;
        break;
      case 'medium':
        points = 30;
        deduction = 15;
        break;
      case 'hard':
        points = 40;
        deduction = 20;
        break;
      case 'very_hard':
        points = 50;
        deduction = 25;
        break;
      default:
        points = 0;
        deduction = 0;
    }

    const username = await AsyncStorage.getItem('username');
    const userRef = firestore().collection('users').doc(username);

    try {
      // Check if points field exists and update points accordingly
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData.hasOwnProperty('points')) {
          points = isCorrect ? points : -deduction;
          const updatedPoints = userData.points + points;
          console.log(
            'updated points:====================++>>>>>>>>> ',
            updatedPoints,
          );
          await userRef.update({points: updatedPoints});
          console.log('Points updated:', updatedPoints);
          setUserPoints(updatedPoints);
        } else {
          // If the 'points' field doesn't exist, set it with initial points
          // await userRef.set({points: isCorrect ? points : 0}, {merge: true});
          await userRef.set(
            {points: isCorrect ? points : -deduction},
            {merge: true},
          );
          console.log('Points field added');
        }
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.error('Error updating points: ', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Modal visible={showFailureModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.container_1}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/images/crossIcon.png')}
                style={{width: 67, height: 66, resizeMode: 'contain'}}
              />
              <Text style={styles.textStyle}>Unable to guess!</Text>
            </View>
            <View style={styles.btnMainView}>
              <TouchableOpacity
                style={styles.btnViewStyle}
                onPress={
                  () => {
                    setShowFailureModal(false);
                    navigation.navigate('RememberWordsScreen', {
                      wordType,
                      fireBaseData,
                      word,
                    });
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [
                    //     {
                    //       name: 'RememberWordsScreen',
                    //       params: {
                    //         // fromRememberScreen: true,
                    //         wordType,
                    //         fireBaseData,
                    //         word,
                    //       },
                    //     },
                    //   ],
                    // });
                  }
                  // console.log('No error in here =>');
                }>
                <Text style={styles.btnTextStyle}>Play Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {isLoading && <Loader />}
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.1,
            marginHorizontal: 16,

            marginTop: 10,

            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/backIcon.png')}
              style={{
                width: 14,
                height: 17,
                resizeMode: 'contain',
                marginTop: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            // justifyContent: 'flex-end',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              textAlign: 'right',
              fontSize: 14,
              color: '#000',
              fontWeight: '600',
            }}>
            Points: {userPoints}
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={
              gameLevel == 'easy'
                ? easyImages[wrongGuesses]
                : gameLevel == 'medium'
                ? mediumImages[wrongGuesses]
                : gameLevel == 'hard'
                ? hardImages[wrongGuesses]
                : gameLevel == 'very_hard'
                ? veryHardImages[wrongGuesses]
                : null
            }
            style={{
              width: 206,
              height: 210,
              resizeMode: 'contain',
              // marginTop: 10,
            }}
          />
        </View>
        <View style={{flex: 0.7}}>
          <View style={{flex: 0.6}}>
            <View style={{marginTop: 10}}>
              <InputBox correctLetters={correctLetters} answer={correctWord} />
            </View>
            <View style={[styles.container, {marginVertical: 2}]}>
              {renderBoxes()}
            </View>
            <View style={styles.container}>{renderChances()}</View>
          </View>
          <View
            style={{
              flex: 0.4,
              // height: 70,
              backgroundColor: '#FEF8F8',
              marginTop: 6,
              justifyContent: 'center',
              paddingHorizontal: 20,
              // marginBottom: 2,
            }}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#000'}}>
              Hint
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#8F8F8F'}}>
              {defination}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 10,

              justifyContent: 'center',
              flex: 1,
            }}>
            <Keyboard
              correctLetters={correctLetters}
              wrongLetters={wrongLetters}
              onPress={input => storeCorrectLetters(input)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    margin: 5,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  input: {
    width: 30,
    height: 50,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },
  box: {
    width: 26,
    height: 28,
    margin: 5,
    borderWidth: 1,
    borderColor: '#F6F6F6',
    elevation: 1,
    justifyContent: 'center',
  },
  cross: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  chances: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container_1: {
    height: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  textStyle: {
    marginTop: 15,
    fontWeight: '400',
    fontSize: 18,
    color: '#000',
  },
  btnMainView: {
    justifyContent: 'center',
    marginTop: 14,
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
});

export default StartGameScreen;
