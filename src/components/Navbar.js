// Navbar.js
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BackwardIcon } from 'react-native-heroicons/outline';

const Navbar = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={{ margin: 0 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 16,
          width: '50%',
        }}
      >
        {/* Avatar and close button */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5), borderRadius: hp(2.75) }}
          />
          <TouchableOpacity onPress={onClose} style={{ borderRadius: 50, padding: 10, backgroundColor: "#8080D7" }}>
            <BackwardIcon size={hp(3.5)} color="white" />
          </TouchableOpacity>
        </View>

        {/* Navbar content goes here */}
        <View style={{ alignItems: 'center', marginTop: 40, }}>
          <Text style={{ fontSize: hp(3), fontWeight: "bold", color: "gray", marginBottom: 20 }}>Menu</Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: '80%', marginBottom: 20 }} />
          {/* Add more navbar items here */}
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Compatilhados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Calendario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Gadgets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Configuração</Text>
          </TouchableOpacity>
          {/* Add more items as needed */}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 200 }}>
        <TouchableOpacity style={styles.sairItem}>
            <Text style={styles.menuText}>sair</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={{ borderRadius: 50, padding: 10, backgroundColor: "#8080D7" }}>
            <BackwardIcon size={hp(3.5)} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
    menuItem: {
      width: '85%',
      borderRadius: 10,
      marginBottom: 20,
      padding: 10,
      backgroundColor: "#8080D7",
    },
    sairItem:{
        marginTop: 20,
        width: '60%',
        borderRadius: 10,
        marginBottom: 20,
        padding: 7,
        backgroundColor: "#8080D7",
    },
    menuText: {
      fontSize: hp(2.5),
      color: "white",
      textAlign: 'center',
    },
  };

export default Navbar;
