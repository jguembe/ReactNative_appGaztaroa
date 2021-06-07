import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Campobase from './componentes/CampobaseComponent';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <View style={styles.container}>
              <Campobase/>
              <StatusBar style="auto" />
            </View>
        </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
