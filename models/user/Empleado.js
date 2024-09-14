import { Model, Sequelize } from "sequelize";
import db from "../../config/db.js";
import Cargo from "./Cargo.js";

class Empleado extends Model {};

Empleado.init( {
    dni: {
        // Es de tipo String
        type: Sequelize.STRING,
        // Indica que el campo es requerido
        allowNull: false,
        // Valor único
        unique: true,
        validate: {
            notEmpty: true,
            isNumeric: true,
            isInt: true,
            len: [8,8],
            trim(value) {
                if (typeof value === 'string') {
                    this.setDataValue('dni', value.trim());
                }
            }
        }
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim(value) {
                if (typeof value === 'string') {
                    this.setDataValue('nombre', value.trim())
                }
            }
        }
    },
    apellidos: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim(value){ 
                if (typeof value === 'string') {
                    this.setDataValue(value.trim())
                }
            }
        }
    },
    idcargo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Cargo',
            key: 'id'
        }
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'Empleado',
    tableName: 'empleado',
    freezeTableName: true,
    timestamps: true // Esto habilita `createdAt` y `updatedAt`
});

// Establecer la relacion
Empleado.belongsTo(Cargo, {
    foreignKey: "idcargo",  // Define el nombre de la clave foranea
    as: 'Cargo'     // Alias para la relacion
})

export default Empleado;