import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const SuccessScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../assets/images/tickIcon.png')}
          style={{width: 67, height: 66, resizeMode: 'contain'}}
        />
        <Text style={styles.textStyle}>Well Guessed</Text>
      </View>
      <View style={styles.btnMainView}>
        <TouchableOpacity
          style={styles.btnViewStyle}
          //   onPress={() => navigation.navigate('SelectLevelsScreen')}
        >
          <Text style={styles.btnTextStyle}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  textStyle: {
    marginTop: 15,
    fontWeight: '400',
    fontSize: 18,
    color: '#000',
  },
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
});
