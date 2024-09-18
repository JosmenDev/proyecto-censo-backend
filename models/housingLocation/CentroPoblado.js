import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";
import Distrito from "./Distrito.js";

class CentroPoblado extends Model {};

CentroPoblado.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    iddistrito: {  // Campo de relación con Distrito
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Distrito',
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'CentroPoblado',
    tableName: 'centro_poblado',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(centroPoblado) {
            if (typeof centroPoblado.nombre === 'string') {
                centroPoblado.nombre = centroPoblado.nombre.trim();
            }
        }
    }
});

CentroPoblado.belongsTo(Distrito, { 
    foreignKey: 'iddistrito', 
    as: 'distrito' 
});

export default CentroPoblado;
