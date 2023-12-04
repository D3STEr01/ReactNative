import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { AuthContext } from "../contexts/AuthContext";
import CardComponent from "../components/card";
import ModalCreate from "../components/ModalCreate";
import Navbar from "../components/Navbar";

export default function HomeScreen() {
  const { currentUser, logout } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [cards, setCards] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };

  const handleCreateCard = (title, description) => {
    if (title && description) {
      const newCard = { title, description };
      setCards([newCard, ...cards]); // Add the new card to the beginning of the array
      setModalVisible(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
        style={{ paddingTop: hp(14) }}
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
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5), borderRadius: hp(2.75) }}
          />
          </Pressable>
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings and punchline */}
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
            {cards.map((card, index) => (
              <CardComponent
                key={index}
                title={card.title}
                description={card.description}
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
      />
      <Navbar
       isVisible={isNavbarVisible}
        onClose={toggleNavbar}
      />
      
    </View>
  );
}
