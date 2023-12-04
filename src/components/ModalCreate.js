import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ModalCreate = ({ isModalVisible, buttonAction }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleConfirm = () => {
    if (title && description) {
      buttonAction(title, description);
      // Clear input fields
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={{ backgroundColor: "white", padding: 16 }}>
        <Text style={{ fontSize: hp(2), fontWeight: "bold", textAlign: "center", marginBottom: hp(2) }}>
          Criar Área
        </Text>
        <TextInput
          style={{ height: hp(7), border: "2px solid gray", borderRadius: hp(2), marginBottom: hp(2), paddingHorizontal: hp(2), backgroundColor: "white" }}
          placeholder="Título"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={{ height: hp(7), border: "2px solid gray", borderRadius: hp(2), marginBottom: hp(2), paddingHorizontal: hp(2), backgroundColor: "white" }}
          placeholder="Descrição"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Pressable
          style={{
            marginTop: hp(2),
            backgroundColor: "#010922",
            paddingVertical: hp(1),
            paddingHorizontal: hp(4),
            borderRadius: hp(1),
            marginRight: hp(1),
          }}
          onPress={handleConfirm}
        >
          <Text style={{ color: "#fff", fontSize: hp(1.5), fontWeight: "bold", textAlign: "center" }}>
            Confirmar
          </Text>
        </Pressable>
        <Pressable onPress={() => buttonAction("")}>
          <Text style={{ fontSize: hp(1.5), fontWeight: "bold", color: "gray", textAlign: 'center', marginTop: hp(2) }}>
            Cancelar
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default ModalCreate;
