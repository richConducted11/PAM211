import { Text, StyleSheet, View, Button } from 'react-native'
import React, { useState } from 'react'
import ContadorScreen from './ContadorScreen';
import ButtonsySwitch from './ButtonsySwitch';
import TextInputyAlert from './TextInputyAlert';
import ImageBackgroundySplashScreen from './ImageBackgroundySplashScreen';
import ScrollViewScreen from './ScrollViewScreen';
import ActivityScreen from './ActivityScreen';
import ListScreen from './ListScreen';
import Modal from './Modal';
import Repaso1 from './Repaso1';
import MenuRestaurante from './MenuRestaurante';

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
        case 'ScrollViewScreen':
            return <ScrollViewScreen></ScrollViewScreen>;
        case 'ActivityScreen':
            return <ActivityScreen></ActivityScreen>;
        case 'ListScreen':
            return <ListScreen></ListScreen>;
        case 'Modal':
            return <Modal></Modal>;
        case 'Repaso1':
            return <Repaso1></Repaso1>;
        case 'MenuRestaurante':
            return <MenuRestaurante></MenuRestaurante>
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
                <Button onPress={()=>setScreen('ScrollViewScreen')} title='Pract: Scroll View'></Button>
                <Button onPress={()=>setScreen('ActivityScreen')} title='Pract: Activity Indicator'></Button>
                <Button onPress={()=>setScreen('ListScreen')} title='Pract: Flat List y Section List'></Button>
                <Button onPress={()=>setScreen('Modal')} title='Pract: Modal'></Button>
                <Button onPress={()=>setScreen('Repaso1')} title='Repaso1'></Button>
                <Button onPress={()=>setScreen('MenuRestaurante')} title='MenuRestaurante'></Button>
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