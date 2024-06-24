import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import COLORS from '../constants/colors'
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ModalCreate = ({ isModalVisible, buttonAction, onCancel }) => {
    const [menuVisible, setMenuVisible] = useState(false);


  const handleOptionPress = (option) => {
    buttonAction(option);
    setMenuVisible(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={{ backgroundColor: "white", padding: 16, borderRadius: 10 }}>
        <Text
          style={{
            fontSize: hp(2),
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: hp(2),
          }}
        >
          Funcionalidades
        </Text>
        <View>
              {["Kanban", "Notas", "Checklist"].map((option) => (
                <Pressable
                style={{
                    height: hp(7),
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: hp(1),
                    marginBottom: hp(2),
                    paddingHorizontal: hp(2),
                    backgroundColor: "white",
                    justifyContent: 'center',
                    
                  }}
                  key={option}
                  onPress={() => handleOptionPress(option)}
                >
                  <Text 
                  style={{
                    textAlign:'center',
                    fontSize: hp(3),
                    
                  }}
                  >{option}</Text>
                </Pressable>
              ))}
        </View>
        <Pressable onPress={handleCancel}>
          <Text
          style={{
            marginTop: hp(2),
            backgroundColor: COLORS.primary,
            paddingVertical: hp(1),
            paddingHorizontal: hp(4),
            borderRadius: hp(1),
            marginRight: hp(1),
            textAlign: 'center',
            color: 'white',
            fontSize: hp(2),
          }}
          >
            Cancelar
          </Text>
        </Pressable>

      </View>
    </Modal>
  );
};

export default ModalCreate;
