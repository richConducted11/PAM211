import { Text, View, StyleSheet, Image, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react';

const BackgroundImage = require("../assets/restaurante.jpg")
export default function MenuRestaurante() {
    const [View, setView]=useState('splash');
    return (
        <ImageBackground source={BackgroundImage} style={styles.background} resizeMode='cover'>
        <View style={styles.container}>
        <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
        <Text style={styles.title}>Menú</Text>
        <Text>MenuRestaurante</Text>
        <Text>MenuRestaurante</Text>
        <Text>MenuRestaurante</Text>
        <Text>MenuRestaurante</Text>
        <Text>MenuRestaurante</Text>
        <Text>MenuRestaurante</Text>
        <Text>MenuRestaurante</Text>
        <Text>MenuRestaurante</Text>
        </ScrollView>
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollArea: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffd700',
        textAlign: 'center',
        marginBottom: 20,
    },
    background: {
        width: width,
        height: height,
        flex: 1,
    }
})