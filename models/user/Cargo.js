import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../../config/db.js";

class Cargo extends Model {};

Cargo.init ({ 
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'Cargo',
    tableName: 'cargo',
    freezeTableName: true,  //Desactiva la pluralizacion automatica
    timestamps: true,
    hooks: {
        beforeValidate(cargo) {
            if (typeof cargo.nombre === 'string') {
                cargo.nombre = cargo.nombre.trim();
            }
        }
    }
})

export default Cargo;