import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.iconRow}>
                <Ionicons name="home-outline" size={60} color="red" />
                <Text style={styles.title}>Bienvenido a la pantalla principal</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    iconRow: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20, 
        textAlign: 'center',
        color: 'red',
    },
});