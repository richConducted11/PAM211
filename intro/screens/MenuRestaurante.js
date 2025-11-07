import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView, Button, Alert, Platform, Image } from 'react-native';

const BackgroundImage = require('./assets/restaurante.jpg');

const platosPrincipales = [
    { id: '1', nombre: 'Tacos al Pastor', descripcion: 'Orden de 5 con todo', precio: 85.00, imagen: require('./assets/tacospastor.jpg') },
    { id: '2', nombre: 'Gringa de Sirloin', descripcion: 'Tortilla de harina, queso y sirloin', precio: 95.00, imagen: require('./assets/gringas.jpg') },
    { id: '3', nombre: 'Carne Asada', descripcion: '250g de arrachera con guarnición', precio: 180.50, imagen: require('./assets/carneasada.jpeg') }
];

const bebidas = [
    { id: '4', nombre: 'Horchata', descripcion: 'Vaso de 500ml', precio: 30.00, imagen: require('./assets/horchata.jpeg') },
    { id: '5', nombre: 'Coca-Cola', descripcion: 'Lata de 355ml', precio: 25.00, imagen: require('./assets/coca.jpg') }
];

const postres = [
    { id: '6', nombre: 'Flan Napolitano', descripcion: 'Rebanada individual', precio: 50.00, imagen: require('./assets/flan.jpg') },
    { id: '7', nombre: 'Pastel de Chocolate', descripcion: 'Rebanada con fudge', precio: 60.00, imagen: require('./assets/pastel.jpg') }
];

export default function MenuRestaurante() {

    const handleOrdenar = (platillo) => {
        const mensaje = `${platillo.nombre} - $${platillo.precio.toFixed(2)}`;

        if (Platform.OS === 'web') {
            const confirmar = window.confirm(`Confirmar orden\n\n${mensaje}`);
            if (confirmar) {
            }
        } else {
            Alert.alert(
                'Confirmar orden',
                mensaje,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Confirmar', onPress: () => { } }
                ]
            );
        }
    };

    const renderPlatillo = (item) => (
        <View key={item.id} style={styles.platilloCard}>
            <Image source={item.imagen} style={styles.platilloImagen} />
            <View style={styles.platilloInfo}>
                <Text style={styles.platilloNombre}>{item.nombre}</Text>
                <Text style={styles.platilloDesc}>{item.descripcion}</Text>
                <Text style={styles.platilloPrecio}>${item.precio.toFixed(2)}</Text>
            </View>
            <Button title="Ordenar" onPress={() => handleOrdenar(item)} color="#007AFF" />
        </View>
    );

    return (
        <ImageBackground source={BackgroundImage} style={styles.background} resizeMode='cover'>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitulo}>Tacos la Culichi</Text>
                    <Text style={styles.headerDesc}>Los mejores tacos y antojitos del mundo.</Text>
                </View>

                <Text style={styles.categoriaTitulo}>Platos Principales</Text>
                {platosPrincipales.map(renderPlatillo)}

                <Text style={styles.categoriaTitulo}>Bebidas</Text>
                {bebidas.map(renderPlatillo)}

                <Text style={styles.categoriaTitulo}>Postres</Text>
                {postres.map(renderPlatillo)}

            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollContent: {
        paddingHorizontal: 10,
        paddingBottom: 40,
    },
    header: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 20,
        paddingHorizontal: 15,
        paddingTop: 40,
        marginHorizontal: -10,
    },
    headerTitulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    headerDesc: {
        fontSize: 16,
        color: '#eee',
        textAlign: 'center',
        marginTop: 5,
    },
    categoriaTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'rgba(40, 40, 40, 0.8)',
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 5,
    },
    platilloCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 8,
        padding: 10,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    platilloImagen: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 10,
        resizeMode: 'cover',
    },
    platilloInfo: {
        flex: 1,
        marginRight: 10,
    },
    platilloNombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    platilloDesc: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    platilloPrecio: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 8,
    },
});