import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
const SESSION_INFO_KEY = '@Session:Info';
const USER_LOGINDATA = '@USER_LOGINDATA';
const Followers_DATA = '@Followers_DATA';
const CheckUser_Data = '@CheckUser_Data';
const MyEvent_Data = '@MyEvent_Data';
const HandleLikeBtn = '@HandleLikeBtn';

export default class LocalStorage {
  async createSession(sData: any, onCompleted: any) {
    try {
      AsyncStorage.setItem(SESSION_INFO_KEY, JSON.stringify(sData))
        .then(() => {
          onCompleted(true);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error: any) {
      console.log(error.message);
      onCompleted(false);
    }
  }
  async getSession(onResult: any) {
    var result = {userInfo: null};
    try {
      const info = await AsyncStorage.getItem(SESSION_INFO_KEY);
      if (info) {
        result.userInfo = JSON.parse(info);
      }
      onResult(result);
    } catch (error: any) {
      console.log(error.message);
      onResult(result);
    }
  }

  async deleteSession(onResult: any) {
    await AsyncStorage.multiRemove([
      SESSION_INFO_KEY,
      // USER_LOGINDATA,
      // Followers_DATA,
    ])
      .then(() => {
        onResult(true);
      })
      .catch(err => {
        onResult(false);
      });
  }

  async setUserData(sData: any, onCompleted: any) {
    try {
      AsyncStorage.setItem(USER_LOGINDATA, JSON.stringify(sData))
        .then(() => {
          onCompleted(true);
        })
        .catch(err => {
          onCompleted(false);
          console.log(err);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async getUserData(onResult: any) {
    var result = {userData: null};
    try {
      const info = await AsyncStorage.getItem(USER_LOGINDATA);
      if (info) {
        result.userData = JSON.parse(info);
      }
      onResult(result);
    } catch (error: any) {
      console.log(error.message);
      onResult(result);
    }
  }
  async setFollowersData(sData: any, onCompleted: any) {
    try {
      AsyncStorage.setItem(Followers_DATA, JSON.stringify(sData))
        .then(() => {
          onCompleted(true);
        })
        .catch(err => {
          onCompleted(false);
          console.log(err);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async getFollowersData(onResult: any) {
    var result = {userData: null};
    try {
      const info = await AsyncStorage.getItem(Followers_DATA);
      if (info) {
        result.userData = JSON.parse(info);
      }
      onResult(result);
    } catch (error: any) {
      console.log(error.message);
      onResult(result);
    }
  }
  async setmyEventData(sData: any, onCompleted: any) {
    try {
      AsyncStorage.setItem(MyEvent_Data, JSON.stringify(sData))
        .then(() => {
          onCompleted(true);
        })
        .catch(err => {
          onCompleted(false);
          console.log(err);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async getMyEventData(onResult: any) {
    var result = {myEventData: null};
    try {
      const info = await AsyncStorage.getItem(MyEvent_Data);
      if (info) {
        result.myEventData = JSON.parse(info);
      }
      onResult(result);
    } catch (error: any) {
      console.log(error.message);
      onResult(result);
    }
  }

  //chack user move from this or not
  async checkUser(sData: any, onCompleted: any) {
    try {
      AsyncStorage.setItem(CheckUser_Data, JSON.stringify(sData))
        .then(() => {
          onCompleted(true);
        })
        .catch(err => {
          onCompleted(false);
          console.log(err);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async getCheckUser(onResult: any) {
    var result = {userData: null};
    try {
      const info = await AsyncStorage.getItem(CheckUser_Data);
      if (info) {
        result.userData = JSON.parse(info);
      }
      onResult(result);
    } catch (error: any) {
      console.log(error.message);
      onResult(result);
    }
  }
  async setLikeBtn(sData: any, onCompleted: any) {
    try {
      AsyncStorage.setItem(HandleLikeBtn, JSON.stringify(sData))
        .then(() => {
          onCompleted(true);
        })
        .catch(err => {
          onCompleted(false);
          console.log(err);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async getLikeBtn(onResult: any) {
    var result = {likeBtn: null};
    try {
      const info = await AsyncStorage.getItem(HandleLikeBtn);
      if (info) {
        result.likeBtn = JSON.parse(info);
      }
      onResult(result);
    } catch (error: any) {
      console.log(error.message);
      onResult(result);
    }
  }
}
