import { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
// Importamos el controlador
import { UsuarioController } from '../controllers/UsuarioController';

// Creamos la instancia del controlador
const controller = new UsuarioController();

export default function InsertUsuarioScreen() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [usuarioAEditar, setUsuarioAEditar] = useState(null);

    // Función para cargar usuarios desde la BD
    const cargarUsuarios = useCallback(async () => {
        try {
            setLoading(true);
            const data = await controller.obtenerUsuarios();
            setUsuarios(data);
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
        controller.addListener(cargarUsuarios);
        return () => {
            controller.removeListener(cargarUsuarios);
        };
    }, [cargarUsuarios]);

    const handleGuardar = async () => {
        if (guardando) return;

        try {
            setGuardando(true);

            if (modoEdicion) {
                // ACTUALIZAR (UPDATE)
                await controller.actualizarUsuario(usuarioAEditar, nombre);
                Alert.alert('Éxito', 'Usuario actualizado correctamente');
                // Reseteamos el modo edición
                setModoEdicion(false);
                setUsuarioAEditar(null);
            } else {
                // CREAR (INSERT)
                const usuarioCreado = await controller.crearUsuario(nombre);
                Alert.alert('Usuario Creado', `"${usuarioCreado.nombre}" guardado con ID: ${usuarioCreado.id}`);
            }

            setNombre(''); // Limpiar el campo de texto
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setGuardando(false);
        }
    };

    const prepararEdicion = (usuario) => {
        setNombre(usuario.nombre);     // Ponemos el nombre en el input
        setUsuarioAEditar(usuario.id); // Guardamos el ID
        setModoEdicion(true);          // Activamos modo edición
    };

    const cancelarEdicion = () => {
        setModoEdicion(false);
        setUsuarioAEditar(null);
        setNombre('');
    };

    const confirmarEliminacion = (id) => {
        Alert.alert(
            "Eliminar Usuario",
            "¿Estás seguro de que quieres eliminar este usuario?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await controller.eliminarUsuario(id);
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar");
                        }
                    }
                }
            ]
        );
    };

    // Renderizar cada elemento de la lista
    const renderUsuario = ({ item, index }) => (
        <View style={styles.userItem}>
            <View style={styles.userInfoContainer}>
                <View style={styles.userNumber}>
                    <Text style={styles.userNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.nombre}</Text>
                    <Text style={styles.userId}>ID: {item.id}</Text>
                    <Text style={styles.userDate}>
                        {new Date(item.fechaCreacion).toLocaleDateString('es-MX')}
                    </Text>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.actionButtonEdit}
                    onPress={() => prepararEdicion(item)}
                >
                    <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButtonDelete}
                    onPress={() => confirmarEliminacion(item.id)}
                >
                    <Text style={styles.actionText}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CRUD USUARIOS</Text>
            <Text style={styles.subtitle}>
                {Platform.OS === 'web' ? 'WEB (LocalStorage)' : `${Platform.OS.toUpperCase()} (SQLite)`}
            </Text>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    {modoEdicion ? 'Editando Usuario' : 'Insertar Usuario'}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe el nombre del usuario"
                    value={nombre}
                    onChangeText={setNombre}
                    editable={!guardando}
                />

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            modoEdicion ? styles.buttonUpdate : styles.buttonAdd,
                            guardando && styles.buttonDisabled
                        ]}
                        onPress={handleGuardar}
                        disabled={guardando}
                    >
                        <Text style={styles.buttonText}>
                            {guardando ? 'Guardando...' : (modoEdicion ? 'Actualizar' : 'Agregar Usuario')}
                        </Text>
                    </TouchableOpacity>

                    {modoEdicion && (
                        <TouchableOpacity
                            style={styles.buttonCancel}
                            onPress={cancelarEdicion}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Zona de la LISTA */}
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
        backgroundColor: '#f2f2f7',
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
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonAdd: {
        backgroundColor: '#007AFF',
    },
    buttonUpdate: {
        backgroundColor: '#34C759',
    },
    buttonCancel: {
        flex: 0.4,
        backgroundColor: '#FF3B30',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
    },
    userInfoContainer: {
        flexDirection: 'row',
        flex: 1,
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
    actionsContainer: {
        flexDirection: 'row',
        gap: 8,
        marginLeft: 10,
    },
    actionButtonEdit: {
        backgroundColor: '#FFCC00',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    actionButtonDelete: {
        backgroundColor: '#FF3B30',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    actionText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});