import React from "react";
import { View, Text, Button, Pressable, TextInput } from "react-native";
import Modal from "react-native-modal";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

function ModalCreate({ isModalVisible, buttonAction }) {
  return (
    <Modal isVisible={isModalVisible}>
      <View className="bg-white p-4">
        <Text className="text-2xl text-center mb-4">Criar Area</Text>
        <TextInput
          style="w-full h-40 border-2 border-gray-300 rounded-md mb-4 px-4 bg-white"
          placeholder="Titulo"
        />
        <TextInput
          style="w-full h-40 border-2 border-gray-300 rounded-md mb-4 px-4 bg-white"
          placeholder="Descrição"
        />
        <Pressable style={styles.button} onPress={buttonAction} title={"OK"}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </Pressable>
        <Pressable  onPress={buttonAction} title={"OK"}>
        <Text style={{ fontSize: hp(2), fontWeight: "bold", color: "gray", textAlign: 'center', marginTop:10 }}>Cancelar</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
const styles = {
  button: {
    marginTop: 20,
    backgroundColor: "#010922",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginRight: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default ModalCreate;
