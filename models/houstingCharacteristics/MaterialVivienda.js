import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class MaterialVivienda extends Model {};

MaterialVivienda.init( {
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
    modelName: 'MaterialVivienda',
    tableName: 'material_vivienda',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(materialBasura) {
            if (typeof materialBasura.nombre === 'string') {
                materialBasura.nombre = materialBasura.nombre.trim();
            }
        }
    }
});

export default MaterialVivienda;