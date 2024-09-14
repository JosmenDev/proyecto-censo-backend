import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class MedidaProteccion extends Model {};

MedidaProteccion.init( {
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
    modelName: 'MedidaProteccion',
    tableName: 'medidas_proteccion',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(madidasProteccion) {
            if (typeof madidasProteccion.nombre === 'string') {
                madidasProteccion.nombre = madidasProteccion.nombre.trim();
            }
        }
    }
});

export default MedidaProteccion;