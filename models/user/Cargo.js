import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../../config/db.js";

class Cargo extends Model {};

Cargo.init ({ 
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim(value) { 
                if (typeof value === 'String') {
                    this.setDataValue('nombre', value.trim())
                }
            }
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
    timestamps: true    // Habilita el createAt y updateAt
})

export default Cargo;