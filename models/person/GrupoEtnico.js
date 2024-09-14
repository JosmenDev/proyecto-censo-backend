import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class GrupoEtnico extends Model {};

GrupoEtnico.init ( {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim(value) {
                if (typeof value === 'String') {
                    this.setDataValue('nombre', value.trim());
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
    modelName: 'GrupoEtnico',
    tableName: 'grupo_etnico',
    freezeTableName: true,
    timestamps: true
});

export default GrupoEtnico;