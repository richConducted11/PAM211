import { Text, StyleSheet, View, Button, Alert, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'

export default function TextInputyAlert() {
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [comentario, setComentario] = useState('');
    const mostrarAlerta = ()=> {
    if ((nombre.trim()=== '') || (contrasena.trim()=== '') || (comentario.trim()=== '')) {
        if (Platform.OS === 'web') {
            window.alert('Error: por favor ingresa tu nombre, contraseña y el comentario');
        } else {
            Alert.alert('Error: por favor ingresa tu nombre, contraseña y el comentario');
        }
    }
    else {
        if  (Platform.OS === 'web'){
            window.alert(`HOLA ${nombre}`);
        } else {
            Alert.alert(`HOLA ${nombre}`);
        }
    }}
    return (
    <View style={styles.container}>
        <Text style={styles.titulo}>TextInputyAlert</Text>

        <TextInput 
        style={styles.recuadro}
        placeholder='Escribe tu nombre'
        value={nombre}
        onChangeText={setNombre}
        maxLenght={50}/>

        <TextInput
        style={styles.recuadro}
        placeholder='Escribe tu contraseña'
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry={true}
        keyboardType='numeric'
        maxLength={50}/>

        <TextInput
        style={styles.recuadro}
        placeholder='Escribe tu comentario'
        value={comentario}
        onChangeText={setComentario}
        maxLength={50}/>

        <Button color='blue' title='Mostrar saludo' onPress={mostrarAlerta}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'fff',
        padding: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    recuadro: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 20,
    },
});