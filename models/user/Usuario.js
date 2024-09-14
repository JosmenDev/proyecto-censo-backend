import db from "../../config/db.js";
import { DataTypes, Model } from "sequelize";
import Empleado from "./Empleado.js";
import generarId from "../../helpers/generarId.js";
import bcrypt from 'bcrypt';
import Rol from "./Rol.js";

class Usuario extends Model {
    // Metodo para comprobar password
    async comprobarPassword(passwordForm) {
        return await bcrypt.compare(passwordForm, this.password);
    }
};

Usuario.init( {
    idempleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Empleado',
            key: 'id'
        }
    },
    idrol: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Rol',
            key: 'id'
        }
    },
    username : {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            notEmpty: true,
            isNumeric: true,
            len: [8, 8]
        }
    },
    password : {
        type: DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: generarId()
    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
},{
    sequelize: db,
    modelName: 'Usuario',
    tableName: 'usuario',
    freezeTableName: true,
    timestamps: true,
    hooks: {

        beforeValidate(usuario) {
            if (typeof usuario.username === 'string') {
                usuario.username = usuario.username.trim();
            }
        },
        // Hook para hashear la contraseña antes de guardar el usuario
        beforeSave: async(usuario) => {
            if (usuario.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        }
    }
});

// Establecer la relacion
Usuario.belongsTo(Empleado, {
    foreignKey: 'idempleado',
    as: 'Empleado'
})

Usuario.belongsTo(Rol, {
    foreignKey: 'idrol',
    as: 'Rol'
})

export default Usuario;