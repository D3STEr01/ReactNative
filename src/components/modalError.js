import React from "react";
import { View, Text, Button } from "react-native";
import Modal from "react-native-modal";

function ModalError({ isModalVisible, buttonAction }) {
  return (
    <Modal isVisible={isModalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: "80%",
            height: "15%",

          }}
        >
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Email ou senha incorretos
          </Text>
          <Button onPress={buttonAction} title={"OK"} />
        </View>
      </View>
    </Modal>
  );
}

export default ModalError;
