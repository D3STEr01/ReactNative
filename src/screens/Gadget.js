import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Gadget = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(new Date());
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGetWeather = () => {
    // Simulate fetching temperature
    setTemperature('25°C');
  };

  const handleAdjustBrightness = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gadgets</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      {/* Relógio Digital */}
      <View style={styles.gadgetContainer}>
        <Text style={styles.gadgetTitle}>Relógio Digital</Text>
        <Text style={styles.clockText}>{time.toLocaleTimeString()}</Text>
      </View>

      {/* Luminosidade da Tela */}
      <View style={styles.gadgetContainer}>
        <Text style={styles.gadgetTitle}>Luminosidade da Tela</Text>
        <TouchableOpacity style={styles.weatherButton} onPress={handleAdjustBrightness}>
          <Text style={styles.weatherButtonText}>Ajustar Luminosidade</Text>
        </TouchableOpacity>
      </View>

      {/* Clima */}
      <View style={styles.gadgetContainer}>
        <Text style={styles.gadgetTitle}>Clima</Text>
        <TouchableOpacity style={styles.weatherButton} onPress={handleGetWeather}>
          <Text style={styles.weatherButtonText}>Obter Temperatura</Text>
        </TouchableOpacity>
        {temperature && <Text style={styles.temperatureText}>Temperatura: {temperature}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gadgetContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  gadgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clockText: {
    fontSize: 32,
    textAlign: 'center',
  },
  weatherButton: {
    backgroundColor: '#8080D7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  weatherButtonText: {
    color: 'white',
    fontSize: 16,
  },
  temperatureText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Gadget;
