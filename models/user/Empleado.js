import { Model, Sequelize } from "sequelize";
import db from "../../config/db.js";
import Cargo from "./Cargo.js";

class Empleado extends Model {}

Empleado.init({
    dni: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isNumeric: true,
            isInt: true,
            len: [8, 8]
        }
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    apellidos: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
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
    timestamps: true,
    hooks: {
        beforeValidate(empleado) {
            const {dni, nombre, apellidos} = empleado;
            if (typeof dni === 'string') {
                empleado.dni = dni.trim();
            }

            if (typeof nombre === 'string') {
                empleado.nombre = nombre.trim();
            }

            if (typeof apellidos === 'string') {
                empleado.apellidos = apellidos.trim();
            }
        }
    }
});

// Establecer la relación
Empleado.belongsTo(Cargo, {
    foreignKey: "idcargo",  // Define el nombre de la clave foránea
    as: 'Cargo'     // Alias para la relación
});

export default Empleado;
