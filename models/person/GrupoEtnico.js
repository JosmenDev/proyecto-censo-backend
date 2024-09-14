import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class GrupoEtnico extends Model {};

GrupoEtnico.init ( {
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
    modelName: 'GrupoEtnico',
    tableName: 'grupo_etnico',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(grupoEtnico) {
            if (typeof grupoEtnico.nombre === 'string') {
                grupoEtnico.nombre = grupoEtnico.nombre.trim();
            }
        }
    }
});

export default GrupoEtnico;