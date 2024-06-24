import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon, Bars3Icon } from "react-native-heroicons/outline";
import { AuthContext } from "../contexts/AuthContext";
import CardComponent from "../components/card";
import ModalCreate from "../components/ModalCreate";
import Navbar from "../components/Navbar";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const { currentUser, logout } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    if (!searchText) {
      setFilteredCards(cards);
    } else {
      const filtered = cards.filter(card =>
        card.title.toLowerCase().includes(searchText.toLowerCase()) ||
        card.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [searchText, cards]);

  const loadCards = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const loadedCards = result.map(req => JSON.parse(req[1]));
      setCards(loadedCards);
      setFilteredCards(loadedCards);
    } catch (error) {
      console.error('Failed to load cards', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = cards.filter(card =>
      card.title.toLowerCase().includes(text.toLowerCase()) ||
      card.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCards(filtered);
  };
  

  const saveCard = async (card) => {
    try {
      const cardKey = `card_${new Date().getTime()}`;
      await AsyncStorage.setItem(cardKey, JSON.stringify(card));
      setCards([card, ...cards]);
    } catch (error) {
      console.error('Failed to save card', error);
    }
  };

  const deleteCard = async (card) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      for (const key of keys) {
        const item = await AsyncStorage.getItem(key);
        if (item && JSON.parse(item).title === card.title && JSON.parse(item).description === card.description) {
          await AsyncStorage.removeItem(key);
          break;
        }
      }
      setCards(cards.filter(c => c.title !== card.title || c.description !== card.description));
    } catch (error) {
      console.error('Failed to delete card', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };

  const handleCreateCard = (title, description) => {
    if (title && description) {
      const newCard = { title, description };
      saveCard(newCard);
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCardPress = (title, description) => {
    navigation.navigate('Frames', { title, description });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
        style={{ paddingTop: hp(9) }}
      >
        {/* avatar and bell icon */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 16,
            marginBottom: 10,
          }}
        >
          <Pressable onPress={toggleNavbar}>
            <Bars3Icon size={hp(4)} color="gray" />
          </Pressable>
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings */}
        <View style={{ marginHorizontal: 16, marginBottom: 10 }}>
          <Text style={{ fontSize: hp(2), color: "gray" }}>
            Olá, {currentUser?.use_name}!
          </Text>
          <Text style={{ fontSize: hp(3), fontWeight: "bold", color: "gray" }}>
            É bom ver você por aqui!
          </Text>
        </View>

        {/* search bar */}
        <View
          style={{
            marginHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            padding: 6,
            marginBottom: 25,
          }}
        >
          <TextInput
            placeholder="Pesquisar"
            placeholderTextColor={"gray"}
            style={{ flex: 1, fontSize: hp(1.7) }}
            onChangeText={handleSearch}
          />
          <View
            style={{ backgroundColor: "white", borderRadius: 20, padding: 8 }}
          >
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* main content */}
        <View style={{ flex: 1 }}>
          <View>
            <Text style={{ fontSize: hp(2.5), fontWeight: "bold", color: "gray", textAlign:'center', marginBottom:10 }}>
              Áreas de trabalho
            </Text>
          </View>
          <View style={{ marginHorizontal: 16 }}>
            {/* Render existing cards */}
            {searchText ? filteredCards.map((card, index) => (
              <CardComponent
                key={index}
                title={card.title}
                description={card.description}
                onDelete={() => deleteCard(card)}
                onPress={() => handleCardPress(card.title, card.description)}
              />
            )) : cards.map((card, index) => (
              <CardComponent
                key={index}
                title={card.title}
                description={card.description}
                onDelete={() => deleteCard(card)}
                onPress={() => handleCardPress(card.title, card.description)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={{ position: "absolute", bottom: 20, left: "auto", right: 16 }}
      >
        <Pressable onPress={toggleModal}>
          <View
            style={{
              backgroundColor: "#8080D7",
              width: 70,
              height: 70,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 24 }}>+</Text>
          </View>
        </Pressable>
      </View>
      <ModalCreate
        isModalVisible={isModalVisible}
        buttonAction={handleCreateCard}
        onCancel={handleCancel}
      />
      <Navbar
        isVisible={isNavbarVisible}
        onClose={toggleNavbar}
      />
    </View>
  );
}
