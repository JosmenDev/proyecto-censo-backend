import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class Departamento extends Model {};

Departamento.init( {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'Departamento',
    tableName: 'departamento',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(departamento) {
            if (typeof departamento.nombre === 'string') {
                departamento.nombre = departamento.nombre.trim();
            }
        }
    }
});

export default Departamento;
