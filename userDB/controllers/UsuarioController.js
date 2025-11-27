import { Usuario } from '../models/usuario';
import DatabaseService from '../database/DatabaseService';

export class UsuarioController {
    constructor() {
        this.listeners = [];
    }

    // Inicializar el controlador con el Service
    async initialize() {
        await DatabaseService.initialize();
    }

    // Obtener usuarios
    async obtenerUsuarios() {
        try {
            const data = await DatabaseService.getAll();
            // Convertimos los datos crudos en objetos de tipo Usuario
            return data.map(u => new Usuario(u.id, u.nombre, u.fecha_creacion));
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw new Error('No se pudieron cargar los usuarios');
        }
    }

    // Crear un usuario nuevo
    async crearUsuario(nombre) {
        try {
            // 1. Validar datos usando el Modelo
            Usuario.validar(nombre);

            // 2. Insertar en BD usando el Servicio
            const nuevoUsuario = await DatabaseService.add(nombre.trim());

            // 3. Notificar a los observadores (actualizar la pantalla)
            this.notifyListeners();

            // 4. Retornar usuario creado
            return new Usuario(
                nuevoUsuario.id,
                nuevoUsuario.nombre,
                nuevoUsuario.fecha_creacion
            );

        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }

    // Actualizar un usuario existente
    async actualizarUsuario(id, nombre) {
        try {
            // 1. Validar el nuevo nombre
            Usuario.validar(nombre);

            // 2. Llamar al servicio para actualizar
            await DatabaseService.update(id, nombre.trim());

            // 3. Notificar para refrescar la lista
            this.notifyListeners();

        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    }

    // Eliminar un usuario
    async eliminarUsuario(id) {
        try {
            // 1. Llamar al servicio para eliminar
            await DatabaseService.delete(id);

            // 2. Notificar para refrescar la lista
            this.notifyListeners();

        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error;
        }
    }

    // Sistema de observadores para actualizar la vista automáticamente
    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback());
    }
}