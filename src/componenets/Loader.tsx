import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color="#D64F53" />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // elevation: 40,
    left: 0,
    top: 0,
    zIndex: 9999,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});
