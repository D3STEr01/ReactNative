import React from "react";
import { View, Text, Button, Pressable, } from "react-native";
import Modal from "react-native-modal";

function ModalError({ isModalVisible, buttonAction }) {
  return (
    <Modal isVisible={isModalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: "80%",
            height: "20%",

          }}
        >
          <Text
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Email ou senha incorretos
          </Text>
          <Pressable style={styles.button} onPress={buttonAction} title={"OK"}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </Pressable>
        </View>
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

export default ModalError;
