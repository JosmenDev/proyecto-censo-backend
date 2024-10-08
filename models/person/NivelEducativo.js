import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class NivelEducativo extends Model {};

NivelEducativo.init ( {
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
    modelName: 'NivelEducativo',
    tableName: 'nivel_educativo',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(nivelEducativo) {
            if (typeof nivelEducativo.nombre === 'string') {
                nivelEducativo.nombre = nivelEducativo.nombre.trim();
            }
        }
    }
});

export default NivelEducativo;