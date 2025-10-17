import { Text, View, StyleSheet, FlatList } from 'react-native'

export default function FlatList_SectionList() {

    const datos = [
        { id: '1', nombre: 'Sentadillas', descripcion: 'Ejercicio para piernas y glúteos' },
        { id: '2', nombre: 'Press de Banca', descripcion: 'Ejercicio para pecho y tríceps' },
        { id: '3', nombre: 'Peso Muerto', descripcion: 'Ejercicio para espalda baja y piernas' },
        { id: '4', nombre: 'Dominadas', descripcion: 'Ejercicio para espalda y bíceps' },
        { id: '5', nombre: 'Press Militar', descripcion: 'Ejercicio para hombros' },
        { id: '6', nombre: 'Fondos', descripcion: 'Ejercicio para tríceps y pecho' },
        { id: '7', nombre: 'Remo con Barra', descripcion: 'Ejercicio para espalda media' },
        { id: '8', nombre: 'Curl de Bíceps', descripcion: 'Ejercicio para brazos' },
        { id: '9', nombre: 'Zancadas', descripcion: 'Ejercicio para piernas y equilibrio' },
        { id: '10', nombre: 'Plancha', descripcion: 'Ejercicio para abdominales y core' },
    ]

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.titulo}>{item.nombre}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ejemplo de FlatList</Text>
            <FlatList
                data={datos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={styles.separador} />}
            />
        </View>
    )
}

// Estilos del componente
const styles = StyleSheet.create({
    // Contenedor principal de la pantalla
    container: {
        flex: 1, // Ocupa todo el espacio disponible
        backgroundColor: '#f5f5f5', // Color de fondo gris claro
        paddingTop: 20, // Espacio superior
    },
    // Estilo del encabezado
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    // Estilo de cada elemento de la lista
    item: {
        backgroundColor: '#fff', // Fondo blanco
        padding: 15, // Espacio interno
        marginHorizontal: 10, // Márgenes laterales
    },
    // Estilo del título de cada ejercicio
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2196F3', // Azul
        marginBottom: 5,
    },
    // Estilo de la descripción
    descripcion: {
        fontSize: 14,
        color: '#666', // Gris oscuro
    },
    // Línea separadora entre elementos
    separador: {
        height: 1, // 1 pixel de altura
        backgroundColor: '#ddd', // Gris claro
        marginHorizontal: 10,
    },
})
