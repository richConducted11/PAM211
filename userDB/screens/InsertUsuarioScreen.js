import { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
// Importamos el controlador que acabamos de crear
import { UsuarioController } from '../controllers/UsuarioController';

// Creamos la instancia del controlador
const controller = new UsuarioController();

export default function InsertUsuarioScreen() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);

    // Función para cargar usuarios desde la BD
    const cargarUsuarios = useCallback(async () => {
        try {
            setLoading(true);
            const data = await controller.obtenerUsuarios();
            setUsuarios(data);
            console.log(`${data.length} usuarios cargados`);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // useEffect para inicializar la BD y escuchar cambios
    useEffect(() => {
        const init = async () => {
            try {
                await controller.initialize();
                await cargarUsuarios();
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'No se pudo inicializar la base de datos');
            }
        };

        init();

        // Suscribirse a los cambios automáticos (Observer)
        controller.addListener(cargarUsuarios);

        // Limpiar la suscripción al salir
        return () => {
            controller.removeListener(cargarUsuarios);
        };
    }, [cargarUsuarios]);

    // Función para guardar un nuevo usuario
    const handleAgregar = async () => {
        if (guardando) return;
        
        try {
            setGuardando(true);
            const usuarioCreado = await controller.crearUsuario(nombre);
            Alert.alert('Usuario Creado', `"${usuarioCreado.nombre}" guardado con ID: ${usuarioCreado.id}`);
            setNombre(''); // Limpiar el campo de texto
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setGuardando(false);
        }
    };

    // Renderizar cada elemento de la lista
    const renderUsuario = ({ item, index }) => (
        <View style={styles.userItem}>
            <View style={styles.userNumber}>
                <Text style={styles.userNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.nombre}</Text>
                <Text style={styles.userId}>ID: {item.id}</Text>
                <Text style={styles.userDate}>
                    {new Date(item.fechaCreacion).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <Text style={styles.title}>INSERT & SELECT</Text>
            <Text style={styles.subtitle}>
                {Platform.OS === 'web' ? 'WEB (LocalStorage)' : `${Platform.OS.toUpperCase()} (SQLite)`}
            </Text>

            {/* Zona del INSERT */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Insertar Usuario</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe el nombre del usuario"
                    value={nombre}
                    onChangeText={setNombre}
                    editable={!guardando}
                />
                <TouchableOpacity 
                    style={[styles.button, guardando && styles.buttonDisabled]} 
                    onPress={handleAgregar}
                    disabled={guardando}
                >
                    <Text style={styles.buttonText}>
                        {guardando ? 'Guardando...' : 'Agregar Usuario'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Zona del SELECT (Lista) */}
            <View style={[styles.card, { flex: 1 }]}>
                <View style={styles.listHeader}>
                    <Text style={styles.sectionTitle}>Lista de Usuarios</Text>
                    <TouchableOpacity onPress={cargarUsuarios}>
                        <Text style={styles.reloadText}>Recargar</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#007AFF" />
                ) : (
                    <FlatList
                        data={usuarios}
                        renderItem={renderUsuario}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}
            </View>
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#f2f2f7', // Color de fondo estilo iOS
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888',
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#A0C4FF',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    reloadText: {
        color: '#007AFF',
        fontSize: 14,
    },
    userItem: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
    },
    userNumber: {
        width: 32,
        height: 32,
        backgroundColor: '#007AFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    userNumberText: {
        color: 'white',
        fontWeight: 'bold',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    userId: {
        fontSize: 12,
        color: '#007AFF',
        marginTop: 2,
    },
    userDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
});