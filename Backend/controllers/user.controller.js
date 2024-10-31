const {userModel} = require('../models/user')
const bcrypt = require('bcrypt')

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await userModel.find({}).exec()
        res.json(usuarios)
    } catch (e) {
        res.json({error : e})
    }
}
//cambio busqueda por _id para que coincida con el token y pueda decodificar en el front.
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await userModel.findOne({ _id: req.params.usuarioId }).exec()
        if(!usuario) return res.status(404).json({ error: 'userModel no encontrado' })
        res.json(usuario)
    } catch (e) {
        res.json({error : e})
    }
}
const eliminarUsuario = async (req, res) => {
    try {
        const usuarioAEliminar = await userModel.deleteOne({ _id: req.params.usuarioId }).exec()
        if (usuarioAEliminar.deletedCount == 0) return res.status(404).json({ error: 'userModel no encontrado' })
        res.status(200).json({ success : 'userModel eliminado correctamente' })
    } catch (e) {
        res.json({error : e})
    }
}
const editarUsuario = async (req, res) => {
    const newUser = req.body; // TODO: nombre,apellido, edad y telefono NADA MAS.
    const usuarioAEditar = await userModel.findOne({ _id: req.params.usuarioId }).exec()
    try {
        if (!usuarioAEditar) return res.status(404).json({ mensaje: 'userModel no encontrado' })

        for (const value in usuarioAEditar) {//iterrar sobre los atributos del user de DB
            if (newUser.hasOwnProperty(value)) {//valida si coinciden los atributos entre ambos tipo de users
                usuarioAEditar[value] = newUser[value]
            }
        }
        await usuarioAEditar.save();
        res.json(usuarioAEditar);
    } catch (e) {
        res.status(500).json({error : e });
    }
}
const resetPassword = async (req, res) => {
    //agregar api de mailing para confirmar el reset
    const usuarioAEditar = await userModel.findOne({ _id: req.params.usuarioId }).exec()
    const { usuarioId, contraseñaActual, nuevaContraseña } = req.body;
    try {
        if (!usuarioAEditar) return res.status(404).json({ mensaje: 'userModel no encontrado' })

        const contraseñaValida = await bcrypt.compare(contraseñaActual, usuarioAEditar.password);
        if (!contraseñaValida) return res.status(401).json({ error: 'La contraseña actual es incorrecta' })

        usuarioAEditar.password = nuevaContraseña;

        await usuarioAEditar.save();

        res.status(200).json({ mensaje: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la contraseña del usuario' });
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    eliminarUsuario,
    editarUsuario,
    resetPassword
}