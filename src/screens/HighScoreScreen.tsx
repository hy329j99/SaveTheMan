import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../componenets/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HighScoreScreen = ({navigation}: any) => {
  const [highScoreData, setHighScoreData] = useState([]);
  console.log(highScoreData);
  const [isLoading, setIsLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  const getDataFromDatabase = async () => {
    const snapshot = await firestore()
      .collection('users')
      .orderBy('points', 'desc')
      .get();
    const data = snapshot.docs.map(doc => doc.data());
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');

        const data = await getDataFromDatabase();
        setHighScoreData(data);
        const userData = data.find(item => item.username === username);

        if (userData) {
          setUserPoints(userData.points);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <>
      <View style={styles.item}>
        <Image source={item.userImage} style={styles.userImage} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',

            flexDirection: 'row',
            justifyContent: 'space-between',
            // marginLeft: 10,
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: '400', fontSize: 16, color: '#000'}}>
            {item.username}
          </Text>
          <Text style={{fontWeight: '600', fontSize: 16, color: '#000'}}>
            {item.points}
          </Text>
        </View>
      </View>
      <View
        style={{borderWidth: 0.5, marginHorizontal: 10, borderColor: '#ECECEC'}}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      <View style={{}}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            source={require('../assets/images/backIcon.png')}
            style={{width: 14, height: 17, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/images/highScoreIcon.png')}
          style={{width: 70, height: 70, resizeMode: 'contain'}}
        />

        <View style={{alignItems: 'center', marginTop: 3}}>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: '#000'}}>
              Current Points: {userPoints}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 22,
              color: '#000',
              lineHeight: 33,
            }}>
            High Score
          </Text>
        </View>
      </View>
      <View style={{flex: 0.6}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: '500', fontSize: 20, color: '#000'}}>
            Username
          </Text>
          <Text style={{fontWeight: '500', fontSize: 20, color: '#000'}}>
            Points
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <FlatList
            data={highScoreData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HighScoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  flatListContent: {
    justifyContent: 'center',
  },
  item: {
    marginVertical: 3,

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  userImage: {
    width: 28,
    height: 28,
    borderRadius: 20,
  },
});
