import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const SelectLevelsScreen = ({navigation}: any) => {
  const [selectedLevel, setSelectedLevel] = useState('Easy');

  const handleLevelSelect = (level: any) => {
    setSelectedLevel(level);
  };

  const renderLevels = () => {
    const levels = ['Easy', 'Medium', 'Hard', 'Very_Hard'];

    return levels.map((level, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.levelButton,
          selectedLevel === level ? styles.selectedLevel : null,
        ]}
        onPress={() => handleLevelSelect(level)}>
        <Text
          style={[
            styles.levelButtonText,
            selectedLevel === level ? styles.selectedLevelText : null,
          ]}>
          {level}
        </Text>
      </TouchableOpacity>
    ));
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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

      <View style={{flex: 0.8, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/images/splashIcon.png')}
            style={{width: 181, height: 160}}
          />
        </View>

        <View style={{marginTop: 40}}>
          <Text
            style={[styles.btnTextStyle, {color: '#000', marginVertical: 10}]}>
            Select Level
          </Text>
          {renderLevels()}
        </View>
      </View>
      <View style={styles.btnMainView}>
        <TouchableOpacity
          style={styles.btnViewStyle}
          onPress={() => {
            navigation.navigate('StartGameScreen', {
              selectedLevel: selectedLevel,
            });
          }}>
          <Text style={styles.btnTextStyle}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectLevelsScreen;

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

  levelButton: {
    backgroundColor: '#D64F5317',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 60,
    alignItems: 'center',
  },
  levelButtonText: {
    color: '#D64F53',
    fontSize: 16,
  },
  selectedLevel: {
    backgroundColor: '#D64F53',
  },
  proceedButton: {
    backgroundColor: '#D64F53',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedLevelText: {
    color: '#fff',
  },
});
