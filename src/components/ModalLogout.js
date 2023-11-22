import React from 'react';
import { View, Text, Pressable } from 'react-native';

const ModalLogout = ({ closeModal, logout, navigate }) => {
  const handleLogout = () => {
    logout();
    navigate('Login');
    closeModal();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Deseja realmente sair?</Text>
        <Pressable onPress={handleLogout} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white' }}>Logout</Text>
        </Pressable>
        <Pressable onPress={closeModal} style={{ marginTop: 10 }}>
          <Text style={{ color: 'blue' }}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ModalLogout;
