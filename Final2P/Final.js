import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions, ActivityIndicator, ScrollView, Button, Alert, Platform } from 'react-native';

const SplashBackgroundImage = require("./assets/UPQ.png");

const clima = [
    { id: 1, titulo: 'Ciudad: El Marqués ☀️', descripcion: 'Temperatura: 30°C, Soleado ☀️' },
    { id: 2, titulo: 'Ciudad: Querétaro 🌩️', descripcion: 'Temperatura: 28°C, Cielo Nublado 🌩️' },
    { id: 3, titulo: 'Ciudad: San Juan del Río 🌧️', descripcion: 'Temperatura: 20°C, Llovizna 🌧️' },
    { id: 4, titulo: 'Ciudad: Corregidora ⛅', descripcion: 'Temperatura: 10°C, Neblina ligera ⛅' },
]
export default function Final() {
    const [screen, setScreen] = useState('splash');

    useEffect(() => {
        if (screen === 'splash') {
            const timer = setTimeout(() => {
                setScreen('main');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [screen]);

    const DetallesClima = (item) => {
        const titulo = item.titulo;
        const mensaje = item.descripcion;

        if (Platform.OS === 'web') {
            window.alert(`${titulo}\n${mensaje}`);
        } else {
            Alert.alert(titulo, mensaje);
        }
    };

    const renderizarSplash = () => (
        <ImageBackground source={SplashBackgroundImage} style={styles.background}>
            <View style={styles.overlay}>
                <Text style={styles.title}>WeatherUPQ</Text>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        </ImageBackground>
    );

    const renderizarMain = () => (
        <View style={styles.mainContainer}>
            <Text style={styles.mainTitle}>Clima Actual</Text>
            <Text style={styles.subtitulo}>08/12/2025 en la ciudad de El Marqués</Text>
            <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
                {clima.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Image source={item.source} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{item.titulo}</Text>
                        <Button title="Ver más detalles" onPress={() => DetallesClima(item)} />
                    </View>
                )
                )}
            </ScrollView>
        </View>
    );

    switch (screen) {
        case 'splash':
            return renderizarSplash();
        case 'main':
            return renderizarMain();
        default:
            return renderizarSplash();
    }
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    mainContainer: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#f0f0f0',
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    scrollArea: {
        flex: 1,
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    card: {
        width: width * 0.9,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginBottom: 20,
        padding: 15,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});

