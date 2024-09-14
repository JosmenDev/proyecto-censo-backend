import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class Enfermedad extends Model {};

Enfermedad.init( {
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
    modelName: 'Enfermedad',
    tableName: 'enfermedad',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(enfermedad) {
            if (typeof enfermedad.nombre === 'string') {
                enfermedad.nombre = enfermedad.nombre.trim();
            }
        }
    }
});

export default Enfermedad;