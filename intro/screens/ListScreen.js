import { Text, StyleSheet, View, FlatList, SectionList } from 'react-native'

export default function ListScreen() {
    // Datos para la lista simple
    const ejercicios = [
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

    // Datos para la lista por secciones
    const contactos = [
        { titulo: 'A', data: ['Alejandra', 'Ana la de las tortillas', 'Adele'] },
        { titulo: 'M', data: ['Mecánico', 'Mi ex', 'Mamá de mi ex'] },
        { titulo: 'T', data: ['TheWillyrex', 'Tulio Triviño', 'Trebor'] },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <Text style={styles.titulo}>Lista de Ejercicios</Text>
                <FlatList
                    data={ejercicios}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <Text style={styles.nombre}>{item.nombre}</Text>
                            <Text style={styles.descripcion}>{item.descripcion}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.listContainer}>
                <Text style={styles.titulo}>Contactos</Text>
                <SectionList
                    sections={contactos}
                    // renderItem: Mostrar elementos individuales en una lista
                    renderItem={({item}) => (
                        <Text style={styles.item}>{item}</Text>
                    )}
                    // renderSectionHeader = renderizar el cabecero de section list
                    renderSectionHeader={({section}) => (
                        <Text style={styles.header}>{section.titulo}</Text>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    listContainer: {
        flex: 1,
        marginBottom: 20,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    item: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    nombre: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    descripcion: {
        fontSize: 14,
        color: '#666',
    },
    header: {
        fontSize: 18,
        backgroundColor: '#e0e0e0',
        padding: 10,
        marginTop: 10,
    }
})