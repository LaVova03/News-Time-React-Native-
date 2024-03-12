import { StyleSheet, View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useState } from 'react';
import React from 'react';
import MainStack from './navigate';

const fonts = () => {
  return Font.loadAsync({
    'mont-bolt': require('./fonts/static/Montserrat-Bold.ttf'),
    'mont-reg': require('./fonts/static/Montserrat-Regular.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await fonts();
      setFontLoaded(true);
    } catch (error) {
      console.error('Ошибка загрузки шрифтов:', error);
    }
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return <MainStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
