import { Text, StyleSheet, View, Button } from 'react-native'
import React, { useState } from 'react'
import ContadorScreen from './ContadorScreen';
import ButtonsySwitch from './ButtonsySwitch';
import TextInputyAlert from './TextInputyAlert';
import ImageBackgroundySplashScreen from './ImageBackgroundySplashScreen';
import ScrollView from './ScrollView';
import ActivityIndicator from './ActivityIndicator';
import FlatList from './FlatlList';
import Modal from './Modal';
import SectionList from './SectionList';
import Repaso1 from './Repaso1';

export default function MenuScreen() {
    const [screen, setScreen]= useState('menu');

    switch(screen){
        case 'contador':
            return <ContadorScreen></ContadorScreen>;
        case 'Buttons&Switch':
            return <ButtonsySwitch></ButtonsySwitch>;
        case 'TextInputyAlert':
            return <TextInputyAlert></TextInputyAlert>;
        case 'ImageBackgroundySplashScreen':
            return <ImageBackgroundySplashScreen></ImageBackgroundySplashScreen>;
        case 'ScrollView':
            return <ScrollView></ScrollView>;
        case 'ActivityIndicator':
            return <ActivityIndicator></ActivityIndicator>;
        case 'FlatList':
            return <FlatList></FlatList>;
        case 'Modal':
            return <Modal></Modal>;
        case 'SectionList':
            return <SectionList></SectionList>
        case 'Repaso1':
            return <Repaso1></Repaso1>
        case 'menu':
            default:
            return (
            <View style={styles.container}>
                <Text style={styles.menu1}>Menú de Prácticas</Text>
                <View style={styles.botonesContainer1}>
                <Button onPress={()=>setScreen('contador')} title='Pract: Contador'></Button>
                <Button onPress={()=>setScreen('Buttons&Switch')} title='Pract: Buttons & Switch'></Button>
                <Button onPress={()=>setScreen('TextInputyAlert')} title='Pract: Text Input & Alert'></Button>
                <Button onPress={()=>setScreen('ImageBackgroundySplashScreen')} title='Pract: Image Background & Splash Screen'></Button>
                <Button onPress={()=>setScreen('ScrollView')} title='Pract: Scroll View'></Button>
                <Button onPress={()=>setScreen('ActivityIndicator')} title='Pract: Activity Indicator'></Button>
                <Button onPress={()=>setScreen('FlatList')} title='Pract: Flat List'></Button>
                <Button onPress={()=>setScreen('Modal')} title='Pract: Modal'></Button>
                <Button onPress={()=>setScreen('SectionList')} title='Pract: SectionList'></Button>
                <Button onPress={()=>setScreen('Repaso1')} title='Repaso1'></Button>
                </View>
                </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#448b7aff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu1:{
        color: '#ff9900ff',
        fontSize:40,
        fontFamily:'Roboto',
        fontWeight:'bold',
        fontStyle:'italic',
        textDecorationLine:'underline',
    },
    botonesContainer1:{
        marginTop:20,
        flexDirection:'column',
        gap:20,
    },
});