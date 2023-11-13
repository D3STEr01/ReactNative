import React from 'react';
import { View, Text, Pressable } from 'react-native';

const ModalLogout = ({ closeModal }) => {
  const handleLogout = () => {
    // Implemente a lógica de logout aqui
    // Exemplo: chame a API de logout e limpe os tokens de autenticação
    // Após o logout, você pode redirecionar para a tela de login ou fazer qualquer outra ação necessária

    // Feche a modal após o logout
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
