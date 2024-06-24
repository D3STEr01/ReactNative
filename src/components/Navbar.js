import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BackwardIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

const Navbar = ({ isVisible, onClose }) => {
  const navigation = useNavigation();

  const handleProfileNavigation = () => {
    navigation.navigate('Perfil');
    onClose();
  };

  const handleGadgetNavigation = () => {
    navigation.navigate('Gadget');
    onClose();
  };

  const handleHomeNavigation = () => {
    navigation.navigate('Home');
    onClose();
  };

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
          width: '60%',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          <TouchableOpacity onPress={handleHomeNavigation}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={{ height: hp(5), width: hp(5.5), borderRadius: hp(2.75) }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={{ borderRadius: 50, padding: 10 }}>
            <BackwardIcon size={hp(3.5)} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginTop: 40, }}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Compatilhados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Calendario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleGadgetNavigation}>
            <Text style={styles.menuText}>Gadgets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleProfileNavigation}>
            <Text style={styles.menuText}>Configuração</Text>
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
  },
  sairItem: {
    marginTop: 20,
    width: '60%',
    borderRadius: 10,
    marginBottom: 20,
    padding: 7,
    backgroundColor: "#8080D7",
  },
  menuText: {
    fontSize: hp(2.5),
    color: "black",
    textAlign: 'center',
  },
};

export default Navbar;
