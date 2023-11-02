import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function Feed({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('E-mail:', email);
    console.log('Senha:', password);
  };

  const handleRegister = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <div className="bg-cover min-h-screen flex items-center justify-center bg-image4">
      <div className="w-full max-w-xs bg-white p-6 rounded-lg">
        <img
          src={require('../../assets/images/logo_nome.png')}
          className="w-24 h-24 mx-auto mb-6"
          alt="Logo"
        />
        <input
          type="text"
          className="w-full h-10 border rounded-lg mb-4 px-2"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="w-full h-10 border rounded-lg mb-4 px-2"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="flex space-x-4">
          <button
            className="w-1/2 bg-blue-900 text-white p-2 rounded-lg"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="w-1/2 bg-blue-900 text-white p-2 rounded-lg"
            onClick={handleRegister}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
