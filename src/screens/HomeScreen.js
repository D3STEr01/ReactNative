import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, Pressable, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import axios from 'axios';
import ModalLogout from '../components/ModalLogout'; // Importe o componente ModalLogout


export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{ paddingTop: hp(14) }}
      >
        {/* avatar and bell icon */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginBottom: 10 }}>
          <Pressable onPress={toggleModal}>
            <Image source={require('../../assets/images/avatar.png')} style={{ height: hp(5), width: hp(5.5), borderRadius: hp(2.75) }} />
          </Pressable>
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings and punchline */}
        <View style={{ marginHorizontal: 16, marginBottom: 10 }}>
          <Text style={{ fontSize: hp(1.7), color: 'gray' }}>Hello, Noman!</Text>
          <Text style={{ fontSize: hp(3.8), fontWeight: 'bold', color: 'gray' }}>Olá, é bom ver você por aqui!</Text>
        </View>

        {/* search bar */}
        <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 6 }}>
          <TextInput
            placeholder='Pesquisar'
            placeholderTextColor={'gray'}
            style={{ flex: 1, fontSize: hp(1.7) }}
          />
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 8 }}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        <View>
          <Text>AAAAAAAAAAA</Text>
        </View>

        {/* Modal de Logout */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <ModalLogout closeModal={toggleModal} />
        </Modal>
      </ScrollView>
    </View>
  );
}
