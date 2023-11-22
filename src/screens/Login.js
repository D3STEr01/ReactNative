import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import ModalError from "../components/modalError";

const LoginScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  const { login } = useContext(AuthContext);

  const [inputsLogin, setInputsLogin] = useState({
    email_login: "",
    password_login: "",
  });

  const [err, setErr] = useState("");

  const handleChangeLogin = (value, name) => {
    console.log(value);
    setInputsLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitLogin = async (data) => {
    try {
      await login(inputsLogin);
      navigation.navigate("Home");
      console.log('boa mlk')
    } catch (err) {
      console.log(err);
      setIsModalVisible(true);
      setErr(err.response?.data || "An error occurred.");
      console.log("Server response:", err.response?.data);
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate("Cadastro");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/image4.png")}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/logo_nome.png")}
          style={{
            width: 150,
            height: 150,
          }}
          resizeMode="contain"
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => handleChangeLogin(text.toLowerCase(), "email_login")}
          value={inputsLogin.email_login}
        />

        <TextInput
          placeholder="Senha"
          style={styles.input}
          onChangeText={(text) => handleChangeLogin(text, "password_login")}
          value={inputsLogin.password_login}
          secureTextEntry={true}
        />
        <ModalError
          isModalVisible={isModalVisible}
          buttonAction={() => setIsModalVisible(false)}
        />
        <Pressable style={styles.button} onPress={handleSubmitLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable onPress={handleRegisterPress}>
          <Text className="mt-5 text-lg text-white tracking-widest">
            Cadastrar-se
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = {
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
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
  errorText: {
    color: "red",
  },
};

export default LoginScreen;
