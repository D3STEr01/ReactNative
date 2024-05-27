import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthContextProvider } from '../contexts/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Start from '../screens/StartScreen';
import Perfil from '../screens/Perfil';
import Kanban from '../screens/kanban';
import Gadget from '../screens/Gadget';




const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <AuthContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Cadastro' component={Cadastro} />
        <Stack.Screen name='Kanban' component={Kanban} />
        <Stack.Screen name='Gadget' component={Gadget} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContextProvider>
  );
}

export default AppNavigation;