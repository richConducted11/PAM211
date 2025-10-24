import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, Dimensions, TextInput, Switch, TouchableOpacity, Alert, Platform } from 'react-native';

const BackgroundImage = require("../assets/images.jpg");
const LogoImage = require("../assets/Montanas.jpg");

export default function Repaso1() {
    
    const [view, setView] = useState('splash');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [terminos, setTerminos] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setView('form');
        }, 3000); 

        return () => clearTimeout(timer);
    }, []);

    const handleRegistro = () => {
        
        if (nombre.trim() === '' || correo.trim() === '') {
            if (Platform.OS === 'web') {
                window.alert('Error: Por favor completa todos los campos.');
            } else {
                Alert.alert('Error', 'Por favor completa todos los campos.');
            }
            return;
        }

        if (!correo.includes('@')) {
            if (Platform.OS === 'web') {
                window.alert('Error: No se acepta correos sin @.');
            } else {
                Alert.alert('Error', 'No se acepta correos sin @.');
            }
            return;
        }

        if (!terminos) { 
            if (Platform.OS === 'web') {
                window.alert('Términos no aceptados: Debes aceptar los términos y condiciones.');
            } else {
                Alert.alert('Términos no aceptados', 'Debes aceptar los términos y condiciones.');
            }
            return;
        }

        const mensaje = `Nombre: ${nombre}\nEmail: ${correo}`;
        if (Platform.OS === 'web') {
            window.alert(`Registro exitoso\n${mensaje}`);
        } else {
            Alert.alert('Registro exitoso', mensaje);
        }
        
        setNombre('');
        setCorreo('');
        setTerminos(false);
    };

    return (
        <ImageBackground
            source={BackgroundImage}
            style={styles.background}
            resizeMode='cover'
        >
            {view === 'splash' && (
                <View style={styles.overlay}>
                    <Image source={LogoImage} style={styles.splashLogo} />
                    <Text style={styles.title}>Bienvenido</Text>
                    <Text style={styles.title}>Cargando...</Text>
                </View>
            )}

            {view === 'form' && (
                <View style={styles.overlay}> 
                    <View style={styles.formContainer}>
                        <Image source={LogoImage} style={styles.formLogo} />
                        <Text style={styles.formTitle}>Registro de Usuario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre completo"
                            placeholderTextColor="#999"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#999"
                            value={correo}
                            onChangeText={setCorreo}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchText}>Aceptar términos y condiciones</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={terminos ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={setTerminos}
                                value={terminos}
                            />
                        </View>
                        <TouchableOpacity onPress={handleRegistro}>
                            <Text style={styles.registerButton}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ImageBackground>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    background: {
        width: width,
        height: height,
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    splashLogo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        padding: 25,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    formLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 25,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        width: '100%',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        width: '100%',
    },
    switchText: {
        color: '#fff',
        fontSize: 16,
    },
    registerButton: {
        color: '#4dabf7',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
});