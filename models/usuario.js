const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Se requiere un nombre!']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    email: {
        type: String,
        required: [true, 'Se requiere un correo!'],
        unique: true
    },
    contraseña: {
        type: String,
        required: [true, 'Se requiere una contraseña!'],
        unique: true
    },
    rol: {
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema);