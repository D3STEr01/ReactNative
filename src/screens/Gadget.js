import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Gadget = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(new Date());
  const [temperature, setTemperature] = useState(null);
  const [calculatorVisible, setCalculatorVisible] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && stopwatchTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, stopwatchTime]);

  const handleGetWeather = () => {
    // Simulate fetching temperature
    setTemperature('25°C');
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  const handleOpenCalculator = () => {
    setCalculatorVisible(true);
  };

  const handleCloseCalculator = () => {
    setCalculatorVisible(false);
    setCalcInput('');
  };

  const handleButtonPress = (value) => {
    if (value === 'C') {
      setCalcInput('');
    } else if (value === '=') {
      try {
        setCalcInput(eval(calcInput).toString());
      } catch (error) {
        setCalcInput('Error');
      }
    } else {
      setCalcInput(calcInput + value);
    }
  };

  const renderButton = (value) => (
    <TouchableOpacity style={styles.calcButton} onPress={() => handleButtonPress(value)}>
      <Text style={styles.calcButtonText}>{value}</Text>
    </TouchableOpacity>
  );

  const formatTime = (time) => {
    const getSeconds = `0${(time % 60)}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const handleStartStopwatch = () => {
    setIsRunning(true);
  };

  const handleStopStopwatch = () => {
    setIsRunning(false);
  };

  const handleResetStopwatch = () => {
    setIsRunning(false);
    setStopwatchTime(0);
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

      {/* Calculadora */}
      <View style={styles.gadgetContainer}>
        <Text style={styles.gadgetTitle}>Calculadora</Text>
        <TouchableOpacity style={styles.weatherButton} onPress={handleOpenCalculator}>
          <Text style={styles.weatherButtonText}>Abrir Calculadora</Text>
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

      {/* Cronômetro */}
      <View style={styles.gadgetContainer}>
        <Text style={styles.gadgetTitle}>Cronômetro</Text>
        <Text style={styles.stopwatchText}>{formatTime(stopwatchTime)}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.stopwatchButton} onPress={handleStartStopwatch}>
            <Text style={styles.stopwatchButtonText}>Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stopwatchButton} onPress={handleStopStopwatch}>
            <Text style={styles.stopwatchButtonText}>Parar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stopwatchButton} onPress={handleResetStopwatch}>
            <Text style={styles.stopwatchButtonText}>Resetar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={calculatorVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Calculadora</Text>
          <Text style={styles.calcInput}>{calcInput}</Text>
          <View style={styles.buttonRow}>
            {['1', '2', '3', '+'].map(renderButton)}
          </View>
          <View style={styles.buttonRow}>
            {['4', '5', '6', '-'].map(renderButton)}
          </View>
          <View style={styles.buttonRow}>
            {['7', '8', '9', '*'].map(renderButton)}
          </View>
          <View style={styles.buttonRow}>
            {['C', '0', '=', '/'].map(renderButton)}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseCalculator}>
            <Text style={styles.closeButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calcInput: {
    width: '76%',
    height: 60,
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 32,
    textAlign: 'right',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 10,
  },
  calcButton: {
    backgroundColor: '#8080D7',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
  },
  calcButtonText: {
    color: 'white',
    fontSize: 24,
  },
  closeButton: {
    backgroundColor: "#0B101F",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
  },
  stopwatchText: {
    fontSize: 32,
    textAlign: 'center',
  },
  stopwatchButton: {
    backgroundColor: '#8080D7',
    padding: 10,
    borderRadius: 5,
    marginLeft: 75,
    marginTop: 20,
    alignItems: 'center',
    margin: 5,
  },
  stopwatchButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Gadget;
