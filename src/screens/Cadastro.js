import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'; // Importe o axios corretamente
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Logastro = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched"
    });

    const [inputsRegister, setInputsRegister] = useState({
        use_name: "",
        use_email: "",
        use_password: "",
    });

    const [err, setErr] = useState("");

    const handleChangeRegister = (input, field, value) => {
        input(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmitRegister = async () => {
        try {
            const res = await axios.post("/api/register", inputsRegister);
            if (res.status === 200) {
                const token = res.data.token; // Assumindo que o token está no objeto de resposta
                await AsyncStorage.setItem('AccessToken', token);
                // O token foi salvo com sucesso em AsyncStorage
                console.log('Token salvo:', token);
                // Agora você pode redirecionar o usuário ou fazer outras ações necessárias
            } else {
                console.log('O registro não foi bem-sucedido.');
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data) {
                console.log(err.response.data);
                setErr(err.response.data);
            } else if (err.message === "Network Error") {
                setErr("Erro de rede. Verifique sua conexão com a internet.");
            } else {
                setErr("Ocorreu um erro inesperado");
            }
        }
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
                            placeholder="Nome de usuário"
                            onBlur={onBlur}
                            onChangeText={(text) => handleChangeRegister(setInputsRegister, "use_name", text)}
                            value={value}
                        />
                    )}
                    name="use_name"
                    rules={{ required: "Nome de usuário é obrigatório" }}
                />
                {errors.use_name && <Text style={styles.errorText}>{errors.use_name.message}</Text>}

                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            onBlur={onBlur}
                            onChangeText={(text) => handleChangeRegister(setInputsRegister, "use_email", text)}
                            value={value}
                        />
                    )}
                    name="use_email"
                    rules={{ required: "E-mail é obrigatório" }}
                />
                {errors.use_email && <Text style={styles.errorText}>{errors.use_email.message}</Text>}

                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="use_password"
                    rules={{ required: "Senha é obrigatória" }}
                />
                {errors.use_password && <Text style={styles.errorText}>{errors.use_password.message}</Text>}

                <Pressable
                    style={styles.button}
                    onPress={handleSubmit(handleSubmitRegister)}
                >
                    <Text style={styles.buttonText}>Register</Text>
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
