const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required:true },
    email: { type: String, required: true, unique: true },
    password: { type: String 
        // quito el atributo de requerido ya que las constraseñas de google y facebook no llegan al modelo
        /*, require: true */ },
    telefono: { type: Number, required: true,
        //quito el atributo de unico ya que no todos los usuarios llegan al modelo desde los servicios de FB y G con este dato y se pueden repetir como null
        /*  unique: true */},
    rol : {type:String,enum:["usuario","propietario"]},
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    googleId: { type: String, default: "" },
    facebookId: { type: String, default : ""},
    listaReservas: { type: Array, default: []},
    listaServicios: { type: Array, default: []},
    imagenUrl: { type: String, default: '' }
})

//../uploads/user-profile-unloggin.png

// Método para encriptar contraseña (Hook previo a crear un usuario, para hashear la contraseña y formar un usuario más seguro):

UserSchema.pre('save', async function (next) {
    //modifico el hasheo para que no cree un conflicto con el login de google o facebook ya que estos objetos no tienen campo de contraseña
    if (this.isModified('password') && this.password){
        
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    next()
})

// Método para validar contraseña (Función que nos permite comparar la contraseña que esta en la base de datos con la que viene del request):
UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const userModel = mongoose.model('users', UserSchema)
module.exports = {userModel}