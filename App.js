import { StyleSheet } from 'react-native';
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
}
export default function App() {
  const [font, setFont] = useState(false);

  const handleError = (error) => {
    console.error('Ошибка загрузки:', error);
  };

  if (font) {
    return (
      <MainStack />
    );
  } else {
    return (
      <AppLoading startAsync={fonts} onFinish={() => setFont(true)} onError={handleError} /> //ожидание подгрузки шрифтов
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
