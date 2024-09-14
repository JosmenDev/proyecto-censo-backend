import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class MedioInformacion extends Model {};

MedioInformacion.init( {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'MedioInformacion',
    tableName: 'medios_informacion',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(medioInformacion) {
            if (typeof medioInformacion.nombre === 'string') {
                medioInformacion.nombre = medioInformacion.nombre.trim();
            }
        }
    }
});

export default MedioInformacion;