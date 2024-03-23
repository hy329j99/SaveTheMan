import 'react-native';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(), // Mocking setItem method of AsyncStorage
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../src/screens/SplashScreen';

describe('SplashScreen', () => {
  it('checks if remember screen flag is stored correctly', async () => {
    // Mock the return value of AsyncStorage.getItem() for true
    AsyncStorage.getItem.mockResolvedValue('true');
    let checkRememberScreen = await AsyncStorage.getItem('isRememberScreen');
    console.log('Value when isRememberScreen is true:', checkRememberScreen);
    expect(checkRememberScreen).toEqual('true');

    // Mock the return value of AsyncStorage.getItem() for false
    AsyncStorage.getItem.mockResolvedValue('false');
    checkRememberScreen = await AsyncStorage.getItem('isRememberScreen');
    console.log('Value when isRememberScreen is false:', checkRememberScreen);
    expect(checkRememberScreen).toEqual('false');

    // Log the value being saved when setting 'isRememberScreen' flag to true
    AsyncStorage.setItem.mockClear(); // Clear any previous calls to setItem
    await AsyncStorage.setItem('isRememberScreen', 'true');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'isRememberScreen',
      'true',
    );
    console.log(
      "Value saved in AsyncStorage for 'isRememberScreen' when set to true:",
      'true',
    );

    // Log the value being saved when setting 'isRememberScreen' flag to false
    AsyncStorage.setItem.mockClear(); // Clear any previous calls to setItem
    await AsyncStorage.setItem('isRememberScreen', 'false');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'isRememberScreen',
      'false',
    );
    console.log(
      "Value saved in AsyncStorage for 'isRememberScreen' when set to false:",
      'false',
    );
  });
});

describe('SplashScreen - Remember Screen Flag', () => {
  it('checks if remember screen flag is stored correctly when true', async () => {
    // Mock the return value of AsyncStorage.getItem() for true
    AsyncStorage.getItem.mockResolvedValue('true');
    let checkRememberScreen = await AsyncStorage.getItem('isRememberScreen');
    console.log('Value when isRememberScreen is true:', checkRememberScreen);
    expect(checkRememberScreen).toEqual('true');
  });
});

describe('SplashScreen - Remember Screen Flag', () => {
  it('checks if remember screen flag is stored correctly when false', async () => {
    // Mock the return value of AsyncStorage.getItem() for false
    AsyncStorage.getItem.mockResolvedValue('false');
    let checkRememberScreen = await AsyncStorage.getItem('isRememberScreen');
    console.log('Value when isRememberScreen is false:', checkRememberScreen);
    expect(checkRememberScreen).toEqual('false');
  });
});

describe('SplashScreen - Remember Screen Flag', () => {
  it("checks if 'isRememberScreen' flag is set to true", async () => {
    // Log the value being saved when setting 'isRememberScreen' flag to true
    AsyncStorage.setItem.mockClear(); // Clear any previous calls to setItem
    await AsyncStorage.setItem('isRememberScreen', 'true');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'isRememberScreen',
      'true',
    );
    console.log(
      "Value saved in AsyncStorage for 'isRememberScreen' when set to true:",
      'true',
    );
  });
});

describe('SplashScreen - Remember Screen Flag', () => {
  it("checks if 'isRememberScreen' flag is set to false", async () => {
    // Log the value being saved when setting 'isRememberScreen' flag to false
    AsyncStorage.setItem.mockClear(); // Clear any previous calls to setItem
    await AsyncStorage.setItem('isRememberScreen', 'false');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'isRememberScreen',
      'false',
    );
    console.log(
      "Value saved in AsyncStorage for 'isRememberScreen' when set to false:",
      'false',
    );
  });
});

