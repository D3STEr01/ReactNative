import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { AuthContext } from "../contexts/AuthContext";
import CardComponent from "../components/card";

export default function HomeScreen() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
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
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5), borderRadius: hp(2.75) }}
          />
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

        {/* main conteudo */}
        <View style={{ flex: 1 }}>
          {/* main conteudo */}
          <View style={{ marginHorizontal: 16 }}>
            <CardComponent title="Area 1" description="Fatec" />
            <CardComponent title="Area 2" description="Trabalho" />
            <CardComponent title="Area 3" description="Pessoal" />
            <CardComponent title="Area 4" description="Pessoal" />
            <CardComponent title="Area 5" description="Pessoal" />
            <CardComponent title="Area 6" description="Pessoal" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
