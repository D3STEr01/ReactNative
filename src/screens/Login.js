import React, { useState } from 'react';
import { View, Text, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCheckEmail = (text) => {
    setEmail(text);
  };

  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain whitespace.';
    }
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must have at least one number.';
    }
    const isValidLength = /^.{6,200}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be between 6 and 200 characters.';
    }

    return null;
  };

  const handleSubmitLogin = async (data) => {
    try {   
        await login(inputsLogin)
        navigate('/Home')
    } catch (err) {
        console.log(err)
        setErr("Houve um problema")
    }
}

  const handleRegister = () => {
    // Navegar para a tela de cadastro (Cadastro.js)
    navigation.navigate('Cadastro');
  };  

  return (
    <ImageBackground
      source={require('../../assets/images/image4.png')}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../assets/images/logo_nome.png')}
          style={{
            width: 150,
            height: 150,
          }}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => handleCheckEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        {/* A Pressable para o registro ainda está presente, mas requer a definição de handleRegister */}
          <Pressable onPress={handleRegister}>
            <Text className="mt-5">
              Não possui conta? Cadastre-se aqui!
            </Text>
          </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = {
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#010922',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
};
