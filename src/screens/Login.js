import { View, Text, ScrollView, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';


export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  const handleLogin = () => {
    // Add your authentication logic here
    // For now, let's log the email and password
    console.log('E-mail:', email);
    console.log('Senha:', password);
  };

  const handleRegister = () => {
    // Navigate to the registration screen (Cadastro.js)
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
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          source={require('../../assets/images/logo_nome.png')}
          style={{
            width: 150,
            height: 150,
          }}
          resizeMode="contain"
        />
        <TextInput
          style={{
            width: '80%',
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 10,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
          }}
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={{
            width: '80%',
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 10,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
          }}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
        }}>
          <Pressable
            style={{
              backgroundColor: '#010922',
              paddingVertical: 8,
              paddingHorizontal: 30,
              borderRadius: 10,
              flex: 1,
              marginRight: 5,
            }}
            onPress={handleLogin}
          >
            <Text style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>Login</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: '#010922',
              paddingVertical: 8,
              paddingHorizontal: 30,
              borderRadius: 10,
              flex: 1,
              marginLeft: 5,
            }}
            onPress={handleRegister}
          >
            <Text style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>Cadastrar</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
