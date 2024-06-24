import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon, Bars3Icon } from "react-native-heroicons/outline";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import ModalCreate from "../components/ButtonFrame";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateScreen({ navigation, route }) {
  const { title, description } = route.params;
  const { currentUser, logout } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const loadCards = async () => {
      try {
        const savedCards = await AsyncStorage.getItem('cards');
        if (savedCards !== null) {
          setCards(JSON.parse(savedCards));
        }
      } catch (error) {
        console.error("Failed to load cards from storage", error);
      }
    };
    loadCards();
  }, []);

  useEffect(() => {
    const saveCards = async (newCards) => {
      try {
        await AsyncStorage.setItem('cards', JSON.stringify(newCards));
      } catch (error) {
        console.error("Failed to save cards", error);
      }
    };
    saveCards(cards);
  }, [cards]);

  const handleCreate = (option) => {
    const newCards = [...cards, { id: cards.length, title: option }];
    setCards(newCards);
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCardPress = (card) => {
    if (!card || !card.title) return;

    if (card.title === "Kanban") {
      navigation.navigate('Kanban');
    } else if (card.title === "Notas") {
      navigation.navigate('Notas');
    } else if (card.title === "Checklist") {
      navigation.navigate('Checklist');
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
        style={{ paddingTop: hp(9) }}
      >
        {/* avatar and bell icon */}
        <View style={styles.header}>
          <Pressable onPress={toggleNavbar}>
            <Bars3Icon size={hp(4)} color="gray" />
          </Pressable>
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* title and description */}
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: hp(3), textAlign: 'center' }}>Titulo: {title}</Text>
          <Text style={{ fontSize: hp(2), textAlign: 'center' }}>Descrição: {description}</Text>
        </View>

        {/* search bar */}
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Pesquisar"
            placeholderTextColor={"gray"}
            style={styles.searchInput}
            onChangeText={handleSearch}
          />
          <View style={styles.searchIcon}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* main content */}
        {filteredCards.map((card) => (
          <Pressable key={card.id} style={styles.card} onPress={() => handleCardPress(card)}>
            <Text style={styles.cardText}>{card.title}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.floatingButtonContainer}>
        <Pressable onPress={toggleModal}>
          <View style={styles.floatingButton}>
            <Text style={styles.floatingButtonText}>+</Text>
          </View>
        </Pressable>
      </View>

      <ModalCreate
        isModalVisible={isModalVisible}
        buttonAction={handleCreate}
        onCancel={handleCancel}
      />

      <Navbar isVisible={isNavbarVisible} onClose={toggleNavbar} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "gray",
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  searchBar: {
    marginTop: 15,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 6,
    marginBottom: 25,
  },
  searchInput: {
    flex: 1,
    fontSize: hp(1.7),
  },
  searchIcon: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
  card: {
    backgroundColor: "#8080D7",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cardText: {
    color: "white",
    fontSize: hp(2),
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 16,
  },
  floatingButton: {
    backgroundColor: "#8080D7",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "white",
    fontSize: 24,
  },
});
