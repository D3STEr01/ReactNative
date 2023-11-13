import React, { useState } from 'react';
import { View, Text, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from '../api/axios';

const Logastro = ({ navigation }) => {
    
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched"
    });

    const [inputsRegister, setInputsRegister] = useState({
        use_name: "",
        use_email: "",
        use_password: "",
        use_createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    });

    const [err, setErr] = useState("");

    const handleChangeRegister = (data) => {
        setInputsRegister(prev => ({
            ...prev,
            use_name: data.use_name,
            use_email: data.use_email,
            use_password: data.use_password
        }));
    };

    const handleSubmitRegister = async (data) => {
        handleChangeRegister(data);
        try {
            console.log("Sending request with inputsRegister:", inputsRegister);
            const res = await axios.post("/api/register", inputsRegister);
            if (res && res.data) {
                console.log("Response from API:", res.data);
                // Navigate to the login screen upon successful registration
                navigation.navigate('Login');
            } else {
                console.log("Response was empty or without data.");
            }
        } catch (err) {
            console.log(err);
            setErr(err.response?.data || "An error occurred.");
        }
    };

    const handleLoginPress = () => {
        // Navigate to the registration screen
        // Replace 'Register' with the actual name of your registration screen
        navigation.navigate('Login');
      };
    
    return (
        <ImageBackground
            source={require('../../assets/images/image4.png')}
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('../../assets/images/logo_nome.png')}
                    style={{
                        width: 150,
                        height: 150,
                    }}
                    resizeMode="contain"
                />

                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="use_name"
                    rules={{ required: "Username is required" }}
                />

                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="use_email"
                    rules={{ required: "Email is required" }}
                />

                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="use_password"
                    rules={{ required: "Password is required" }}
                />
                {errors.use_password && <Text style={styles.errorText}>{errors.use_password.message}</Text>}

                <Pressable
                    style={styles.button}
                    onPress={handleSubmit(handleSubmitRegister)}
                >
                    <Text style={styles.buttonText} type="submit">Register</Text>
                </Pressable>

                <Pressable onPress={handleLoginPress}>
                    <Text className="mt-5 text-lg text-white tracking-widest">
                        Voltar
                    </Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
};

const styles = {
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#010922',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginRight: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
    },
};

export default Logastro;
